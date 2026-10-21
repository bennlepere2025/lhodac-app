'use client';

import { useState } from 'react';
import { Plane, CheckCircle2, CreditCard, ArrowRight, ArrowLeft, Plus, Trash2 } from 'lucide-react';

export default function VolsPage() {
  const [step, setStep] = useState(1); // 1: Recherche, 2: Passager, 3: Récapitulatif & CGV, 4: Paiement

  // Form states
  const [tripType, setTripType] = useState('one-way'); // 'one-way', 'round-trip', 'multi-city'
  const [flightOrigin, setFlightOrigin] = useState('Brazzaville (BZV)');
  const [flightDest, setFlightDest] = useState('Pointe-Noire (PNR)');
  const [flightDate, setFlightDate] = useState('2026-11-01');
  const [returnDate, setReturnDate] = useState('2026-11-10');
  const [flightClass, setFlightClass] = useState('Économique');

  // Pour les multi-trajets
  const [multiLegs, setMultiLegs] = useState([
    { origin: 'Brazzaville (BZV)', dest: 'Pointe-Noire (PNR)', date: '2026-11-01' },
    { origin: 'Pointe-Noire (PNR)', dest: 'Abidjan (ABJ)', date: '2026-11-08' }
  ]);

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
    setStep(2);
  };

  const handlePassengerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passager.nom || !passager.prenom || !passager.email || !passager.numeroPasseport) {
      alert('Veuillez remplir tous les champs obligatoires du passager.');
      return;
    }
    setStep(3);
  };

  const handleReviewConfirm = () => {
    if (!cgvAccepted) {
      alert('Veuillez accepter les Conditions Générales de Vente (CGV) pour continuer.');
      return;
    }
    setStep(4);
  };

  const handleFinalPayment = async () => {
    setLoading(true);
    try {
      const detailsObj = {
        tripType,
        flightOrigin: tripType === 'multi-city' ? 'Multi-trajets' : flightOrigin,
        flightDest: tripType === 'multi-city' ? 'Multi-trajets' : flightDest,
        flightDate,
        returnDate: tripType === 'round-trip' ? returnDate : null,
        multiLegs: tripType === 'multi-city' ? multiLegs : null,
        flightClass,
        paymentMethod,
      };

      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: 'flight',
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
      alert('Erreur serveur lors de la réservation.');
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Réservation de Vol confirmée !</h2>
          <p className="text-gray-600 mb-6">
            Votre billet a été enregistré avec succès et un récapitulatif a été envoyé à <span className="font-semibold">{passager.email}</span>.
          </p>
          <a
            href="/reservations"
            className="inline-block bg-blue-900 text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-blue-800 transition"
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
          <span className={step >= 1 ? 'text-blue-900 font-bold' : ''}>1. Recherche</span>
          <span className={step >= 2 ? 'text-blue-900 font-bold' : ''}>2. Passager</span>
          <span className={step >= 3 ? 'text-blue-900 font-bold' : ''}>3. Récapitulatif & CGV</span>
          <span className={step >= 4 ? 'text-blue-900 font-bold' : ''}>4. Paiement</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-2 overflow-hidden">
          <div
            className="bg-blue-900 h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-6 text-blue-900">
          <Plane className="w-7 h-7" />
          <h2 className="text-2xl font-bold">Réservation de Vols</h2>
        </div>

        {/* ÉTAPE 1 : RECHERCHE */}
        {step === 1 && (
          <form onSubmit={handleSearchSubmit}>
            {/* Sélection du type de trajet */}
            <div className="flex space-x-4 mb-6 border-b pb-4">
              {[
                { id: 'one-way', label: 'Aller simple' },
                { id: 'round-trip', label: 'Aller-retour' },
                { id: 'multi-city', label: 'Multi-trajets' },
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setTripType(type.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                    tripType === type.id
                      ? 'bg-blue-900 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Formulaire selon le type de trajet */}
            {tripType !== 'multi-city' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Aéroport de Départ</label>
                  <input
                    type="text"
                    value={flightOrigin}
                    onChange={(e) => setFlightOrigin(e.target.value)}
                    className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-900 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Aéroport d'Arrivée</label>
                  <input
                    type="text"
                    value={flightDest}
                    onChange={(e) => setFlightDest(e.target.value)}
                    className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-900 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Date d'aller</label>
                  <input
                    type="date"
                    value={flightDate}
                    onChange={(e) => setFlightDate(e.target.value)}
                    className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-900 outline-none"
                    required
                  />
                </div>
                {tripType === 'round-trip' && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Date de retour</label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-900 outline-none"
                      required
                    />
                  </div>
                )}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Classe</label>
                  <select
                    value={flightClass}
                    onChange={(e) => setFlightClass(e.target.value)}
                    className="w-full border rounded-xl p-3 bg-white focus:ring-2 focus:ring-blue-900 outline-none"
                  >
                    <option value="Économique">Économique</option>
                    <option value="Affaires">Affaires (Business)</option>
                  </select>
                </div>
              </div>
            ) : (
              /* Section Multi-trajets */
              <div className="space-y-4">
                <p className="text-xs font-semibold text-gray-500 uppercase">Gestion des segments multi-trajets</p>
                {multiLegs.map((leg, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-xl border relative">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-500 uppercase">Départ</label>
                      <input
                        type="text"
                        value={leg.origin}
                        onChange={(e) => {
                          const updated = [...multiLegs];
                          updated[index].origin = e.target.value;
                          setMultiLegs(updated);
                        }}
                        className="w-full border rounded-lg p-2 text-sm bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-500 uppercase">Arrivée</label>
                      <input
                        type="text"
                        value={leg.dest}
                        onChange={(e) => {
                          const updated = [...multiLegs];
                          updated[index].dest = e.target.value;
                          setMultiLegs(updated);
                        }}
                        className="w-full border rounded-lg p-2 text-sm bg-white"
                        required
                      />
                    </div>
                    <div className="flex items-end space-x-2">
                      <div className="flex-1">
                        <label className="block text-[10px] font-semibold text-gray-500 uppercase">Date</label>
                        <input
                          type="date"
                          value={leg.date}
                          onChange={(e) => {
                            const updated = [...multiLegs];
                            updated[index].date = e.target.value;
                            setMultiLegs(updated);
                          }}
                          className="w-full border rounded-lg p-2 text-sm bg-white"
                          required
                        />
                      </div>
                      {multiLegs.length > 2 && (
                        <button
                          type="button"
                          onClick={() => setMultiLegs(multiLegs.filter((_, i) => i !== index))}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => setMultiLegs([...multiLegs, { origin: '', dest: '', date: '' }])}
                  className="px-4 py-2 bg-blue-50 text-blue-900 border border-blue-200 rounded-xl text-sm font-semibold hover:bg-blue-100 transition flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter un tronçon</span>
                </button>

                <div className="mt-4">
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Classe</label>
                  <select
                    value={flightClass}
                    onChange={(e) => setFlightClass(e.target.value)}
                    className="w-full border rounded-xl p-3 bg-white focus:ring-2 focus:ring-blue-900 outline-none"
                  >
                    <option value="Économique">Économique</option>
                    <option value="Affaires">Affaires (Business)</option>
                  </select>
                </div>
              </div>
            )}

            <div className="mt-8 text-right">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-900 text-white font-bold rounded-xl shadow-lg hover:bg-blue-800 transition flex items-center space-x-2 ml-auto"
              >
                <span>Continuer vers le passager</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}

        {/* ÉTAPE 2 : INFORMATIONS DU PASSAGER */}
        {step === 2 && (
          <form onSubmit={handlePassengerSubmit}>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Informations du Voyageur</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Nom</label>
                  <input
                    type="text"
                    value={passager.nom}
                    onChange={(e) => setPassager({ ...passager, nom: e.target.value })}
                    className="w-full border rounded-xl p-3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Prénom</label>
                  <input
                    type="text"
                    value={passager.prenom}
                    onChange={(e) => setPassager({ ...passager, prenom: e.target.value })}
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
                    value={passager.dateNaissance}
                    onChange={(e) => setPassager({ ...passager, dateNaissance: e.target.value })}
                    className="w-full border rounded-xl p-3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Lieu de naissance</label>
                  <input
                    type="text"
                    value={passager.lieuNaissance}
                    onChange={(e) => setPassager({ ...passager, lieuNaissance: e.target.value })}
                    className="w-full border rounded-xl p-3"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Numéro de Passeport</label>
                  <input
                    type="text"
                    value={passager.numeroPasseport}
                    onChange={(e) => setPassager({ ...passager, numeroPasseport: e.target.value })}
                    className="w-full border rounded-xl p-3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Date d'expiration du passeport</label>
                  <input
                    type="date"
                    value={passager.dateExpirationPasseport}
                    onChange={(e) => setPassager({ ...passager, dateExpirationPasseport: e.target.value })}
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
                    value={passager.telephone}
                    onChange={(e) => setPassager({ ...passager, telephone: e.target.value })}
                    className="w-full border rounded-xl p-3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    value={passager.email}
                    onChange={(e) => setPassager({ ...passager, email: e.target.value })}
                    className="w-full border rounded-xl p-3"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition flex items-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Retour</span>
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-900 text-white font-bold rounded-xl shadow-lg hover:bg-blue-800 transition flex items-center space-x-2"
              >
                <span>Vérifier le récapitulatif</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}

        {/* ÉTAPE 3 : RÉCAPITULATIF & CGV */}
        {step === 3 && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Récapitulatif de votre réservation</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center space-x-2">
                  <Plane className="w-5 h-5" />
                  <span>Détails du Vol ({tripType === 'one-way' ? 'Aller simple' : tripType === 'round-trip' ? 'Aller-retour' : 'Multi-trajets'})</span>
                </h4>
                {tripType !== 'multi-city' ? (
                  <>
                    <p className="text-sm text-gray-700"><strong>Départ :</strong> {flightOrigin}</p>
                    <p className="text-sm text-gray-700"><strong>Arrivée :</strong> {flightDest}</p>
                    <p className="text-sm text-gray-700"><strong>Date d'aller :</strong> {flightDate}</p>
                    {tripType === 'round-trip' && <p className="text-sm text-gray-700"><strong>Date de retour :</strong> {returnDate}</p>}
                  </>
                ) : (
                  <div className="space-y-1">
                    {multiLegs.map((leg, idx) => (
                      <p key={idx} className="text-xs text-gray-700">
                        <strong>Tronçon {idx + 1}:</strong> {leg.origin} ➔ {leg.dest} ({leg.date})
                      </p>
                    ))}
                  </div>
                )}
                <p className="text-sm text-gray-700 mt-2"><strong>Classe :</strong> {flightClass}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-2">Informations Passager</h4>
                <p className="text-sm text-gray-700"><strong>Nom & Prénom :</strong> {passager.nom} {passager.prenom}</p>
                <p className="text-sm text-gray-700"><strong>Passeport :</strong> {passager.numeroPasseport}</p>
                <p className="text-sm text-gray-700"><strong>Contact :</strong> {passager.telephone} / {passager.email}</p>
              </div>
            </div>

            {/* Case à cocher CGV */}
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-6 flex items-start space-x-3">
              <input
                type="checkbox"
                id="cgv"
                checked={cgvAccepted}
                onChange={(e) => setCgvAccepted(e.target.checked)}
                className="mt-1 w-5 h-5 text-blue-900 rounded focus:ring-blue-900 cursor-pointer"
              />
              <label htmlFor="cgv" className="text-sm text-gray-800 cursor-pointer">
                J'atteste avoir vérifié l'exactitude des informations ci-dessus et j'accepte sans réserve les <span className="font-bold underline">Conditions Générales de Vente (CGV)</span> de LHODAC ainsi que les politiques d'annulation et de transport.
              </label>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
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
                    ? 'bg-blue-900 text-white hover:bg-blue-800 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>Procéder au paiement</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ÉTAPE 4 : PAIEMENT */}
        {step === 4 && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-blue-900" />
              <span>Choix du Mode de Paiement</span>
            </h3>

            <div className="space-y-3 mb-6">
              {['MTN Mobile Money', 'Airtel Money', 'Carte Bancaire'].map((method) => (
                <label
                  key={method}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                    paymentMethod === method ? 'border-blue-900 bg-blue-50/50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-blue-900"
                    />
                    <span className="font-semibold text-gray-800">{method}</span>
                  </div>
                  <span className="text-xs text-gray-500 uppercase font-bold">Sécurisé</span>
                </label>
              ))}
            </div>

            <div className="bg-gray-50 p-4 rounded-xl mb-6 text-sm text-gray-600">
              Montant total à régler : <span className="text-lg font-bold text-blue-900">145 000 XAF</span>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(3)}
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