'use client';

import { useState } from 'react';
import { Compass, CheckCircle2, CreditCard, ArrowRight, ArrowLeft, MapPin, Users, Calendar } from 'lucide-react';

const CIRCUITS_DATA = [
  { id: 'c1', name: 'Safari & Gorilles - Odzala-Kokoua', duration: '5 Jours / 4 Nuits', price: '450 000 XAF', location: 'Nord Congo', description: 'Immersion au cœur de la forêt tropicale et observation des gorilles des plaines de l\'Ouest.' },
  { id: 'c2', name: 'Sanctuaire des Lesio-Louna', duration: '2 Jours / 1 Nuit', price: '120 000 XAF', location: 'Plateaux, Congo', description: 'Visite du projet de réintroduction des gorilles et détente au lac Bleu.' },
  { id: 'c3', name: 'Parc National de Conkouati-Douli', duration: '4 Jours / 3 Nuits', price: '380 000 XAF', location: 'Façade Maritime', description: 'Entre savane, lagunes, forêts et observation des chimpanzés et tortues marines.' },
];

export default function CircuitsPage() {
  const [step, setStep] = useState(1); // 1: Recherche, 2: Choix Circuit, 3: Voyageur, 4: CGV, 5: Paiement

  const [destination, setDestination] = useState('Odzala-Kokoua');
  const [participantsCount, setParticipantsCount] = useState('2');
  const [startDate, setStartDate] = useState('2026-11-20');
  const [selectedCircuit, setSelectedCircuit] = useState<any>(CIRCUITS_DATA[0]);

  const [voyageur, setVoyageur] = useState({
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
    setStep(2);
  };

  const handleCircuitSelect = (circuit: any) => {
    setSelectedCircuit(circuit);
    setStep(3);
  };

  const handleVoyageurSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voyageur.nom || !voyageur.prenom || !voyageur.email || !voyageur.numeroPasseport) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setStep(4);
  };

  const handleReviewConfirm = () => {
    if (!cgvAccepted) {
      alert('Veuillez accepter les Conditions Générales de Vente (CGV) pour continuer.');
      return;
    }
    setStep(5);
  };

  const handleFinalPayment = async () => {
    setLoading(true);
    try {
      const detailsObj = {
        destination,
        participantsCount,
        startDate,
        circuitName: selectedCircuit.name,
        duration: selectedCircuit.duration,
        price: selectedCircuit.price,
        paymentMethod,
      };

      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: 'circuit',
          ...voyageur,
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
      alert('Erreur serveur lors de la réservation.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto p-6 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
          <div className="w-16 h-16 bg-purple-100 text-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Réservation de Circuit confirmée !</h2>
          <p className="text-gray-600 mb-6">
            Votre aventure avec <span className="font-semibold">{selectedCircuit.name}</span> a bien été enregistrée. Un récapitulatif a été envoyé à <span className="font-semibold">{voyageur.email}</span>.
          </p>
          <a
            href="/reservations"
            className="inline-block bg-purple-900 text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-purple-800 transition"
          >
            Voir mes réservations
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 py-10">
      {/* Indicateur d'étapes */}
      <div className="mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center text-xs font-semibold text-gray-500 uppercase">
          <span className={step >= 1 ? 'text-purple-900 font-bold' : ''}>1. Recherche</span>
          <span className={step >= 2 ? 'text-purple-900 font-bold' : ''}>2. Circuit</span>
          <span className={step >= 3 ? 'text-purple-900 font-bold' : ''}>3. Voyageur</span>
          <span className={step >= 4 ? 'text-purple-900 font-bold' : ''}>4. CGV</span>
          <span className={step >= 5 ? 'text-purple-900 font-bold' : ''}>5. Paiement</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-2 overflow-hidden">
          <div
            className="bg-purple-900 h-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-6 text-purple-900">
          <Compass className="w-7 h-7" />
          <h2 className="text-2xl font-bold">Circuits Touristiques au Congo</h2>
        </div>

        {/* ÉTAPE 1 : RECHERCHE */}
        {step === 1 && (
          <form onSubmit={handleSearchSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Région / Destination</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-purple-900 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Nombre de Participants</label>
                <input
                  type="number"
                  min="1"
                  value={participantsCount}
                  onChange={(e) => setParticipantsCount(e.target.value)}
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-purple-900 outline-none"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Date de départ souhaitée</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-purple-900 outline-none"
                  required
                />
              </div>
            </div>

            <div className="mt-8 text-right">
              <button
                type="submit"
                className="px-8 py-3 bg-purple-900 text-white font-bold rounded-xl shadow-lg hover:bg-purple-800 transition flex items-center space-x-2 ml-auto"
              >
                <span>Voir les circuits disponibles</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}

        {/* ÉTAPE 2 : CHOIX DU CIRCUIT */}
        {step === 2 && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Circuits touristiques proposés</h3>
            <p className="text-sm text-gray-500 mb-6">Sélectionnez l'expérience qui vous correspond :</p>

            <div className="grid grid-cols-1 gap-4 mb-6">
              {CIRCUITS_DATA.map((circuit) => (
                <div
                  key={circuit.id}
                  onClick={() => handleCircuitSelect(circuit)}
                  className={`border rounded-2xl p-5 cursor-pointer transition flex items-center justify-between group ${
                    selectedCircuit?.id === circuit.id ? 'border-purple-900 bg-purple-50/40 shadow-md' : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl bg-purple-100 p-3 rounded-xl text-purple-900">🧭</div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 group-hover:text-purple-900 transition">{circuit.name}</h4>
                      <p className="text-xs text-purple-700 font-semibold mt-0.5">{circuit.duration} • {circuit.location}</p>
                      <p className="text-sm text-gray-600 mt-2">{circuit.description}</p>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <span className="block font-extrabold text-purple-900 text-base">{circuit.price}</span>
                    <span className="inline-block mt-3 bg-purple-900 text-white text-xs font-bold px-4 py-2 rounded-xl group-hover:bg-purple-800 transition">
                      Sélectionner
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition flex items-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Retour</span>
              </button>
            </div>
          </div>
        )}

        {/* ÉTAPE 3 : INFORMATIONS VOYAGEUR */}
        {step === 3 && (
          <form onSubmit={handleVoyageurSubmit}>
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-lg font-bold text-gray-800">Informations du Voyageur</h3>
              <span className="text-xs bg-purple-100 text-purple-900 px-3 py-1 rounded-full font-semibold">
                {selectedCircuit?.name}
              </span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Nom</label>
                  <input
                    type="text"
                    value={voyageur.nom}
                    onChange={(e) => setVoyageur({ ...voyageur, nom: e.target.value })}
                    className="w-full border rounded-xl p-3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Prénom</label>
                  <input
                    type="text"
                    value={voyageur.prenom}
                    onChange={(e) => setVoyageur({ ...voyageur, prenom: e.target.value })}
                    className="w-full border rounded-xl p-3"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Date de naissance</label>
                  <input
                    type="date"
                    value={voyageur.dateNaissance}
                    onChange={(e) => setVoyageur({ ...voyageur, dateNaissance: e.target.value })}
                    className="w-full border rounded-xl p-3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Lieu de naissance</label>
                  <input
                    type="text"
                    value={voyageur.lieuNaissance}
                    onChange={(e) => setVoyageur({ ...voyageur, lieuNaissance: e.target.value })}
                    className="w-full border rounded-xl p-3"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">N° de Passeport / CNI</label>
                  <input
                    type="text"
                    value={voyageur.numeroPasseport}
                    onChange={(e) => setVoyageur({ ...voyageur, numeroPasseport: e.target.value })}
                    className="w-full border rounded-xl p-3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Date d'expiration</label>
                  <input
                    type="date"
                    value={voyageur.dateExpirationPasseport}
                    onChange={(e) => setVoyageur({ ...voyageur, dateExpirationPasseport: e.target.value })}
                    className="w-full border rounded-xl p-3"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    value={voyageur.telephone}
                    onChange={(e) => setVoyageur({ ...voyageur, telephone: e.target.value })}
                    className="w-full border rounded-xl p-3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    value={voyageur.email}
                    onChange={(e) => setVoyageur({ ...voyageur, email: e.target.value })}
                    className="w-full border rounded-xl p-3"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition flex items-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Retour</span>
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-purple-900 text-white font-bold rounded-xl shadow-lg hover:bg-purple-800 transition flex items-center space-x-2"
              >
                <span>Vérifier le récapitulatif</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}

        {/* ÉTAPE 4 : RÉCAPITULATIF & CGV */}
        {step === 4 && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Récapitulatif de votre circuit</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                <h4 className="font-bold text-purple-900 mb-2 flex items-center space-x-2">
                  <Compass className="w-5 h-5" />
                  <span>Détails du Circuit</span>
                </h4>
                <p className="text-sm text-gray-700"><strong>Circuit :</strong> {selectedCircuit?.name}</p>
                <p className="text-sm text-gray-700"><strong>Durée :</strong> {selectedCircuit?.duration}</p>
                <p className="text-sm text-gray-700"><strong>Départ :</strong> {startDate}</p>
                <p className="text-sm text-gray-700"><strong>Participants :</strong> {participantsCount}</p>
                <p className="text-sm text-gray-700"><strong>Tarif :</strong> {selectedCircuit?.price}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-2">Informations Voyageur</h4>
                <p className="text-sm text-gray-700"><strong>Nom & Prénom :</strong> {voyageur.nom} {voyageur.prenom}</p>
                <p className="text-sm text-gray-700"><strong>Pièce :</strong> {voyageur.numeroPasseport}</p>
                <p className="text-sm text-gray-700"><strong>Contact :</strong> {voyageur.telephone} / {voyageur.email}</p>
              </div>
            </div>

            {/* Case à cocher CGV */}
            <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl mb-6 flex items-start space-x-3">
              <input
                type="checkbox"
                id="cgv-circuit"
                checked={cgvAccepted}
                onChange={(e) => setCgvAccepted(e.target.checked)}
                className="mt-1 w-5 h-5 text-purple-900 rounded focus:ring-purple-900 cursor-pointer"
              />
              <label htmlFor="cgv-circuit" className="text-sm text-gray-800 cursor-pointer">
                J'atteste l'exactitude des informations fournies et j'accepte les <span className="font-bold underline">Conditions Générales de Vente (CGV)</span> relatives aux parcs nationaux et circuits touristiques LHODAC.
              </label>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition flex items-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Modifier</span>
              </button>
              <button
                type="button"
                onClick={handleReviewConfirm}
                disabled={!cgvAccepted}
                className={`px-8 py-3 font-bold rounded-xl shadow-lg transition flex items-center space-x-2 ${
                  cgvAccepted
                    ? 'bg-purple-900 text-white hover:bg-purple-800 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>Procéder au paiement</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ÉTAPE 5 : PAIEMENT */}
        {step === 5 && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-purple-900" />
              <span>Choix du Mode de Paiement</span>
            </h3>

            <div className="space-y-3 mb-6">
              {['MTN Mobile Money', 'Airtel Money', 'Carte Bancaire'].map((method) => (
                <label
                  key={method}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                    paymentMethod === method ? 'border-purple-900 bg-purple-50/50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment-circuit"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-purple-900"
                    />
                    <span className="font-semibold text-gray-800">{method}</span>
                  </div>
                  <span className="text-xs text-gray-500 uppercase font-bold">Sécurisé</span>
                </label>
              ))}
            </div>

            <div className="bg-gray-50 p-4 rounded-xl mb-6 text-sm text-gray-600">
              Circuit sélectionné : <span className="font-bold text-gray-800">{selectedCircuit?.name}</span><br />
              Montant total à régler : <span className="text-lg font-bold text-purple-900">{selectedCircuit?.price}</span>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition"
              >
                Retour
              </button>
              <button
                type="button"
                onClick={handleFinalPayment}
                disabled={loading}
                className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 transition flex items-center space-x-2"
              >
                {loading ? 'Traitement en cours...' : 'Payer et finaliser la réservation'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}