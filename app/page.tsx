'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plane, Building2, Bus, Compass, Search, Calendar, Users, MapPin } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'vols' | 'hotels' | 'routes' | 'circuits'>('vols');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* En-tête / Hero Section avec style Expedia */}
      <div className="bg-blue-900 text-white py-12 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto text-center mb-8">
          <span className="bg-blue-800 text-blue-200 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider border border-blue-700">
            Plateforme Officielle LHODAC
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 mb-4">
            Votre voyage au Congo et au-delà
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-base">
            Vols, hôtels, transports routiers et circuits touristiques centralisés pour simplifier vos déplacements à Brazzaville, Pointe-Noire et partout ailleurs.
          </p>
        </div>

        {/* Barre de navigation des services (Onglets type Expedia) */}
        <div className="max-w-4xl mx-auto bg-white rounded-t-2xl p-2 flex justify-center space-x-2 md:space-x-4 shadow-md text-gray-700">
          <button
            onClick={() => setActiveTab('vols')}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition ${
              activeTab === 'vols' ? 'bg-blue-900 text-white shadow' : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <Plane className="w-5 h-5" />
            <span>Vols</span>
          </button>

          <button
            onClick={() => setActiveTab('hotels')}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition ${
              activeTab === 'hotels' ? 'bg-blue-900 text-white shadow' : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <Building2 className="w-5 h-5" />
            <span>Hôtels</span>
          </button>

          <button
            onClick={() => setActiveTab('routes')}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition ${
              activeTab === 'routes' ? 'bg-blue-900 text-white shadow' : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <Bus className="w-5 h-5" />
            <span>Routes</span>
          </button>

          <button
            onClick={() => setActiveTab('circuits')}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition ${
              activeTab === 'circuits' ? 'bg-blue-900 text-white shadow' : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span>Circuits</span>
          </button>
        </div>

        {/* Bloc de Recherche Dynamique (Moteur de recherche) */}
        <div className="max-w-4xl mx-auto bg-white rounded-b-2xl rounded-tr-2xl p-6 shadow-2xl text-gray-800">
          {activeTab === 'vols' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="flex items-center space-x-3 border p-3 rounded-xl bg-gray-50">
                <MapPin className="w-5 h-5 text-blue-900" />
                <div className="w-full">
                  <label className="block text-xs font-semibold text-gray-500 uppercase">Origine</label>
                  <input type="text" placeholder="Brazzaville (BZV)" className="w-full bg-transparent text-sm focus:outline-none font-medium" />
                </div>
              </div>
              <div className="flex items-center space-x-3 border p-3 rounded-xl bg-gray-50">
                <MapPin className="w-5 h-5 text-blue-900" />
                <div className="w-full">
                  <label className="block text-xs font-semibold text-gray-500 uppercase">Destination</label>
                  <input type="text" placeholder="Pointe-Noire (PNR)" className="w-full bg-transparent text-sm focus:outline-none font-medium" />
                </div>
              </div>
              <div className="flex items-center space-x-3 border p-3 rounded-xl bg-gray-50">
                <Calendar className="w-5 h-5 text-blue-900" />
                <div className="w-full">
                  <label className="block text-xs font-semibold text-gray-500 uppercase">Dates</label>
                  <input type="date" className="w-full bg-transparent text-sm focus:outline-none font-medium text-gray-600" />
                </div>
              </div>
              <Link href="/vols" className="bg-blue-900 hover:bg-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition flex items-center justify-center space-x-2 shadow-md">
                <Search className="w-5 h-5" />
                <span>Rechercher</span>
              </Link>
            </div>
          )}

          {activeTab === 'hotels' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="flex items-center space-x-3 border p-3 rounded-xl bg-gray-50 md:col-span-2">
                <Building2 className="w-5 h-5 text-blue-900" />
                <div className="w-full">
                  <label className="block text-xs font-semibold text-gray-500 uppercase">Destination ou Hôtel</label>
                  <input type="text" placeholder="Où souhaitez-vous séjourner ?" className="w-full bg-transparent text-sm focus:outline-none font-medium" />
                </div>
              </div>
              <div className="flex items-center space-x-3 border p-3 rounded-xl bg-gray-50">
                <Users className="w-5 h-5 text-blue-900" />
                <div className="w-full">
                  <label className="block text-xs font-semibold text-gray-500 uppercase">Voyageurs</label>
                  <input type="text" placeholder="1 chambre, 2 adultes" className="w-full bg-transparent text-sm focus:outline-none font-medium" />
                </div>
              </div>
              <Link href="/hotels" className="bg-blue-900 hover:bg-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition flex items-center justify-center space-x-2 shadow-md">
                <Search className="w-5 h-5" />
                <span>Rechercher</span>
              </Link>
            </div>
          )}

          {activeTab === 'routes' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="flex items-center space-x-3 border p-3 rounded-xl bg-gray-50">
                <Bus className="w-5 h-5 text-blue-900" />
                <div className="w-full">
                  <label className="block text-xs font-semibold text-gray-500 uppercase">Trajet routier</label>
                  <input type="text" placeholder="Ex: Brazzaville - Dolisie" className="w-full bg-transparent text-sm focus:outline-none font-medium" />
                </div>
              </div>
              <div className="flex items-center space-x-3 border p-3 rounded-xl bg-gray-50">
                <Calendar className="w-5 h-5 text-blue-900" />
                <div className="w-full">
                  <label className="block text-xs font-semibold text-gray-500 uppercase">Date de départ</label>
                  <input type="date" className="w-full bg-transparent text-sm focus:outline-none font-medium text-gray-600" />
                </div>
              </div>
              <Link href="/routes" className="bg-blue-900 hover:bg-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition flex items-center justify-center space-x-2 shadow-md">
                <Search className="w-5 h-5" />
                <span>Trouver un trajet</span>
              </Link>
            </div>
          )}

          {activeTab === 'circuits' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="flex items-center space-x-3 border p-3 rounded-xl bg-gray-50">
                <Compass className="w-5 h-5 text-blue-900" />
                <div className="w-full">
                  <label className="block text-xs font-semibold text-gray-500 uppercase">Circuit touristique</label>
                  <input type="text" placeholder="Ex: Découverte des rapides, excursions..." className="w-full bg-transparent text-sm focus:outline-none font-medium" />
                </div>
              </div>
              <Link href="/circuits" className="bg-blue-900 hover:bg-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition flex items-center justify-center space-x-2 shadow-md">
                <Search className="w-5 h-5" />
                <span>Explorer les circuits</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Pied de page avec lien CGV */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12 text-center text-sm text-gray-600">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} LHODAC. Tous droits réservés.</p>
          <div className="space-x-6">
            <Link href="/cgv" className="hover:text-blue-900 transition underline">
              Conditions Générales de Vente (CGV)
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}