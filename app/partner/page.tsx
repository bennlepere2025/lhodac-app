import { getPartnerDashboard } from '@/actions/partner';
import { formatXAF } from '@/lib/utils';
import Link from 'next/link';

export default async function PartnerDashboardPage() {
  // ID partenaire simulé pour la démo
  const partnerId = 1;
  const res = await getPartnerDashboard(partnerId);

  const partner = res.partner || { companyName: 'Hôtel Muxima Brazzaville', category: 'hotel', status: 'verified' };
  const propertiesList = res.properties || [];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* En-tête mobile partenaire */}
      <div className="bg-slate-900 text-white py-6 px-4 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">Espace Partenaire</span>
            <h1 className="text-xl font-bold mt-0.5">{partner.companyName}</h1>
          </div>
          <span className="bg-emerald-600 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase">
            {partner.status}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
        {/* Actions Rapides / Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 block">Réservations du jour</span>
            <span className="text-2xl font-bold text-slate-900 mt-1 block">3</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 block">Chiffre d'affaires (Mois)</span>
            <span className="text-lg font-bold text-emerald-600 mt-1 block">{formatXAF(450000)}</span>
          </div>
        </div>

        {/* Gestion des Établissements & Stocks */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-slate-900 text-base">Mes Établissements & Stocks</h2>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition min-h-[44px] flex items-center">
              + Ajouter une offre
            </button>
          </div>

          {propertiesList.length === 0 ? (
            <div className="p-6 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
              <p className="text-xs text-slate-500">Aucun établissement enregistré pour le moment.</p>
              <p className="text-[11px] text-slate-400 mt-1">Configurez votre premier hôtel ou service de transport pour commencer à recevoir des clients.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {propertiesList.map((prop: any) => (
                <div key={prop.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{prop.name}</h3>
                    <p className="text-xs text-slate-500">📍 {prop.city} — {prop.stars} étoiles</p>
                  </div>
                  <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded">
                    Actif
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Support & Assistance Rapide */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
          <div className="text-xs text-amber-900">
            <p className="font-semibold">Besoin d'aide avec vos versements Mobile Money ?</p>
            <p className="mt-0.5">Contactez le support technique LHODAC par WhatsApp.</p>
          </div>
          <a 
            href="https://wa.me/242000000000" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-xs font-semibold transition shrink-0 min-h-[44px] flex items-center"
          >
            WhatsApp Support
          </a>
        </div>
      </div>
    </div>
  );
}