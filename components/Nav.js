"use client";

import Link from 'next/link'
import { useState } from "react";
import Image from "next/image";
import { useCart } from './CartContext';
import Cart from './Cart';

export default function Nav() {
    const [open, setOpen] = useState(false); // mobile menu
    const [isCartOpen, setIsCartOpen] = useState(false); // cart panel
    const { items = [] } = useCart();
    const itemCount = items.reduce((sum, i) => sum + (i.quantity || 1), 0);

    const toggleMobile = () => {
        setOpen(o => !o);
        if (isCartOpen) setIsCartOpen(false);
    };

    const toggleCart = () => {
        setIsCartOpen(c => !c);
        if (open) setOpen(false);
    };

    return (
        <nav className="fixed top-4 left-4 right-4 z-50 flex justify-between items-center">

            {/* Logo */}
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-tropical1 via-tropical2 to-tropical3 flex items-center justify-center font-bold text-white">Ex</div>
                <Link href="/">
                    <span className="text-2xl font-bold text-white cursor-pointer">
                        Exoti'TSE
                    </span>
                </Link>
            </div>

            {/* Hamburger */}
            <button
                className="md:hidden text-white p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 fixed right-4 top-2.5 z-40"
                onClick={toggleMobile}
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
                <Link href="/partenariats" className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Partenariat</Link>
            </div>

            {/* Menu Mobile */}
            <div
                className={`md:hidden border-white/10 transition-all duration-300 overflow-hidden ${open ? "max-h-96 py-4" : "max-h-0"}`}
            >
                <div className="flex flex-col gap-4 px-6 text-white font-medium text-lg">
                    <Link href="/" onClick={() => { setOpen(false); setIsCartOpen(false); }}>Accueil</Link>
                    <Link href="/events" onClick={() => { setOpen(false); setIsCartOpen(false); }}>Événements</Link>
                    <Link href="/team" onClick={() => { setOpen(false); setIsCartOpen(false); }}>Équipe</Link>
                    <Link href="/gallery" onClick={() => { setOpen(false); setIsCartOpen(false); }}>Galerie</Link>
                    <Link href="/menu" onClick={() => { setOpen(false); setIsCartOpen(false); }}>Menu</Link>
                    <Link href="/contact" onClick={() => { setOpen(false); setIsCartOpen(false); }}>Contact</Link>
                    <Link href="/partenariats" onClick={() => { setOpen(false); setIsCartOpen(false); }}>Partenariat</Link>

                    {/* Cart button (mobile) */}
                    <button
                        className="mt-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white self-start"
                        onClick={() => { setIsCartOpen(true); setOpen(false); }}
                    >
                        Panier
                        {itemCount > 0 && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-emerald-500 rounded-full">
                                {itemCount}
                            </span>
                        )}

                    </button>
                </div>
            </div>

            {/* Cart panel for mobile */}
            {isCartOpen && (
                <div className="absolute right-4 top-full mt-2 w-72 md:hidden bg-black/80 border border-white/20 rounded-2xl p-4 z-50">
                    <Cart />
                </div>
            )}
        </nav>
    );
}
