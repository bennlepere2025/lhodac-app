'use client';

import { useState } from 'react';
import { Bus, CheckCircle2, CreditCard, ArrowRight, ArrowLeft } from 'lucide-react';

// Base de données simulée des compagnies et trajets
const TRANSPORTEURS_DATA = [
  { id: 't1', name: 'Océan du Nord', route: 'Brazzaville ➔ Pointe-Noire', price: '15 000 XAF', description: 'Bus climatisé grand confort', dest: 'Pointe-Noire' },
  { id: 't2', name: 'Milo Express', route: 'Brazzaville ➔ Dolisie', price: '10 000 XAF', description: 'Navette rapide quotidienne', dest: 'Dolisie' },
  { id: 't3', name: 'SOGTRA', route: 'Brazzaville ➔ Oyo / Owando', price: '12 000 XAF', description: 'Transport régulier interurbain', dest: 'Oyo' },
];

export default function RoutesPage() {
  const [step, setStep] = useState(1); // 1: Recherche, 2: Choix Transporteur, 3: Passager, 4: CGV, 5: Paiement

  // Form states (Étape 1)
  const [destination, setDestination] = useState('Pointe-Noire');
  const [travelDate, setTravelDate] = useState('2026-11-12');
  const [selectedCarrier, setSelectedCarrier] = useState<any>(null);

  // Form states (Étape 3)
  const [passager, setPassager] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    lieuNaissance: '',
    numeroPasseport: '',
    dateExpirationPasseport: '',
    telephone: '',
    email: '',
  });

  const [cgvAccepted, setCgvAccepted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('MTN Mobile Money');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2); // Passage à la liste des transporteurs
  };

  const handleCarrierSelect = (carrier: any) => {
    setSelectedCarrier(carrier);
    setStep(3); // Passage aux informations du passager
  };

  const handlePassengerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passager.nom || !passager.prenom || !passager.email || !passager.telephone) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setStep(4); // Passage au récapitulatif et CGV
  };

  const handleReviewConfirm = () => {
    if (!cgvAccepted) {
      alert('Veuillez accepter les Conditions Générales de Vente (CGV).');
      return;
    }
    setStep(5); // Passage au paiement
  };

  const handleFinalPayment = async () => {
    setLoading(true);
    try {
      const detailsObj = {
        origin: 'Brazzaville',
        destination,
        travelDate,
        carrierName: selectedCarrier.name,
        price: selectedCarrier.price,
        paymentMethod,
      };

      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: 'road',
          ...passager,
          details: detailsObj,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSuccess(true);
      } else {
        alert('Erreur : ' + result.error);
      }
    } catch (err) {
      console.error(err);
      alert('Erreur serveur.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto p-6 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Réservation de Transport Routier confirmée !</h2>
          <p className="text-gray-600 mb-6">
            Votre trajet avec <span className="font-semibold">{selectedCarrier?.name}</span> a été validé avec succès.
          </p>
          <a href="/reservations" className="inline-block bg-emerald-800 text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-emerald-700 transition">
            Voir mes réservations
          </a>
        </div>
      </div>
    );
  }

  // Filtrer les transporteurs selon la destination choisie (ou afficher tous si correspondance partielle)
  const filteredCarriers = TRANSPORTEURS_DATA;

  return (
    <div className="max-w-4xl mx-auto p-6 py-10">
      {/* Indicateur d'étapes */}
      <div className="mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center text-xs font-semibold text-gray-500 uppercase">
          <span className={step >= 1 ? 'text-emerald-800 font-bold' : ''}>1. Recherche</span>
          <span className={step >= 2 ? 'text-emerald-800 font-bold' : ''}>2. Transporteur</span>
          <span className={step >= 3 ? 'text-emerald-800 font-bold' : ''}>3. Passager</span>
          <span className={step >= 4 ? 'text-emerald-800 font-bold' : ''}>4. CGV</span>
          <span className={step >= 5 ? 'text-emerald-800 font-bold' : ''}>5. Paiement</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-2 overflow-hidden">
          <div className="bg-emerald-800 h-full transition-all duration-300" style={{ width: `${(step / 5) * 100}%` }}></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-6 text-emerald-800">
          <Bus className="w-7 h-7" />
          <h2 className="text-2xl font-bold">Transport Routier & Navettes au Congo</h2>
        </div>

        {/* ÉTAPE 1 : RECHERCHE (Destination & Date) */}
        {step === 1 && (
          <form onSubmit={handleSearchSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Ville de Départ</label>
                <input type="text" value="Brazzaville" disabled className="w-full border rounded-xl p-3 bg-gray-100 text-gray-600 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Destination</label>
                <select value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full border rounded-xl p-3 bg-white">
                  <option value="Pointe-Noire">Pointe-Noire</option>
                  <option value="Dolisie">Dolisie</option>
                  <option value="Oyo">Oyo / Owando</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Date du voyage</label>
                <input type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} className="w-full border rounded-xl p-3" required />
              </div>
            </div>
            <div className="mt-8 text-right">
              <button type="submit" className="px-8 py-3 bg-emerald-800 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 transition flex items-center space-x-2 ml-auto">
                <span>Rechercher les compagnies</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}

        {/* ÉTAPE 2 : CHOIX DU TRANSPORTEUR */}
        {step === 2 && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Compagnies disponibles pour {destination}</h3>
            <p className="text-sm text-gray-500 mb-6">Date prévue : <span className="font-semibold text-gray-800">{travelDate}</span>. Sélectionnez votre transporteur :</p>
            <div className="grid grid-cols-1 gap-4 mb-6">
              {filteredCarriers.map((carrier) => (
                <div key={carrier.id} onClick={() => handleCarrierSelect(carrier)} className="border rounded-2xl p-5 cursor-pointer transition flex items-center justify-between border-gray-200 hover:border-emerald-800 group shadow-sm">
                  <div className="flex items-center space-x-4">
                    <div className="bg-emerald-100 text-emerald-800 p-3 rounded-xl font-bold">🚌</div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 group-hover:text-emerald-800 transition">{carrier.name}</h4>
                      <p className="text-sm text-gray-600 mt-0.5">{carrier.route}</p>
                      <p className="text-xs text-gray-400 mt-1">{carrier.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block font-extrabold text-emerald-800 text-base">{carrier.price}</span>
                    <span className="inline-block mt-2 bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl">Choisir</span>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => setStep(1)} className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" /><span>Retour</span>
            </button>
          </div>
        )}

        {/* ÉTAPE 3 : INFORMATIONS DU PASSAGER */}
        {step === 3 && (
          <form onSubmit={handlePassengerSubmit}>
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-lg font-bold text-gray-800">Informations du Voyageur</h3>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-semibold">
                {selectedCarrier?.name} ({selectedCarrier?.price})
              </span>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Nom</label><input type="text" value={passager.nom} onChange={(e) => setPassager({ ...passager, nom: e.target.value })} className="w-full border rounded-xl p-3" required /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Prénom</label><input type="text" value={passager.prenom} onChange={(e) => setPassager({ ...passager, prenom: e.target.value })} className="w-full border rounded-xl p-3" required /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Date de naissance</label><input type="date" value={passager.dateNaissance} onChange={(e) => setPassager({ ...passager, dateNaissance: e.target.value })} className="w-full border rounded-xl p-3" required /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Lieu de naissance</label><input type="text" value={passager.lieuNaissance} onChange={(e) => setPassager({ ...passager, lieuNaissance: e.target.value })} className="w-full border rounded-xl p-3" required /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">N° de Pièce / CNI</label><input type="text" value={passager.numeroPasseport} onChange={(e) => setPassager({ ...passager, numeroPasseport: e.target.value })} className="w-full border rounded-xl p-3" required /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Date d'expiration</label><input type="date" value={passager.dateExpirationPasseport} onChange={(e) => setPassager({ ...passager, dateExpirationPasseport: e.target.value })} className="w-full border rounded-xl p-3" required /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Téléphone</label><input type="tel" value={passager.telephone} onChange={(e) => setPassager({ ...passager, telephone: e.target.value })} className="w-full border rounded-xl p-3" required /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Email</label><input type="email" value={passager.email} onChange={(e) => setPassager({ ...passager, email: e.target.value })} className="w-full border rounded-xl p-3" required /></div>
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <button type="button" onClick={() => setStep(2)} className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl">Retour</button>
              <button type="submit" className="px-8 py-3 bg-emerald-800 text-white font-bold rounded-xl shadow-lg">Vérifier le récapitulatif</button>
            </div>
          </form>
        )}

        {/* ÉTAPE 4 : RÉCAPITULATIF & CGV */}
        {step === 4 && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Récapitulatif de votre trajet</h3>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 mb-6 space-y-1">
              <p className="text-sm text-gray-700"><strong>Compagnie :</strong> {selectedCarrier?.name}</p>
              <p className="text-sm text-gray-700"><strong>Trajet :</strong> Brazzaville ➔ {destination}</p>
              <p className="text-sm text-gray-700"><strong>Date :</strong> {travelDate}</p>
              <p className="text-sm text-gray-700"><strong>Tarif :</strong> {selectedCarrier?.price}</p>
              <p className="text-sm text-gray-700"><strong>Passager :</strong> {passager.nom} {passager.prenom}</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl mb-6 flex items-start space-x-3">
              <input type="checkbox" id="cgv-road" checked={cgvAccepted} onChange={(e) => setCgvAccepted(e.target.checked)} className="mt-1 w-5 h-5 text-emerald-800 rounded cursor-pointer" />
              <label htmlFor="cgv-road" className="text-sm text-gray-800 cursor-pointer">
                J'atteste l'exactitude de mes informations et j'accepte les <a href="/cgv" target="_blank" className="font-bold underline text-emerald-800">Conditions Générales de Vente (CGV)</a> de la compagnie.
              </label>
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(3)} className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl">Modifier</button>
              <button type="button" onClick={handleReviewConfirm} disabled={!cgvAccepted} className={`px-8 py-3 font-bold rounded-xl shadow-lg ${cgvAccepted ? 'bg-emerald-800 text-white cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                Procéder au paiement
              </button>
            </div>
          </div>
        )}

        {/* ÉTAPE 5 : PAIEMENT */}
        {step === 5 && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-emerald-800" />
              <span>Choix du Mode de Paiement</span>
            </h3>
            <div className="space-y-3 mb-6">
              {['MTN Mobile Money', 'Airtel Money', 'Espèces en agence'].map((method) => (
                <label key={method} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer ${paymentMethod === method ? 'border-emerald-800 bg-emerald-50/50' : 'border-gray-200'}`}>
                  <div className="flex items-center space-x-3">
                    <input type="radio" name="payment-road" value={method} checked={paymentMethod === method} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-emerald-800" />
                    <span className="font-semibold text-gray-800">{method}</span>
                  </div>
                </label>
              ))}
            </div>
            <div className="bg-gray-50 p-4 rounded-xl mb-6 text-sm text-gray-600">
              Total à régler : <span className="text-lg font-bold text-emerald-800">{selectedCarrier?.price}</span>
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(4)} className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl">Retour</button>
              <button type="button" onClick={handleFinalPayment} disabled={loading} className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 transition">
                {loading ? 'Traitement en cours...' : 'Payer et finaliser la réservation'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}