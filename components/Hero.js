import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <motion.section className="min-h-screen flex items-center justify-center text-center relative overflow-hidden"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}>

            {/*Background*/}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-tropical1 via-tropical2 to-tropical3 bg-no-repeat bg-cover bg-fixed" />

            <motion.div className="p-8"
                        animate={{ y:0, opacity:1 }}
                        transition={{ duration: 0.8 }}>
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

                {/* Logo géant en arrière-plan */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <span className="text-[14rem] md:text-[20rem] opacity-10 select-none" style={{ filter: "blur(1px)" }}>
                        <Image src="/images/logo_liste.png" alt="Logo arriere plan" width={500} height={400}/></span>
                </div>

                {/*Titre*/}
                <Image src="/images/palmiers_empty.png" alt={"Palmiers de fond"} width={400} height={100} className="mb-auto relative z-10"></Image>
                <h1 className="text-5xl md:text-7xl font-extrabold relative z-10 text-white">Exoti'TSE <span>🌺</span></h1>
                <p className="mt-4 relative z-10 text-lg md:text-xl text-white/95 max-w-2xl mx-auto">La liste tropicale — events, menus, goodies et plus.</p>

                {/*Boutton Commander*/}
                <div className="relative z-10 mt-8 flex justify-center">
                    <Link href="/menu" className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full text-xl md:text-2xl font-extrabold text-white bg-gradient-to-r from-orange-400 via-pink-500 to-fuchsia-500
                                                shadow-[0_15px_40px_rgba(255,105,180,0.5)]
                                                transition-all
                                                duration-300
                                                hover:scale-105
                                                hover:shadow-[0_20px_50px_rgba(255,105,180,0.7)]
                                                active:scale-95">
                        {/* Effet glow */}
                        <span className="absolute inset-0 rounded-full blur-xl opacity-40 bg-gradient-to-r from-pink-400 to-yellow-300 group-hover:opacity-70 transition" />

                        {/* Contenu */}
                        <span className="relative flex items-center gap-3">
                            🌴 <span>Commander</span> 🍹
                        </span>
                    </Link>
                </div>

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
                                src="/images/andjy.jpg"
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