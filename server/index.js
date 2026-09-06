import app from './app.js';
import { initDatabase } from './init-db.js';

const PORT = process.env.PORT || 5000;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'maniadmin@mani.com';

async function startServer() {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`
=====================================================
🏭 Mani Polymers Production Server Running
🚀 Local API: http://localhost:${PORT}
💾 Neon DB: Connected to Serverless PostgreSQL
🔑 Admin Credentials: ${ADMIN_EMAIL}
=====================================================
      `);
    });
  } catch (err) {
    console.error('Failed to initialize database and start server:', err);
    process.exit(1);
  }
}

startServer();
