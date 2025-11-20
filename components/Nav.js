import Link from 'next/link'

export default function Nav(){

    return (
        <nav className="fixed top-4 left-4 right-4 z-40 flex justify-between items-center">
            <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-tropical1 via-tropical2 to-tropical3 flex items-center justify-center font-bold text-white">Ex</div>
            <div className="hidden md:block text-white font-semibold">Exoti'TSE</div>
            </div>
            <div className="flex gap-2">
                <Link href="/"><a className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Accueil</a></Link>
                <Link href="/events"><a className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Événements</a></Link>
                <Link href="/team"><a className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Équipe</a></Link>
                <Link href="/gallery"><a className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Galerie</a></Link>
                <Link href="/menu"><a className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Menus</a></Link>
                <Link href="/contact"><a className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Contact</a></Link>
                <Link href="/partenariats"><a className="px-3 py-1 rounded-full text-white/90 hover:bg-white/10">Partenariats</a></Link>
            </div>
        </nav>
);

}
