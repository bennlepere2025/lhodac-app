'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Building2, Calendar, MapPin, Compass, Plane } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'vols' | 'hotels' | 'routes' | 'circuits'>('hotels');

  // États pour les filtres de recherche
  const [city, setCity] = useState('Brazzaville');
  const [destination, setDestination] = useState('Pointe-Noire');
  const [checkIn, setCheckIn] = useState('2026-10-11');
  const [checkOut, setCheckOut] = useState('2026-10-15');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'hotels') {
      router.push(`/search?type=hotels&city=${encodeURIComponent(city)}`);
    } else if (activeTab === 'vols') {
      router.push(`/search?type=vols&city=Brazzaville`);
    } else if (activeTab === 'routes') {
      router.push(`/search?type=transport&city=${encodeURIComponent(city)}&destination=${encodeURIComponent(destination)}`);
    } else if (activeTab === 'circuits') {
      router.push(`/search?type=tours&destination=Odzala`);
    }
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
          <Link href="/admin" className="text-gray-600 hover:text-blue-900">Admin</Link>
          <Link href="/partner" className="text-gray-600 hover:text-blue-900">Partenaire</Link>
        </div>
      </header>

      {/* Hero Section & Moteur de Recherche */}
      <div className="bg-blue-900 text-white py-16 px-4 sm:px-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Plateforme Officielle LHODAC</h2>
        <p className="text-blue-200 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
          Vols, hôtels, transports routiers et circuits touristiques centralisés pour simplifier vos déplacements à Brazzaville, Pointe-Noire et partout ailleurs.
        </p>

        {/* Boîte de recherche par onglets */}
        <div className="max-w-4xl mx-auto mt-8 bg-white rounded-2xl shadow-xl p-4 text-gray-800 text-left">
          {/* Onglets */}
          <div className="grid grid-cols-4 gap-2 border-b border-gray-100 pb-4 mb-4">
            <button
              onClick={() => setActiveTab('vols')}
              className={`flex items-center justify-center space-y-1 sm:space-x-2 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition ${
                activeTab === 'vols' ? 'bg-blue-900 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Plane className="w-4 h-4" />
              <span>Vols</span>
            </button>
            <button
              onClick={() => setActiveTab('hotels')}
              className={`flex items-center justify-center space-y-1 sm:space-x-2 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition ${
                activeTab === 'hotels' ? 'bg-blue-900 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Hôtels</span>
            </button>
            <button
              onClick={() => setActiveTab('routes')}
              className={`flex items-center justify-center space-y-1 sm:space-x-2 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition ${
                activeTab === 'routes' ? 'bg-blue-900 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Routes</span>
            </button>
            <button
              onClick={() => setActiveTab('circuits')}
              className={`flex items-center justify-center space-y-1 sm:space-x-2 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition ${
                activeTab === 'circuits' ? 'bg-blue-900 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Circuits</span>
            </button>
          </div>

          {/* Formulaire Hôtels */}
          {activeTab === 'hotels' && (
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border p-3 rounded-xl bg-gray-50">
                  <label className="block text-xs font-semibold text-gray-500 uppercase">Ville</label>
                  <select 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-transparent text-sm focus:outline-none font-medium text-gray-800 mt-0.5"
                  >
                    <option value="Brazzaville">Brazzaville</option>
                    <option value="Pointe-Noire">Pointe-Noire</option>
                    <option value="Dolisie">Dolisie</option>
                  </select>
                </div>
                <div className="border p-3 rounded-xl bg-gray-50">
                  <label className="block text-xs font-semibold text-gray-500 uppercase">Arrivée</label>
                  <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full bg-transparent text-sm focus:outline-none font-medium text-gray-600 mt-0.5" />
                </div>
                <div className="border p-3 rounded-xl bg-gray-50">
                  <label className="block text-xs font-semibold text-gray-500 uppercase">Départ</label>
                  <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full bg-transparent text-sm focus:outline-none font-medium text-gray-600 mt-0.5" />
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3.5 rounded-xl transition shadow-md text-sm">
                Rechercher les hôtels disponibles
              </button>
            </form>
          )}

          {/* Formulaire Vols */}
          {activeTab === 'vols' && (
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border p-3 rounded-xl bg-gray-50">
                  <label className="block text-xs font-semibold text-gray-500 uppercase">Liaison Aérienne</label>
                  <select className="w-full bg-transparent text-sm focus:outline-none font-medium text-gray-800 mt-0.5">
                    <option value="BZV-PNR">Brazzaville (BZV) ➔ Pointe-Noire (PNR)</option>
                    <option value="PNR-BZV">Pointe-Noire (PNR) ➔ Brazzaville (BZV)</option>
                    <option value="BZV-OLL">Brazzaville (BZV) ➔ Oyo (OLL)</option>
                  </select>
                </div>
                <div className="border p-3 rounded-xl bg-gray-50">
                  <label className="block text-xs font-semibold text-gray-500 uppercase">Date de vol</label>
                  <input type="date" className="w-full bg-transparent text-sm focus:outline-none font-medium text-gray-600 mt-0.5" />
                </div>
                <div className="border p-3 rounded-xl bg-gray-50">
                  <label className="block text-xs font-semibold text-gray-500 uppercase">Passagers</label>
                  <select className="w-full bg-transparent text-sm focus:outline-none font-medium text-gray-800 mt-0.5">
                    <option value="1">1 Adulte</option>
                    <option value="2">2 Adultes</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3.5 rounded-xl transition shadow-md text-sm">
                Rechercher les vols disponibles
              </button>
            </form>
          )}

          {/* Formulaire Routes */}
          {activeTab === 'routes' && (
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border p-3 rounded-xl bg-gray-50">
                  <label className="block text-xs font-semibold text-gray-500 uppercase">Départ</label>
                  <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-transparent text-sm focus:outline-none font-medium text-gray-800 mt-0.5">
                    <option value="Brazzaville">Brazzaville</option>
                    <option value="Pointe-Noire">Pointe-Noire</option>
                  </select>
                </div>
                <div className="border p-3 rounded-xl bg-gray-50">
                  <label className="block text-xs font-semibold text-gray-500 uppercase">Arrivée</label>
                  <select value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full bg-transparent text-sm focus:outline-none font-medium text-gray-800 mt-0.5">
                    <option value="Pointe-Noire">Pointe-Noire</option>
                    <option value="Brazzaville">Brazzaville</option>
                  </select>
                </div>
                <div className="border p-3 rounded-xl bg-gray-50">
                  <label className="block text-xs font-semibold text-gray-500 uppercase">Date</label>
                  <input type="date" className="w-full bg-transparent text-sm focus:outline-none font-medium text-gray-600 mt-0.5" />
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3.5 rounded-xl transition shadow-md text-sm">
                Rechercher les routes (Bus/Train)
              </button>
            </form>
          )}

          {/* Formulaire Circuits */}
          {activeTab === 'circuits' && (
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border p-3 rounded-xl bg-gray-50">
                  <label className="block text-xs font-semibold text-gray-500 uppercase">Destination touristique</label>
                  <select className="w-full bg-transparent text-sm focus:outline-none font-medium text-gray-800 mt-0.5">
                    <option value="Odzala">Parc national d'Odzala-Kokoua</option>
                    <option value="Conkouati">Conkouati-Douli</option>
                    <option value="Brazzaville">Excursion urbaine Brazzaville</option>
                  </select>
                </div>
                <div className="border p-3 rounded-xl bg-gray-50">
                  <label className="block text-xs font-semibold text-gray-500 uppercase">Période</label>
                  <input type="date" className="w-full bg-transparent text-sm focus:outline-none font-medium text-gray-600 mt-0.5" />
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3.5 rounded-xl transition shadow-md text-sm">
                Explorer les circuits touristiques
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer minimaliste */}
      <footer className="mt-auto py-6 text-center text-xs text-gray-500 border-t border-gray-200">
        LHODAC - Plateforme de Réservation Sécurisée au Congo-Brazzaville • Paiement Mobile Money • 2026
      </footer>
    </div>
  );
}