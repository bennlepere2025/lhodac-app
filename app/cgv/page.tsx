'use client';

import { ShieldCheck } from 'lucide-react';

export default function CGVPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 py-12 text-gray-800">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
        <div className="flex items-center space-x-3 mb-6 text-blue-900">
          <ShieldCheck className="w-8 h-8" />
          <h1 className="text-3xl font-extrabold">Conditions Générales de Vente (CGV)</h1>
        </div>
        <p className="text-xs text-gray-500 mb-8 uppercase tracking-widest">LHODAC — Voyages & Logistique • République du Congo</p>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-blue-900 mb-2">1. Objet et Champ d'Application</h2>
            <p>
              Les présentes CGV régissent l'ensemble des services de réservation en ligne (Vols, Hôtels, Transport routier et Circuits touristiques) proposés par la plateforme <strong>LHODAC</strong>. Toute réservation validée implique l'adhésion entière et sans réserve du client aux présentes conditions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-blue-900 mb-2">2. Processus de Réservation et Validation</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Étapes :</strong> Le client sélectionne son service, renseigne ses informations personnelles (conformes à ses pièces d'identité officielles), vérifie le récapitulatif, accepte les présentes CGV, puis procède au choix du mode de paiement.</li>
              <li><strong>Confirmation :</strong> La réservation devient définitive après validation du paiement (Mobile Money ou Carte bancaire) et réception de l'e-mail de confirmation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-blue-900 mb-2">3. Tarifs et Modalités de Paiement</h2>
            <p>
              Les prix sont affichés en Francs CFA (XAF). Les transactions s'effectuent via les solutions sécurisées intégrées (MTN Mobile Money, Airtel Money, Cartes bancaires). Le service ne sera émis qu'après confirmation de l'encaissement total.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-blue-900 mb-2">4. Politique d'Annulation et de Remboursement</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Vols et Transport :</strong> Soumis aux conditions tarifaires de la compagnie aérienne ou du transporteur terrestre partenaire.</li>
              <li><strong>Hôtels et Circuits :</strong> Annulation gratuite jusqu'à 48 à 72 heures avant la date de début de la prestation (sauf mention contraire de l'établissement). Passé ce délai, des pénalités équivalentes à la première nuit ou à 50% du montant global pourront être retenues.</li>
              <li><strong>Annulation par LHODAC :</strong> En cas d'annulation imputable à la plateforme ou à un prestataire, le remboursement intégral des sommes versées sera effectué via le même canal de paiement dans un délai maximum de 14 jours ouvrés.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-blue-900 mb-2">5. Responsabilité</h2>
            <p>
              <strong>LHODAC</strong> agit en qualité d'intermédiaire technologique entre le client et les prestataires finaux (compagnies aériennes, hôteliers, transporteurs routiers, gestionnaires de parcs). La responsabilité de LHODAC ne saurait être engagée en cas de retard, de modification d'horaires ou de force majeure relevant de la responsabilité exclusive des prestataires.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-blue-900 mb-2">6. Protection des Données Personnelles</h2>
            <p>
              Les informations collectées lors des réservations (nom, passeport, contacts) sont strictement nécessaires au traitement des dossiers par les prestataires et les autorités compétentes. Elles font l'objet d'un traitement sécurisé.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-blue-900 mb-2">7. Droit Applicable et Règlement des Litiges</h2>
            <p>
              Les présentes CGV sont soumises à la législation de la <strong>République du Congo</strong>. En cas de litige non résolu à l'amiable dans un délai de 30 jours, le différend sera soumis à la compétence exclusive des tribunaux de <strong>Brazzaville</strong>, sous réserve des conventions internationales applicables.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}