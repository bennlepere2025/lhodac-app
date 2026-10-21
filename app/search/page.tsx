'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, MapPin, Tag, ArrowRight } from 'lucide-react';
import { searchUnified } from '@/actions/search';

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const initialType = (searchParams.get('type') as 'hotels' | 'circuits' | 'routes') || 'hotels';
  const initialCity = searchParams.get('city') || '';

  const [activeTab, setActiveTab] = useState<'hotels' | 'circuits' | 'routes'>(initialType);
  const [cityFilter, setCityFilter] = useState(initialCity);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    const res = await searchUnified(activeTab, { city: cityFilter });
    if (res.success) {
      setResults(res.data || []);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-6 text-center">
          Résultats de recherche LHODAC
        </h1>

        {/* Onglets de filtrage */}
        <div className="flex justify-center space-x-2 mb-6">
          {(['hotels', 'circuits', 'routes'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setResults([]); }}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition ${
                activeTab === tab ? 'bg-blue-900 text-white shadow' : 'bg-white text-gray-700 border hover:bg-gray-100'
              }`}
            >
              {tab === 'hotels' ? 'Hôtels' : tab === 'circuits' ? 'Circuits' : 'Transport Routier'}
            </button>
          ))}
        </div>

        {/* Barre de filtre rapide */}
        <form onSubmit={handleSearch} className="bg-white p-4 rounded-2xl shadow-md flex gap-4 items-center mb-8">
          <div className="flex items-center space-x-3 border p-3 rounded-xl bg-gray-50 flex-1">
            <MapPin className="w-5 h-5 text-blue-900" />
            <input
              type="text"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              placeholder="Filtrer par ville (ex: Brazzaville, Pointe-Noire)..."
              className="w-full bg-transparent text-sm focus:outline-none font-medium"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition flex items-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Chercher</span>
          </button>
        </form>

        {/* Affichage des résultats */}
        {loading ? (
          <p className="text-center text-gray-500 py-12">Chargement des offres en cours...</p>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {results.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <h3 className="text-lg font-bold text-blue-900">{item.name || item.title || `${item.origin} ➔ ${item.destination}`}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.address || item.location || item.vehicleInfo}</p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                  {item.price && (
                    <span className="text-lg font-extrabold text-gray-900">{item.price} XAF</span>
                  )}
                  <button className="bg-blue-50 text-blue-900 hover:bg-blue-900 hover:text-white px-4 py-2 rounded-xl text-sm font-semibold transition flex items-center space-x-1">
                    <span>Réserver</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Aucun résultat trouvé pour cette recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
}