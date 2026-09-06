import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { query } from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

const app = express();
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'maniadmin@mani.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'mani@2026';

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const result = await query('SELECT NOW() as server_time');
    res.json({
      status: 'healthy',
      database: 'connected',
      db_time: result.rows[0].server_time,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({
      status: 'unhealthy',
      database: 'error',
      error: err.message
    });
  }
});

// 1. Submit Lead API
app.post('/api/leads', async (req, res) => {
  try {
    const { name, company_name, phone, product, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Full Name is required' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ error: 'Phone number is required' });
    }
    if (!product || !product.trim()) {
      return res.status(400).json({ error: 'Interested Product is required' });
    }

    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;

    const insertQuery = `
      INSERT INTO leads (name, company_name, phone, product, message, status, ip_address, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, 'New', $6, NOW(), NOW())
      RETURNING *;
    `;

    const values = [
      name.trim(),
      company_name ? company_name.trim() : null,
      phone.trim(),
      product.trim(),
      message ? message.trim() : '',
      clientIp
    ];

    const result = await query(insertQuery, values);
    const savedLead = result.rows[0];

    console.log(`✨ New Lead Saved! ID: ${savedLead.id}, Name: ${savedLead.name}, Product: ${savedLead.product}`);

    res.status(201).json({
      success: true,
      message: 'Inquiry received successfully and saved to Neon PostgreSQL.',
      lead: savedLead
    });
  } catch (err) {
    console.error('❌ Error saving lead to Neon database:', err);
    res.status(500).json({
      error: 'Failed to record inquiry into database',
      details: err.message
    });
  }
});

// 2. Fetch Leads (Admin Dashboard)
app.get('/api/leads', async (req, res) => {
  try {
    const { search, product, status, limit = 100 } = req.query;

    let sql = 'SELECT * FROM leads WHERE 1=1';
    const params = [];

    if (search) {
      params.push(`%${search}%`);
      sql += ` AND (name ILIKE $${params.length} OR company_name ILIKE $${params.length} OR phone ILIKE $${params.length} OR message ILIKE $${params.length})`;
    }

    if (product && product !== 'All') {
      params.push(product);
      sql += ` AND product = $${params.length}`;
    }

    if (status && status !== 'All') {
      params.push(status);
      sql += ` AND status = $${params.length}`;
    }

    sql += ' ORDER BY created_at DESC';

    if (limit) {
      params.push(parseInt(limit, 10));
      sql += ` LIMIT $${params.length}`;
    }

    const result = await query(sql, params);

    res.json({
      success: true,
      count: result.rows.length,
      leads: result.rows
    });
  } catch (err) {
    console.error('❌ Error fetching leads from Neon database:', err);
    res.status(500).json({
      error: 'Failed to retrieve leads',
      details: err.message
    });
  }
});

// 3. Update Lead Status (Admin Dashboard)
app.patch('/api/leads/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['New', 'Contacted', 'Quoted', 'Converted', 'Closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    const result = await query(
      `UPDATE leads SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.json({
      success: true,
      lead: result.rows[0]
    });
  } catch (err) {
    console.error('❌ Error updating lead status:', err);
    res.status(500).json({
      error: 'Failed to update lead status',
      details: err.message
    });
  }
});

// 4. Delete Lead (Admin Dashboard)
app.delete('/api/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM leads WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.json({ success: true, message: `Lead #${id} deleted successfully` });
  } catch (err) {
    console.error('❌ Error deleting lead:', err);
    res.status(500).json({ error: 'Failed to delete lead' });
  }
});

// 5. Admin Authentication Verification
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
    return res.json({
      success: true,
      message: 'Authentication successful',
      token,
      user: {
        email: ADMIN_EMAIL,
        name: 'Mani Polymers Administrator'
      }
    });
  } else {
    return res.status(401).json({
      success: false,
      error: 'Invalid admin email or password'
    });
  }
});

// 6. Serve static production frontend when dist folder exists (Full-stack Render deployment)
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.url.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

export default app;
