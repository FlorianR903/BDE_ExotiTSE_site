// components/MenuSection.js
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useCart } from './CartContext';

export default function MenuSection({ items = [] }) {
  const fallbackMenu = [
    { img: '/placeholder.jpg', id: 1, title: 'Rougail saucisse', price: '8€', desc: 'Saucisse, riz, tomates, oignons, épices' },
    { img: '/placeholder.jpg', id: 2, title: 'Virgin Paradise', price: '5€', desc: 'Mocktail fruits tropicaux' },
    { img: '/placeholder.jpg', id: 3, title: 'Poke Bowl BDE', price: '8€', desc: 'Base riz, mangue, saumon ou végé' },
    { img: '/placeholder.jpg', id: 4, title: 'Wrap Poulet Crunch', price: '6€', desc: 'Wrap croustillant sauce maison' },
    { img: '/placeholder.jpg', id: 5, title: 'Assiette Apéro', price: '7€', desc: 'Nachos, guacamole & tapas' },
    { img: '/placeholder.jpg', id: 6, title: 'Smoothie Energy', price: '4€', desc: 'Banane, fraise, lait d’amande' },
  ];

  const [menu, setMenu] = useState(items.length > 0 ? items : fallbackMenu);
  const [loading, setLoading] = useState(items.length === 0);
  const [error, setError] = useState(null);

  const { addItem } = useCart();
  const [addedItemId, setAddedItemId] = useState(null);

  // 🔁 récupère les produits Stripe via /api/menu
  useEffect(() => {
    if (items.length > 0) {
      setMenu(items);
      setLoading(false);
      return;
    }

    const fetchMenu = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/menu');
        if (!res.ok) throw new Error('Erreur serveur');
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setMenu(data);
        } else {
          setMenu(fallbackMenu);
        }
      } catch (err) {
        console.error(err);
        setError("Impossible de charger le menu en ligne. Affichage du menu par défaut.");
        setMenu(fallbackMenu);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [items]);

  // ➕ Ajouter au panier
  const handleAddToCart = (item) => {
    addItem(item); // CartContext s’occupe d’incrémenter la quantité
  };

  // 💳 Commander directement (1 exemplaire) via Stripe Checkout
  const handleDirectCheckout = async (item) => {
    try {
      if (!item.stripePriceId) {
        console.warn('Aucun stripePriceId pour cet item, impossible de lancer Stripe :', item);
        return;
      }

      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [
            {
              stripePriceId: item.stripePriceId,
              quantity: 1,
            },
          ],
        }),
      });

      if (!res.ok) {
        console.error('Erreur serveur lors de la création de la session');
        return;
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Pas d’URL de session Stripe');
      }
    } catch (err) {
      console.error('Erreur Stripe Checkout :', err);
    }
  };

  return (
    <motion.section
      className="py-24 px-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-5xl font-extrabold text-center mb-12">Menu</h2>

      {loading && (
        <p className="text-center text-white/80 mb-6">Chargement du menu…</p>
      )}
      {error && (
        <p className="text-center text-red-400 mb-6 text-sm">{error}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {menu.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl
                       hover:scale-[1.03] transition-all text-white"
          >
            {/* Image */}
            <div className="w-24 h-24 bg-white/20 rounded-xl overflow-hidden mb-4 mx-auto flex items-center justify-center">
              {item.img ? (
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl text-white/50">+</span>
              )}
            </div>

            {/* Infos plat */}
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <span className="text-lg font-bold bg-white/20 px-3 py-1 rounded-xl">
                {item.price}
              </span>
            </div>

            <p className="mt-4 text-white/80 text-sm">{item.desc}</p>

            {/* Boutons */}
            <div className="mt-6 flex gap-3">
              <button
                className={`flex-1 px-4 py-2 rounded-xl font-bold text-white text-sm transition-all ${
                  addedItemId === item.id
                    ? 'bg-emerald-500 scale-105'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
                onClick={() => handleAddToCart(item)}
              >
                {addedItemId === item.id ? '✓ Ajouté !' : 'Ajouter au panier'}
              </button>

              <button
                className={`flex-1 px-4 py-2 rounded-xl font-bold text-white text-sm ${
                  item.stripePriceId
                    ? 'bg-emerald-500/80 hover:bg-emerald-500'
                    : 'bg-gray-500/60 cursor-not-allowed'
                }`}
                onClick={() => item.stripePriceId && handleDirectCheckout(item)}
                disabled={!item.stripePriceId}
              >
                Commander
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
