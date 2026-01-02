/* ÉVÉNEMENTS À VENIR */
import { useState } from "react"; // 1. On importe useState
import { motion, AnimatePresence } from "framer-motion"; // 2. On importe AnimatePresence

export default function EventsSection({ events = [] }) {
    // État pour stocker l'événement sélectionné (null = aucun événement ouvert)
    const [selectedEvent, setSelectedEvent] = useState(null);

    const defaultEvents = [
        {
            id: 1,
            title: "Le fameux Aparton 🍻🏃‍♂️",
            date: "15 octobre 2025",
            desc: "Une soirée mémorable pour accueillir les nouveaux étudiants dans une ambiance festive !",
            details: "Rendez-vous à 20h00 au local BDE. N'oubliez pas vos déguisements !" // Exemple de détail supplémentaire
        },
        {
            id: 2,
            title: "♠️♥️ Soirée Casino ♦️♣️",
            date: "27 octobre 2025",
            desc: "Affrontez les autres étudiants dans un tournoi fun et compétitif sur plusieurs jeux.",
            details: "Poker, Blackjack et Roulette. Tenue correcte exigée !"
        },
        {
            id: 3,
            title: "Shatta Night 🔥",
            date: "4 novembre 2025",
            desc: "Une après-midi conviviale à la patinoire pour créer des souvenirs et partager de bons moments.",
            details: "Ambiance tropicale garantie."
        },
        {
            id: 4,
            title: "Koh-Lanta'waii 🧭",
            date: "4 novembre 2025",
            desc: "Une après-midi conviviale à la patinoire pour créer des souvenirs et partager de bons moments."
        },
        {
            id: 5,
            title: "Viens rouler les R avec nous 🎙️",
            date: "4 novembre 2025",
            desc: "Une après-midi conviviale à la patinoire pour créer des souvenirs et partager de bons moments."
        },
        {
            id: 6,
            title: "Casse des 🥥, pas les couil***",
            date: "4 novembre 2025",
            desc: "Une après-midi conviviale à la patinoire pour créer des souvenirs et partager de bons moments."
        },
        {
            id: 7,
            title: "🎫 La Tombola des Tropiques ☀️",
            date: "4 novembre 2025",
            desc: "Une après-midi conviviale à la patinoire pour créer des souvenirs et partager de bons moments."
        },
        {
            id: 8,
            title: "Tu trouves pas, tu gagnes pas 🎲",
            date: "4 novembre 2025",
            desc: "Une après-midi conviviale à la patinoire pour créer des souvenirs et partager de bons moments."
        },
        {
            id: 9,
            title: "Chez Vaïty, Tatoue !!",
            date: "4 novembre 2025",
            desc: "Une après-midi conviviale à la patinoire pour créer des souvenirs et partager de bons moments."
        },
        {
            id: 10,
            title: "La Chasse est ouverte ! 🧭",
            date: "4 novembre 2025",
            desc: "Une après-midi conviviale à la patinoire pour créer des souvenirs et partager de bons moments."
        },
        {
            id: 11,
            title: "⏳️ Mais où est Vaïty ? 🕵️",
            date: "4 novembre 2025",
            desc: "Une après-midi conviviale à la patinoire pour créer des souvenirs et partager de bons moments."
        }
    ];

    const list = events.length > 0 ? events : defaultEvents;

    return (
        <motion.section
            className="py-24 px-6 relative overflow-hidden" // Suppression de relative/overflow ici si la modale est coupée, mais généralement ok
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >

            {/* TITRE */}
            <h2 className="text-5xl font-extrabold text-center mb-12 tracking-wide text-white">
                Événements à venir
            </h2>

            {/* GRID DES EVENTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
                {list.map((event) => (
                    <div key={event.id} className="relative p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 flex flex-col">

                        {/* Titre */}
                        <h3 className="text-2xl font-bold text-white drop-shadow-md">
                            {event.title}
                        </h3>

                        <div className="my-4">
                            {/* Badge Date */}
                            <span className="px-5 py-1.5 font-semibold rounded-full bg-white/20 text-white/90">
                                {event.date}
                            </span>
                        </div>

                        {/* Description courte */}
                        <p className="text-white/80 text-sm leading-relaxed flex-grow">
                            {event.desc}
                        </p>

                        {/* BOUTON : Ouvre la modale */}
                        <button
                            onClick={() => setSelectedEvent(event)}
                            className="mt-6 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                        >
                            En savoir plus
                        </button>
                    </div>
                ))}
            </div>

            {/* --- LA MODALE (POPUP) --- */}
            <AnimatePresence>
                {selectedEvent && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedEvent(null)} // Ferme quand on clique à côté
                    >
                        <motion.div
                            className="relative w-full max-w-lg bg-[#2a1b3d] rounded-3xl p-8 border border-white/20 shadow-2xl overflow-y-auto max-h-[90vh]"
                            // Style ici : j'ai mis un fond sombre un peu violet pour contraster, tu peux remettre bg-white/10 si tu préfères la transparence totale
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            onClick={(e) => e.stopPropagation()} // Empêche la fermeture quand on clique DANS la boîte
                        >

                            {/* Bouton Fermer (X) */}
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white bg-white/10 rounded-full transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>

                            {/* Contenu de la Modale */}
                            <h3 className="text-3xl font-bold text-white mb-2">{selectedEvent.title}</h3>
                            <span className="inline-block px-4 py-1 mb-6 text-sm font-semibold rounded-full bg-pink-500/80 text-white">
                                {selectedEvent.date}
                            </span>

                            <div className="space-y-4 text-white/90">
                                <p className="text-lg leading-relaxed">
                                    {selectedEvent.desc}
                                </p>

                                {/* Section détails supplémentaires */}
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 mt-4">
                                    <h4 className="font-bold text-pink-300 mb-2">Détails de l'événement :</h4>
                                    <p className="text-sm text-white/70">
                                        {selectedEvent.details || "Plus d'informations à venir prochainement..."}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="w-full mt-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-orange-400 font-bold text-white hover:opacity-90 transition-opacity"
                            >
                                Fermer
                            </button>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.section>
    );
}