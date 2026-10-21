'use client';

import { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle2, XCircle, Users, FileText, DollarSign } from 'lucide-react';
import { getPendingPartners, updatePartnerKycStatus } from '@/actions/admin';

export default function AdminDashboardPage() {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadAdminData() {
      const res = await getPendingPartners();
      if (res.success && res.data) {
        setPartners(res.data);
      }
      setLoading(false);
    }
    loadAdminData();
  }, []);

  const handleKycAction = async (partnerId: number, status: 'verified' | 'rejected') => {
    // ID admin fictif 1 pour la démonstration
    const res = await updatePartnerKycStatus(partnerId, status, 1);
    if (res.success) {
      setMessage(res.message);
      setPartners(partners.filter(p => p.id !== partnerId));
    } else {
      setMessage(res.error || "Une erreur est survenue.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* En-tête Admin */}
        <div className="bg-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider bg-blue-800 px-3 py-1 rounded-full">
              Administration Centrale LHODAC
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-3">Supervision & Validation KYC</h1>
            <p className="text-xs text-blue-200 mt-1">Validation des partenaires, modération et suivi des transactions au Congo.</p>
          </div>
          <ShieldAlert className="w-12 h-12 text-blue-300 opacity-80 mt-4 sm:mt-0" />
        </div>

        {message && (
          <div className="mb-6 bg-blue-50 border-l-4 border-blue-900 p-4 rounded-md text-sm text-blue-900 flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-blue-900" />
            <span>{message}</span>
          </div>
        )}

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-900"><Users className="w-6 h-6" /></div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Partenaires en attente</p>
              <p className="text-xl font-extrabold text-blue-900">{partners.length}</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className="p-3 bg-green-50 rounded-xl text-green-700"><FileText className="w-6 h-6" /></div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Transactions sécurisées</p>
              <p className="text-xl font-extrabold text-gray-900">Actif</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-700"><DollarSign className="w-6 h-6" /></div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Commission plateforme</p>
              <p className="text-xl font-extrabold text-gray-900">10%</p>
            </div>
          </div>
        </div>

        {/* Liste des partenaires à valider (KYC) */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-blue-900 mb-6">Validation des dossiers partenaires (RCCM / NIU)</h2>

          {loading ? (
            <p className="text-sm text-gray-500">Chargement des dossiers...</p>
          ) : partners.length > 0 ? (
            <div className="space-y-4">
              {partners.map((partner) => (
                <div key={partner.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-bold text-blue-900 text-base">{partner.companyName}</h3>
                    <p className="text-xs text-gray-600 mt-1">Numéro RCCM / NIU : <span className="font-mono font-semibold">{partner.rccmNiu}</span></p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Soumis le : {new Date(partner.createdAt).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleKycAction(partner.id, 'verified')}
                      className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center justify-center space-x-1 shadow"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Valider</span>
                    </button>
                    <button
                      onClick={() => handleKycAction(partner.id, 'rejected')}
                      className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center justify-center space-x-1 shadow"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Rejeter</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed">
              <p className="text-sm text-gray-500">Aucun dossier partenaire en attente de validation.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}