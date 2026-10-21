'use server';

import { db } from '@/db';
import { bookings, bookingItems, properties, roomTypes } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function getPartnerBookings(partnerId: number) {
  try {
    // Récupérer les propriétés du partenaire
    const partnerProperties = await db.select().from(properties).where(eq(properties.partnerId, partnerId));
    
    if (partnerProperties.length === 0) {
      return { success: true, data: [] };
    }

    const propertyIds = partnerProperties.map(p => p.id);

    // Récupérer les éléments de réservation liés aux propriétés du partenaire
    const items = await db.select().from(bookingItems);
    // Filtrage simple (en production, une jointure SQL directe est préférable)
    const filteredItems = items.filter(item => propertyIds.includes(item.itemId));

    return { success: true, data: filteredItems };
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations partenaires :', error);
    return { success: false, error: 'Impossible de charger le tableau de bord partenaire.' };
  }
}

export async function updateRoomPriceAndStock(roomTypeId: number, newPrice: string, newTotalRooms: number) {
  try {
    await db
      .update(roomTypes)
      .set({ pricePerNight: newPrice, totalRooms: newTotalRooms })
      .where(eq(roomTypes.id, roomTypeId));

    return { success: true, message: 'Tarifs et stocks mis à jour avec succès.' };
  } catch (error) {
    console.error('Erreur lors de la mise à jour :', error);
    return { success: false, error: 'Échec de la mise à jour.' };
  }
}