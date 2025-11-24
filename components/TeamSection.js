// components/TeamSection.js
import { motion } from 'framer-motion'
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

    return (
        <motion.section id="members"
                        className="py-24 px-6 relative overflow-hidden text-center"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}>
            <h2 className="text-4xl font-extrabold mb-12">L'équipe des Tropiques</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
                {members.map((m) => (
                    <motion.div key={m.id} whileHover={{ scale: 1.02 }} className="group bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl transition hover:scale-105 hover:bg-white/20">

                        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg">
                            <Image src={m.img} width={200} height={200} className="object-cover"/>
                        </div>
                        <h3 className="mt-5 text-2xl font-semibold">{m.name}</h3>
                        <p className="text-yellow-300 font-medium">{m.role}</p>

                        <p className="mt-3 text-white/80 text-sm">{m.bio}</p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}