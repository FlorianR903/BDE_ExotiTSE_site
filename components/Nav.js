import Link from 'next/link'
import { useState } from "react";

export default function Nav(){
    const [open, setOpen] = useState(false);

    return (
        <nav className="w-full fixed top-0 left-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Logo */}
                <Link href="/">
                    <span className="text-2xl font-bold text-white cursor-pointer">
                        Exoti'TSE
                    </span>
                </Link>

                {/* Menu Desktop */}
                <div className="hidden md:flex gap-8 text-white">
                    <Link href="/index" className="hover:text-pink-400 transition">Accueil</Link>
                    <Link href="/events" className="hover:text-pink-400 transition">Événements</Link>
                    <Link href="/team" className="hover:text-pink-400 transition">Équipe</Link>
                    <Link href="/gallery" className="hover:text-pink-400 transition">Galerie</Link>
                    <Link href="/menu" className="hover:text-pink-400 transition">Menu</Link>
                    <Link href="/contact" className="hover:text-pink-400 transition">Contact</Link>
                    <Link href="/partenariats" className="hover:text-pink-400 transition">Partenariat</Link>
                </div>

                {/* Hamburger */}
                <button
                    className="md:hidden text-white text-3xl"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>
            </div>

            {/* Menu Mobile */}
            {open && (
                <div className="md:hidden bg-black/80 px-6 py-4 flex flex-col gap-4 text-white border-t border-white/10">
                    <Link href="/index">Accueil</Link>
                    <Link href="/events">Événements</Link>
                    <Link href="/team">Équipe</Link>
                    <Link href="/gallery">Galerie</Link>
                    <Link href="/menu">Menu</Link>
                    <Link href="/contact">Contact</Link>
                    <Link href="/partenariats">Partenariats</Link>
                </div>
            )}
        </nav>
    );
}
