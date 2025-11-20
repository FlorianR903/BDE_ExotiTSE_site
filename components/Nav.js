import Link from 'next/link'
import { useState } from "react";

export default function Nav(){
    const [open, setOpen] = useState(false);

    return (
        <nav className="fixed top-4 left-4 right-4 z-40 flex justify-between items-center">

            {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-tropical1 via-tropical2 to-tropical3 flex items-center justify-center font-bold text-white">Ex</div>

                    <Link href="/">
                        <span className="text-2xl font-bold text-white cursor-pointer">
                            Exoti'TSE
                        </span>
                    </Link>
                </div>

                {/* Menu Desktop */}
                <div className="hidden md:flex gap-8 text-white">
                    <Link href="/index"><a className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Accueil</a></Link>
                    <Link href="/events"><a className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Événements</a></Link>
                    <Link href="/team"><a className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Équipe</a></Link>
                    <Link href="/gallery"><a className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Galerie</a></Link>
                    <Link href="/menu"><a className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Menu</a></Link>
                    <Link href="/contact"><a className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Contact</a></Link>
                    <Link href="/partenariats"><a className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Partenariat</a></Link>
                </div>

                {/* Hamburger */}
                <button
                    className="md:hidden text-white text-3xl"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>

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
