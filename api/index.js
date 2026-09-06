import app from '../server/app.js';
import { initDatabase } from '../server/init-db.js';

let initialized = false;

export default async function handler(req, res) {
  if (!initialized) {
    try {
      await initDatabase();
      initialized = true;
    } catch (e) {
      console.warn('Vercel lazy database initialization warning:', e.message);
    }
  }
  return app(req, res);
}
