import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative mt-20 overflow-hidden">

            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-tropical1 via-tropical2 to-tropical3 opacity-90" />

            {/* Decorative wave */}
            <svg
                className="absolute -top-1 left-0 w-full"
                viewBox="0 0 1440 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="white"
                    fillOpacity="0.15"
                    d="M0,64L80,58.7C160,53,320,43,480,37.3C640,32,800,32,960,48C1120,64,1280,96,1360,112L1440,128V0H0Z"
                />
            </svg>

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-6 py-16 text-white">

                {/* Top */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full flex bg-white/20 backdrop-blur-md items-center p-1">
                                <Image
                                    src="/images/logo_liste.png"
                                    alt="Exoti'TSE"
                                    width={70}
                                    height={70}
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-2xl font-extrabold tracking-wide">
                Exoti’TSE 🌺
              </span>
                        </div>
                        <p className="text-sm text-white/80 leading-relaxed">
                            La liste tropicale qui fait vibrer le campus.<br />
                            Events, menus, goodies & vibes exotiques.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Navigation</h4>
                        <ul className="space-y-2 text-white/85">
                            <li><Link href="/" className="hover:underline">Accueil</Link></li>
                            <li><Link href="/events" className="hover:underline">Événements</Link></li>
                            <li><Link href="/gallery" className="hover:underline">Galerie</Link></li>
                            <li><Link href="/menu" className="hover:underline">Menu</Link></li>
                        </ul>
                    </div>

                    {/* Légal */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Informations légales</h4>
                        <ul className="space-y-2 text-white/85">
                            <li><Link href="/mentions-legales" className="hover:underline">Mentions légales</Link></li>
                            <li><Link href="/conditions" className="hover:underline">Conditions générales d'utilisation (CGU)</Link></li>
                            <li><Link href="/confidentialite" className="hover:underline">Politique de Confidentialité</Link></li>
                            <li><Link href="/cookies" className="hover:underline">Cookies</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Contact</h4>
                        <p className="text-white/80 text-sm">
                            📍 Sous les Sunlights des Tropiques<br />
                            📧 exotitse.contact@gmail.com<br />
                        </p>

                        <br/>

                        {/* Logo Insta */}
                        <a href="https://instagram.com/exoti__tse">
                            <div className="w-12 h-12 rounded-full flex bg-white/20 backdrop-blur-md items-center p-1">
                                <Image src="/images/logo_insta.png" alt="instagram" width={70} height={70} className="object-contain"/>
                                <p className="absolute text-sm text-white/80 font-bold left-16">exoti__tse</p>
                            </div>
                        </a>
                    </div>

                </div>

                {/* Bottom */}
                <div className="mt-12 pt-6 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">
                    <span>© {new Date().getFullYear()} Exoti’TSE — Tous droits réservés</span>
                    <span className="italic">🌴 Made with vibes & soleil</span>
                </div>
            </div>
        </footer>
    );
}