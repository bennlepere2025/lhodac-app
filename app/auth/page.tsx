'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { registerUser, loginUser } from '@/actions/auth';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (isLogin) {
        const res = await loginUser(email, password);
        if (res.success) {
          setMessage(res.message);
          // Redirection vers le dashboard ou l'accueil après connexion
          setTimeout(() => { window.location.href = '/dashboard'; }, 1000);
        } else {
          setError(res.error || 'Erreur de connexion');
        }
      } else {
        const res = await registerUser(email, password);
        if (res.success) {
          setMessage(res.message);
          setIsLogin(true); // Basculer vers la connexion
        } else {
          setError(res.error || "Erreur d'inscription");
        }
      }
    } catch (err) {
      setError('Une erreur technique est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-blue-900">
          LHODAC Espace Client
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLogin ? 'Connectez-vous pour suivre vos réservations' : 'Créez votre compte en quelques secondes'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start space-x-2 text-sm text-red-700">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {message && (
            <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4 rounded-md flex items-start space-x-2 text-sm text-green-700">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span>{message}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase">Adresse Email</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@exemple.com"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-blue-900 focus:border-blue-900 text-sm text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase">Mot de passe</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 caractères (lettres, chiffres, symboles)"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-blue-900 focus:border-blue-900 text-sm text-gray-900"
                />
              </div>
              {!isLogin && (
                <p className="mt-1 text-xs text-gray-500">
                  Minimum 8 caractères requis avec des lettres, des chiffres et des symboles.
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 transition space-x-2 disabled:opacity-50"
              >
                <span>{loading ? 'Traitement...' : isLogin ? 'Se connecter' : 'Créer mon compte'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); setMessage(''); }}
              className="text-sm font-medium text-blue-900 hover:underline"
            >
              {isLogin ? "Pas encore de compte ? S'inscrire" : 'Déjà un compte ? Se connecter'}
            </button>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-4 text-center">
            <Link href="/" className="text-xs text-gray-500 hover:text-blue-900 underline">
              ← Retour à l'accueil LHODAC
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}