import { useRouter } from 'next/router';
import Layout from '../Layout';

export default function CancelPage() {
  const router = useRouter();

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center">
          <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Paiement annulé
          </h1>

          <p className="text-white/80 mb-6">
            Votre commande n'a pas été finalisée. Vos articles sont toujours
            dans votre panier.
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push('/menu')}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-colors"
            >
              Retour au menu
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold transition-colors"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
