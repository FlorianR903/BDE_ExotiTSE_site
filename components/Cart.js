// components/Cart.js
"use client";

import { useState } from 'react';
import { useCart } from './CartContext';
// import CheckoutModal from './CheckoutModal'; // REPLACED: SumUp ne nécessite pas ce modal Stripe

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

      // Filtrer les items qui n'ont pas de stripePriceId (maintenant appelé internal ID)
      const validItems = items.filter(item => item.stripePriceId);
      if (validItems.length === 0) {
        throw new Error("Aucun article valide pour le paiement.");
      }

      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: validItems }), 
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erreur serveur');
      }

      if (data.checkoutId) {
        // --- LOGIQUE SUMUP ---
        // SumUp nécessite souvent l'utilisation de leur SDK Widget ou une redirection spécifique.
        // Comme nous n'avons pas le SDK chargé, nous affichons l'ID.
        // IDÉALEMENT: Rediriger vers une page de paiement ou ouvrir le widget SumUp ici.
        // Pour l'instant, simulons une "commande créée" car l'intégration complète Front SumUp requiert un script externe.
        alert(`Commande SumUp créée avec succès ! ID: ${data.checkoutId}\n(Intégration du widget à finaliser)`);
        
        // TODO: Implémenter le widget SumUp : https://developer.sumup.com/docs/checkouts/
        
      } else {
        throw new Error("Pas de checkoutId reçu de SumUp");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Impossible de lancer le paiement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-sm text-white">
      {/* Simulation checkout */}
      <ul className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
        {items.map((item) => (
          <li key={item.id} className="flex flex-col gap-1 bg-white/5 p-2 rounded-lg border border-white/10">
            <div className="flex justify-between items-start">
                <span className="font-medium leading-tight">{item.title}</span>
                <span className="text-xs opacity-70 whitespace-nowrap ml-2">{item.price}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-1 bg-white/10 rounded-lg px-1 py-0.5">
                    <button 
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded transition-colors"
                    >-</button>
                    <span className="text-sm w-6 text-center font-mono">{item.quantity}</span>
                    <button 
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded transition-colors"
                    >+</button>
                </div>
                <button 
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-red-300 hover:text-red-200 hover:underline px-2"
                >
                    Retirer
                </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 pt-3 border-t border-white/10">
        <p className="font-semibold flex justify-between items-center text-lg">
          <span>Total :</span>
          <span>
            {new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR',
            }).format((totalAmount || 0) / 100)}
          </span>
        </p>
      </div>

      <button
        className="mt-4 w-full px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 font-bold text-white transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleCheckoutCart}
        disabled={loading}
      >
        {loading ? 'Redirection…' : 'Payer le panier'}
      </button>

      {error && (
        <p className="mt-3 text-xs text-red-300 bg-red-500/10 p-2 rounded border border-red-500/20">
          {error}
        </p>
      )}
    </div>
  );
}
