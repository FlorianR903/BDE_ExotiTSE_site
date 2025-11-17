import { motion } from 'framer-motion'
export default function Hero(){
return (
<section className="min-h-screen flex items-center justify-center text-center relative overflow-hidden">
<div className="absolute inset-0 -z-10 bg-gradient-to-br from-tropical1 via-tropical2 to-tropical3" />
<motion.div initial={{ y: -10, opacity: 0 }} animate={{ y:0, opacity:1 }} transition={{ duration: 0.8 }} className="p-8">
<h1 className="text-5xl md:text-7xl font-extrabold text-white">Exotit'TSE <span>🌺</span></h1>
<p className="mt-4 text-lg md:text-xl text-white/95 max-w-2xl mx-auto">La liste tropicale — events, menus, goodies et plus.</p>
</motion.div>
</section>
)
}