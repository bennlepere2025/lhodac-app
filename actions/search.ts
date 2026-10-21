'use server';

import { db } from '@/db';
import { properties, tours, transportRoutes } from '@/db/schema';
import { eq, ilike, and, lte } from 'drizzle-orm';

export async function searchUnified(type: 'hotels' | 'circuits' | 'routes', queryParams: { city?: string; maxPrice?: number }) {
  try {
    if (type === 'hotels') {
      let conditions = [];
      if (queryParams.city) {
        conditions.push(ilike(properties.city, `%${queryParams.city}%`));
      }
      const results = await db.select().from(properties).where(conditions.length > 0 ? and(...conditions) : undefined);
      return { success: true, data: results };
    }

    if (type === 'circuits') {
      let conditions = [];
      if (queryParams.city) {
        conditions.push(ilike(tours.location, `%${queryParams.city}%`));
      }
      if (queryParams.maxPrice) {
        conditions.push(lte(tours.price, queryParams.maxPrice.toString()));
      }
      const results = await db.select().from(tours).where(conditions.length > 0 ? and(...conditions) : undefined);
      return { success: true, data: results };
    }

    if (type === 'routes') {
      let conditions = [];
      if (queryParams.city) {
        conditions.push(ilike(transportRoutes.destination, `%${queryParams.city}%`));
      }
      const results = await db.select().from(transportRoutes).where(conditions.length > 0 ? and(...conditions) : undefined);
      return { success: true, data: results };
    }

    return { success: true, data: [] };
  } catch (error) {
    console.error('Erreur lors de la recherche unifiée :', error);
    return { success: false, error: 'Impossible de récupérer les résultats pour le moment.' };
  }
}