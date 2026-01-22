import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Nav from '../components/Nav';
import Head from 'next/head';

export default function UploadPhotoPage() {
    const events = [
        { id: 1, title: "🌈🔥 Soirée Flashy 🔥🌈️", date: "2026-01-27" },
        { id: 2, title: "♠️♥️ Soirée Casino ♦️♣️", date: "2026-01-28" },
        { id: 3, title: "Le fameux Apparthon 🍻", date: "2026-01-29" },
        { id: 4, title: "Koh-Lanta'waii 🧭", date: "2026-01-29" },
        { id: 5, title: "🔥 Shatta Night 🔥", date: "2026-01-31" },
        { id: 6, title: "❓ Soirée Mystère ❓", date: "2026-02-01" }
    ];

    // Filtrer uniquement les événements passés
    const pastEvents = useMemo(() => {
        const today = new Date();
        return events.filter(event => new Date(event.date) < today);
    }, []);

    const [status, setStatus] = useState('idle'); // idle, loading, success

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        const fileInput = e.target.querySelector('input[type="file"]');
        const eventSelect = e.target.querySelector('select');
        const eventName = eventSelect.options[eventSelect.selectedIndex].text;
        const files = Array.from(fileInput.files);

        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbweIC5VBTWR5eN7dtshdpYt-XIUsUMiv03NZyquXnH1Am1JF-GhdYEoq2IKP21sWz80/exec"; // URL du gg Script

        try {
            for (const file of files) {
                const base64 = await toBase64(file);
                const data = {
                    base64: base64.split(',')[1],
                    type: file.type,
                    name: file.name,
                    eventName: eventName
                };

                await fetch(SCRIPT_URL, {
                    method: "POST",
                    mode: "no-cors", // Mode nécessaire pour Google Script
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });
            }
            setStatus('success');
        } catch (error) {
            console.error(error);
            alert("Erreur lors de l'envoi.");
            setStatus('idle');
        }
    };

    // Fonction utilitaire pour convertir le fichier
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    return (
        <>
            <Head><title>Partager mes photos - Exoti'TSE</title></Head>
            <Nav />
            <div className="min-h-screen pt-24 pb-12 px-6 flex flex-col items-center">

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl"
                >
                    <h1 className="text-3xl font-extrabold text-white mb-2 text-center">Partage tes souvenirs 📸</h1>
                    <p className="text-white/60 text-center mb-8">
                        Sélectionne un événement passé pour nous envoyer tes pépites.
                    </p>

                    {status === 'success' ? (
                        <div className="text-center py-10">
                            <div className="text-5xl mb-4">✅</div>
                            <h2 className="text-2xl font-bold text-white">Merci !</h2>
                            <p className="text-white/70 mt-2">Tes photos ont été envoyées pour modération.</p>
                            <button onClick={() => setStatus('idle')} className="mt-6 text-pink-400 underline">Envoyer d'autres photos</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* SÉLECTION DE L'ÉVÉNEMENT */}
                            <div>
                                <label className="block text-white/80 text-sm font-semibold mb-2">Quel événement ?</label>
                                <select
                                    required
                                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                                >
                                    <option value="" className="bg-[#2a1b3d]">Choisir un événement passé...</option>
                                    {pastEvents.map(event => (
                                        <option key={event.id} value={event.id} className="bg-[#2a1b3d]">
                                            {event.title} ({new Date(event.date).toLocaleDateString('fr-FR')})
                                        </option>
                                    ))}
                                </select>
                                {pastEvents.length === 0 && (
                                    <p className="text-white/60 mt-1 italic">
                                        Aucun événement n'est encore terminé. Patience mon p'tit rayon de soleil !
                                    </p>
                                )}
                            </div>

                            {/* UPLOAD DES FICHIERS */}
                            <div>
                                <label className="block text-white/80 text-sm font-semibold mb-2">Tes photos</label>
                                <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:bg-white/5 transition cursor-pointer relative">
                                    <input
                                        type="file"
                                        multiple
                                        required
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    <div className="text-4xl mb-2">📁</div>
                                    <p className="text-white/60 text-sm">Clique ou glisse tes photos ici (import non affiché)</p>
                                    <p className="text-[10px] text-white/45 mt-1">PNG, JPG jusqu'à 10Mo par fichier</p>
                                </div>
                            </div>

                            {/* BOUTON D'ENVOI */}
                            <button
                                type="submit"
                                disabled={pastEvents.length === 0 || status === 'loading'}
                                className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg
                                    ${pastEvents.length === 0
                                    ? 'bg-gray-500 cursor-not-allowed opacity-50'
                                    : 'bg-gradient-to-r from-pink-500 to-orange-400 hover:scale-[1.02] active:scale-95'
                                }`}
                            >
                                {status === 'loading' ? "Envoi en cours..." : "Envoyer à l'équipe Com'"}
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </>
    );
}