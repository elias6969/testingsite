import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  // Pull fields from the request body
  const { name, email, subject, message, token } = req.body || {};

  // Basic validation
  if (!token) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Captcha token missing' }));
    return;
  }

  // Your secret key (define this in Vercel > Settings > Environment Variables)
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.error('[send-contact] Missing RECAPTCHA_SECRET_KEY!');
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Server misconfigured (no secret)' }));
    return;
  }

  try {
    // Verify the token with Google
    const captchaRes = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
      }
    );
    const captchaData = await captchaRes.json();

    if (!captchaData.success) {
      console.warn('[send-contact] Captcha failed:', captchaData['error-codes']);
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Captcha verification failed' }));
      return;
    }

    // All good! Here you could e.g. send an email via nodemailer, SendGrid, etc.
    console.log('[send-contact] Form submitted:', { name, email, subject, message });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: true }));
  } catch (err) {
    console.error('[send-contact] Unexpected error:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
}
