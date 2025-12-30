import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    return (
        <motion.section className="min-h-screen flex items-center justify-center text-center relative overflow-hidden"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}>

            {/*Background*/}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-tropical1 via-tropical2 to-tropical3 bg-no-repeat bg-cover bg-fixed" />

            <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y:0, opacity:1 }} transition={{ duration: 0.8 }} className="p-8">
                {/* Polaroid Gauche 1 */}
                <div className="absolute top-28 left-36 hidden md:block polaroid-left">
                    <div className="relative w-64 h-52">
                        <div className="absolute top-[10%] left-[0%] w-[100%] h-[100%]">
                        {/* Cadre */}
                            <Image
                                src="/images/cadre_polaroid_empty.png"
                                alt="Cadre polaroid"
                                fill
                                className="object-contain pointer-events-none"
                            />
                        </div>
                        {/* Photo */}
                        <div className="absolute top-[22%] left-[25%] w-[49%] h-[70%] overflow-hidden rounded-sm">
                            <Image
                                src="/images/andjy.jpg"
                                alt="Photo soirée"
                                fill
                                className="object-cover object-center"
                            />
                        </div>

                    </div>
                </div>

                {/* Polaroid Gauche 2 */}
                <div className="absolute bottom-40 left-60 hidden md:block polaroid-right">
                    <div className="relative w-64 h-52">
                        <div className="absolute top-[10%] left-[0%] w-[100%] h-[100%]">
                            {/* Cadre */}
                            <Image
                                src="/images/cadre_polaroid_empty.png"
                                alt="Cadre polaroid"
                                fill
                                className="object-contain pointer-events-none"
                            />
                        </div>
                        {/* Photo */}
                        <div className="absolute top-[22%] left-[25%] w-[49%] h-[70%] overflow-hidden rounded-sm">
                            <Image
                                src="/images/lyam.jpg"
                                alt="Photo soirée"
                                fill
                                className="object-cover object-center"
                            />
                        </div>
                    </div>
                </div>

                {/*Titre*/}
                <Image src="/images/palmiers_empty.png" alt={"Palmiers de fond"} width={400} height={100} className="mb-auto"></Image>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white">Exoti'TSE <span>🌺</span></h1>
                <p className="mt-4 text-lg md:text-xl text-white/95 max-w-2xl mx-auto">La liste tropicale — events, menus, goodies et plus.</p>

                {/* Polaroid Droite 1 */}
                <div className="absolute top-28 right-36 hidden md:block polaroid-right">
                    <div className="relative w-64 h-52">
                        <div className="absolute top-[10%] left-[0%] w-[100%] h-[100%]">
                            {/* Cadre */}
                            <Image
                                src="/images/cadre_polaroid_empty.png"
                                alt="Cadre polaroid"
                                fill
                                className="object-contain pointer-events-none"
                            />
                        </div>
                        {/* Photo */}
                        <div className="absolute top-[22%] left-[25%] w-[49%] h-[70%] overflow-hidden rounded-sm">
                            <Image
                                src="/images/lucas.jpg"
                                alt="Photo soirée"
                                fill
                                className="object-cover object-center"
                            />
                        </div>
                    </div>
                </div>

                {/* Polaroid Droite 2 */}
                <div className="absolute bottom-40 right-60 hidden md:block polaroid-left">
                    <div className="relative w-64 h-52">
                        <div className="absolute top-[10%] left-[0%] w-[100%] h-[100%]">
                            {/* Cadre */}
                            <Image
                                src="/images/cadre_polaroid_empty.png"
                                alt="Cadre polaroid"
                                fill
                                className="object-contain pointer-events-none"
                            />
                        </div>
                        {/* Photo */}
                        <div className="absolute top-[22%] left-[25%] w-[49%] h-[70%] overflow-hidden rounded-sm">
                            <Image
                                src="/images/vaity.jpg"
                                alt="Photo soirée"
                                fill
                                className="object-cover object-center"
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.section>
    );
}