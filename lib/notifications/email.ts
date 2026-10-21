import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

export async function sendBookingConfirmationEmail(toEmail: string, bookingId: number, totalAmount: string) {
  try {
    await resend.emails.send({
      from: 'LHODAC <onboarding@resend.dev>',
      to: toEmail,
      subject: `Confirmation de votre réservation LHODAC #${bookingId}`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #065f46;">LHODAC - Voyage & Logistique</h2>
          <p>Bonjour,</p>
          <p>Votre réservation <strong>#${bookingId}</strong> a été enregistrée et confirmée avec succès.</p>
          <p>Montant total payé : <strong>${totalAmount} XAF</strong></p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 12px; color: #64748b;">Merci de voyager au Congo-Brazzaville avec LHODAC.</p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Erreur d’envoi d’e-mail Resend :', error);
    return { success: false, error: 'Échec de l’envoi de l’e-mail.' };
  }
}