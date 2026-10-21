import { neon } from '@neon-database/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Vérification de l'URL de base de données
const connectionString = process.env.DATABASE_URL="postgresql://neondb_owner:npg_GS6XgAh1oJNv@ep-crimson-brook-b9tho11c-pooler.c-7.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in environment variables.');
}

// Initialisation du client HTTP Neon
const sql = neon(connectionString);

// Export de l'instance Drizzle typée avec notre schéma complet
export const db = drizzle(sql, { schema });