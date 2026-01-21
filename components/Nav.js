"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "./CartContext";
import Cart from "./Cart";

export default function Nav() {
    const [open, setOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { items = [] } = useCart();
    const itemCount = items.reduce((sum, i) => sum + (i.quantity || 1), 0);

    const toggleMobile = () => {
        setOpen(o => !o);
        if (isCartOpen) setIsCartOpen(false);
    };

    const closeAll = () => {
        setOpen(false);
        setIsCartOpen(false);
    };

    const toggleCart = () => {
        setIsCartOpen(c => !c);
        if (open) setOpen(false);
    };

    return (
        <>
            {/* OVERLAY when menu is open */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
                    onClick={closeAll}
                />
            )}

            <nav className="fixed top-0 left-0 right-0 h-20 z-50 flex justify-between items-center px-6 bg-gray-600/40 backdrop-blur-xl border-b border-white/10">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-amber-800/25 overflow-hidden flex items-center p-1.5">
                        <Image
                            src="/images/logo_liste.png"
                            alt="Exoti'TSE"
                            width={70}
                            height={70}
                            className="object-contain"
                        />
                    </div>
                    <Link href="/">
                        <span className="text-2xl font-bold text-white cursor-pointer">
                            Exoti'TSE
                        </span>
                    </Link>
                </div>

                {/* Hamburger */}
                <button
                    className="md:hidden text-white p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 fixed right-4 top-4 z-50"
                    onClick={toggleMobile}
                >
                    {open ? (
                        <span className="text-3xl font-bold">✕</span>
                    ) : (
                        <span className="text-3xl">☰</span>
                    )}
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 text-white items-center">
                    <div className="flex gap-6">
                        <Link href="/" className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10 nav-link">Accueil</Link>
                        <Link href="/events" className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10 nav-link">Événements</Link>
                        <Link href="/team" className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10 nav-link">Équipe</Link>
                        <Link href="/gallery" className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10 nav-link">Galerie</Link>
                        <Link href="/menu" className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10 nav-link">Menu</Link>
                        <Link href="/contact" className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10 nav-link">Contact</Link>
                        <Link href="/partenariats" className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10 nav-link">Partenariats</Link>
                    </div>

                    {/* Cart (desktop) */}
                    <div className="relative">
                        <button
                            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
                            onClick={toggleCart}
                        >
                            Panier ({itemCount})
                        </button>

                        {isCartOpen && (
                            <div className="absolute right-0 mt-2 w-72 bg-black/80 border border-white/20 rounded-2xl p-4 z-50">
                                <Cart />
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden fixed top-20 left-0 right-0 bg-gray-700/95 backdrop-blur-xl border-b border-white/10 z-40 transition-all duration-300 ${
                        open ? "max-h-[480px] py-6" : "max-h-0 overflow-hidden"
                    }`}
                >
                    <div className="flex flex-col gap-6 px-6 text-white text-xl font-medium">
                        <Link href="/" onClick={closeAll}>Accueil</Link>
                        <Link href="/events" onClick={closeAll}>Événements</Link>
                        <Link href="/team" onClick={closeAll}>Équipe</Link>
                        <Link href="/gallery" onClick={closeAll}>Galerie</Link>
                        <Link href="/menu" onClick={closeAll}>Menu</Link>
                        <Link href="/contact" onClick={closeAll}>Contact</Link>
                        <Link href="/partenariats" onClick={closeAll}>Partenariat</Link>

                        {/* Cart mobile */}
                        <button
                            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white w-fit"
                            onClick={() => {
                                setIsCartOpen(true);
                                setOpen(false);
                            }}
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

                {/* Cart panel mobile */}
                {isCartOpen && (
                    <div className="absolute right-4 top-full mt-2 w-72 md:hidden bg-black/80 border border-white/20 rounded-2xl p-4 z-50">
                        <Cart />
                    </div>
                )}
            </nav>

            {/* Style global des liens */}
            <style jsx>{`
                .nav-link {
                    padding: 6px 12px;
                    border-radius: 8px;
                    font-weight: 600;
                    color: #ffffffcc;
                    transition: 0.2s;
                }
                .nav-link:hover {
                    background: rgba(255, 255, 255, 0.15);
                }
            `}</style>
        </>
    );
}
