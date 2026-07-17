const nodemailer = require('nodemailer');

// Vercel ejecuta este archivo como función serverless en /api/contact.
// Las credenciales viven aquí, en el servidor: no llevan el prefijo REACT_APP_
// justo para que Create React App no las incruste en el bundle del cliente.

const LIMITS = { name: 100, email: 254, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const { name, email, message, website } = req.body || {};

  // Campo trampa: está oculto por CSS, así que un humano no lo rellena nunca.
  // Se responde 200 a propósito para no enseñarle al bot que lo hemos detectado.
  if (website) return res.status(200).json({ ok: true });

  const clean = {
    name: typeof name === 'string' ? name.trim() : '',
    email: typeof email === 'string' ? email.trim() : '',
    message: typeof message === 'string' ? message.trim() : ''
  };

  if (!clean.name || !clean.email || !clean.message) {
    return res.status(400).json({ error: 'missing_fields' });
  }
  if (!EMAIL_RE.test(clean.email)) {
    return res.status(400).json({ error: 'invalid_email' });
  }
  if (Object.entries(LIMITS).some(([k, max]) => clean[k].length > max)) {
    return res.status(400).json({ error: 'too_long' });
  }

  const { GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error('[api/contact] faltan GMAIL_USER o GMAIL_APP_PASSWORD');
    return res.status(500).json({ error: 'server_misconfigured' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD }
    });

    await transporter.sendMail({
      // Gmail exige que el remitente sea la cuenta autenticada: no se puede
      // suplantar al visitante. Su dirección va en replyTo, así que al
      // responder desde Gmail el correo le llega a él directamente.
      from: `"Portfolio" <${GMAIL_USER}>`,
      to: CONTACT_TO || GMAIL_USER,
      replyTo: `"${clean.name}" <${clean.email}>`,
      subject: `Portfolio — mensaje de ${clean.name}`,
      text: `Nombre: ${clean.name}\nEmail: ${clean.email}\n\n${clean.message}\n`
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[api/contact] fallo al enviar el correo', err);
    return res.status(502).json({ error: 'send_failed' });
  }
};
