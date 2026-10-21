import { Pool } from 'pg';

// Initialisation du pool de connexion PostgreSQL pour Neon DB
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Nécessaire pour les connexions sécurisées Neon
  },
});

export const query = async (text: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
};