'use client';

import { useState } from 'react';
import {
  Plane,
  Bus,
  Building2,
  Compass,
  Search,
  Calendar,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Plus,
  Trash2,
  X,
  Users,
  Bed,
} from 'lucide-react';

export default function Home() {
  const [activeService, setActiveService] = useState<
    'flight' | 'road' | 'hotel' | 'circuit'
  >('flight');

  // États pour les vols
  const [tripType, setTripType] = useState<'one-way' | 'round-trip' | 'multi'>(
    'round-trip'
  );
  const [origin, setOrigin] = useState('Brazzaville');
  const [destination, setDestination] = useState('Cotonou');
  const [departureDate, setDepartureDate] = useState('2026-10-24');
  const [returnDate, setReturnDate] = useState('2026-10-31');

  // États pour le transport routier
  const [roadType, setRoadType] = useState<'bus' | 'shuttle' | 'private'>(
    'bus'
  );
  const [roadOrigin, setRoadOrigin] = useState('Brazzaville');
  const [roadDestination, setRoadDestination] = useState('Pointe-Noire');
  const [roadDate, setRoadDate] = useState('2026-10-25');
  const [passengers, setPassengers] = useState('1');

  // États pour les hôtels au Congo
  const [hotelCity, setHotelCity] = useState('Brazzaville');
  const [checkIn, setCheckIn] = useState('2026-10-24');
  const [checkOut, setCheckOut] = useState('2026-10-30');
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('0');
  const [rooms, setRooms] = useState('1');

  // États pour les circuits touristiques
  const [circuitDestination, setCircuitDestination] = useState('Odzala-Kokoua');
  const [circuitTheme, setCircuitTheme] = useState('safari');
  const [circuitDuration, setCircuitDuration] = useState('Week-end (3 jours)');
  const [circuitDate, setCircuitDate] = useState('2026-11-05');
  const [circuitParticipants, setCircuitParticipants] = useState('2');

  // Pour le multi-trajet vol
  const [legs, setLegs] = useState([
    { origin: 'Brazzaville', destination: 'Cotonou', date: '2026-10-24' },
    { origin: 'Cotonou', destination: 'Abidjan', date: '2026-10-28' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddLeg = () => {
    setLegs([...legs, { origin: '', destination: '', date: '' }]);
  };

  const handleRemoveLeg = (index: number) => {
    if (legs.length > 2) {
      setLegs(legs.filter((_, i) => i !== index));
    }
  };

  const handleLegChange = (index: number, field: string, value: string) => {
    const newLegs = [...legs];
    newLegs[index] = { ...newLegs[index], [field]: value };
    setLegs(newLegs);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 relative">
      {/* Barre de navigation avec le logo LHODAC */}
      <header className="border-b bg-white px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-blue-700 to-teal-600 text-white p-2 rounded-lg font-bold flex items-center justify-center shadow-sm">
            <span className="text-lg font-serif italic font-bold">L</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">
            LHODAC
          </span>
        </div>
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-slate-600">
          <a href="#" className="text-blue-600 font-semibold">
            Accueil
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Vols
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Route
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Hôtels
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Circuits
          </a>
        </nav>
      </header>

      {/* Section Hero / Recherche */}
      <section className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Votre voyage au Congo et au-delà avec{' '}
          <span className="text-blue-600">LHODAC</span>
        </h1>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
          Réservez vos billets, solutions de transport, hôtels et circuits
          touristiques en toute simplicité.
        </p>

        {/* Formulaire de recherche global à 4 onglets */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200 text-left">
          {/* Sélection du service principal (4 options) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6 bg-slate-100 p-1.5 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveService('flight')}
              className={`flex items-center justify-center space-x-1.5 py-2.5 text-xs md:text-sm font-semibold rounded-lg transition cursor-pointer ${
                activeService === 'flight'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Plane className="w-4 h-4 shrink-0" />
              <span>Vols</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveService('road')}
              className={`flex items-center justify-center space-x-1.5 py-2.5 text-xs md:text-sm font-semibold rounded-lg transition cursor-pointer ${
                activeService === 'road'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bus className="w-4 h-4 shrink-0" />
              <span>Route</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveService('hotel')}
              className={`flex items-center justify-center space-x-1.5 py-2.5 text-xs md:text-sm font-semibold rounded-lg transition cursor-pointer ${
                activeService === 'hotel'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4 shrink-0" />
              <span>Hôtels</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveService('circuit')}
              className={`flex items-center justify-center space-x-1.5 py-2.5 text-xs md:text-sm font-semibold rounded-lg transition cursor-pointer ${
                activeService === 'circuit'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-4 h-4 shrink-0" />
              <span>Circuits</span>
            </button>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            {/* --- ONGLET VOLS --- */}
            {activeService === 'flight' && (
              <>
                <div className="flex space-x-2 mb-4 bg-slate-50 p-1 rounded-xl w-fit border border-slate-100">
                  <button
                    type="button"
                    onClick={() => setTripType('one-way')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                      tripType === 'one-way'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Aller simple
                  </button>
                  <button
                    type="button"
                    onClick={() => setTripType('round-trip')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                      tripType === 'round-trip'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Aller-retour
                  </button>
                  <button
                    type="button"
                    onClick={() => setTripType('multi')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                      tripType === 'multi'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Multi-trajet
                  </button>
                </div>

                {tripType !== 'multi' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 transition">
                      <MapPin className="text-blue-600 w-5 h-5 shrink-0" />
                      <div className="w-full">
                        <label className="block text-xs text-slate-400 font-medium uppercase">
                          Origine (Aéroport)
                        </label>
                        <input
                          type="text"
                          value={origin}
                          onChange={(e) => setOrigin(e.target.value)}
                          className="w-full bg-transparent font-semibold text-slate-800 focus:outline-none text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 transition">
                      <MapPin className="text-blue-600 w-5 h-5 shrink-0" />
                      <div className="w-full">
                        <label className="block text-xs text-slate-400 font-medium uppercase">
                          Destination
                        </label>
                        <input
                          type="text"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          className="w-full bg-transparent font-semibold text-slate-800 focus:outline-none text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 transition">
                      <Calendar className="text-blue-600 w-5 h-5 shrink-0" />
                      <div className="w-full">
                        <label className="block text-xs text-slate-400 font-medium uppercase">
                          Date d'aller
                        </label>
                        <input
                          type="date"
                          value={departureDate}
                          onChange={(e) => setDepartureDate(e.target.value)}
                          className="w-full bg-transparent font-semibold text-slate-800 focus:outline-none text-sm cursor-pointer"
                        />
                      </div>
                    </div>

                    {tripType === 'round-trip' && (
                      <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 transition">
                        <Calendar className="text-blue-600 w-5 h-5 shrink-0" />
                        <div className="w-full">
                          <label className="block text-xs text-slate-400 font-medium uppercase">
                            Date de retour
                          </label>
                          <input
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            className="w-full bg-transparent font-semibold text-slate-800 focus:outline-none text-sm cursor-pointer"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {legs.map((leg, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 relative"
                      >
                        <div className="flex items-center space-x-2 bg-white p-2.5 rounded-lg border border-slate-200">
                          <MapPin className="text-blue-600 w-4 h-4 shrink-0" />
                          <input
                            type="text"
                            value={leg.origin}
                            onChange={(e) =>
                              handleLegChange(index, 'origin', e.target.value)
                            }
                            className="w-full bg-transparent font-medium text-slate-800 focus:outline-none text-sm"
                          />
                        </div>
                        <div className="flex items-center space-x-2 bg-white p-2.5 rounded-lg border border-slate-200">
                          <MapPin className="text-blue-600 w-4 h-4 shrink-0" />
                          <input
                            type="text"
                            value={leg.destination}
                            onChange={(e) =>
                              handleLegChange(
                                index,
                                'destination',
                                e.target.value
                              )
                            }
                            className="w-full bg-transparent font-medium text-slate-800 focus:outline-none text-sm"
                          />
                        </div>
                        <div className="flex items-center justify-between space-x-2 bg-white p-2.5 rounded-lg border border-slate-200">
                          <div className="flex items-center space-x-2 w-full">
                            <Calendar className="text-blue-600 w-4 h-4 shrink-0" />
                            <input
                              type="date"
                              value={leg.date}
                              onChange={(e) =>
                                handleLegChange(index, 'date', e.target.value)
                              }
                              className="w-full bg-transparent font-medium text-slate-800 focus:outline-none text-sm cursor-pointer"
                            />
                          </div>
                          {legs.length > 2 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveLeg(index)}
                              className="text-red-500 hover:text-red-700 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddLeg}
                      className="flex items-center space-x-2 text-sm font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Ajouter un vol</span>
                    </button>
                  </div>
                )}
              </>
            )}

            {/* --- ONGLET TRANSPORT ROUTIER --- */}
            {activeService === 'road' && (
              <>
                <div className="flex space-x-2 mb-4 bg-slate-50 p-1 rounded-xl w-fit border border-slate-100">
                  <button
                    type="button"
                    onClick={() => setRoadType('bus')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                      roadType === 'bus'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Bus VIP Interurbain
                  </button>
                  <button
                    type="button"
                    onClick={() => setRoadType('shuttle')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                      roadType === 'shuttle'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Navette Aéroport
                  </button>
                  <button
                    type="button"
                    onClick={() => setRoadType('private')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                      roadType === 'private'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Location avec Chauffeur
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 transition">
                    <MapPin className="text-blue-600 w-5 h-5 shrink-0" />
                    <div className="w-full">
                      <label className="block text-xs text-slate-400 font-medium uppercase">
                        Gare / Ville de départ
                      </label>
                      <input
                        type="text"
                        value={roadOrigin}
                        onChange={(e) => setRoadOrigin(e.target.value)}
                        placeholder="Ex: Brazzaville"
                        className="w-full bg-transparent font-semibold text-slate-800 focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 transition">
                    <MapPin className="text-blue-600 w-5 h-5 shrink-0" />
                    <div className="w-full">
                      <label className="block text-xs text-slate-400 font-medium uppercase">
                        Ville d'arrivée
                      </label>
                      <input
                        type="text"
                        value={roadDestination}
                        onChange={(e) => setRoadDestination(e.target.value)}
                        placeholder="Ex: Pointe-Noire"
                        className="w-full bg-transparent font-semibold text-slate-800 focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 transition">
                    <Calendar className="text-blue-600 w-5 h-5 shrink-0" />
                    <div className="w-full">
                      <label className="block text-xs text-slate-400 font-medium uppercase">
                        Date du trajet routier
                      </label>
                      <input
                        type="date"
                        value={roadDate}
                        onChange={(e) => setRoadDate(e.target.value)}
                        className="w-full bg-transparent font-semibold text-slate-800 focus:outline-none text-sm cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 transition">
                    <Users className="text-blue-600 w-5 h-5 shrink-0" />
                    <div className="w-full">
                      <label className="block text-xs text-slate-400 font-medium uppercase">
                        Nombre de passagers
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={passengers}
                        onChange={(e) => setPassengers(e.target.value)}
                        className="w-full bg-transparent font-semibold text-slate-800 focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* --- ONGLET HÔTELS AU CONGO --- */}
            {activeService === 'hotel' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 transition">
                  <Building2 className="text-blue-600 w-5 h-5 shrink-0" />
                  <div className="w-full">
                    <label className="block text-xs text-slate-400 font-medium uppercase">
                      Ville ou Région
                    </label>
                    <select
                      value={hotelCity}
                      onChange={(e) => setHotelCity(e.target.value)}
                      className="w-full bg-transparent font-semibold text-slate-800 focus:outline-none text-sm cursor-pointer"
                    >
                      <option value="Brazzaville">Brazzaville</option>
                      <option value="Pointe-Noire">Pointe-Noire</option>
                      <option value="Dolisie">Dolisie</option>
                      <option value="Oyo">Oyo</option>
                      <option value="Kinkala">Kinkala</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 transition">
                    <Calendar className="text-blue-600 w-5 h-5 shrink-0" />
                    <div className="w-full">
                      <label className="block text-xs text-slate-400 font-medium uppercase">
                        Date d'arrivée (Check-in)
                      </label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-transparent font-semibold text-slate-800 focus:outline-none text-sm cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 transition">
                    <Calendar className="text-blue-600 w-5 h-5 shrink-0" />
                    <div className="w-full">
                      <label className="block text-xs text-slate-400 font-medium uppercase">
                        Date de départ (Check-out)
                      </label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-transparent font-semibold text-slate-800 focus:outline-none text-sm cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 transition">
                    <Users className="text-blue-600 w-5 h-5 shrink-0" />
                    <div className="w-full">
                      <label className="block text-xs text-slate-400 font-medium uppercase">
                        Adultes
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={adults}
                        onChange={(e) => setAdults(e.target.value)}
                        className="w-full bg-transparent font-semibold text-slate-800 focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 transition">
                    <Users className="text-blue-600 w-5 h-5 shrink-0" />
                    <div className="w-full">
                      <label className="block text-xs text-slate-400 font-medium uppercase">
                        Enfants
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={children}
                        onChange={(e) => setChildren(e.target.value)}
                        className="w-full bg-transparent font-semibold text-slate-800 focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 transition">
                    <Bed className="text-blue-600 w-5 h-5 shrink-0" />
                    <div className="w-full">
                      <label className="block text-xs text-slate-400 font-medium uppercase">
                        Chambres
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={rooms}
                        onChange={(e) => setRooms(e.target.value)}
                        className="w-full bg-transparent font-semibold text-slate-800 focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- ONGLET CIRCUITS TOURISTIQUES --- */}
            {activeService === 'circuit' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 transition">
                    <Compass className="text-blue-600 w-5 h-5 shrink-0" />
                    <div className="w-full">
                      <label className="block text-xs text-slate-400 font-medium uppercase">
                        Destination / Parc / Site
                      </label>
                      <select
                        value={circuitDestination}
                        onChange={(e) => setCircuitDestination(e.target.value)}
                        className="w-full bg-transparent font-semibold text-slate-800 focus:outline-none text-sm cursor-pointer"
                      >
                        <option value="Odzala-Kokoua">
                          Parc National d'Odzala-Kokoua
                        </option>
                        <option value="Réserve Lesio-Louna">
                          Réserve des Gorilles de Lesio-Louna
                        </option>
                        <option value="Chutes de la Loufoulakari">
                          Chutes de la Loufoulakari
                        </option>
                        <option value="Brazzaville & Fleuve Congo">
                          Brazzaville & Croisière Fleuve Congo
                        </option>
                        <option value="Pointe-Noire & Loango">
                          Pointe-Noire & Gorges de Diosso
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 transition">
                    <Compass className="text-blue-600 w-5 h-5 shrink-0" />
                    <div className="w-full">
                      <label className="block text-xs text-slate-400 font-medium uppercase">
                        Thématique du circuit
                      </label>
                      <select
                        value={circuitTheme}
                        onChange={(e) => setCircuitTheme(e.target.value)}
                        className="w-full bg-transparent font-semibold text-slate-800 focus:outline-none text-sm cursor-pointer"
                      >
                        <option value="safari">Safari & Faune Sauvage</option>
                        <option value="river">Fleuve & Croisière</option>
                        <option value="culture">Culture & Histoire</option>
                        <option value="adventure">Aventure & Randonnée</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 transition">
                    <Calendar className="text-blue-600 w-5 h-5 shrink-0" />
                    <div className="w-full">
                      <label className="block text-xs text-slate-400 font-medium uppercase">
                        Date de début
                      </label>
                      <input
                        type="date"
                        value={circuitDate}
                        onChange={(e) => setCircuitDate(e.target.value)}
                        className="w-full bg-transparent font-semibold text-slate-800 focus:outline-none text-sm cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 transition">
                    <Users className="text-blue-600 w-5 h-5 shrink-0" />
                    <div className="w-full">
                      <label className="block text-xs text-slate-400 font-medium uppercase">
                        Participants
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="15"
                        value={circuitParticipants}
                        onChange={(e) => setCircuitParticipants(e.target.value)}
                        className="w-full bg-transparent font-semibold text-slate-800 focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center justify-center space-x-2 py-3.5 transition shadow-md cursor-pointer"
            >
              <Search className="w-5 h-5" />
              <span>
                {activeService === 'flight' &&
                  'Rechercher les vols disponibles'}
                {activeService === 'road' &&
                  'Rechercher les solutions de transport'}
                {activeService === 'hotel' && 'Rechercher les hôtels au Congo'}
                {activeService === 'circuit' &&
                  'Rechercher les circuits touristiques'}
              </span>
            </button>
          </form>
        </div>
      </section>

      {/* Destinations populaires */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Destinations & Circuits phares au Congo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              city: 'Pointe-Noire',
              country: 'Hôtels de côte & Route',
              price: 'Séjours & Résidences',
              image:
                'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=600&q=80',
            },
            {
              city: 'Odzala-Kokoua',
              country: 'Parc National & Lodges',
              price: 'Circuit touristique',
              image:
                'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
            },
            {
              city: 'Brazzaville & Chutes',
              country: "Capitale & Hôtels d'affaires",
              price: 'Guide Mapping actif',
              image:
                'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group"
            >
              <div className="h-36 overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.city}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-slate-900">
                  {item.city}
                </h3>
                <p className="text-sm text-slate-500 mb-3">{item.country}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                    {item.price}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODALE DE CONFIRMATION */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-100 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2 text-blue-600 font-bold">
                {activeService === 'flight' && <Plane className="w-5 h-5" />}
                {activeService === 'road' && <Bus className="w-5 h-5" />}
                {activeService === 'hotel' && <Building2 className="w-5 h-5" />}
                {activeService === 'circuit' && <Compass className="w-5 h-5" />}
                <span className="text-lg">Récapitulatif LHODAC</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 py-3 border-y border-slate-100 text-sm">
              {activeService === 'flight' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Service :</span>
                    <span className="font-semibold text-slate-800">
                      Billet d'Avion
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Trajet :</span>
                    <span className="font-semibold text-slate-800">
                      {origin} ➔ {destination}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date d'aller :</span>
                    <span className="font-semibold text-slate-800">
                      {departureDate}
                    </span>
                  </div>
                </>
              )}

              {activeService === 'road' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Service :</span>
                    <span className="font-semibold text-slate-800">
                      {roadType === 'bus' && 'Bus VIP Interurbain'}
                      {roadType === 'shuttle' && 'Navette Aéroport'}
                      {roadType === 'private' && 'Location avec Chauffeur'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Trajet routier :</span>
                    <span className="font-semibold text-slate-800">
                      {roadOrigin} ➔ {roadDestination}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date :</span>
                    <span className="font-semibold text-slate-800">
                      {roadDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Passagers :</span>
                    <span className="font-semibold text-slate-800">
                      {passengers} personne(s)
                    </span>
                  </div>
                </>
              )}

              {activeService === 'hotel' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Service :</span>
                    <span className="font-semibold text-slate-800">
                      Hôtel au Congo
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Destination :</span>
                    <span className="font-semibold text-slate-800">
                      {hotelCity}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Check-in :</span>
                    <span className="font-semibold text-slate-800">
                      {checkIn}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Check-out :</span>
                    <span className="font-semibold text-slate-800">
                      {checkOut}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Composition :</span>
                    <span className="font-semibold text-slate-800">
                      {adults} adulte(s), {children} enfant(s), {rooms}{' '}
                      chambre(s)
                    </span>
                  </div>
                </>
              )}

              {activeService === 'circuit' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Service :</span>
                    <span className="font-semibold text-slate-800">
                      Circuit Touristique
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Destination :</span>
                    <span className="font-semibold text-slate-800">
                      {circuitDestination}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Thématique :</span>
                    <span className="font-semibold text-slate-800 capitalize">
                      {circuitTheme}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date de départ :</span>
                    <span className="font-semibold text-slate-800">
                      {circuitDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Participants :</span>
                    <span className="font-semibold text-slate-800">
                      {circuitParticipants} personne(s)
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl transition text-sm cursor-pointer"
              >
                Modifier
              </button>
              <button
                onClick={() => {
                  alert(
                    'Réservation du circuit touristique enregistrée avec succès !'
                  );
                  setIsModalOpen(false);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition text-sm shadow-md cursor-pointer"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
