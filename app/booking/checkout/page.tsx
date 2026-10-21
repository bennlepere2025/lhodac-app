'use client';

import { useState, useEffect } from 'react';
import { Clock, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { createBooking } from '@/actions/booking';

export default function CheckoutPage() {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes en secondes
  const [acceptedCgv, setAcceptedCgv] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Compte à rebours du stock (15 min)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleConfirmBooking = async () => {
    if (!acceptedCgv) return;
    setLoading(true);

    // Exemple de données pour la démonstration (liées à l'utilisateur connecté ID 1)
    const mockItems = [
      { itemType: 'hotel', itemId: 1, details: { checkIn: '2026-11-12', nights: 2, room: 'Standard' }, price: '45000' }
    ];

    const res = await createBooking(1, mockItems, '127.0.0.1');
    if (res.success) {
      setMessage(`Succès ! Redirection vers le paiement Mobile Money... (ID: ${res.bookingId})`);
    } else {
      setMessage(res.error || 'Erreur lors du traitement.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        
        {/* En-tête avec minuteur de blocage */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6 text-amber-600 animate-pulse" />
            <div>
              <p className="text-xs font-semibold text-amber-800 uppercase">Blocage temporaire du stock</p>
              <p className="text-sm text-amber-700">Vos places sont réservées pendant :</p>
            </div>
          </div>
          <span className="text-xl font-extrabold text-amber-900 bg-white px-3 py-1 rounded-lg shadow-sm">
            {formatTime(timeLeft)}
          </span>
        </div>

        <h1 className="text-2xl font-extrabold text-blue-900 mb-6">Finaliser votre réservation</h1>

        {message && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-md text-sm text-green-700">
            {message}
          </div>
        )}

        <div className="space-y-4 mb-8">
          <div className="border-b pb-4 flex justify-between items-center text-sm">
            <span className="text-gray-600">Hôtel / Service sélectionné</span>
            <span className="font-semibold text-gray-900">Hôtel Standard (Brazzaville)</span>
          </div>
          <div className="border-b pb-4 flex justify-between items-center text-sm">
            <span className="text-gray-600">Montant total TTC</span>
            <span className="text-lg font-extrabold text-blue-900">45 000 XAF</span>
          </div>
        </div>

        {/* Case CGV obligatoire (non pré-cochée) */}
        <div className="flex items-start space-x-3 mb-8 bg-gray-50 p-4 rounded-xl border">
          <input
            type="checkbox"
            id="cgv"
            checked={acceptedCgv}
            onChange={(e) => setAcceptedCgv(e.target.checked)}
            className="mt-1 w-4 h-4 text-blue-900 border-gray-300 rounded focus:ring-blue-900"
          />
          <label htmlFor="cgv" className="text-xs text-gray-700 leading-relaxed">
            Je certifie avoir pris connaissance et j'accepte sans réserve les <a href="/cgv" target="_blank" className="text-blue-900 underline font-semibold">Conditions Générales de Vente (CGV)</a> de LHODAC ainsi que la politique d'annulation.
          </label>
        </div>

        <button
          onClick={handleConfirmBooking}
          disabled={!acceptedCgv || timeLeft === 0 || loading}
          className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl shadow-md text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 transition space-x-2 disabled:opacity-50"
        >
          <span>{loading ? 'Traitement...' : 'Procéder au paiement Mobile Money'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}