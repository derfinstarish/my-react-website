require('dotenv').config();

const express = require('express');
const twilio = require('twilio');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappFrom = process.env.TWILIO_WHATSAPP_FROM;
const ownerNumber = 'whatsapp:+919600416662';
const whatsappRedirectUrl = 'https://api.whatsapp.com/send?phone=919600416662';

// Use WhatsApp's send endpoint so mobile browsers open the app when available.
app.get('/whatsapp', (req, res) => {
  res.redirect(302, whatsappRedirectUrl);
});

const normalizePhone = (value) => {
  const input = String(value).trim();
  const digits = input.replace(/\D/g, '');

  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 11 && digits.startsWith('0')) return `+91${digits.slice(1)}`;
  if (digits.length === 12 && digits.startsWith('91')) return `+${digits}`;
  return input.startsWith('+') ? input : `+${digits}`;
};

app.post('/api/consultation', async (req, res) => {
  const { fullName, phone, email, service, message } = req.body || {};

  if (!fullName || !phone || !email || !service || !message) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const details = [
    'New consultation request received:',
    `Name: ${fullName}`,
    `Phone: ${normalizePhone(phone)}`,
    `Email: ${email}`,
    `Service: ${service}`,
    `Details: ${message}`,
  ].join('\n');

  try {
    if (!accountSid || !authToken || !whatsappFrom || !ownerNumber) {
      console.error('Twilio WhatsApp config missing. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM, and OWNER_WHATSAPP_NUMBER.');
      return res.status(500).json({
        success: false,
        message: 'WhatsApp notification is not configured yet.',
      });
    }

    const client = twilio(accountSid, authToken);
    await client.messages.create({
      from: whatsappFrom,
      to: ownerNumber,
      body: details,
    });

    return res.json({ success: true, message: 'Consultation sent successfully.' });
  } catch (error) {
    console.error('WhatsApp send failed:', error);
    return res.status(500).json({ success: false, message: 'Failed to send notification.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
