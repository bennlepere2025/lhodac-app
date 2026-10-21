'use client';

import { useState } from 'react';
import { formatXAF } from '@/lib/utils';

export default function BookingTunnelPage() {
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  
  // Exemple de données de panier (simulation locale pour la démo)
  const cartItem = {
    title: 'Chambre Double - Radisson Blu Muxima',
    location: 'Brazzaville',
    price: 85000,
    nights: 2,
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Barre de progression */}
      <div className="bg-emerald-800 text-white py-4 px-4 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center text-sm font-medium">
          <span className={step >= 1 ? 'text-amber-400 font-bold' : ''}>1. Voyageur</span>
          <span>➔</span>
          <span className={step >= 2 ? 'text-amber-400 font-bold' : ''}>2. Vérification</span>
          <span>➔</span>
          <span className={step >= 3 ? 'text-amber-400 font-bold' : ''}>3. Paiement MoMo</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Formulaire principal */}
        <div className="md:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Informations du Voyageur principal</h2>
              <p className="text-sm text-slate-500 mb-4">Conforme à votre pièce d'identité officielle ou passeport.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Nom complet</label>
                  <input type="text" placeholder="Ex: Neil Benn" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Numéro de téléphone (Mobile Money)</label>
                  <input type="text" placeholder="Ex: +242 06 000 0000" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">E-mail de confirmation</label>
                  <input type="email" placeholder="neil@example.com" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm" />
                </div>

                {/* Acceptation CGV non pré-cochée */}
                <div className="flex items-start gap-3 pt-2">
                  <input 
                    type="checkbox" 
                    id="cgv" 
                    checked={agreed} 
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="cgv" className="text-xs text-slate-600 leading-relaxed">
                    J'accepte les <a href="/cgv" target="_blank" className="text-emerald-700 underline font-medium">Conditions Générales de Vente</a> et la politique d'annulation de LHODAC.
                  </label>
                </div>

                <button 
                  disabled={!agreed}
                  onClick={() => setStep(2)}
                  className={`w-full mt-4 py-3 rounded-lg font-semibold text-sm transition ${
                    agreed ? 'bg-amber-500 hover:bg-amber-600 text-slate-950' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Continuer vers le récapitulatif
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Vérification de la réservation</h2>
              <p className="text-sm text-slate-600 mb-6">Stock temporairement bloqué pendant 15 minutes pour vous.</p>
              
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-6 text-sm text-amber-900">
                ⏳ Votre stock est sécurisé. Aucun frais caché : le tarif affiché ci-contre est total et définitif.
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="w-1/2 border border-slate-300 py-2.5 rounded-lg text-sm font-medium text-slate-700">
                  Retour
                </button>
                <button onClick={() => setStep(3)} className="w-1/2 bg-amber-500 hover:bg-amber-600 text-slate-950 py-2.5 rounded-lg text-sm font-semibold">
                  Procéder au Paiement MoMo
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Résumé de prix sticky */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 h-fit">
          <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">Résumé de la commande</h3>
          <div className="py-4 space-y-2">
            <p className="font-semibold text-sm text-slate-800">{cartItem.title}</p>
            <p className="text-xs text-slate-500">📍 {cartItem.location} ({cartItem.nights} nuits)</p>
          </div>
          <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
            <span className="text-sm font-semibold text-slate-600">Total TTC</span>
            <span className="text-lg font-bold text-slate-900">{formatXAF(cartItem.price * cartItem.nights)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}