import { getUserBookings } from '@/actions/dashboard';
import { formatXAF } from '@/lib/utils';
import Link from 'next/link';

export default async function DashboardPage() {
  // Utilisateur simulé pour la démo (ID: 1)
  const userId = 1;
  const response = await getUserBookings(userId);
  const bookingsList = response.data || [];

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* En-tête du tableau de bord */}
      <div className="bg-emerald-800 text-white py-8 px-4 shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Mon Espace Voyageur</h1>
          <p className="text-emerald-100 text-sm mt-1">Gérez vos réservations, téléchargez vos factures et accédez à vos e-billets.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Mes Réservations & Vouchers</h2>

        {bookingsList.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-slate-200">
            <p className="text-slate-600 text-sm">Vous n'avez pas encore de réservation active.</p>
            <Link href="/" className="mt-4 inline-block bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-2.5 rounded-lg text-sm font-semibold transition">
              Explorer les offres au Congo
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookingsList.map((booking: any) => (
              <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">RÉSERVATION #{booking.id}</span>
                  <span className={`px-2.5 py-1 rounded-full font-medium uppercase tracking-wider ${
                    booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                    booking.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {booking.status === 'confirmed' ? 'Confirmé / Payé' : booking.status}
                  </span>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2 space-y-3">
                    {booking.items.map((item: any, idx: number) => (
                      <div key={idx}>
                        <h3 className="font-bold text-slate-900 text-base">
                          {item.itemType === 'hotel' ? '🏨 Hôtel / Hébergement' : 
                           item.itemType === 'tour' ? '🎯 Circuit Touristique' : '🚌 Transport Routier'}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Montant unitaire : <span className="font-semibold text-slate-700">{formatXAF(item.price)}</span>
                        </p>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-sm">
                      <span className="font-semibold text-slate-600">Total payé (TTC)</span>
                      <span className="font-bold text-slate-900 text-base">{formatXAF(booking.totalAmount)}</span>
                    </div>
                  </div>

                  {/* Section QR Code & Actions */}
                  <div className="flex flex-col items-center justify-center bg-slate-50 p-4 rounded-lg border border-slate-100 text-center">
                    <div className="bg-white p-2 rounded shadow-inner border border-slate-200 mb-2">
                      {/* Représentation visuelle du QR code du voucher */}
                      <div className="w-20 h-20 bg-slate-900 flex items-center justify-center text-white text-[10px] font-mono tracking-tighter">
                        QR: LHODAC-{booking.id}
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-500 mb-3">À présenter au partenaire</span>
                    <button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg text-xs font-medium transition">
                      Télécharger la facture PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}