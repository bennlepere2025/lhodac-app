'use server';

import { db } from '@/db/db';
import { bookings, bookingItems, payments } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function getUserBookings(userId: number) {
  try {
    // Récupération des réservations de l'utilisateur triées par date décroissante
    const userBookings = await db
      .select()
      .from(bookings)
      .where(eq(bookings.userId, userId))
      .orderBy(desc(bookings.createdAt));

    const enrichedBookings = [];

    for (const booking of userBookings) {
      // Récupération des éléments liés (hôtels, circuits, transport)
      const items = await db
        .select()
        .from(bookingItems)
        .where(eq(bookingItems.bookingId, booking.id));

      // Récupération des informations de paiement
      const [payment] = await db
        .select()
        .from(payments)
        .where(eq(payments.bookingId, booking.id));

      enrichedBookings.push({
        ...booking,
        items,
        payment: payment || null,
      });
    }

    return { success: true, data: enrichedBookings };
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations client :', error);
    return { success: false, error: 'Impossible de charger vos réservations.', data: [] };
  }
}