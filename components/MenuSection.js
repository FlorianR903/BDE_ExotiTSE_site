// components/MenuSection.js
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import CheckoutModal from './CheckoutModal';

export default function MenuSection({ items = [] }) {
  const [menu, setMenu] = useState(items);
  const [loading, setLoading] = useState(items.length === 0);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  const { addItem } = useCart();
  const [toast, setToast] = useState(null);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const currentHour = date.getHours();

    // Si on est entre 00h et 02h, on considère que c'est encore le menu de la veille (ex: Lundi soir déborde sur Mardi matin)
    if (currentHour >= 0 && currentHour < 1) {
      date.setDate(date.getDate() - 1);
    }

    const options = { weekday: 'long' };
    const formatted = date.toLocaleDateString('fr-FR', options);
    setCurrentDate(formatted.charAt(0).toUpperCase() + formatted.slice(1));
  }, []);

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
        const now = new Date();
        const currentHour = now.getHours();
        const days = ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'];
        
        let targetDayIndex = -1;

        // Logique d'affichage :
        // 1. ENTRE 02h00 ET 19H00 => RIEN NE S'AFFICHE
        const currentMinute = now.getMinutes();

        // 1. ENTRE 02h00 ET 19H30 => RIEN NE S'AFFICHE
        if (
          (currentHour >= 2 && currentHour < 19) ||
          (currentHour === 19 && currentMinute < 30)
        ) {
          // targetDayIndex reste -1, donc rien ne sera affiché
        } 
        // 2. ENTRE 00h00 ET 01h00 => ON AFFICHE LE MENU DE LA VEILLE
        else if (currentHour >= 0 && currentHour < 1) {
          // On recule d'un jour. Si on est Dimanche (0), on veut Samedi (6).
          targetDayIndex = (now.getDay() - 1 + 7) % 7;
        } 
        // 3. À PARTIR DE 19H30 JUSQU'À MINUIT => ON AFFICHE LE MENU DU JOUR
        else {
          targetDayIndex = now.getDay();
        }

        const filteredData = targetDayIndex === -1 ? [] : data.filter((item) => {
          // Si pas de métadonnée 'Day', on l'affiche tout le temps
          if (!item.day) return true;
          
          const targetDayName = days[targetDayIndex];
          
          // Compatibilité : supporte "lun", "Lundi", "LUN"
          const itemDayNormalized = item.day.toLowerCase().slice(0, 3);
          
          return itemDayNormalized === targetDayName;
        });

          setMenu(filteredData);
        } else {
          setError("Aucun produit disponible pour le moment.");
          setMenu([]);
        }
      } catch (err) {
        console.error(err);
        setError("Impossible de charger le menu en ligne.");
        setMenu([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [items]);

  // ➕ Ajouter au panier
  const handleAddToCart = (item) => {
    addItem(item); 
    setToast(`${item.title} ajouté au panier !`);
    setTimeout(() => setToast(null), 3000);
  };

  // 💳 Commander directement (1 exemplaire) via Stripe Checkout
  const handleDirectCheckout = async (item) => {
    try {
      if (!item.stripePriceId) {
        setToast('Erreur: Produit non disponible à l\'achat (ID manquant)');
        setTimeout(() => setToast(null), 3000);
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

      const data = await res.json();

      if (!res.ok) {
        console.error('Erreur serveur lors de la création de la session:', data.error);
        setToast(`Erreur: ${data.error || 'Erreur serveur'}`);
        setTimeout(() => setToast(null), 3000);
        return;
      }

      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        console.error('Pas de clientSecret reçu');
        setToast("Erreur: Pas de secret de session");
        setTimeout(() => setToast(null), 3000);
      }
    } catch (err) {
      console.error('Erreur Stripe Checkout :', err);
      setToast("Erreur de connexion au service de paiement");
      setTimeout(() => setToast(null), 3000);
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
      {clientSecret && (
        <CheckoutModal 
          clientSecret={clientSecret} 
          onClose={() => setClientSecret(null)} 
        />
      )}

      {toast && (
        <div className="fixed top-24 right-6 z-50 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-2xl animate-bounce">
          {toast}
        </div>
      )}

      <h2 className="text-5xl font-extrabold text-center mb-12">
        Menu du {currentDate || '...'}
      </h2>

      {loading && (
        <p className="text-center text-white/80 mb-6">Chargement du menu…</p>
      )}
      {error && (
        <div className="text-center mb-6">
            <p className="text-red-400 text-lg font-semibold">{error}</p>
            <p className="text-white/60 text-sm mt-2">Veuillez réessayer plus tard.</p>
        </div>
      )}

      {/* Si le menu est vide (hors horaires d'ouverture ou pas de plat) et qu'il n'y a pas d'erreur */}
      {!loading && !error && menu.length === 0 && (
        <div className="text-center py-12 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10 max-w-2xl mx-auto">
          <p className="text-3xl font-bold text-white mb-4">La commande est disponible à 19H30</p>
          <p className="text-white/60 text-lg">Revenez un peu plus tard pour commander nos plats !</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {menu.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl
                       hover:scale-[1.03] transition-all text-white flex flex-col h-full"
          >
            {/* Image */}
            <div className="w-24 h-24 bg-white/20 rounded-xl overflow-hidden mb-4 mx-auto flex items-center justify-center flex-shrink-0">
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
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <span className="text-lg font-bold bg-white/20 px-3 py-1 rounded-xl whitespace-nowrap ml-2">
                {item.price}
              </span>
            </div>

            <p className="mt-2 text-white/80 text-sm flex-grow mb-6">{item.desc}</p>

            {/* Boutons */}
            <div className="mt-auto flex gap-3">
              <button
                className="flex-1 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 font-bold text-white text-sm"
                onClick={() => handleAddToCart(item)}
              >
                Ajouter au panier
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
