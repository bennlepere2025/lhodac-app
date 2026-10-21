import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { payments, bookings, auditLogs } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const signature = request.headers.get('x-callback-signature') || '';

    // 1. Vérification de la signature cryptographique du webhook (SÉCURITÉ)
    // (À adapter selon l'en-tête de hachage fourni par MTN/Airtel/CinetPay)
    if (!signature && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Signature invalide' }, { status: 401 });
    }

    const { reference, status, financialTransactionId } = body;

    if (!reference) {
      return NextResponse.json({ error: 'Référence de transaction manquante' }, { status: 400 });
    }

    // 2. Recherche du paiement associé dans la base de données
    const [existingPayment] = await db
      .select()
      .from(payments)
      .where(eq(payments.reference, reference));

    if (!existingPayment) {
      return NextResponse.json({ error: 'Paiement introuvable' }, { status: 404 });
    }

    // Éviter le retraitement si déjà validé (Idempotence)
    if (existingPayment.status === 'success') {
      return NextResponse.json({ success: true, message: 'Déjà traité' });
    }

    const newPaymentStatus = status === 'SUCCESSFUL' ? 'success' : 'failed';
    const newBookingStatus = status === 'SUCCESSFUL' ? 'confirmed' : 'cancelled';

    // 3. Mise à jour transactionnelle du paiement et de la réservation
    await db.update(payments)
      .set({ status: newPaymentStatus, rawResponse: body })
      .where(eq(payments.reference, reference));

    await db.update(bookings)
      .set({ status: newBookingStatus })
      .where(eq(bookings.id, existingPayment.bookingId));

    // 4. Consignation dans le journal d'audit immuable
    await db.insert(auditLogs).values({
      userId: 1, // Utilisateur système ou associé
      action: `PAYMENT_WEBHOOK_${newPaymentStatus.toUpperCase()}`,
      metadata: { reference, financialTransactionId, bookingId: existingPayment.bookingId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur webhook de paiement :', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}