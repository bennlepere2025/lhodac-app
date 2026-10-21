'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Building2, Calendar, MapPin, Compass } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'vols' | 'hotels' | 'routes' | 'circuits'>('hotels');
  
  // États pour les filtres de recherche d'hôtels
  const [city, setCity] = useState('Brazzaville');
  const [checkIn, setCheckIn] = useState('2026-10-11');
  const [checkOut, setCheckOut] = useState('2026-10-15');
  const [rooms, setRooms] = useState('1');

  const handleHotelSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirection vers la page de recherche unifiée avec les paramètres
    router.push(`/search?type=hotels&city=${encodeURIComponent(city)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation supérieure */}
      <header className="bg-white border-b border-gray-100 py-4 px-6 sm:px-12 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-900 text-white p-2 rounded-xl font-extrabold text-lg">LH</div>
          <div>
            <h1 className="text-lg font-extrabold text-blue-900 leading-tight">LHODAC</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Voyages & Logistique</p>
          </div>
        </div>
        <div className="flex items-center space-x-6 text-sm font-semibold">
          <Link href="/" className="text-blue-900">Accueil</Link>
          <Link href="/dashboard" className="text-gray-600 hover:text-blue-900">Mes Réservations</Link>
          <Link href="/auth" className="bg-blue-50 text-blue-900 px-4 py-2 rounded-xl hover:bg-blue-900 hover:text-white transition">Connexion</Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-12 px-6 sm:px-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold">Plateforme Officielle LHODAC</h2>
        <p className="text-sm text-blue-200 mt-2 max-w-xl mx-auto">
          Vols, hôtels, transports routiers et circuits touristiques centralisés pour simplifier vos déplacements à Brazzaville, Pointe-Noire et partout ailleurs.
        </p>
      </div>

      {/* Module de recherche central */}
      <div className="max-w-4xl mx-auto w-full px-4 -mt-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
          
          {/* Onglets de services */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 bg-gray-50 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveTab('vols')}
              className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center space-x-2 ${
                activeTab === 'vols' ? 'bg-white text-blue-900 shadow' : 'text-gray-600 hover:text-blue-900'
              }`}
            >
              <span>Vols</span>
            </button>
            <button
              onClick={() => setActiveTab('hotels')}
              className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center space-x-2 ${
                activeTab === 'hotels' ? 'bg-white text-blue-900 shadow' : 'text-gray-600 hover:text-blue-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Hôtels</span>
            </button>
            <button
              onClick={() => setActiveTab('routes')}
              className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center space-x-2 ${
                activeTab === 'routes' ? 'bg-white text-blue-900 shadow' : 'text-gray-600 hover:text-blue-900'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Routes</span>
            </button>
            <button
              onClick={() => setActiveTab('circuits')}
              className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center space-x-2 ${
                activeTab === 'circuits' ? 'bg-white text-blue-900 shadow' : 'text-gray-600 hover:text-blue-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Circuits</span>
            </button>
          </div>

          {/* Formulaire Hôtels */}
          {activeTab === 'hotels' && (
            <form onSubmit={handleHotelSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 border p-3 rounded-xl bg-gray-50">
                  <Building2 className="w-5 h-5 text-blue-900 shrink-0" />
                  <div className="w-full">
                    <label className="block text-xs font-semibold text-gray-500 uppercase">Ville de destination</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-transparent text-sm focus:outline-none font-medium text-gray-800 mt-0.5"
                    >
                      <option value="Brazzaville">Brazzaville</option>
                      <option value="Pointe-Noire">Pointe-Noire</option>
                      <option value="Oyo">Oyo</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-3 border p-3 rounded-xl bg-gray-50">
                  <Calendar className="w-5 h-5 text-blue-900 shrink-0" />
                  <div className="w-full">
                    <label className="block text-xs font-semibold text-gray-500 uppercase">Date d'arrivée</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-transparent text-sm focus:outline-none font-medium text-gray-600 mt-0.5"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3 border p-3 rounded-xl bg-gray-50">
                  <Calendar className="w-5 h-5 text-blue-900 shrink-0" />
                  <div className="w-full">
                    <label className="block text-xs font-semibold text-gray-500 uppercase">Date de départ</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-transparent text-sm focus:outline-none font-medium text-gray-600 mt-0.5"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-4 rounded-xl transition flex items-center justify-center space-x-2 shadow-lg text-base"
                >
                  <Search className="w-5 h-5" />
                  <span>Voir les hôtels disponibles</span>
                </button>
              </div>
            </form>
          )}

          {/* Formulaires alternatifs pour les autres onglets */}
          {activeTab !== 'hotels' && (
            <div className="text-center py-12">
              <p className="text-sm text-gray-500">Module en cours de chargement pour cet onglet...</p>
              <button
                onClick={() => router.push(`/search?type=${activeTab}`)}
                className="mt-4 bg-blue-900 text-white text-xs px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-800 transition"
              >
                Explorer la recherche {activeTab}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}