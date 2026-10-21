'use server';

import { db } from '@/db';
import { bookings, bookingItems, legalDocuments } from '@/db/schema';

export async function createBooking(userId: number, items: { itemType: string; itemId: number; details: any; price: string }[], ipAddress: string) {
  try {
    // Calcul du montant total
    const totalAmount = items.reduce((sum, item) => sum + parseFloat(item.price), 0);

    // Définition de l'expiration du stock à 15 minutes
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // 1. Insertion de la réservation globale
    const [newBooking] = await db.insert(bookings).values({
      userId,
      status: 'pending',
      totalAmount: totalAmount.toString(),
      expiresAt,
    }).returning({ id: bookings.id });

    // 2. Insertion des éléments associés
    for (const item of items) {
      await db.insert(bookingItems).values({
        bookingId: newBooking.id,
        itemType: item.itemType,
        itemId: item.itemId,
        details: item.details,
        price: item.price,
      });
    }

    // 3. Traçabilité de l'acceptation des CGV
    await db.insert(legalDocuments).values({
      userId,
      version: '1.0',
      ipAddress,
    });

    return { success: true, bookingId: newBooking.id, message: 'Réservation enregistrée. Stock bloqué pour 15 minutes.' };
  } catch (error) {
    console.error('Erreur lors de la création de la réservation :', error);
    return { success: false, error: 'Impossible de finaliser la réservation pour le moment.' };
  }
}