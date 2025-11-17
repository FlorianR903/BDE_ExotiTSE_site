import { motion } from 'framer-motion'
export default function EventsSection({ events=[] }){
return (
<section className="py-12 px-4">
<h2 className="text-3xl font-bold text-center mb-6">Événements</h2>
<div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
{events.map(ev => (
<motion.article key={ev.id} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} className="card-bg rounded-2xl p-4">
<div className="flex justify-between">
<div>
<h3 className="font-semibold">{ev.title}</h3>
<p className="text-sm text-white/80">{ev.desc}</p>
</div>
<div className="text-sm font-semibold">{ev.date}</div>
</div>
</motion.article>
))}
</div>
</section>
)
}