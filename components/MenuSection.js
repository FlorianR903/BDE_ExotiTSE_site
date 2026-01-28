// components/MenuSection.js
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from './CartContext';

export default function MenuSection({ items = [] }) {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addItem } = useCart();
  const [toast, setToast] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const date = new Date();
    const currentHour = date.getHours();

    // Si on est entre 00h et 02h, on considère que c'est encore le menu de la veille
    if (currentHour >= 0 && currentHour < 2) {
      date.setDate(date.getDate() - 1);
    }

    const options = { weekday: 'long' };
    const formatted = date.toLocaleDateString('fr-FR', options);
    setCurrentDate(formatted.charAt(0).toUpperCase() + formatted.slice(1));
  }, []);

  // 🔁 récupère les produits via /api/menu (Proxy vers API externe)
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/menu');
        if (!res.ok) throw new Error('Erreur serveur');
        const json = await res.json();
        const data = json.data || [];

        if (Array.isArray(data) && data.length > 0) {
            const now = new Date();
            const currentHour = now.getHours();
            // const currentHour = 21; // Décalage horaire temporaire +1h
            const currentMinute = now.getMinutes();
            
            // Logique d'affichage :
            const stopCommand = process.env.NEXT_PUBLIC_STOP_COMMAND === 'true';

            // 1. SI STOP COMMANDE activé => RIEN NE S'AFFICHE
            if (stopCommand) {
                setMenu([]);
                return;
            }
            // 2. ENTRE 02h00 ET 19h30 => RIEN NE S'AFFICHE
            if (currentHour >= 2 && currentHour < 19 || !(currentHour === 19 && currentMinute >= 30)) {
                 setMenu([]);
                 return;
            } 
            
            // Filtrer les produits disponibles
            const filteredData = data.filter((item) => item.available).map(item => {
                // Logique de mapping d'images
                let imageUrl = '/images/logo.png';
                const lowerName = (item.name || '').toLowerCase();
                
                if (lowerName.includes('tiramisu')) imageUrl = '/images/tiramisu_cafe.jpeg';
                else if (lowerName.includes('gratin')) imageUrl = '/images/gratin_dauphinois.jpg';
                else if (lowerName.includes('muhalabia')) imageUrl = '/images/muhalabia.jpg';
                else if (lowerName.includes('burgwer')) imageUrl = '/images/burgwer.jpg';
                else if (lowerName.includes('kontourné')) imageUrl = '/images/riz_cantonnais.jpg';
                else if (lowerName.includes('chocolat')) imageUrl = '/images/gateau_choco.jpg';


                return {
                    id: item.id,
                    title: item.name,
                    desc: item.description,
                    img: imageUrl,
                    price: new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.price),
                    priceRaw: item.price,
                    rawAmount: Math.round(item.price * 100), // Correction pour CartContext (cents)
                    quantity: item.quantity,
                    available: item.available
                };
            });

            setMenu(filteredData);
        } else {
            console.warn('Aucune donnée reçue de l API ou format incorrect');
            setMenu([]);
        }
      } catch (err) {
        console.error('Erreur fetchMenu:', err);
        setError('Impossible de charger le menu.');
        setMenu([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [items]);

  const renderPortal = (content) => {
    if (!mounted) return null;
    return createPortal(content, document.body);
  };

  // ➕ Ajout au panier
  const handleAddToCart = (item) => {
    if ((item.quantity || 0) <= 0) return;
    addItem(item); 
    setToast(`${item.title} ajouté au panier !`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <motion.section
      className='py-24 px-6 relative overflow-hidden'
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {toast && (
        <div className='fixed top-24 right-6 z-50 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-2xl animate-bounce'>
          {toast}
        </div>
      )}

      <h2 className='text-5xl font-extrabold text-center mb-12'>
        Menu du {currentDate || '...'}
      </h2>

      {loading && (
        <p className='text-center text-white/80 mb-6'>Chargement du menu…</p>
      )}
      {error && (
        <div className='text-center mb-6'>
            <p className='text-red-400 text-lg font-semibold'>{error}</p>
            <p className='text-white/60 text-sm mt-2'>Veuillez réessayer plus tard.</p>
        </div>
      )}

      {/* Si le menu est vide (hors horaires d'ouverture ou pas de plat) et qu'il n'y a pas d'erreur */}
      {!loading && !error && menu.length === 0 && (
        <div className='text-center py-12 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10 max-w-2xl mx-auto'>
          {process.env.NEXT_PUBLIC_STOP_COMMAND === 'true' ? (
                <>
                <p className='text-3xl font-bold text-white mb-4'>Merci d'avoir commandé chez Exoti'TSE !!</p>
                <p className='text-white/60 text-lg'>Les commandes sont fermées pour aujourd'hui.</p>
                </>
          ) : (
                <>
                <p className='text-3xl font-bold text-white mb-4'>La commande est disponible à 19H30</p>
                <p className='text-white/60 text-lg'>Revenez un peu plus tard pour commander nos plats !</p>
                </>
          )}
        </div>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto'>
        {menu.map((item) => (
          <div
            key={item.id}
            className='p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl
                       hover:scale-[1.03] transition-all text-white flex flex-col h-full'
          >
            {/* Image */}
            <div className='w-24 h-24 bg-white/20 rounded-xl overflow-hidden mb-4 mx-auto flex items-center justify-center flex-shrink-0'>
              {item.img ? (
                <img
                  src={item.img}
                  alt={item.title}
                  className='w-full h-full object-cover'
                />
              ) : (
                <span className='text-3xl text-white/50'>+</span>
              )}
            </div>

            {/* Infos plat */}
            <div className='flex justify-between items-center mb-2'>
              <h3 className='text-2xl font-semibold'>{item.title}</h3>
              <div className='flex flex-col items-end'>
                  <span className='text-lg font-bold bg-white/20 px-3 py-1 rounded-xl whitespace-nowrap ml-2'>
                    {item.price}
                  </span>
                  <span className={`text-xs mt-1 px-2 py-0.5 rounded ${(item.quantity || 0) > 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                      {(item.quantity || 0) > 0 ? `${item.quantity} disponibles` : 'Rupture de stock'}
                  </span>
              </div>
            </div>

            <p className='mt-2 text-white/80 text-sm flex-grow mb-6'>{item.desc}</p>

            {/* Boutons */}
            <div className='mt-auto flex gap-3'>
              <button
                className={`flex-1 px-4 py-3 rounded-xl font-bold text-white text-sm transition-colors ${
                    (item.quantity || 0) > 0 
                     ? 'bg-emerald-600 hover:bg-emerald-500' 
                     : 'bg-gray-600 cursor-not-allowed opacity-50'
                }`}
                onClick={() => handleAddToCart(item)}
                disabled={(item.quantity || 0) <= 0}
              >
                {(item.quantity || 0) > 0 ? 'Ajouter au panier' : 'Indisponible'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
