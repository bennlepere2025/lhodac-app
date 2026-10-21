import { randomUUID } from 'crypto';

type MomoPaymentRequest = {
  amount: number;
  currency: string;
  externalId: string;
  payerPhone: string;
  payerMessage?: string;
  payeeNote?: string;
};

export class MtnMomoProvider {
  private baseUrl: string;
  private subscriptionKey: string;
  private environment: string;

  constructor() {
    this.baseUrl = process.env.MTN_MOMO_BASE_URL || 'https://sandbox.momodeveloper.mtn.com';
    this.subscriptionKey = process.env.MTN_MOMO_SUBSCRIPTION_KEY || '';
    this.environment = process.env.MTN_MOMO_ENVIRONMENT || 'sandbox';
  }

  /**
   * Initialise une demande de paiement Mobile Money (Push USSD sur le téléphone du client)
   */
  async requestToPay(input: MomoPaymentRequest) {
    const referenceId = randomUUID(); // Idempotency key / Reference unique

    try {
      // Dans un environnement de production réel, l'appel HTTP vers l'API MTN MoMo Collection s'effectue ici
      // avec les en-têtes d'autorisation, X-Reference-Id et X-Target-Environment.
      console.log(`[MTN MoMo Sandbox] Initiation du paiement pour ${input.payerPhone} d'un montant de ${input.amount} ${input.currency}`);
      console.log(`[MTN MoMo Sandbox] Reference ID généré : ${referenceId}`);

      // Simulation de la réponse de l'API de l'opérateur
      return {
        success: true,
        reference: referenceId,
        status: 'PENDING',
        message: 'Demande de paiement envoyée. Veuillez valider sur votre téléphone (USSD).'
      };
    } catch (error) {
      console.error('Erreur lors de la requête MTN MoMo :', error);
      return { success: false, error: 'Échec de la communication avec l’opérateur de paiement.' };
    }
  }

  /**
   * Vérifie le statut d'une transaction en cours (Polling)
   */
  async getTransactionStatus(referenceId: string) {
    try {
      // Simulation d'interrogation du statut auprès de l'API MoMo
      return {
        success: true,
        status: 'SUCCESSFUL', // Peut être PENDING, SUCCESSFUL ou FAILED
        reference: referenceId,
      };
    } catch (error) {
      return { success: false, status: 'FAILED', error: 'Impossible de vérifier le statut.' };
    }
  }
}

export const mtnMomo = new MtnMomoProvider();