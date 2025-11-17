import { motion } from 'framer-motion'
export default function TeamSection({ team=[] }){
return (
<section className="py-12 px-4">
<h2 className="text-3xl font-bold text-center mb-6">L'équipe</h2>
<div className="max-w-5xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-4">
{team.map(m => (
<motion.div key={m.id} whileHover={{ scale:1.02 }} className="card-bg rounded-2xl p-4 text-center">
<div className="w-20 h-20 rounded-full bg-white/10 mx-auto flex items-center justify-center text-xl font-bold">{m.name[0]}</div>
<div className="mt-3 font-semibold">{m.name}</div>
<div className="text-sm text-white/80">{m.role}</div>
<p className="mt-2 text-sm text-white/70">{m.bio}</p>