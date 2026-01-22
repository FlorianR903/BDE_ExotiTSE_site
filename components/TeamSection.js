// components/TeamSection.js
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";

export default function TeamSection() {
    const POLE_STYLE = {
        "Bureau des îles": {
            icon: "👑",
            gradient: "from-yellow-300 via-yellow-150 to-yellow-100",
            glow: "shadow-yellow-400/40",
        },
        "Event": {
            icon: "🎉",
            gradient: "from-cyan-500 via-blue-400 to-indigo-400",
            glow: "shadow-yellow-400/40",
        },
        "COM": {
            icon: "📣",
            gradient: "from-pink-600 via-fuchsia-600 to-purple-400",
            glow: "shadow-yellow-400/40",
        },
        "VSS": {
            icon: "🛡️",
            gradient: "from-purple-400 via-pink-600 to-red-600",
            glow: "shadow-yellow-400/40",
        },
        "Partenariats": {
            icon: "🤝",
            gradient: "from-green-500 via-emerald4500 to-teal-400",
            glow: "shadow-yellow-400/40",
        },
        "SI": {
            icon: "💻",
            gradient: "from-cyan-400 via-blue-400 to-indigo-400",
            glow: "shadow-yellow-400/40",
        },
        "Tourisme": {
            icon: "✈️",
            gradient: "from-sky-400 via-cyan-400 to-teal-300",
            glow: "shadow-yellow-400/40",
        },
        "Filière": {
            icon: "🎓",
            gradient: "from-indigo-500 via-purple-500 to-pink-600",
            glow: "shadow-yellow-400/40",
        },
    };

    const members = [
        {
            id: "pole-bureau",
            type: "pole",
            poleName: "Bureau des îles",
        },
        {
            id: 1,
            type: "member",
            name: "Vaïty",
            role: "Président",
            bio: "Si y'a pas de limousin du préz, alors c'est pas une soirée exotiTSE !",
            img: "/images/vaityy.png",
        },
        {
            id: 2,
            type: "member",
            name: "Andjy",
            role: "Vice-Président",
            bio: "Ses bonbons bananes c'est une tuerie la vérité !",
            img: "/images/andjyy.png",
        },
        {
            id: 3,
            type: "member",
            name: "Clara",
            role: "Vice-Président",
            bio: "Je fais des meilleurs pancakes qu'elle askip' !",
            img: "",
        },
        {
            id: 4,
            type: "member",
            name: "Lucas",
            role: "Secrétaire Général",
            bio: "(ajouter un truc drôle)",
            img: "/images/lucas.jpg",
        },
        {
            id: 5,
            type: "member",
            name: "Guillaume",
            role: "Trésorier",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: 6,
            type: "member",
            name: "Lyam",
            role: "Vice-Trésorier",
            bio: "(ajouter un truc drôle)",
            img: "/images/lyamm.png",
        },
        {
            id: "pole-event",
            type: "pole",
            poleName: "Event",
        },
        {
            id: 7,
            type: "member",
            name: "Aaron",
            role: "Respo Event",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: 8,
            type: "member",
            name: "Antoine",
            role: "Membre Event",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: 9,
            type: "member",
            name: "Jean",
            role: "Membre Event",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: 10,
            type: "member",
            name: "Yvan",
            role: "Membre Event",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: 11,
            type: "member",
            name: "Sacha",
            role: "Membre Event",
            bio: "(ajouter un truc drôle)",
            img: "/images/sacha.png",
        },
        {
            id: "pole-com",
            type: "pole",
            poleName: "COM",
        },
        {
            id: 12,
            type: "member",
            name: "Aubane",
            role: "Respo COM",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: 13,
            type: "member",
            name: "Jérémy",
            role: "Membre COM",
            bio: "(ajouter un truc drôle)",
            img: "/images/jeremyy.jpg",
        },
        {
            id: 14,
            type: "member",
            name: "Walid",
            role: "Membre COM",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: 15,
            type: "member",
            name: "Salma",
            role: "Membre COM",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: "pole-vss",
            type: "pole",
            poleName: "VSS",
        },
        {
            id: 16,
            type: "member",
            name: "Manon",
            role: "Respo VSS",
            bio: "(ajouter un truc drôle)",
            img: "/images/manon.png",
        },
        {
            id: 17,
            type: "member",
            name: "Emilie",
            role: "Membre VSS",
            bio: "(ajouter un truc drôle)",
            img: "/images/emilie.png",
        },
        {
            id: 18,
            type: "member",
            name: "Théophile",
            role: "Membre VSS",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: "pole-partenariats",
            type: "pole",
            poleName: "Partenariats",
        },
        {
            id: 19,
            type: "member",
            name: "Martin",
            role: "Respo Partenariats",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: 20,
            type: "member",
            name: "Raphaël",
            role: "Membre Partenariats",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: 21,
            type: "member",
            name: "Flo le 2nd",
            role: "Membre Partenariats",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: 22,
            type: "member",
            name: "Eliott",
            role: "Membre Partenariats",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: "pole-si",
            type: "pole",
            poleName: "SI",
        },
        {
            id: 23,
            type: "member",
            name: "Florian",
            role: "Respo SI",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: 24,
            type: "member",
            name: "Virgile",
            role: "Membre SI",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: 25,
            type: "member",
            name: "Kylian",
            role: "Membre SI",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: 26,
            type: "member",
            name: "Mattéo",
            role: "Membre SI",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: "pole-tourisme",
            type: "pole",
            poleName: "Tourisme",
        },
        {
            id: 27,
            type: "member",
            name: "Vaïty",
            role: "Réunion",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: 28,
            type: "member",
            name: "Andjy",
            role: "Réunion",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: 29,
            type: "member",
            name: "Lyam",
            role: "Guyane",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: 30,
            type: "member",
            name: "Florian",
            role: "Madagascar",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: 31,
            type: "member",
            name: "Jérémy",
            role: "Guadeloupe",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: "pole-filière",
            type: "pole",
            poleName: "Filière",
        },
        {
            id: 32,
            type: "member",
            name: "Aubane",
            role: "Bachelor1",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: 33,
            type: "member",
            name: "Walid",
            role: "CiTiSE1",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: 34,
            type: "member",
            name: "Virgile",
            role: "CiTiSE1",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: 35,
            type: "member",
            name: "Florian",
            role: "FISA1",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
        {
            id: 36,
            type: "member",
            name: "Mattéo",
            role: "FISA1",
            bio: "(ajouter un truc drôle)",
            img: "",
        },
    ];

    const realMembers = members.filter(item => item.type === "member");

    // 1. State pour suivre l'index du membre actuel
    const [currentIndex, setCurrentIndex] = useState(0);
    // State pour stocker la direction du dernier swipe (pour l'animation de sortie)
    const [exitX, setExitX] = useState(0);

    const currentMember = members[currentIndex];

    // 2. Fonction gérant la fin du "drag"
    const handleDragEnd = (event, info) => {
        const swipeThreshold = 100; // Distance minimale pour considérer un swipe
        const { offset, velocity } = info;

        if (offset.x > swipeThreshold || velocity.x > 500) {
            // Swipe vers la DROITE (Précédent)
            setExitX(200); // La carte part à droite
            // On décrémente l'index (avec boucle pour revenir au dernier si on est au premier)
            setTimeout(() => {
                setCurrentIndex((prev) => (prev === 0 ? members.length - 1 : prev - 1));
                setExitX(0); // Reset pour la prochaine
            }, 80); // Petit délai pour laisser l'animation se faire

        } else if (offset.x < -swipeThreshold || velocity.x < -500) {
            // Swipe vers la GAUCHE (Suivant)
            setExitX(-200); // La carte part à gauche
            // On incrémente l'index (avec boucle pour revenir au premier si on est au dernier)
            setTimeout(() => {
                setCurrentIndex((prev) => (prev === members.length - 1 ? 0 : prev + 1));
                setExitX(0);
            }, 80);
        }
    };

    // Variants pour l'animation de la carte
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, x: 0, rotate: 0, transition: { duration: 0.4 } },
        // L'animation de sortie dépend de la direction du swipe (exitX)
        exit: { opacity: 0, x: exitX > 0 ? 300 : -300, rotate: exitX > 0 ? 20 : -20, transition: { duration: 0.2 } },
    };

    const isMember = currentMember.type === "member";

    const realMemberIndex = isMember
        ? realMembers.findIndex(m => m.id === currentMember.id)
        : null;

    return (
        <motion.section id="members"
                        className="py-24 px-6 relative overflow-hidden text-center min-h-[600px]" // Ajout min-h pour éviter les sauts
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}>

            <h2 className="text-4xl font-extrabold mb-12">L'équipe des Tropiques</h2>

            {/* CONTENEUR DE LA CARTE CENTRALISÉE */}
            <div className="relative w-full max-w-md mx-auto h-[450px] flex items-center justify-center md:scale-110">

                <AnimatePresence mode="wait">
                    <motion.div key={currentMember.id} // IMPORTANT: la clé doit changer pour déclencher l'animation
                                // Props pour le Drag (Swipe)
                                drag="x" // Glissement horizontal uniquement
                                dragConstraints={{ left: 0, right: 0 }} // La carte revient au centre si on lache trop tôt
                                dragElastic={0.7} // Résistance élastique
                                onDragEnd={handleDragEnd}
                                whileDrag={{ scale: 1.05, cursor: "grabbing" }}

                                // Props pour l'animation d'entrée/sortie
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"

                                // Styles de ta carte originale (Glassmorphism)
                                className="absolute w-full bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 select-none cursor-grab will-change-transform"
                    >
                        {currentMember.type === "pole" ? (() => {
                            const pole = POLE_STYLE[currentMember.poleName] || {};

                            return (
                                <div className="relative flex flex-col items-center justify-center h-full text-center">

                                    {/* Halo décoratif */}
                                    <div className={`absolute w-56 h-56 rounded-full blur-3xl opacity-30 bg-gradient-to-br ${pole.gradient}`} />

                                    {/* Icône */}
                                    <motion.div
                                        initial={{ scale: 0.6, rotate: -10, opacity: 0 }}
                                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className={`relative text-7xl mb-6 drop-shadow-xl ${pole.glow}`}
                                    >
                                        {pole.icon || "🌴"}
                                    </motion.div>

                                    {/* Label */}
                                    <span className="uppercase tracking-[0.35em] text-xs text-white/60 mb-2 font-bold">Pôle</span>

                                    {/* Nom du pôle */}
                                    <h3 className={`text-4xl font-extrabold bg-gradient-to-r ${pole.gradient} bg-clip-text text-transparent`}>
                                        {currentMember.poleName}
                                    </h3>

                                    {/* Séparateur */}
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className="mt-6 w-24 h-[2px] bg-white/40 rounded-full origin-left"
                                    />

                                    {/* Indication */}
                                    <p className="mt-6 text-sm italic text-white/60">
                                        Swipe pour découvrir l’équipe
                                    </p>
                                </div>
                            );
                        })() : (
                            <>
                                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-white/30 pointer-events-none">
                                    {/* Note: J'utilise un placeholder si l'image ne charge pas pour éviter les erreurs */}
                                    <Image src={currentMember.img}
                                           alt={currentMember.name}
                                           width={200}
                                           height={200}
                                           className="object-cover w-full h-full"
                                           draggable="false" // Empêche de drag l'image elle-même
                                    />
                                </div>

                                <h3 className="mt-6 text-3xl font-bold">{currentMember.name}</h3>
                                <p className="text-yellow-300 text-xl font-medium mb-4">{currentMember.role}</p>

                                <p className="mt-3 text-white/90 text-base italic">"{currentMember.bio}"</p>
                            </>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* COMPTEUR EN BAS DE PAGE */}
            {isMember && (
                <motion.div
                    className="mt-8 font-semibold text-white/70 bg-white/10 inline-block px-6 py-2 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={currentMember.id}
                >
                    Membre {realMemberIndex + 1} sur {realMembers.length}
                </motion.div>
            )}


            {/* Instructions (Optionnel, pour aider l'utilisateur) */}
            <p className="text-sm text-white/80 mt-4">Certains sont compris dans 2 pôles différents, nous sommes 26 au total !</p>

        </motion.section>
    );
}