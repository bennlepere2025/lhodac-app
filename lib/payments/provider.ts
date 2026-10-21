export interface PaymentDetails {
    reference: string;
    amount: number;
    phoneNumber: string;
    currency: string;
    idempotencyKey: string;
  }
  
  export interface PaymentResponse {
    success: boolean;
    transactionId?: string;
    status: 'pending' | 'success' | 'failed';
    rawResponse?: any;
    error?: string;
  }
  
  export interface PaymentProvider {
    initiatePayment(details: PaymentDetails): Promise<PaymentResponse>;
    verifyWebhook(headers: any, body: any): boolean;
  }