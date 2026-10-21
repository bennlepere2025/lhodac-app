import { PaymentProvider, PaymentDetails, PaymentResponse } from './provider';

export class MtnMomoProvider implements PaymentProvider {
  async initiatePayment(details: PaymentDetails): Promise<PaymentResponse> {
    try {
      // Simulation d'appel à l'API Sandbox MTN MoMo
      // En production, intégrez ici fetch() vers l'API officielle avec la clé d'idempotence
      console.log(`[MTN MoMo Sandbox] Initiation pour ${details.phoneNumber} - Montant: ${details.amount} XAF`);

      return {
        success: true,
        transactionId: `MTN-${Date.now()}`,
        status: 'pending', // En attente de la validation USSD par l'utilisateur
        rawResponse: { message: 'USSD push sent successfully' },
      };
    } catch (error) {
      console.error('Erreur MTN MoMo:', error);
      return { success: false, status: 'failed', error: 'Échec de l\'initialisation MTN MoMo' };
    }
  }

  verifyWebhook(headers: any, body: any): boolean {
    // Vérification de la signature cryptographique du webhook opérateur
    const signature = headers['x-momo-signature'];
    return Boolean(signature); // Simplifié pour l'exemple sandbox
  }
}