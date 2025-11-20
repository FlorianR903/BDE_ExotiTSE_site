import Nav from '../components/Nav'
import { motion } from 'framer-motion'
import GallerySection from '../components/GallerySection'
import Head from "next/head";

export default function Gallery(){
    const placeholderBoxes = Array(9).fill(null); // 9 cases par exemple

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

                <h1 className="text-4xl font-extrabold text-center mb-10">Galerie</h1>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {placeholderBoxes.map((_, index) => (
                        <div
                            key={index}
                            className="aspect-square bg-white/10 border border-white/20 rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/20 transition"
                        >
                            <span className="text-5xl font-bold text-white/50">+</span>
                        </div>
                    ))}
                </div>
            </motion.section>
        </>
    );
}