// components/Cart.js
"use client";

import { useState } from 'react';
import { useCart } from './CartContext';

export default function Cart() {
  const { items, totalAmount, updateQuantity, removeItem } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!items.length) {
    return <p className="text-sm text-white/80">Votre panier est vide.</p>;
  }

  const handleCheckoutCart = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Erreur serveur');
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Pas d'URL de session Stripe");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Impossible de lancer le paiement Stripe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-sm text-white">
      <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {items.map((item) => (
          <li key={item.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium flex-1">{item.title}</span>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-400 hover:text-red-300 ml-2"
                title="Retirer du panier"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center"
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center"
                >
                  +
                </button>
              </div>
              
              <span className="text-white/90 font-semibold">
                {item.price}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 pt-4 border-t border-white/20">
        <p className="text-lg font-bold mb-4">
          Total :{' '}
          {new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
          }).format((totalAmount || 0) / 100)}
        </p>

        <button
          className="w-full px-4 py-3 rounded-xl bg-emerald-500/80 hover:bg-emerald-500 disabled:bg-gray-500 disabled:cursor-not-allowed font-bold text-white transition-colors"
          onClick={handleCheckoutCart}
          disabled={loading}
        >
          {loading ? 'Redirection…' : 'Payer le panier'}
        </button>

        {error && (
          <p className="mt-2 text-xs text-red-300 bg-red-500/20 rounded-lg p-2">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
