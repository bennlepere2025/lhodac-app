'use client';

import { useState } from 'react';
import { Building2, CheckCircle2, CreditCard, ArrowRight, ArrowLeft, Star, MapPin } from 'lucide-react';

const HOTELS_DATA: Record<string, Array<{ id: string; name: string; rating: number; price: string; address: string; image: string }>> = {
  'Brazzaville': [
    { id: 'h1', name: 'Radisson Blu M\'Bamou Palace', rating: 5, price: '120 000 XAF / nuit', address: 'Avenue Amilcar Cabral, Brazzaville', image: '🏨' },
    { id: 'h2', name: 'Mikhael\'s Hotel', rating: 4, price: '75 000 XAF / nuit', address: 'Centreville, Brazzaville', image: '🏨' },
    { id: 'h3', name: 'Grand Hotel de Kintélé', rating: 4, price: '90 000 XAF / nuit', address: 'Kintélé, Nord Brazzaville', image: '🌴' },
  ],
  'Pointe-Noire': [
    { id: 'h4', name: 'Pivotel Pointe-Noire', rating: 4, price: '85 000 XAF / nuit', address: 'Boulevard du Loémé, Pointe-Noire', image: '🌊' },
    { id: 'h5', name: 'Atlantic Palace Hotel', rating: 4, price: '95 000 XAF / nuit', address: 'Avenue de Loango, Pointe-Noire', image: '🏖️' },
  ],
  'Oyo': [
    { id: 'h6', name: 'Hotel Alima Palace', rating: 5, price: '110 000 XAF / nuit', address: 'Bords de l\'Alima, Oyo', image: '🌿' },
  ]
};

export default function HotelsPage() {
  const [step, setStep] = useState(1);
  const [city, setCity] = useState('Brazzaville');
  const [checkIn, setCheckIn] = useState('2026-11-10');
  const [checkOut, setCheckOut] = useState('2026-11-15');
  const [roomsCount, setRoomsCount] = useState('1');
  const [selectedHotel, setSelectedHotel] = useState<any>(null);

  const [client, setClient] = useState({
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
    const available = HOTELS_DATA[city] || HOTELS_DATA['Brazzaville'];
    setSelectedHotel(available[0]);
    setStep(2);
  };

  const handleHotelSelect = (hotel: any) => {
    setSelectedHotel(hotel);
    setStep(3);
  };

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!client.nom || !client.prenom || !client.email || !client.numeroPasseport) {
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
        city,
        checkIn,
        checkOut,
        roomsCount,
        hotelName: selectedHotel?.name,
        pricePerNight: selectedHotel?.price,
        paymentMethod,
      };

      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: 'hotel',
          ...client,
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
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-100">
          <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Réservation d'hôtel confirmée !</h2>
          <p className="text-gray-600 mb-6">
            Votre séjour au <span className="font-semibold">{selectedHotel?.name}</span> a bien été enregistré.
          </p>
          <a href="/reservations" className="inline-block bg-amber-700 text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-amber-600 transition">
            Voir mes réservations
          </a>
        </div>
      </div>
    );
  }

  const currentHotelsList = HOTELS_DATA[city] || HOTELS_DATA['Brazzaville'];

  return (
    <div className="max-w-4xl mx-auto p-6 py-10">
      <div className="mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center text-xs font-semibold text-gray-500 uppercase">
          <span className={step >= 1 ? 'text-amber-700 font-bold' : ''}>1. Recherche</span>
          <span className={step >= 2 ? 'text-amber-700 font-bold' : ''}>2. Choix Hôtel</span>
          <span className={step >= 3 ? 'text-amber-700 font-bold' : ''}>3. Client</span>
          <span className={step >= 4 ? 'text-amber-700 font-bold' : ''}>4. CGV</span>
          <span className={step >= 5 ? 'text-amber-700 font-bold' : ''}>5. Paiement</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-2 overflow-hidden">
          <div className="bg-amber-700 h-full transition-all duration-300" style={{ width: `${(step / 5) * 100}%` }}></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-6 text-amber-700">
          <Building2 className="w-7 h-7" />
          <h2 className="text-2xl font-bold">Réservation d'Hôtels au Congo</h2>
        </div>

        {step === 1 && (
          <form onSubmit={handleSearchSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Ville de Destination</label>
                <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full border rounded-xl p-3 bg-white">
                  <option value="Brazzaville">Brazzaville</option>
                  <option value="Pointe-Noire">Pointe-Noire</option>
                  <option value="Oyo">Oyo</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Nombre de chambres</label>
                <input type="number" min="1" value={roomsCount} onChange={(e) => setRoomsCount(e.target.value)} className="w-full border rounded-xl p-3" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Date d'arrivée</label>
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full border rounded-xl p-3" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Date de départ</label>
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full border rounded-xl p-3" required />
              </div>
            </div>
            <div className="mt-8 text-right">
              <button type="submit" className="px-8 py-3 bg-amber-700 text-white font-bold rounded-xl shadow-lg hover:bg-amber-600 transition flex items-center space-x-2 ml-auto">
                <span>Voir les hôtels disponibles</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Hôtels disponibles à {city}</h3>
            <div className="grid grid-cols-1 gap-4 mb-6">
              {currentHotelsList.map((hotel) => (
                <div key={hotel.id} onClick={() => handleHotelSelect(hotel)} className="border rounded-2xl p-5 cursor-pointer transition flex items-center justify-between border-gray-200 hover:border-amber-700 group shadow-sm">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl bg-amber-100 p-3 rounded-xl">{hotel.image}</div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 group-hover:text-amber-700 transition">{hotel.name}</h4>
                      <p className="text-xs text-gray-500 mt-1"><MapPin className="w-3 h-3 inline mr-1" />{hotel.address}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block font-extrabold text-amber-700 text-base">{hotel.price}</span>
                    <span className="inline-block mt-2 bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded-xl">Choisir</span>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => setStep(1)} className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" /><span>Retour</span>
            </button>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleClientSubmit}>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Informations du Client</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Nom</label><input type="text" value={client.nom} onChange={(e) => setClient({ ...client, nom: e.target.value })} className="w-full border rounded-xl p-3" required /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Prénom</label><input type="text" value={client.prenom} onChange={(e) => setClient({ ...client, prenom: e.target.value })} className="w-full border rounded-xl p-3" required /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Date de naissance</label><input type="date" value={client.dateNaissance} onChange={(e) => setClient({ ...client, dateNaissance: e.target.value })} className="w-full border rounded-xl p-3" required /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Lieu de naissance</label><input type="text" value={client.lieuNaissance} onChange={(e) => setClient({ ...client, lieuNaissance: e.target.value })} className="w-full border rounded-xl p-3" required /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">N° de Pièce / Passeport</label><input type="text" value={client.numeroPasseport} onChange={(e) => setClient({ ...client, numeroPasseport: e.target.value })} className="w-full border rounded-xl p-3" required /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Date d'expiration</label><input type="date" value={client.dateExpirationPasseport} onChange={(e) => setClient({ ...client, dateExpirationPasseport: e.target.value })} className="w-full border rounded-xl p-3" required /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Téléphone</label><input type="tel" value={client.telephone} onChange={(e) => setClient({ ...client, telephone: e.target.value })} className="w-full border rounded-xl p-3" required /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Email</label><input type="email" value={client.email} onChange={(e) => setClient({ ...client, email: e.target.value })} className="w-full border rounded-xl p-3" required /></div>
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <button type="button" onClick={() => setStep(2)} className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl">Retour</button>
              <button type="submit" className="px-8 py-3 bg-amber-700 text-white font-bold rounded-xl shadow-lg">Vérifier le récapitulatif</button>
            </div>
          </form>
        )}

        {step === 4 && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Récapitulatif de votre séjour</h3>
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 mb-6">
              <p className="text-sm text-gray-700"><strong>Établissement :</strong> {selectedHotel?.name}</p>
              <p className="text-sm text-gray-700"><strong>Séjour :</strong> du {checkIn} au {checkOut}</p>
              <p className="text-sm text-gray-700"><strong>Tarif :</strong> {selectedHotel?.price}</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-6 flex items-start space-x-3">
              <input type="checkbox" id="cgv-hotel" checked={cgvAccepted} onChange={(e) => setCgvAccepted(e.target.checked)} className="mt-1 w-5 h-5 text-amber-700 rounded cursor-pointer" />
              <label htmlFor="cgv-hotel" className="text-sm text-gray-800 cursor-pointer">
                J'accepte les <span className="font-bold underline">Conditions Générales de Vente (CGV)</span> de l'hôtel.
              </label>
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(3)} className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl">Modifier</button>
              <button type="button" onClick={handleReviewConfirm} disabled={!cgvAccepted} className={`px-8 py-3 font-bold rounded-xl shadow-lg ${cgvAccepted ? 'bg-amber-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                Procéder au paiement
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-amber-700" />
              <span>Choix du Mode de Paiement</span>
            </h3>
            <div className="space-y-3 mb-6">
              {['MTN Mobile Money', 'Airtel Money', 'Carte Bancaire'].map((method) => (
                <label key={method} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer ${paymentMethod === method ? 'border-amber-700 bg-amber-50/50' : 'border-gray-200'}`}>
                  <div className="flex items-center space-x-3">
                    <input type="radio" name="payment-hotel" value={method} checked={paymentMethod === method} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-amber-700" />
                    <span className="font-semibold text-gray-800">{method}</span>
                  </div>
                </label>
              ))}
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(4)} className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl">Retour</button>
              <button type="button" onClick={handleFinalPayment} disabled={loading} className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 transition">
                {loading ? 'Traitement...' : 'Payer et finaliser'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}