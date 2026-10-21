'use client';

import { useState, useEffect } from 'react';
import { Building2, Calendar, DollarSign, Package, CheckCircle2, ArrowRight } from 'lucide-react';
import { getPartnerBookings, updateRoomPriceAndStock } from '@/actions/partner';

export default function PartnerDashboardPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');

  // États pour la mise à jour rapide du stock / prix (Exemple pour la chambre ID 1)
  const [price, setPrice] = useState('45000');
  const [rooms, setRooms] = useState('10');

  useEffect(() => {
    async function loadPartnerData() {
      // Pour l'exemple, partenaire ID 1
      const res = await getPartnerBookings(1);
      if (res.success && res.data) {
        setBookings(res.data);
      }
      setLoading(false);
    }
    loadPartnerData();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    const res = await updateRoomPriceAndStock(1, price, parseInt(rooms));
    if (res.success) {
      setSuccessMsg(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* En-tête Partenaire */}
        <div className="bg-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider bg-blue-800 px-3 py-1 rounded-full">
                Back-Office Partenaire
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold mt-3">Hôtel Le Djoué (Brazzaville)</h1>
              <p className="text-xs text-blue-200 mt-1">Gérez vos disponibilités et suivez vos réservations en temps réel.</p>
            </div>
            <Building2 className="w-12 h-12 text-blue-300 opacity-80" />
          </div>
        </div>

        {successMsg && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-md text-sm text-green-700 flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Bloc de gestion rapide des tarifs et stocks */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-blue-900 mb-4 flex items-center space-x-2">
              <Package className="w-5 h-5 text-blue-900" />
              <span>Mise à jour Stock & Tarifs</span>
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase">Prix par nuit (XAF)</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-blue-900 focus:border-blue-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase">Chambres disponibles</label>
                <input
                  type="number"
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-blue-900 focus:border-blue-900"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition text-sm shadow"
              >
                Mettre à jour l'offre
              </button>
            </form>
          </div>

          {/* Résumé des performances */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-blue-900 mb-4 flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-blue-900" />
                <span>Revenus & Commissions</span>
              </h2>
              <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Réservations reçues :</span>
                  <span className="font-bold text-gray-900">{bookings.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Commission plateforme :</span>
                  <span className="font-bold text-blue-900">10%</span>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-gray-400 mt-4">
              Les versements sont effectués automatiquement chaque fin de semaine via Mobile Money.
            </p>
          </div>

        </div>

        {/* Liste des réservations reçues */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-blue-900 mb-4">Réservations récentes reçues</h2>
          {loading ? (
            <p className="text-sm text-gray-500">Chargement...</p>
          ) : bookings.length > 0 ? (
            <div className="space-y-3">
              {bookings.map((item, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-blue-900">Commande ID #{item.bookingId}</p>
                    <p className="text-gray-500 mt-0.5">Type : {item.itemType} | Prix : {item.price} XAF</p>
                  </div>
                  <span className="bg-green-100 text-green-700 font-semibold px-2.5 py-1 rounded-lg">
                    Confirmé
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500">Aucune réservation reçue pour le moment.</p>
          )}
        </div>

      </div>
    </div>
  );
}