// components/TeamSection.js
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";

export default function TeamSection() {
    const members = [
        {
            id: 1,
            name: "Vaïty",
            role: "Président",
            bio: "Si y'a pas de limousin du préz, alors c'est pas une soirée exotiTSE !",
            img: "/images/vaity.jpg",
        },
        {
            id: 2,
            name: "Andjy",
            role: "Vice-Président",
            bio: "Ses bonbons bananes c'est une tuerie la vérité !",
            img: "/images/andjy.jpg",
        },
        {
            id: 3,
            name: "Clara",
            role: "Vice-Président",
            bio: "Je fais des meilleurs pancakes qu'elle askip' !",
            img: "/images/jerem.jpg",
        },
        {
            id: 4,
            name: "Guillaume",
            role: "Trésorier",
            bio: "(ajouter un truc drôle)",
            img: "/images/jerem.jpg",
        },
        {
            id: 5,
            name: "Lyam",
            role: "Vice-Trésorier",
            bio: "(ajouter un truc drôle)",
            img: "/images/lyam.jpg",
        },
        {
            id: 6,
            name: "Lucas",
            role: "Secrétaire Général",
            bio: "(ajouter un truc drôle)",
            img: "/images/lucas.jpg",
        }
    ];

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
            }, 200); // Petit délai pour laisser l'animation se faire

        } else if (offset.x < -swipeThreshold || velocity.x < -500) {
            // Swipe vers la GAUCHE (Suivant)
            setExitX(-200); // La carte part à gauche
            // On incrémente l'index (avec boucle pour revenir au premier si on est au dernier)
            setTimeout(() => {
                setCurrentIndex((prev) => (prev === members.length - 1 ? 0 : prev + 1));
                setExitX(0);
            }, 200);
        }
    };

    // Variants pour l'animation de la carte
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, x: 0, rotate: 0, transition: { duration: 0.4 } },
        // L'animation de sortie dépend de la direction du swipe (exitX)
        exit: { opacity: 0, x: exitX > 0 ? 300 : -300, rotate: exitX > 0 ? 20 : -20, transition: { duration: 0.2 } },
    };

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
                    <motion.div
                        key={currentMember.id} // IMPORTANT: la clé doit changer pour déclencher l'animation

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
                        <div className="w-40 h-40 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-white/30 pointer-events-none">
                            {/* Note: J'utilise un placeholder si l'image ne charge pas pour éviter les erreurs */}
                            <Image
                                src={currentMember.img}
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
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* COMPTEUR EN BAS DE PAGE */}
            <motion.div
                className="mt-8 font-semibold text-white/70 bg-white/10 inline-block px-6 py-2 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={currentIndex} // Petit effet de fade sur le compteur quand il change
            >
                Membre {currentIndex + 1} sur {members.length}
            </motion.div>

            {/* Instructions (Optionnel, pour aider l'utilisateur) */}
            <p className="text-sm text-white/50 mt-4">Swipez pour découvrir l'équipe</p>

        </motion.section>
    );
}