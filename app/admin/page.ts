import { getAdminDashboardData } from '@/actions/admin';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  const res = await getAdminDashboardData();
  const stats = res.stats || { totalPartners: 0, pendingPartners: 0, totalBookings: 0 };
  const partnersList = res.partners || [];
  const logsList = res.auditLogs || [];

  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      {/* En-tête Admin */}
      <div className="bg-slate-900 text-white py-6 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">Administration Centrale</span>
            <h1 className="text-2xl font-bold mt-0.5">LHODAC Back-Office</h1>
          </div>
          <Link href="/" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition">
            Retour au site public
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8 space-y-8">
        {/* Cartes de Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase">Partenaires inscrits</span>
            <span className="text-3xl font-bold text-slate-900 mt-2 block">{stats.totalPartners}</span>
            <span className="text-xs text-amber-600 mt-1 block">⚠️ {stats.pendingPartners} en attente de validation KYC</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase">Réservations globales</span>
            <span className="text-3xl font-bold text-slate-900 mt-2 block">{stats.totalBookings}</span>
            <span className="text-xs text-emerald-600 mt-1 block">✔ Transit et hôtels actifs</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase">Commission standard</span>
            <span className="text-3xl font-bold text-slate-900 mt-2 block">10.00%</span>
            <span className="text-xs text-slate-500 mt-1 block">Paramétrable par partenaire</span>
          </div>
        </div>

        {/* Validation des Partenaires & KYC */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Validation KYC & Partenaires (RCCM / NIU)</h2>

          {partnersList.length === 0 ? (
            <p className="text-sm text-slate-500">Aucun partenaire enregistré pour l'instant.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-700 uppercase text-xs border-b border-slate-200">
                  <tr>
                    <th className="p-3">Entreprise</th>
                    <th className="p-3">Catégorie</th>
                    <th className="p-3">RCCM / NIU</th>
                    <th className="p-3">Statut</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {partnersList.map((partner: any) => (
                    <tr key={partner.id} className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900">{partner.companyName}</td>
                      <td className="p-3 uppercase text-xs">{partner.category}</td>
                      <td className="p-3 text-xs font-mono">
                        RCCM: {partner.rccm} <br /> NIU: {partner.niu}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold uppercase ${
                          partner.status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {partner.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded text-xs font-medium">
                          Valider
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs font-medium">
                          Suspendre
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Journaux d'audit immuables */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Journaux d'Audit & Sécurité (Audit Logs)</h2>
          {logsList.length === 0 ? (
            <p className="text-sm text-slate-500">Aucun journal d'audit enregistré.</p>
          ) : (
            <div className="space-y-2 font-mono text-xs">
              {logsList.map((log: any) => (
                <div key={log.id} className="bg-slate-50 p-3 rounded border border-slate-200 flex justify-between items-center">
                  <span className="font-semibold text-slate-800">{log.action}</span>
                  <span className="text-slate-400">{new Date(log.createdAt).toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}