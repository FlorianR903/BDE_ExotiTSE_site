// components/Cart.js
"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from './CartContext';
import CheckoutModal from './CheckoutModal';

export default function Cart() {
  const { items, totalAmount, updateQuantity, removeItem, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // States for payment choice and cash form
  const [showPaymentChoice, setShowPaymentChoice] = useState(false);
  const [showCashForm, setShowCashForm] = useState(false);
  const [cashFormData, setCashFormData] = useState({
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      note: ''
  });

  if (!items.length) {
    return <p className="text-sm text-white/80">Votre panier est vide.</p>;
  }

  // Helper to render portals
  const renderPortal = (content) => {
    if (!mounted) return null;
    return createPortal(content, document.body);
  };


  // 1. Triggered when clicking "Commander"
  const handleInitialCheckoutClick = () => {
    setShowPaymentChoice(true);
    setError(null);
  };

  // 2a. Pay Online (Stripe)
  const handleStripeCheckout = async () => {
    setShowPaymentChoice(false);
    try {
      setLoading(true);
      setError(null);

      // Filter items with stripePriceId
      const validItems = items.filter(item => item.stripePriceId);
      if (validItems.length === 0) {
        throw new Error("Aucun article valide pour le paiement Stripe (manque stripePriceId).");
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

      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        throw new Error("Pas de clientSecret reçu de Stripe");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Impossible de lancer le paiement Stripe.");
    } finally {
      setLoading(false);
    }
  };

  // 2b. Pay on Delivery (CashForm)
  const handleCashClick = () => {
      setShowPaymentChoice(false);
      setShowCashForm(true);
  };

  const handleCashFormChange = (e) => {
      setCashFormData({ ...cashFormData, [e.target.name]: e.target.value });
  };

  // 3. Submit Cash Order
  const handleCashSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      try {
          const res = await fetch('/api/sendOrders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  items: items,
                  totalAmount: totalAmount,
                  ...cashFormData
              })
          });

          if (!res.ok) {
             const data = await res.json();
             throw new Error(data.message || "Erreur lors de l'envoi de la commande.");
          }

          alert("Commande envoyée avec succès ! Vous paierez à la réception.");
          if (clearCart) clearCart(); 
          else items.forEach(i => removeItem(i.id)); // Fallback

          setShowCashForm(false);

      } catch (err) {
          console.error(err);
          setError(err.message);
      } finally {
          setLoading(false);
      }
  };

  return (
    <div className="text-sm text-white">
      
      {/* Modal Stripe */}
      {clientSecret && (
        <CheckoutModal 
          clientSecret={clientSecret} 
          onClose={() => setClientSecret(null)} 
        />
      )}

      {/* Modal Payment Choice */}
      {showPaymentChoice && renderPortal(
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] p-4">
            <div className="bg-gray-900 border border-white/10 p-6 rounded-xl max-w-sm w-full relative">
                <button 
                  onClick={() => setShowPaymentChoice(false)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                >✕</button>
                <h3 className="text-xl font-bold mb-4 text-center">Moyen de paiement</h3>
                <div className="flex flex-col gap-3">
                    <button 
                        onClick={handleStripeCheckout}
                        className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <span>💳</span> Payer en ligne
                    </button>
                    <button 
                        onClick={handleCashClick}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <span>💵</span> Payer à la réception
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Modal Cash Form */}
      {showCashForm && renderPortal(
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] p-4 overflow-y-auto">
            <div className="bg-gray-900 border border-white/10 p-6 rounded-xl max-w-md w-full relative my-8">
                <button 
                  onClick={() => setShowCashForm(false)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                >✕</button>
                <h3 className="text-xl font-bold mb-6 text-center text-emerald-400">Paiement à la réception</h3>
                <form onSubmit={handleCashSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium mb-1 text-gray-400">Prénom</label>
                            <input 
                                type="text" name="firstName" required 
                                value={cashFormData.firstName} onChange={handleCashFormChange}
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder-white/20"
                                placeholder="Jean"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium mb-1 text-gray-400">Nom</label>
                            <input 
                                type="text" name="lastName" required 
                                value={cashFormData.lastName} onChange={handleCashFormChange}
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder-white/20"
                                placeholder="Dupont"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1 text-gray-400">Adresse de livraison</label>
                        <input 
                            type="text" name="address" required 
                            value={cashFormData.address} onChange={handleCashFormChange}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder-white/20"
                            placeholder="123 rue de l'Exotisme..."
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1 text-gray-400">Numéro de téléphone</label>
                        <input 
                            type="tel" name="phone" required 
                            value={cashFormData.phone} onChange={handleCashFormChange}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder-white/20"
                            placeholder="06 12 34 56 78"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1 text-gray-400">Note additionnelle (optionnel)</label>
                        <textarea 
                            name="note" 
                            rows="3"
                            value={cashFormData.note} onChange={handleCashFormChange}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder-white/20"
                            placeholder="Code porte, étage, intolérances..."
                        ></textarea>
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                        {loading ? 'Envoi de la commande...' : 'Confirmer la commande'}
                    </button>
                    <p className="text-xs text-center text-gray-500 mt-2">
                        Vous réglerez votre commande directement à la livraison.
                    </p>
                </form>
            </div>
        </div>
      )}

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
        onClick={handleInitialCheckoutClick}
        disabled={loading}
      >
        {loading ? 'Patientez…' : 'Commander'}
      </button>

      {error && (
        <p className="mt-3 text-xs text-red-300 bg-red-500/10 p-2 rounded border border-red-500/20">
          {error}
        </p>
      )}
    </div>
  );
}
