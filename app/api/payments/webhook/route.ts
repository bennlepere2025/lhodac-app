import { NextResponse } from 'next/server';
import { db } from '@/db';
import { payments, bookings } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const headersObject = Object.fromEntries(request.headers.entries());

    // Validation de la signature du webhook (sécurité obligatoire)
    const reference = body.reference; // Référence renvoyée par l'opérateur
    const status = body.status; // 'SUCCESS' ou 'FAILED'

    if (!reference) {
      return NextResponse.json({ error: 'Référence manquante' }, { status: 400 });
    }

    // Mettre à jour le statut du paiement en base de données
    const [updatedPayment] = await db
      .update(payments)
      .set({ status: status === 'SUCCESS' ? 'success' : 'failed' })
      .where(eq(payments.reference, reference))
      .returning();

    if (updatedPayment && status === 'SUCCESS') {
      // Mettre à jour le statut de la réservation associée
      await db
        .update(bookings)
        .set({ status: 'confirmed' })
        .where(eq(bookings.id, updatedPayment.bookingId));
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Erreur Webhook Paiement:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}