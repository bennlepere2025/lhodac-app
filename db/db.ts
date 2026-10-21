import { neon } from '@neon-database/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Vérification de l'URL de base de données
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in environment variables.');
}

// Initialisation du client HTTP Neon
const sql = neon(connectionString);

// Export de l'instance Drizzle typée avec notre schéma complet
export const db = drizzle(sql, { schema });