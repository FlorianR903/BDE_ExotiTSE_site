// components/Cart.js
"use client";

import { useState } from 'react';
import { useCart } from './CartContext';

export default function Cart() {
  const { items, totalAmount } = useCart();
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
        body: JSON.stringify({ items }), // ⚠️ on envoie tout le panier
      });

      if (!res.ok) {
        throw new Error('Erreur serveur');
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // redirection vers Stripe Checkout
      } else {
        throw new Error("Pas d'URL de session Stripe");
      }
    } catch (err) {
      console.error(err);
      setError("Impossible de lancer le paiement Stripe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-sm text-white">
      <ul className="space-y-1 max-h-48 overflow-y-auto">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between gap-2">
            <span>{item.title}</span>
            <span>x{item.quantity}</span>
          </li>
        ))}
      </ul>

      <p className="mt-2 font-semibold">
        Total estimé :{' '}
        {new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'EUR',
        }).format((totalAmount || 0) / 100)}
      </p>

      <button
        className="mt-3 w-full px-4 py-2 rounded-xl bg-emerald-500/80 hover:bg-emerald-500 font-bold text-white"
        onClick={handleCheckoutCart}
        disabled={loading}
      >
        {loading ? 'Redirection…' : 'Payer le panier'}
      </button>

      {error && (
        <p className="mt-2 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
