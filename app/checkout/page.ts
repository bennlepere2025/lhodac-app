'use client';

import { useState } from 'react';
import { formatXAF } from '@/lib/utils';

export default function CheckoutPage() {
  const [phone, setPhone] = useState('');
  const [provider, setProvider] = useState<'mtn_momo' | 'airtel_money'>('mtn_momo');
  const [loading, setLoading] = useState(false);
  const [pendingPayment, setPendingPayment] = useState(false);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulation de l'appel d'initiation du paiement Mobile Money
    setTimeout(() => {
      setLoading(false);
      setPendingPayment(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h1 className="text-xl font-bold text-slate-900 mb-2">Paiement Mobile Money</h1>
        <p className="text-xs text-slate-500 mb-6">Sécurisé et instantané au Congo-Brazzaville.</p>

        {!pendingPayment ? (
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Opérateur</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setProvider('mtn_momo')}
                  className={`py-2.5 px-4 rounded-lg text-sm font-semibold border ${
                    provider === 'mtn_momo' ? 'border-yellow-500 bg-yellow-50 text-yellow-900' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  MTN MoMo
                </button>
                <button
                  type="button"
                  onClick={() => setProvider('airtel_money')}
                  className={`py-2.5 px-4 rounded-lg text-sm font-semibold border ${
                    provider === 'airtel_money' ? 'border-red-500 bg-red-50 text-red-900' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  Airtel Money
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Numéro de téléphone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ex: 06 500 0000"
                required
                className="w-full border border-slate-300 rounded-lg p-2.5 text-sm"
              />
              <p className="text-[11px] text-slate-400 mt-1">Entrez votre numéro sans l'indicatif pays (+242).</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex justify-between items-center my-4">
              <span className="text-sm font-medium text-slate-600">Montant à régler</span>
              <span className="text-lg font-bold text-slate-900">{formatXAF(85000)}</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg text-sm transition"
            >
              {loading ? 'Connexion à l’opérateur...' : 'Payer maintenant'}
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <h3 className="font-bold text-slate-900">Validation USSD en cours</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Une demande de paiement a été envoyée sur le numéro <span className="font-semibold">{phone}</span>. 
              Veuillez saisir votre code PIN Mobile Money sur votre téléphone pour confirmer la transaction.
            </p>
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs text-amber-800">
              ⏳ Ne fermez pas cette page. La validation est en attente du retour de l'opérateur.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}