import type { IncomingMessage, ServerResponse } from 'http';
import crypto from 'crypto';

interface ExtendedRequest extends IncomingMessage {
  body?: any;
  query?: Record<string, string>;
}

interface ExtendedResponse extends ServerResponse {
  status: (statusCode: number) => ExtendedResponse;
  json: (data: any) => void;
}

// In-memory LRU cache to track processed sale IDs and enforce idempotency per serverless instance
const processedSaleIds = new Set<string>();
const MAX_CACHE_SIZE = 1000;

function rememberProcessedSale(saleId: string) {
  if (processedSaleIds.size >= MAX_CACHE_SIZE) {
    const firstItem = processedSaleIds.values().next().value;
    if (firstItem) processedSaleIds.delete(firstItem);
  }
  processedSaleIds.add(saleId);
}

/**
 * Hashes string using SHA-256 for Meta User Data matching
 */
function hashMetaUserData(value?: string): string | undefined {
  if (!value || typeof value !== 'string') return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

/**
 * Normalizes phone numbers to digits with country code
 */
function normalizePhone(phone?: string): string | undefined {
  if (!phone || typeof phone !== 'string') return undefined;
  const digits = phone.replace(/\D/g, '');
  if (!digits) return undefined;
  if (digits.length === 10 || digits.length === 11) {
    return `55${digits}`;
  }
  return digits;
}

/**
 * Validates Kirvano Webhook Signature or Authorization Token
 */
function verifyKirvanoAuth(req: ExtendedRequest, rawBodyBuffer: Buffer, secret: string): boolean {
  const kirvanoSignature = req.headers['x-kirvano-signature'] as string;
  const kirvanoToken =
    (req.headers['x-kirvano-token'] as string) ||
    (req.headers['x-webhook-token'] as string) ||
    (req.headers['authorization'] as string)?.replace(/^Bearer\s+/i, '') ||
    req.query?.token;

  // 1. Direct Token Matching
  if (kirvanoToken && kirvanoToken === secret) {
    return true;
  }

  // 2. HMAC SHA-256 Signature Verification
  if (kirvanoSignature && rawBodyBuffer.length > 0) {
    try {
      const computedHmac = crypto.createHmac('sha256', secret).update(rawBodyBuffer).digest('hex');
      const signatureBuffer = Buffer.from(kirvanoSignature);
      const computedBuffer = Buffer.from(computedHmac);
      if (signatureBuffer.length === computedBuffer.length && crypto.timingSafeEqual(signatureBuffer, computedBuffer)) {
        return true;
      }
    } catch (err) {
      // Signature comparison failure
    }
  }

  return false;
}

export default async function handler(req: ExtendedRequest, res: ExtendedResponse) {
  const sendJson = (statusCode: number, data: any) => {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  };

  if (req.method !== 'POST') {
    return sendJson(405, { error: 'Method Not Allowed' });
  }

  const pixelId = process.env.META_PIXEL_ID || '1427563316187745';
  const accessToken = process.env.META_ACCESS_TOKEN;
  const webhookSecret = process.env.KIRVANO_WEBHOOK_SECRET;
  const testEventCode = process.env.META_TEST_EVENT_CODE;

  if (!accessToken) {
    console.error('[Kirvano Webhook] Missing META_ACCESS_TOKEN environment variable');
    return sendJson(500, { error: 'Server configuration error: META_ACCESS_TOKEN missing' });
  }

  try {
    let body = req.body;
    let rawBodyBuffer: Buffer = Buffer.from([]);

    if (typeof body === 'string') {
      rawBodyBuffer = Buffer.from(body, 'utf-8');
      body = JSON.parse(body);
    } else if (Buffer.isBuffer(body)) {
      rawBodyBuffer = Buffer.from(body);
      body = JSON.parse(rawBodyBuffer.toString('utf-8'));
    } else if (!body) {
      const buffers: Uint8Array[] = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      rawBodyBuffer = Buffer.concat(buffers);
      body = rawBodyBuffer.length > 0 ? JSON.parse(rawBodyBuffer.toString('utf-8')) : {};
    } else {
      rawBodyBuffer = Buffer.from(JSON.stringify(body));
    }

    // 1. Authenticate Kirvano Webhook
    if (webhookSecret) {
      const isValid = verifyKirvanoAuth(req, rawBodyBuffer, webhookSecret);
      if (!isValid) {
        console.warn('[Kirvano Webhook] Authentication failed: signature/token mismatch');
        return sendJson(401, { error: 'Unauthorized: Invalid Kirvano webhook signature or token' });
      }
    }

    // 2. Validate Event Type & Status
    const event = (body.event || body.type || '').toUpperCase();
    const status = (body.status || '').toUpperCase();

    const isApproved =
      event === 'SALE_APPROVED' ||
      status === 'APPROVED' ||
      event === 'PAYMENT_APPROVED' ||
      status === 'PAID';

    if (!isApproved) {
      return sendJson(200, {
        message: 'Webhook received (event ignored: not a SALE_APPROVED event)',
        event,
        status
      });
    }

    // 3. Strict Validation: Real Sale ID
    const saleId =
      body.sale_id ||
      body.saleId ||
      body.id ||
      body.order?.id ||
      body.transaction_id;

    if (!saleId || typeof saleId !== 'string' && typeof saleId !== 'number') {
      console.error('[Kirvano Webhook Error] Rejected payload: missing sale_id');
      return sendJson(400, { error: 'Bad Request: Missing real transaction sale_id' });
    }

    const cleanSaleId = String(saleId).trim();

    // Idempotency check: prevent duplicate processing
    if (processedSaleIds.has(cleanSaleId)) {
      console.log(`[Kirvano Webhook] Duplicate webhook received for sale_id: ${cleanSaleId} (skipped)`);
      return sendJson(200, {
        message: 'Webhook already processed for this sale_id',
        sale_id: cleanSaleId
      });
    }

    // 4. Strict Validation: Real Transaction Amount & Currency
    const payment = body.payment || {};
    const rawAmount =
      payment.total_amount ??
      payment.amount ??
      body.total_amount ??
      body.amount ??
      body.value ??
      body.products?.[0]?.price;

    const amount = typeof rawAmount === 'number' ? rawAmount : parseFloat(String(rawAmount));

    if (isNaN(amount) || amount <= 0) {
      console.error(`[Kirvano Webhook Error] Rejected sale_id ${cleanSaleId}: invalid payment amount`);
      return sendJson(400, { error: 'Bad Request: Missing or invalid transaction payment amount' });
    }

    const currency = (payment.currency || body.currency || 'BRL').toUpperCase();

    // 5. Customer & Attribution Data Extraction
    const customer = body.customer || body.buyer || {};
    const tracking = body.tracking || body.metadata || {};

    const emailHash = hashMetaUserData(customer.email);
    const phoneHash = hashMetaUserData(normalizePhone(customer.phone || customer.telephone));

    let firstNameHash: string | undefined;
    let lastNameHash: string | undefined;

    if (customer.name && typeof customer.name === 'string') {
      const parts = customer.name.trim().split(/\s+/);
      firstNameHash = hashMetaUserData(parts[0]);
      if (parts.length > 1) {
        lastNameHash = hashMetaUserData(parts.slice(1).join(' '));
      }
    }

    // Build user_data for Meta
    const userData: Record<string, any> = {};
    if (emailHash) userData.em = [emailHash];
    if (phoneHash) userData.ph = [phoneHash];
    if (firstNameHash) userData.fn = [firstNameHash];
    if (lastNameHash) userData.ln = [lastNameHash];

    if (customer.city) userData.ct = [hashMetaUserData(customer.city)];
    if (customer.state) userData.st = [hashMetaUserData(customer.state)];
    if (customer.zip_code || customer.zipcode) {
      userData.zp = [hashMetaUserData(customer.zip_code || customer.zipcode)];
    }

    // Include fbp and fbc ONLY if legitimately provided by Kirvano tracking
    if (tracking.fbp || body.fbp) {
      userData.fbp = String(tracking.fbp || body.fbp);
    }
    if (tracking.fbc || body.fbc) {
      userData.fbc = String(tracking.fbc || body.fbc);
    }

    // Include buyer IP / User-Agent if provided
    if (customer.ip || tracking.ip || body.client_ip) {
      userData.client_ip_address = String(customer.ip || tracking.ip || body.client_ip);
    }
    if (customer.user_agent || tracking.user_agent || body.user_agent) {
      userData.client_user_agent = String(customer.user_agent || tracking.user_agent || body.user_agent);
    }

    // Event ID for Meta Deduplication
    const eventId = `kirvano_sale_${cleanSaleId}`;

    // 6. Construct Meta Conversions API Payload
    const metaEvent: Record<string, any> = {
      event_name: 'Purchase',
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: 'system_generated',
      custom_data: {
        currency: currency,
        value: amount,
        content_name: body.products?.[0]?.name || 'Pack Viral Frutas Falantes',
        content_type: 'product',
        content_ids: [body.products?.[0]?.id || 'pack_frutas_1990']
      },
      user_data: Object.keys(userData).length > 0 ? userData : undefined
    };

    const payload: Record<string, any> = {
      data: [metaEvent]
    };

    // Append test_event_code if configured for Meta Event Manager Test Mode
    if (testEventCode) {
      payload.test_event_code = testEventCode;
      console.log(`[Kirvano Webhook] Test Event Mode enabled with code: ${testEventCode}`);
    }

    const capiUrl = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`;

    const response = await fetch(capiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const metaResult = await response.json();

    if (!response.ok) {
      console.error('[Kirvano Webhook Meta Error]:', metaResult);
      return sendJson(response.status, {
        error: 'Meta Graph API error',
        metaError: metaResult.error?.message || metaResult
      });
    }

    // Mark sale_id as processed in idempotency cache
    rememberProcessedSale(cleanSaleId);

    console.log(`[Kirvano Webhook Success] Authentic Purchase tracked for sale_id: ${cleanSaleId}`);

    return sendJson(200, {
      success: true,
      sale_id: cleanSaleId,
      event_id: eventId,
      meta_response: metaResult
    });
  } catch (err: any) {
    console.error('[Kirvano Webhook Exception]:', err?.message || 'Unknown error');
    return sendJson(500, { error: 'Internal Server Error', message: err?.message });
  }
}
