'use server';

import { db } from '@/db/db';
import { properties, tours, transportRoutes } from '@/db/schema';
import { eq, and, gte, lte, ilike } from 'drizzle-orm';

export type SearchParamsType = {
  type: 'hotels' | 'tours' | 'transport' | 'vols';
  city?: string;
  destination?: string;
  maxPrice?: number;
};

export async function searchUnified(params: SearchParamsType) {
  try {
   // Extrait à ajouter dans actions/search.ts pour le type 'vols'
if (params.type === 'vols') {
  // Simulation de routes aériennes régulières (ex: ECAir, Trans Air Congo, Equatorial Congo, etc.)
  const mockFlights = [
    { id: 1, title: 'Brazzaville (BZV) ➔ Pointe-Noire (PNR)', airline: 'Trans Air Congo', price: 65000, duration: '55 min' },
    { id: 2, title: 'Pointe-Noire (PNR) ➔ Brazzaville (BZV)', airline: 'Equatorial Congo', price: 65000, duration: '55 min' },
    { id: 3, title: 'Brazzaville (BZV) ➔ Oyo (OLL)', airline: 'Lhodac Air Service', price: 45000, duration: '40 min' },
  ];

  return { success: true, data: mockFlights, type: 'vols' };
} 
    if (params.type === 'hotels') {
      let conditions = [eq(properties.isActive, true)];
      
      if (params.city) {
        conditions.push(ilike(properties.city, `%${params.city}%`));
      }

      const results = await db
        .select()
        .from(properties)
        .where(and(...conditions));

      return { success: true, data: results, type: 'hotels' };
    } 
    
    if (params.type === 'tours') {
      let conditions = [eq(tours.isActive, true)];

      if (params.destination) {
        conditions.push(ilike(tours.destination, `%${params.destination}%`));
      }

      const results = await db
        .select()
        .from(tours)
        .where(and(...conditions));

      return { success: true, data: results, type: 'tours' };
    }

    if (params.type === 'transport') {
      let conditions = [];

      if (params.city) {
        conditions.push(ilike(transportRoutes.origin, `%${params.city}%`));
      }
      if (params.destination) {
        conditions.push(ilike(transportRoutes.destination, `%${params.destination}%`));
      }

      const results = await db
        .select()
        .from(transportRoutes)
        .where(conditions.length > 0 ? and(...conditions) : undefined);

      return { success: true, data: results, type: 'transport' };
    }

    return { success: true, data: [], type: params.type };
  } catch (error) {
    console.error('Erreur lors de la recherche unifiée :', error);
    return { success: false, error: 'Impossible de récupérer les résultats pour le moment.', data: [] };
  }
}