import { motion } from "framer-motion";
import Image from "next/image";
import Polaroid from "components/Polaroid.js";

export default function Hero() {
    return (
        <motion.section className="min-h-screen flex items-start justify-center text-center relative overflow-hidden pt-20"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}>

            {/*Background*/}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-tropical1 via-tropical2 to-tropical3 bg-no-repeat bg-cover bg-fixed" />

            <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y:0, opacity:1 }} transition={{ duration: 0.8 }} className="p-8">
                {/* Polaroid Gauche 1 */}
                <Polaroid
                    src="/images/andjy.jpg"
                    className="absolute top-36 left-40 hidden md:block polaroid-left"
                />

                {/* Polaroid Gauche 2 */}
                <Polaroid
                    src="/images/lyam.jpg"
                    className="absolute bottom-32 left-72 hidden md:block polaroid-right"
                />

                {/*Titre*/}
                <Image src="/images/palmiers_empty.png" alt={"Palmiers de fond"} width={400} height={100} className="mb-auto"></Image>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white">Exoti'TSE <span>🌺</span></h1>
                <p className="mt-4 text-lg md:text-xl text-white/95 max-w-2xl mx-auto">La liste tropicale — events, menus, goodies et plus.</p>

                {/* Polaroid Droite 1 */}
                <Polaroid
                    src="/images/lucas.jpg"
                    className="absolute top-36 right-40 hidden md:block polaroid-right"
                />

                {/* Polaroid Droite 2 */}
                <Polaroid
                    src="/images/andjy.jpg"
                    className="absolute bottom-32 right-72 hidden md:block polaroid-left"
                />
            </motion.div>
        </motion.section>
    );
}