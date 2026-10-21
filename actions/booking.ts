'use server';

import { db } from '@/db/db';
import { bookings, bookingItems, legalDocuments } from '@/db/schema';
import { eq } from 'drizzle-orm';

type CreateBookingInput = {
  userId: number;
  items: {
    itemType: 'hotel' | 'tour' | 'transport';
    itemId: number;
    details: any;
    price: number;
  }[];
  clientIp: string;
  agreedToCGV: boolean;
};

export async function createTemporaryBooking(input: CreateBookingInput) {
  try {
    if (!input.agreedToCGV) {
      return { success: false, error: 'Vous devez accepter les Conditions Générales de Vente.' };
    }

    // Calcul du montant total
    const totalAmount = input.items.reduce((sum, item) => sum + item.price, 0);

    // Expiration dans 15 minutes (blocage de stock)
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // 1. Création de la réservation principale
    const [newBooking] = await db
      .insert(bookings)
      .values({
        userId: input.userId,
        status: 'pending',
        totalAmount: totalAmount.toString(),
        expiresAt,
      })
      .returning();

    // 2. Insertion des lignes d'éléments de réservation
    for (const item of input.items) {
      await db.insert(bookingItems).values({
        bookingId: newBooking.id,
        itemType: item.itemType,
        itemId: item.itemId,
        details: item.details,
        price: item.price.toString(),
      });
    }

    // 3. Traçabilité légale des CGV
    await db.insert(legalDocuments).values({
      userId: input.userId,
      version: '1.0',
      ipAddress: input.clientIp,
    });

    return { 
      success: true, 
      bookingId: newBooking.id, 
      expiresAt: expiresAt.toISOString(),
      totalAmount 
    };
  } catch (error) {
    console.error('Erreur lors de la création de la réservation temporaire :', error);
    return { success: false, error: 'Impossible de bloquer le stock pour le moment.' };
  }
}