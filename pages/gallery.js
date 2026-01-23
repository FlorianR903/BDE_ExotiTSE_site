import Nav from '../components/Nav'
import { motion, AnimatePresence } from 'framer-motion'
import Head from "next/head";
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import Footer from '../components/Footer';

const albums = [
    {
        id: 1,
        title: "Soirée Flashy",
        date: "15 Oct 2024",
        cover: "/images/flashy.jpg", // Photo de couverture
        driveLink: "https://drive.google.com/drive/u/1/folders/1VJ0mdDB_pexcV3KzuuN4VZYBzKXBD93c"
    },
    {
        id: 2,
        title: "Soirée Casino",
        date: "27 Oct 2024",
        cover: "/images/casino_soiree.jpg",
        driveLink: "https://drive.google.com/drive/u/1/folders/1kxsGvjxtsiSvUIR-dx6-fEYU7MTT3Q5X"
    },
    {
        id: 3,
        title: "Le fameux Apparthon",
        date: "15 Oct 2024",
        cover: "/images/apparthon.jpg", // Photo de couverture
        driveLink: "https://drive.google.com/drive/u/1/folders/1lfPozV3Uey6r1p9j-LEiSuCRlNfc7OGF"
    },
    {
        id: 4,
        title: "Koh-Lanta'waii",
        date: "15 Oct 2024",
        cover: "/images/koh-lant_hawaii.jpg", // Photo de couverture
        driveLink: "https://drive.google.com/drive/u/1/folders/1f9-gpiEb_ko47VZw0fTcKsSJUpA_5a82"
    },
    {
        id: 5,
        title: "Shatta Night",
        date: "4 Nov 2024",
        cover: "/images/shatta_night.png",
        driveLink: "https://drive.google.com/drive/u/1/folders/1GNLBjcBpYiSH8lk_b_6HRB4wLwfY86Cy"
    },
    {
        id: 6,
        title: "Soirée Mystère",
        date: "15 Oct 2024",
        cover: "/images/mystere.png", // Photo de couverture
        driveLink: "https://drive.google.com/drive/u/1/folders/1lK3jTOPWtLVMmbsKLtxUoV18S2QNxIeC"
    },
];

export default function Gallery() {
    const [selectedAlbum, setSelectedAlbum] = useState(null);

    return (
        <>
            <br/>

            <Head>
                <title>Galerie - Exoti'TSE</title>
            </Head>

            <Nav />

            <motion.section
                className="py-24 px-6 relative min-h-screen"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                {/* EN-TÊTE & BOUTON UPLOAD */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-md">Galerie Souvenirs 📸</h1>
                    <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                        Retrouvez les meilleurs moments de nos événements. Vous avez pris des photos ? Partagez-les avec nous pour qu'on les ajoute ici !
                    </p>

                    <Link href="/upload">
                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-pink-600 font-bold rounded-full shadow-lg hover:scale-105 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                Ajouter mes photos
                        </button>
                    </Link>
                </div>

                {/* GRILLE DES ALBUMS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {albums.map((album) => (
                        <motion.div
                            key={album.id}
                            whileHover={{ y: -5 }}
                            onClick={() => setSelectedAlbum(album)}
                            className="group relative aspect-video bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden cursor-pointer shadow-xl"
                        >
                            {/* Image de couverture par défaut */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />

                            <div className="absolute inset-0 bg-white/5 group-hover:scale-110 transition-transform duration-500" />
                            <Image src={album.cover} alt={"fill"} width={400} height={50} objectFit="cover" className="group-hover:scale-110 transition-transform duration-500" />

                            <div className="absolute bottom-0 left-0 p-6 z-20">
                                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-pink-300 transition-colors">
                                    {album.title}
                                </h3>
                            </div>

                            {/* Date en haut à droite */}
                            <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10">
                                <span className="text-xs text-white font-mono">{album.date}</span>
                            </div>
                        </motion.div>
                    ))}

                    {/* Case "À venir" */}
                    <div className="aspect-video bg-white/5 border border-white/10 border-dashed rounded-2xl flex flex-col items-center justify-center text-white/30">
                        <span className="text-4xl mb-2">🔜</span>
                        <span className="font-medium">Prochain événement...</span>
                    </div>
                </div>

                {/* MODALE VISIONNEUSE DE PHOTOS */}
                <AnimatePresence>
                    {selectedAlbum && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                            onClick={() => setSelectedAlbum(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-[#1a1a1a] w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-white/10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Header Modale */}
                                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#252525]">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">{selectedAlbum.title}</h2>
                                        <p className="text-white/50 text-sm">{selectedAlbum.date}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedAlbum(null)}
                                        className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition"
                                    >
                                        ✕
                                    </button>
                                </div>

                                {/* Contenu photos sur le drive */}
                                <div className="flex-1 flex flex-col items-center justify-center text-center p-10 gap-6">
                                    <div className="text-6xl">📸</div>

                                    <p className="text-white/70 max-w-md">
                                        Les photos de cet événement sont disponibles dans notre album en ligne.
                                        Cliquez ci-dessous pour les découvrir ✨
                                    </p>

                                    <a
                                        href={selectedAlbum.driveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-extrabold text-lg rounded-full shadow-xl hover:scale-105 transition-transform"
                                    >
                                        🚀 Voir l’album Google Drive
                                    </a>

                                    <p className="text-xs text-white/40 mt-4">
                                        Accès externe – ouverture dans un nouvel onglet
                                    </p>
                                </div>


                                {/* Footer Modale */}
                                <div className="p-4 border-t border-white/10 bg-[#252525] text-center">
                                    <p className="text-sm text-white/50">Vous apparaissez sur une photo et souhaitez la retirer ? Contactez-nous.</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.section>

            <Footer/>
        </>
    );
}