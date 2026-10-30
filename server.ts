import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const META_PIXEL_ID = process.env.META_PIXEL_ID || '1427563316187745';
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

// Proxy endpoint for Meta Conversions API (CAPI) in local Express environment
app.post('/api/pixel-event', async (req, res) => {
  if (!META_ACCESS_TOKEN) {
    console.warn('[CAPI Local Proxy] META_ACCESS_TOKEN environment variable not set');
    return res.status(500).json({ error: 'META_ACCESS_TOKEN environment variable not set' });
  }

  try {
    const { eventName, eventData, eventId, sourceUrl } = req.body;

    const payload = {
      data: [
        {
          event_name: eventName || 'PageView',
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId || `evt_${Date.now()}`,
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
            client_ip_address: (req.headers['x-forwarded-for'] as string) || req.ip || ''
          }
        }
      ]
    };

    const capiUrl = `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(META_ACCESS_TOKEN)}`;

    const response = await fetch(capiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    return res.json({ success: response.ok, metaResponse: result });
  } catch (error) {
    console.error('[CAPI Server Proxy Error]:', error);
    return res.status(500).json({ error: 'Failed to send Meta event' });
  }
});

// Vite middleware in dev mode
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });
  app.use(vite.middlewares);
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    try {
      let template = (await import('fs')).readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8'
      );
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
} else {
  // Static files in production
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
