'use server';

import { db } from '@/db';
import { payments, bookings } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { MtnMomoProvider } from '@/lib/payments/mtn-momo';
import crypto from 'crypto';

export async function processMobileMoneyPayment(bookingId: number, phoneNumber: string, providerName: 'mtn_momo' | 'airtel_money') {
  try {
    // 1. Récupérer la réservation associée
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, bookingId)).limit(1);
    if (!booking) {
      return { success: false, error: 'Réservation introuvable.' };
    }

    const reference = `LHODAC-PAY-${Date.now()}-${bookingId}`;
    const idempotencyKey = crypto.createHash('sha256').update(reference).digest('hex');

    // 2. Sélectionner le provider adéquat
    let provider;
    if (providerName === 'mtn_momo') {
      provider = new MtnMomoProvider();
    } else {
      return { success: false, error: 'Opérateur non pris en charge pour le moment.' };
    }

    // 3. Initialiser le paiement auprès de l'opérateur
    const paymentResult = await provider.initiatePayment({
      reference,
      amount: parseFloat(booking.totalAmount),
      phoneNumber,
      currency: 'XAF',
      idempotencyKey,
    });

    // 4. Enregistrer la tentative de paiement dans Neon DB (jamais de statut 'success' validé par le client)
    await db.insert(payments).values({
      bookingId,
      provider: providerName,
      status: paymentResult.status,
      reference,
      idempotencyKey,
      rawResponse: paymentResult.rawResponse,
    });

    return {
      success: true,
      reference,
      status: paymentResult.status,
      message: 'Demande de paiement envoyée. Veuillez valider sur votre téléphone (USSD).',
    };
  } catch (error) {
    console.error('Erreur lors du traitement du paiement:', error);
    return { success: false, error: 'Erreur technique lors du paiement Mobile Money.' };
  }
}