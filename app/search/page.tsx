import { searchUnified } from '@/actions/search';
import { formatXAF } from '@/lib/utils';
import Link from 'next/link';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { type?: string; city?: string; destination?: string };
}) {
  const type = (searchParams.type as 'hotels' | 'tours' | 'transport' | 'vols') || 'hotels';
  const city = searchParams.city || 'Brazzaville';
  const destination = searchParams.destination || '';

  const response = await searchUnified({ type, city, destination });
  const items = response.data || [];

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* En-tête de recherche */}
      <div className="bg-emerald-800 text-white py-8 px-4 shadow-md">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Résultats de recherche</h1>
          <p className="text-emerald-100 text-sm mt-1">
            Recherche par catégorie : <span className="uppercase font-semibold">{type}</span> | Lieu : <span className="font-semibold">{city || destination}</span>
          </p>
        </div>
      </div>

      {/* Liste des résultats */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        {items.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-slate-100">
            <p className="text-slate-600">Aucun résultat trouvé pour cette sélection au Congo-Brazzaville.</p>
            <Link href="/" className="mt-4 inline-block bg-emerald-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition">
              Modifier ma recherche
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item: any) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="bg-slate-200 h-44 w-full relative flex items-center justify-center text-slate-400 font-medium">
                    {/* Placeholder image ou image réelle */}
                    <span>{item.name || item.title || 'LHODAC Partner'}</span>
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                      {type}
                    </span>
                    <h3 className="font-bold text-lg text-slate-900 mt-2">{item.name || item.title}</h3>
                    <p className="text-slate-500 text-sm mt-1">
                      {item.city ? `📍 ${item.city}` : ''} {item.destination ? `🎯 ${item.destination}` : ''} {item.origin ? `🚀 ${item.origin} ➔ ${item.destination}` : ''}
                    </p>
                  </div>
                </div>

                <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
                  <div>
                    <span className="text-xs text-slate-500 block">À partir de</span>
                    <span className="font-bold text-slate-900 text-lg">
                      {formatXAF(item.basePrice || item.price || 15000)}
                    </span>
                  </div>
                  <button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold px-4 py-2 rounded-lg text-sm transition">
                    Réserver
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}