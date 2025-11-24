import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../Layout';
import { useCart } from '../components/CartContext';

export default function SuccessPage() {
  const router = useRouter();
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart after successful payment
    clearCart();
  }, [clearCart]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Paiement réussi !
          </h1>

          <p className="text-white/80 mb-6">
            Merci pour votre commande. Vous recevrez un email de confirmation
            avec les détails de votre achat.
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push('/menu')}
              className="px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold transition-colors"
            >
              Retour au menu
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-colors"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
