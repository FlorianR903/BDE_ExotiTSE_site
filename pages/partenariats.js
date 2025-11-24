import Nav from "../components/Nav";
import Head from "next/head";
import { motion } from 'framer-motion'

export default function Partenariats() {

    const partners = [
        {
            id: 1,
            name: "Le Soggy Bottom 🍻",
            address: "12 Avenue des Étudiants, 87000 Limoges",
            event: "Le fameux Aparton 🍻🏃‍♂️"
        },
        {
            id: 2,
            name: "Le Deer Pub 🍾",
            address: "48 Rue des Arts, 87000 Limoges",
            event: "Casse des 🥥, pas les couil***"
        },
        {
            id: 3,
            name: "Le SpringBreak 🥂",
            address: "5 Place Centrale, 87000 Limoges",
            event: "Shatta Night 🔥"
        },
        {
            id: 4,
            name: "Energy Drink Ragnarok 🥂",
            address: "5 Place Centrale, 87000 Limoges",
            event: "Tous les events !"
        }
    ];

    return (
        <>
            <Head>
                <title>Exoti'TSE</title>
            </Head>

            <Nav />

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

                            <p className="text-white/90 text-sm">
                                <strong>Événement associé :</strong><br /> {p.event}
                            </p>
                        </div>
                    ))}

                </div>
            </motion.section>
        </>
    );
}