"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function MaintenancePage() {
    const endDate = new Date("2026-01-25T18:00:00");
    const [time, setTime] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const diff = endDate - now;

            if (diff <= 0) {
                clearInterval(interval);
                setTime(null);
                return;
            }

            setTime({
                d: Math.floor(diff / (1000 * 60 * 60 * 24)),
                h: Math.floor((diff / (1000 * 60 * 60)) % 24),
                m: Math.floor((diff / (1000 * 60)) % 60),
                s: Math.floor((diff / 1000) % 60),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 text-white">

            {/* 🌈 Fond animé */}
            <div className="absolute inset-0 bg-animated-gradient -z-30" />
            <div className="absolute inset-0 bg-wave-pattern opacity-30 -z-20" />
            <div className="absolute inset-0 bg-noise -z-10" />

            {/* ✨ Particules */}
            {[...Array(15)].map((_, i) => (
                <span
                    key={i}
                    className="particle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 10}s`,
                        animationDuration: `${12 + Math.random() * 10}s`,
                    }}
                />
            ))}

            {/* 🧊 Glass Card */}
            <section className="relative w-full max-w-4xl backdrop-blur-3xl rounded-[3rem] border-none p-8 md:p-16 text-center animate-fade-up">

                {/* 🌟 Logo & Titre (Centrés verticalement) */}
                <div className="flex flex-col items-center gap-6 mb-10">
                    <div className="logo-glow">
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-2xl">
                            Exoti&apos;TSE
                        </h1>
                    </div>
                </div>

                <br></br>

                {/* Phrase d'accroche avec saut de ligne */}
                <p className="text-lg md:text-2xl text-white/90 font-medium mb-12">
                    🌴 Votre expérience tropicale arrive bientôt...
                </p>

                {/* ⏳ Compteur : 2x2 sur mobile, 4 carrés sur PC */}
                {time ? (
                    <div className="grid grid-cols-2 md:flex md:flex-row justify-center items-center gap-4 md:gap-8 mt-8">
                        <Counter label="Jours" value={time.d} />
                        <Counter label="Heures" value={time.h} />
                        <Counter label="Minutes" value={time.m} />
                        <Counter label="Secondes" value={time.s} pulse />
                    </div>
                ) : (
                    <div className="mt-12 p-6 bg-white/10 rounded-2xl">
                        <p className="text-2xl font-bold text-emerald-300">
                            🚀 Le site est en ligne !
                        </p>
                    </div>
                )}

                <br></br>

                {/* Footer bien détaché */}
                <footer className="mt-20 text-white/40 uppercase tracking-[0.3em]">
                    © {new Date().getFullYear()} Exoti&apos;TSE. Tous droits réservés.
                </footer>
            </section>
        </main>
    );
}

function Counter({ label, value, pulse }) {
    return (
        /* aspect-square force la forme carrée */
        <div className={`counter-card flex flex-col justify-center items-center aspect-square w-40 md:w-full ${pulse ? "pulse" : ""}`}>
            <div className="counter-value text-4xl md:text-7xl">
                {String(value).padStart(2, "0")}
            </div>
            <div className="counter-label text-[10px] md:text-xs font-bold">
                {label}
            </div>
        </div>
    );
}