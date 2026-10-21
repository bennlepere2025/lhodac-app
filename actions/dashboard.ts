'use server';

import { db } from '@/db';
import { bookings, bookingItems } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function getUserBookings(userId: number) {
  try {
    const userBookings = await db
      .select({
        id: bookings.id,
        status: bookings.status,
        totalAmount: bookings.totalAmount,
        createdAt: bookings.createdAt,
        expiresAt: bookings.expiresAt,
      })
      .from(bookings)
      .where(eq(bookings.userId, userId))
      .orderBy(desc(bookings.createdAt));

    // Pour chaque réservation, récupérer les items associés
    const detailedBookings = await Promise.all(
      userBookings.map(async (booking) => {
        const items = await db
          .select()
          .from(bookingItems)
          .where(eq(bookingItems.bookingId, booking.id));
        return { ...booking, items };
      })
    );

    return { success: true, data: detailedBookings };
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations:', error);
    return { success: false, error: 'Impossible de charger vos réservations.' };
  }
}