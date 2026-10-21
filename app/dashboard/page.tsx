'use client';

import { useState, useEffect } from 'react';
import { Calendar, ShieldCheck, QrCode, ArrowRight, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { getUserBookings } from '@/actions/dashboard';

export default function ClientDashboardPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  useEffect(() => {
    async function loadData() {
      // Pour l'exemple, on utilise l'utilisateur ID 1 (à lier à la session active Better Auth / JWT)
      const res = await getUserBookings(1);
      if (res.success && res.data) {
        setBookings(res.data);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-900">Mon Espace Client</h1>
            <p className="text-sm text-gray-600 mt-1">Consultez vos réservations et accédez à vos vouchers de voyage.</p>
          </div>
          <a href="/" className="text-xs text-blue-900 font-semibold underline hover:text-blue-800">
            ← Retour à l'accueil
          </a>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-12">Chargement de vos réservations...</p>
        ) : bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-900 px-2.5 py-1 rounded-lg">
                      Réservation #{booking.id}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center space-x-1 ${
                      booking.status === 'confirmed' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {booking.status === 'confirmed' ? <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> : <Clock className="w-3.5 h-3.5 mr-1" />}
                      {booking.status === 'confirmed' ? 'Confirmé' : 'En attente de paiement'}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    Montant total : <span className="text-blue-900 font-extrabold">{booking.totalAmount} XAF</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Créé le : {new Date(booking.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>

                <div className="mt-4 sm:mt-0">
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition flex items-center space-x-2 shadow"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Voir le Voucher & QR</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Vous n'avez aucune réservation pour le moment.</p>
          </div>
        )}

        {/* Modal du Voucher QR Code */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
              <button
                onClick={() => setSelectedBooking(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full"
              >
                ✕
              </button>

              <div className="text-center">
                <h3 className="text-xl font-extrabold text-blue-900">Voucher Officiel LHODAC</h3>
                <p className="text-xs text-gray-500 mt-1">Référence de commande #{selectedBooking.id}</p>

                {/* Simulation d'un QR Code sécurisé */}
                <div className="my-6 p-4 bg-gray-50 border-2 border-dashed border-blue-200 rounded-2xl inline-block">
                  <div className="w-36 h-36 bg-blue-900 mx-auto rounded-xl flex items-center justify-center text-white">
                    <QrCode className="w-24 h-24" />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2 font-mono">ID: LHODAC-SECURE-QRLINK-{selectedBooking.id}</p>
                </div>

                <div className="text-left bg-gray-50 p-4 rounded-xl text-xs space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Statut :</span>
                    <span className="font-bold uppercase text-blue-900">{selectedBooking.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Montant payé :</span>
                    <span className="font-bold text-gray-900">{selectedBooking.totalAmount} XAF</span>
                  </div>
                </div>

                <button
                  onClick={() => window.print()}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition text-sm shadow"
                >
                  Imprimer / Télécharger le Voucher
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}