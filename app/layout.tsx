'use client';

import './globals.css';
import Link from 'next/link';
import { Compass, BookmarkCheck, ArrowLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {/* En-tête global unique */}
        <header className="bg-blue-900 text-white p-4 shadow-md">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            
            <div className="flex items-center space-x-4">
              {/* Le bouton Retour n'apparaît PAS sur la page d'accueil */}
              {!isHome && (
                <a
                  href="javascript:history.back()"
                  className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition flex items-center space-x-1 text-sm font-medium"
                  title="Retour"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="hidden md:inline">Retour</span>
                </a>
              )}

              <Link href="/" className="flex items-center space-x-3 group">
                <div className="bg-white/10 p-2 rounded-xl group-hover:bg-white/20 transition">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-extrabold tracking-wider">LHODAC</h1>
                  <p className="text-[10px] text-blue-200 uppercase tracking-widest">Voyages & Logistique</p>
                </div>
              </Link>
            </div>

            {/* Navigation principale */}
            <nav className="space-x-6 text-sm font-medium flex items-center">
              <Link href="/" className="hover:underline flex items-center space-x-1">
                <span>Accueil</span>
              </Link>
              <Link href="/reservations" className="hover:underline flex items-center space-x-1">
                <BookmarkCheck className="w-4 h-4 inline mr-1" />
                <span>Mes Réservations</span>
              </Link>
            </nav>

          </div>
        </header>

        {/* Contenu dynamique */}
        <main>{children}</main>
      </body>
    </html>
  );
}