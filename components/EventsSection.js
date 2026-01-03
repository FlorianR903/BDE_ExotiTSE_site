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
            desc: "Pourquoi rester dans un seul bar quand on peut explorer bien au-délà ? Ce soir, on transforme nos salons en escales festives 🎉 ! L'Aparton, c'est le marathon ultime où la ligne d'arrivée n'est qu'un prétexte pour faire la fête !",
            details: "💥 Au programme :" + "\n Création des équipes. " + "Dans chaque lieu : 1 thème - 1 défi - 1 nouvelle ambiance 🔥 ! " + " Final : Regroupement pour élire la meilleure équipe et l'appart le plus stylé de la soirée ! " + "🚨 Points bonus par déguisement dans l'équipe !"
        },
        {
            id: 2,
            title: "♠️♥️ Soirée Casino ♦️♣️",
            date: "27 octobre 2025",
            desc: "Venez affrontez les autres étudiants lors d'une soirée riche en divertissement ! Tentez de remporter des cadeaux sur chaque jeux 🎁 tout en détrônant vos adversaires ! Les mises sont fermées... Rien ne va plus ! 🚨  ",
            details: "💥 Au programme : La Roulette Américaine - Poker - Blackjack - Baccara - Roue de la Fortune (Version ExotiTSE 👀). \n Tenue correcte exigée !"
        },
        {
            id: 3,
            title: "Shatta Night 🔥",
            date: "4 novembre 2025",
            desc: "Prépare-toi pour une nuit 100% SHATTA 🥵 !!! \n" +
                "Ramène ton meilleur déhanché, appelle ta clique, et viens vibrer AU MAXXXX 🔥! \n" +
                "On vous prépare quelques surprises tout au long de la nuit... 👀 \n",
            details: "💥 Au programme :\n Shatta • Afrobeat • Dancehall • Amapiano \n Ambiance tropicale garantie !"
        },
        {
            id: 4,
            title: "Koh-Lanta'waii 🧭",
            date: "4 novembre 2025",
            desc: "Aventuriers, aventurières, oubliez le confort de vos salons ! Ce soir on prend une tournure sauvage et exotique 🌴 Deux tribus s'affrontent pour la gloire, le totem et... le droit de faire la fête !" + "Le destin est entre vos mains. Serez-vous le dernier sur le poteau ou le premier au bar à cocktails ?",
            details: "💥 Au programme :\n Des épreuves pensées pour vous régaler ! Saurez-vous survivre aux différentes étapes ? 👀 "
        },
        {
            id: 5,
            title: "Viens rouler les R avec nous 🎙️",
            date: "4 novembre 2025",
            desc: "Préparez vos meilleurs accents et votre plus belle énergie ! Aujourd'hui, on va prendre les couleurs du continent ! " + "Que tu saches déjà rouler les R"+" ou que tu viennes pour apprendre, on t'attend pour une immersion totale ! 📢",
            details: "💥 Au programme :\n Pas de chichis, ici c'est la famille : on vient pour la convivialité, la danse et le partage. Préparez-vous, ça va être \"caillou\" (dur) de repartir !"
        },
        {
            id: 6,
            title: "Casse des 🥥, pas les couil***",
            date: "4 novembre 2025",
            desc: "Besoin de déconnecter ? Marre des contrôles, des révisions ou du stress quotidien ? Ce soir, on change de fréquence. ExotiTSE passe en mode \"Zéro Stress, Maxi Ambiance !\" " + "L'idée est simple : on brise la routine (et quelques noix de coco), on oublie les soucis et on profite du moment.",
            details: "💥 Au programme :\n Ici, on cultive la bonne humeur, le respect et la dérision. Si tu es là pour te prendre au sérieux, tu t'es trompé d'île !"
        },
        {
            id: 7,
            title: "🎫 La Tombola des Tropiques ☀️",
            date: "4 novembre 2025",
            desc: "Préparez votre plus beau sourire ! On vous invite à une aprèm placée sous le signe de la chance et de l'exotisme. La Tombola des Tropiques, c'est l'occasion de se retrouver pour partager un moment chaleureux, vibrer au rythme des tirages au sort et repartir les bras chargés de cadeaux ! 🎁 \n",
            details: "💥 Au programme :\n Pas de stress, que du soleil ! Entre deux animations, profitez de l'ambiance tropicale pour chiller, discuter et tenter de décrocher le gros lot. La chance n'attend que vous !"
        },
        {
            id: 8,
            title: "Tu trouves pas, tu gagnes pas 🎲",
            date: "4 novembre 2025",
            desc: "L'heure n'est plus à la fête, mais à la réflexion ! 🕵️ On met votre sens de l'observation et vos méninges à rude épreuve. Le concept est simple, radical et efficace : des indices sont cachés, des énigmes sont semées, et seul celui qui saura lire entre les lignes repartira avec le butin.\n",
            details: "💥 Au programme :\n Ici, pas de chance au tirage, pas de pitié au grattage. C'est votre cerveau qui est votre meilleur allié. Vous pensez être plus malin que les autres ? Prouvez-le. Mais n'oubliez pas la règle d'or : Si tu ne trouves pas, tu ne gagnes pas !"
        },
        {
            id: 9,
            title: "Chez Vaïty, Tatoue !!",
            date: "4 novembre 2025",
            desc: "Laissez la culture polynésienne marquer votre histoire. Bienvenue Chez Vaïty, un espace hors du temps où l'art ancestral du tatouage maori rencontre l'ambiance chaleureuse des tropiques. " + "Aujourd'hui, pas d'aiguilles permanentes, mais des artistes talentueux pour orner votre peau de motifs sacrés et symboliques ! 🪡",
            details: "💥 Au programme :\n Que vous cherchiez la protection, la sagesse ou simplement le style d'un chef de tribu, venez choisir votre symbole et repartez avec l'esprit d'un guerrier."
        },
        {
            id: 10,
            title: "La Chasse est ouverte ! 🧭",
            date: "4 novembre 2025",
            desc: "Aventuriers, le signal est donné : La chasse est ouverte ! 🏃 Mais attention, ici on ne chasse pas le gibier, on traque l'insaisissable. Ce n'est pas une simple promenade de santé, c'est une course d'orientation où chaque bosquet peut cacher un indice et chaque détour une impasse. 🗺️",
            details: "💥 Au programme : Votre mission ? Retrouver les balises sacrées disséminées dans notre \"jungle urbaine\" avant que le soleil ne décline. Il faudra savoir lire une carte, interpréter les signes de la nature et surtout, être plus rapide que les autres meutes. L'instinct sera votre seul guide. Serez-vous le prédateur ou la proie ?"
        },
        {
            id: 11,
            title: "⏳️ Mais où est Vaïty ? 🕵️",
            date: "4 novembre 2025",
            desc: "Tout le monde en parle, mais personne ne sait où il est... Le légendaire Vaïty s'est fondu dans la foule, et votre mission est de le retrouver. Est-il en train de prendre un café en terrasse ? Est-il caché derrière un journal au parc ? Ou déguisé en touriste avec une chemise à fleurs ? 🎭",
            details: "💥 Au programme : Aujourd'hui, vous êtes tous des détectives. Mais attention, Vaïty est malin : il change d'apparence, il se déplace et il s'est entouré de \"faux Vaïty\" pour vous perdre. Ouvrez l'œil, suivez les pistes sur les réseaux, et soyez le premier à lui mettre la main dessus !"
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