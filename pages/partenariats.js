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
            lots: "Bon cadeau de 15€ à gagner !",
            event: "A déterminer"
        },
        {
            id: 2,
            name: "Resto Little Garden 🍜",
            address: "02 Rue Dormoy, 42000 Saint-Etienne",
            lots: "Bon cadeau de 12€ à gagner !",
            event: "A déterminer"
        },
        {
            id: 3,
            name: "Columbus Cafe ☕",
            address: "12 Rue Général Foy, 42000 Saint-Etienne",
            lots: "Quatres menus offerts au choix à gagner !",
            event: "A déterminer"
        },
        {
            id: 4,
            name: "Librairie de PARIS 📚",
            address: "6 Rue Michel Rondet, 42000 Saint-Etienne",
            lots: "De nombreux lots !",
            event: "A déterminer"
        },
        {
            id: 5,
            name: "Mégarama Jean Jaurès 🎬",
            address: "2 Rue Praire, Pl. Jean Jaurès, 42000 Saint-Etienne",
            lots: "30 places de cinémas à gagner !",
            event: "A déterminer"
        },
        {
            id: 6,
            name: "Salon Dessange 💅",
            address: "5 Rue Sainte-Catherine, 42000 Saint-Etienne",
            lots: "Plusieurs lots à gagner + 15% pour les étudiants !",
            event: "A déterminer"
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

                            <p className="text-white/90 text-sm">
                                <strong>Événement associé :</strong><br /> {p.event}
                            </p>
                        </div>
                    ))}

                </div>
            </motion.section>

            <Footer />
        </>
    );
}