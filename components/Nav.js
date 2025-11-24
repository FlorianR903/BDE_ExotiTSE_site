import Link from 'next/link'
import { useState } from "react";
import Image from "next/image";

export default function Nav(){
    const [open, setOpen] = useState(false);

    return (
        <nav className="fixed top-4 left-4 right-4 z-50 flex justify-between items-center">

            {/* Logo */}
            <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-fuchsia-400/60">
                    <Image src="/images/logo_empty_bg.png" alt="Logo du site" width={80} height={20} className="object-contain"></Image>
                </div>
                <Link href="/">
                    <span className="text-2xl font-bold text-white cursor-pointer">
                        Exoti'TSE
                    </span>
                </Link>
            </div>

            {/* Hamburger */}
            <button
                className="md:hidden text-white p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 fixed right-4 top-2.5 z-40"
                onClick={() => setOpen(!open)}
            >
                {open ? (
                    <span className="text-3xl font-bold">✕</span>
                ) : (
                    <span className="text-3xl">☰</span>
                )}
            </button>

            {/* Menu Desktop */}
            <div className="hidden md:flex gap-8 text-white">
                <Link href="/" className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Accueil</Link>
                <Link href="/events" className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Événements</Link>
                <Link href="/team" className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Équipe</Link>
                <Link href="/gallery" className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Galerie</Link>
                <Link href="/menu" className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Menu</Link>
                <Link href="/contact" className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Contact</Link>
                <Link href="/partenariats" className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Partenariats</Link>
            </div>

            {/* Menu Mobile */}
            <div
                className={`md:hidden border-white/10 transition-all duration-300 overflow-hidden ${
                    open ? "max-h-96 py-4" : "max-h-0"
                }`}
            >
                <div className="flex flex-col gap-4 px-6 text-white font-medium text-lg">
                    <Link href="/" onClick={() => setOpen(false)}>Accueil</Link>
                    <Link href="/events" onClick={() => setOpen(false)}>Événements</Link>
                    <Link href="/team" onClick={() => setOpen(false)}>Équipe</Link>
                    <Link href="/gallery" onClick={() => setOpen(false)}>Galerie</Link>
                    <Link href="/menu" onClick={() => setOpen(false)}>Menu</Link>
                    <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
                    <Link href="/partenariats" onClick={() => setOpen(false)}>Partenariat</Link>
                </div>
            </div>
        </nav>
    );
}
