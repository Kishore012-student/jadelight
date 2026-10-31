// backend/server.js
require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(cors({
  origin: [
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'http://127.0.0.1:5501',
    'http://localhost:5501',
    'https://jadelight.com.my',
    'https://www.jadelight.com.my',
  ]
}));
app.use(express.json({ limit: '50kb' }));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

app.post('/api/enquiry', async (req, res) => {
  const {
    name, company, position, email, phone,
    whatsapp, service, industry, message, contactMethod,
  } = req.body;

  // Required fields
  if (!name || !company || !email || !phone || !whatsapp ||
      !service || !industry || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Must match the database check constraint: Email, Phone, WhatsApp
  const allowedMethods = ['Email', 'Phone', 'WhatsApp'];
  const method = contactMethod || 'Email';
  if (!allowedMethods.includes(method)) {
    return res.status(400).json({ error: 'Invalid contact method' });
  }

  try {
    await pool.query(
      `INSERT INTO public.contact_submissions
        (full_name, email, phone_number, subject, requirements,
         company, position, service_required, industry,
         whatsapp_number, preferred_contact_method)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [
        name,
        email,
        phone,
        `Website enquiry: ${service}`,
        message,
        company,
        position || null,
        service,
        industry,
        whatsapp,
        method,
      ]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('API running'));