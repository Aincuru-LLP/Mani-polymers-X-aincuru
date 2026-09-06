import { pool } from './db.js';

export async function initDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      company_name VARCHAR(200),
      phone VARCHAR(30) NOT NULL,
      product VARCHAR(100) NOT NULL,
      message TEXT,
      status VARCHAR(50) DEFAULT 'New',
      source VARCHAR(50) DEFAULT 'Landing Page Web Form',
      ip_address VARCHAR(60),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads (phone);
    CREATE INDEX IF NOT EXISTS idx_leads_product ON leads (product);
  `;

  try {
    const client = await pool.connect();
    console.log('🔗 Connected successfully to Neon PostgreSQL database.');
    await client.query(createTableQuery);
    console.log('✅ Database schema verified: "leads" table and indexes are ready.');
    client.release();
    return true;
  } catch (err) {
    console.error('❌ Error initializing Neon PostgreSQL database:', err.message);
    throw err;
  }
}

// Allow direct execution: node server/init-db.js
if (process.argv[1] && process.argv[1].endsWith('init-db.js')) {
  initDatabase()
    .then(() => {
      console.log('🚀 Database initialization complete.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Failed to initialize database:', err);
      process.exit(1);
    });
}
