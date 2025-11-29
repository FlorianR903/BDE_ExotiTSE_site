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
            {/* Dimmed background when mobile menu is open */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
                    onClick={closeAll}
                />
            )}

            <nav className="
                fixed top-0 left-0 right-0 h-20 z-50
                flex justify-between items-center px-6
                bg-gradient-to-r from-black/40 via-gray-700/30 to-black/40
                backdrop-blur-xl border-b border-white/10
                shadow-[0_0_25px_rgba(255,255,255,0.08)]
            ">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 shadow-md overflow-hidden">
                        <Image
                            src="/images/logo_empty_bg.png"
                            alt="Logo du site"
                            width={80}
                            height={80}
                            className="object-contain"
                        />
                    </div>
                    <Link href="/">
                        <span className="text-3xl font-extrabold tracking-wide text-white drop-shadow-lg cursor-pointer">
                            Exoti'TSE
                        </span>
                    </Link>
                </div>

                {/* Hamburger */}
                <button
                    className="
                        md:hidden text-white p-2 rounded-xl
                        bg-white/10 backdrop-blur-md border border-white/30
                        shadow-[0_0_12px_rgba(255,255,255,0.15)]
                        fixed right-4 top-4 z-50
                        active:scale-95 transition
                    "
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
                        <Link href="/" className="nav-item">Accueil</Link>
                        <Link href="/events" className="nav-item">Événements</Link>
                        <Link href="/team" className="nav-item">Équipe</Link>
                        <Link href="/gallery" className="nav-item">Galerie</Link>
                        <Link href="/menu" className="nav-item">Menu</Link>
                        <Link href="/contact" className="nav-item">Contact</Link>
                        <Link href="/partenariats" className="nav-item">Partenariat</Link>
                    </div>

                    {/* Cart (desktop) */}
                    <div className="relative">
                        <button
                            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white shadow-inner border border-white/20 transition"
                            onClick={toggleCart}
                        >
                            Panier ({itemCount})
                        </button>

                        {isCartOpen && (
                            <div className="absolute right-0 mt-3 w-72 bg-black/90 border border-white/20 rounded-2xl p-4 z-50 shadow-xl">
                                <Cart />
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden fixed top-20 left-0 right-0 z-40 
                        transform transition-all duration-500 origin-top
                        bg-gradient-to-b from-black/90 to-gray-900/95 
                        border-b border-white/10 shadow-lg
                        ${
                        open
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-10 pointer-events-none"
                    }`}
                >
                    <div className="flex flex-col gap-6 px-6 py-8 text-white text-xl font-medium">
                        <Link href="/" onClick={closeAll}>Accueil</Link>
                        <Link href="/events" onClick={closeAll}>Événements</Link>
                        <Link href="/team" onClick={closeAll}>Équipe</Link>
                        <Link href="/gallery" onClick={closeAll}>Galerie</Link>
                        <Link href="/menu" onClick={closeAll}>Menu</Link>
                        <Link href="/contact" onClick={closeAll}>Contact</Link>
                        <Link href="/partenariats" onClick={closeAll}>Partenariat</Link>

                        {/* Cart mobile */}
                        <button
                            className="px-5 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white w-fit shadow-md transition"
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

                {/* Cart mobile */}
                {isCartOpen && (
                    <div className="absolute right-4 top-full mt-2 w-72 md:hidden bg-black/90 border border-white/20 rounded-2xl p-4 z-50 shadow-xl">
                        <Cart />
                    </div>
                )}
            </nav>

            {/* Desktop nav-items hover effect */}
            <style jsx>{`
                .nav-item {
                    padding: 8px 14px;
                    border-radius: 10px;
                    position: relative;
                    font-weight: 600;
                    color: #ffffffd5;
                    transition: 0.25s ease;
                }
                .nav-item::after {
                    content: "";
                    position: absolute;
                    left: 50%;
                    bottom: -4px;
                    transform: translateX(-50%);
                    width: 0%;
                    height: 2px;
                    background: white;
                    border-radius: 10px;
                    transition: width 0.25s ease;
                }
                .nav-item:hover::after {
                    width: 80%;
                }
                .nav-item:hover {
                    color: white;
                }
            `}</style>
        </>
    );
}
