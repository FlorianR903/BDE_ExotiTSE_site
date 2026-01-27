// components/Cart.js
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/router';
import { useCart } from './CartContext';

export default function Cart() {
  const { items, totalAmount, updateQuantity, removeItem, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      email: '',
      note: ''
  });

  if (!items.length) {
    return <p className='text-sm text-white/80'>Votre panier est vide.</p>;
  }

  const renderPortal = (content) => {
    if (!mounted) return null;
    return createPortal(content, document.body);
  };

  const handleOrderClick = () => {
      setShowCheckoutForm(true);
      setError(null);
  };

  const handleFormChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      try {
          // Construct API Payload
          const orderPayload = {
              customer: {
                  fullName: (formData.firstName + ' ' + formData.lastName).trim(),
                  email: formData.email,
                  phone: formData.phone,
                  address: formData.address
              },
              items: items.map(item => ({
                  id: item.id,
                  name: item.title,
                  quantity: item.quantity,
                  price: item.priceRaw || 0
              })),
              notes: formData.note
          };

          const res = await fetch('/api/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(orderPayload)
          });

          const data = await res.json();

          if (!res.ok) {
             if (data.errors) {
                 const msg = Object.values(data.errors).flat().join(', ');
                 throw new Error(msg);
             }
             throw new Error(data.message || 'Erreur lors de l envoi de la commande.');
          }

          // Success
          clearCart();
          setShowCheckoutForm(false);
          router.push('/success'); 

      } catch (err) {
          console.error(err);
          setError(err.message);
      } finally {
          setLoading(false);
      }
  };

  return (
    <div className='text-sm text-white'>
      {/* Checkout Form Modal */}
      {showCheckoutForm && renderPortal(
        <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] p-4 overflow-y-auto'>
            <div className='bg-gray-900 border border-white/10 p-6 rounded-xl max-w-md w-full relative my-8'>
                <button 
                  onClick={() => setShowCheckoutForm(false)}
                  className='absolute top-2 right-2 text-gray-400 hover:text-white'
                >✕</button>
                <h3 className='text-xl font-bold mb-6 text-center text-emerald-400'>Finaliser la commande</h3>
                
                <form onSubmit={handleSubmit} className='space-y-4'>
                     <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-xs font-medium mb-1 text-gray-400'>Prénom *</label>
                            <input type='text' name='firstName' required value={formData.firstName} onChange={handleFormChange} className='w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-emerald-500 transition-all placeholder-white/20' placeholder='Jean' />
                        </div>
                        <div>
                            <label className='block text-xs font-medium mb-1 text-gray-400'>Nom *</label>
                            <input type='text' name='lastName' required value={formData.lastName} onChange={handleFormChange} className='w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-emerald-500 transition-all placeholder-white/20' placeholder='Dupont' />
                        </div>
                    </div>
                     <div>
                        <label className='block text-xs font-medium mb-1 text-gray-400'>Adresse de livraison *</label>
                        <input type='text' name='address' required value={formData.address} onChange={handleFormChange} className='w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-emerald-500 transition-all placeholder-white/20' placeholder='123 rue...' />
                    </div>
                    <div>
                        <label className='block text-xs font-medium mb-1 text-gray-400'>Email *</label>
                        <input type='email' name='email' required value={formData.email} onChange={handleFormChange} className='w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-emerald-500 transition-all placeholder-white/20' placeholder='email@exemple.com' />
                    </div>
                    <div>
                        <label className='block text-xs font-medium mb-1 text-gray-400'>Téléphone *</label>
                        <input type='tel' name='phone' required value={formData.phone} onChange={handleFormChange} className='w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-emerald-500 transition-all placeholder-white/20' placeholder='06...' />
                    </div>
                    <div>
                        <label className='block text-xs font-medium mb-1 text-gray-400'>Note (optionnel)</label>
                        <textarea name='note' rows='3' value={formData.note} onChange={handleFormChange} className='w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-emerald-500 transition-all placeholder-white/20' placeholder='Digicode...'></textarea>
                    </div>

                    <div className='bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20 text-center text-emerald-300 text-xs mb-4'>
                        Paiement à la livraison (Espèces ou Carte)
                    </div>

                    <button 
                        type='submit' 
                        disabled={loading}
                        className='w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {loading ? 'Envoi...' : 'Confirmer la commande'}
                    </button>
                    {error && <p className='text-red-400 text-xs text-center mt-2'>{error}</p>}
                </form>
            </div>
        </div>
      )}

      {/* Cart Items List */}
      <ul className='space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar'>
        {items.map((item) => (
          <li key={item.id} className='flex flex-col gap-1 bg-white/5 p-2 rounded-lg border border-white/10'>
            <div className='flex justify-between items-start'>
                <span className='font-medium leading-tight'>{item.title}</span>
                <span className='text-xs opacity-70 whitespace-nowrap ml-2'>{item.price}</span>
            </div>
            <div className='flex justify-between items-center mt-2'>
                <div className='flex items-center gap-1 bg-white/10 rounded-lg px-1 py-0.5'>
                    <button onClick={() => updateQuantity(item.id, (item.quantity||1) - 1)} className='w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded transition-colors'>-</button>
                    <span className='text-sm w-6 text-center font-mono'>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, (item.quantity||1) + 1)} className='w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded transition-colors'>+</button>
                </div>
                <button onClick={() => removeItem(item.id)} className='text-xs text-red-300 hover:text-red-200 hover:underline px-2'>Retirer</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Total & Button */}
      <div className='mt-4 pt-3 border-t border-white/10'>
        <p className='font-semibold flex justify-between items-center text-lg'>
          <span>Total :</span>
          <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format((totalAmount || 0) / 100)}</span>
        </p>
      </div>

      <button
        className='mt-4 w-full px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 font-bold text-white transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed'
        onClick={handleOrderClick}
        disabled={loading}
      >
        {loading ? 'Patientez…' : 'Finaliser la commande'}
      </button>

      {error && (
        <p className='mt-3 text-xs text-red-300 bg-red-500/10 p-2 rounded border border-red-500/20'>
          {error}
        </p>
      )}
    </div>
  );
}
