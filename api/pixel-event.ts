import type { IncomingMessage, ServerResponse } from 'http';

interface ExtendedRequest extends IncomingMessage {
  body?: any;
  query?: Record<string, string>;
}

interface ExtendedResponse extends ServerResponse {
  status: (statusCode: number) => ExtendedResponse;
  json: (data: any) => void;
}

export default async function handler(req: ExtendedRequest, res: ExtendedResponse) {
  // Helper for JSON responses
  const sendJson = (statusCode: number, data: any) => {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  };

  // Only allow POST
  if (req.method !== 'POST') {
    return sendJson(405, { error: 'Method Not Allowed' });
  }

  const pixelId = process.env.META_PIXEL_ID || '1427563316187745';
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!accessToken) {
    console.warn('[Meta CAPI] Missing META_ACCESS_TOKEN environment variable');
    return sendJson(500, {
      error: 'Server configuration error: META_ACCESS_TOKEN environment variable is missing'
    });
  }

  try {
    let body = req.body;

    // Parse JSON body if it arrives as string or stream
    if (typeof body === 'string') {
      body = JSON.parse(body);
    } else if (!body) {
      const buffers: Uint8Array[] = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      const rawBody = Buffer.concat(buffers).toString('utf-8');
      body = rawBody ? JSON.parse(rawBody) : {};
    }

    const { eventName, eventData, eventId, sourceUrl, userData } = body || {};

    if (!eventName) {
      return sendJson(400, { error: 'Missing required parameter: eventName' });
    }

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          event_source_url: sourceUrl || req.headers.referer || '',
          action_source: 'website',
          custom_data: {
            currency: 'BRL',
            value: 19.90,
            content_name: 'Pack Viral Frutas Falantes',
            content_category: 'Digital Pack',
            content_type: 'product',
            content_ids: ['pack_frutas_1990'],
            ...eventData
          },
          user_data: {
            client_user_agent: req.headers['user-agent'] || '',
            client_ip_address:
              (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
              (req as any).socket?.remoteAddress ||
              '',
            fbp: userData?.fbp || undefined,
            fbc: userData?.fbc || undefined
          }
        }
      ]
    };

    const capiUrl = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`;

    const response = await fetch(capiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('[Meta CAPI Error]:', result);
      return sendJson(response.status, {
        error: 'Meta Graph API returned an error',
        metaError: result.error?.message || result
      });
    }

    console.log(`[Meta CAPI Success] Event ${eventName} (${payload.data[0].event_id}):`, result);
    return sendJson(200, { success: true, events_received: result.events_received, event_id: payload.data[0].event_id });
  } catch (err: any) {
    console.error('[Meta CAPI Handler Exception]:', err);
    return sendJson(500, { error: 'Internal Server Error', message: err?.message || 'Unknown error' });
  }
}
