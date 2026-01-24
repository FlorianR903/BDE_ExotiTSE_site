import Nav from "../components/Nav";
import Head from "next/head";
import { motion } from 'framer-motion'
import Footer from "../components/Footer";

export default function Partenariats() {

    const partners = [
        {
            id: 1,
            name: "RougeGorge Lingerie 👙",
            address: "35 Place du Peuple, 42000 Saint-Etienne",
            lots: "Bon cadeau de 15€ à gagner + \n" + "20% permanent pour tous les étudiants"
        },
        {
            id: 2,
            name: "Resto Little Garden 🍜",
            address: "02 Rue Dormoy, 42000 Saint-Etienne",
            lots: "Bon cadeau de 12€ à gagner !"
        },
        {
            id: 3,
            name: "Columbus Cafe ☕",
            address: "12 Rue Général Foy, 42000 Saint-Etienne",
            lots: "Quatres menus offerts au choix à gagner !"
        },
        {
            id: 4,
            name: "Librairie de PARIS 📚",
            address: "6 Rue Michel Rondet, 42000 Saint-Etienne",
            lots: "De nombreux lots !"
        },
        {
            id: 5,
            name: "Mégarama Jean Jaurès 🎬",
            address: "2 Rue Praire, Pl. Jean Jaurès, 42000 Saint-Etienne",
            lots: "30 places de cinémas à gagner !"
        },
        {
            id: 6,
            name: "Salon Dessange 💅",
            address: "5 Rue Sainte-Catherine, 42000 Saint-Etienne",
            lots: "Plusieurs lots à gagner + 15% pour les étudiants !"
        },
        {
            id: 7,
            name: "Warhammer ♟️",
            address: "9 rue Saint-Jean, 42000 Saint-Étienne",
            lots: "Deux figurines à gagner !"
        },
        {
            id: 8,
            name: "L'Atelier du Machiniste 🪡",
            address: "36 Rue José Frappa, 42000 Saint-Etienne",
            lots: "Un print à gagner !"
        },
        {
            id: 9,
            name: "La droguerie de la Tour 🛍️",
            address: "8 Place de l'Hôtel de ville, 42000 Saint-Étienne",
            lots: "Plusieurs lots à gagner !"
        },
        {
            id: 10,
            name: "C'est deux euros 💶",
            address: "13 Rue Gambetta, 42000 Saint-Étienne",
            lots: "Plusieurs lots à gagner !"
        },
        {
            id: 11,
            name: "La Basketerie 👟",
            address: "15 Rue Saint-Jean, 42000 Saint-Étienne",
            lots: "40 € de bons d'achats à gagner !"
        },
        {
            id: 12,
            name: "1909 Escape Game 🔎",
            address: "5 & 6 Rue de la République, 42000 Saint-Étienne",
            lots: "Des réductions toute l'année !"
        },
        {
            id: 13,
            name: "Lingerie by Simone 👙",
            address: "1 Rue Alsace Loraine, 42000 Saint-Étienne",
            lots: "10% de réduction pendant un an + des lots !"
        },
        {
            id: 14,
            name: "Atelier by Simone 🪡",
            address: "7 Rue Michelet, 42000 Saint-Étienne",
            lots: "10% de réduction pendant un an + des lots !"
        },
        {
            id: 15,
            name: "RedBull Drink ⚡",
            address: "Disponible au sein de Télécom en journée !",
            lots: "Des boissons offertes !"
        },
        {
            id: 16,
            name: "Ramène ta fraise 🍓",
            address: "39 Place du Peuple, 42000 Saint-Étienne",
            lots: "Une boisson et un dessert offert !"
        },
        {
            id: 17,
            name: "La mie caline 🍪",
            address: "8 Place de l'Hôtel de ville, 42000 Saint-Étienne",
            lots: "Un lot de cookie !"
        },
        {
            id: 18,
            name: "Ker Annick 🥞",
            address: "2 Rue Dormand, 42000 Saint-Étienne",
            lots: "2 repas d'une valeur de 20€ !"
        },
        {
            id: 19,
            name: "New School Tacos 🌮",
            address: "30 Rue des Martyrs, 42000 Saint-Étienne",
            lots: "20% de réduction pendant un an !"
        },
        {
            id: 20,
            name: "Five Pizza 🍕",
            address: "25 Rue des Martyrs, 42000 Saint-Étienne",
            lots: "20% de réduction pendant un an !"
        },
        {
            id: 21,
            name: "Smashy Original 🍔",
            address: "15 Rue des Martyrs, 42000 Saint-Étienne",
            lots: "20% de réduction pendant un an !"
        },
        {
            id: 22,
            name: "Burger King 🍔",
            address: "33 Place du Peuple, 42000 Saint-Étienne",
            lots: "300 bons cadeaux !"
        },
        {
            id: 23,
            name: "Pause Churros 🍽️",
            address: "7 Rue des Docteurs Charcot 1 À, 42100 Saint-Étienne",
            lots: "10€ de bons cadeaux !"
        },
        {
            id: 24,
            name: "41° 🍽️",
            address: "2 Rue Ferrer, 42100 Saint-Étienne",
            lots: "Des bons de réductions !"
        }
    ];

    return (
        <>
            <Head>
                <title>Exoti'TSE</title>
            </Head>

            <Nav />

            <br/><br/>

            <motion.section className="py-24 px-6 relative overflow-hidden"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}>

                <h1 className="text-5xl font-extrabold text-center mb-12">Nos Partenariats</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">

                    {partners.map(p => (
                        <div
                            key={p.id}
                            className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-3xl shadow-xl
                                       hover:scale-[1.02] transition-all"
                        >
                            <h2 className="text-3xl font-bold mb-2">{p.name}</h2>

                            <p className="text-white/80 mb-4 text-sm">
                                <strong>Adresse :</strong><br /> {p.address}
                            </p>

                            <p className="text-white/80 mb-4 text-sm">
                                <strong>Lots à gagner :</strong><br /> {p.lots}
                            </p>
                        </div>
                    ))}

                </div>
            </motion.section>

            <Footer />
        </>
    );
}