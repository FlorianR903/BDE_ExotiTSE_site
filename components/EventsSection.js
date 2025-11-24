/* ÉVÉNEMENTS À VENIR */
import { motion } from "framer-motion";
export default function EventsSection({ events=[] }){

    // Si aucun événement en props → fallback
    const defaultEvents = [
        {
            id: 1,
            title: "Le fameux Aparton 🍻🏃‍♂️",
            date: "15 octobre 2025",
            desc: "Une soirée mémorable pour accueillir les nouveaux étudiants dans une ambiance festive !"
        },
        {
            id: 2,
            title: "♠️♥️Soirée Casino♦️♣️",
            date: "27 octobre 2025",
            desc: "Affrontez les autres étudiants dans un tournoi fun et compétitif sur plusieurs jeux."
        },
        {
            id: 3,
            title: "Shatta Night 🔥",
            date: "4 novembre 2025",
            desc: "Une après-midi conviviale à la patinoire pour créer des souvenirs et partager de bons moments."
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
        <motion.section className="py-24 px-6 relative overflow-hidden"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}>

            {/* TITRE */}
            <h2 className="text-5xl font-extrabold text-center mb-12 tracking-wide">
                Événements à venir
            </h2>

            {/* GRID DES EVENTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">

                {list.map((event) => (
                    <div key={event.id} className="relative p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-all duration-300">

                        {/* Titre */}
                        <h3 className="text-2xl font-bold text-white drop-shadow-md">
                            {event.title}
                        </h3>

                        {/* Badge Date */}
                        <span className="top-8 mt-4 text-sm px-3 py-1 rounded-full bg-white/20 text-white/90">
                            {event.date}
                        </span>

                        {/* Description */}
                        <p className="text-white/80 mt-4 text-sm leading-relaxed">
                            {event.desc}
                        </p>

                        {/* CTA éventuelle (plus tard) */}
                        <button className="mt-6 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white">
                            En savoir plus
                        </button>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}