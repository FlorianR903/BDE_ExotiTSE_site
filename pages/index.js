import Head from 'next/head'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import EventsSection from '../components/EventsSection'
import TeamSection from '../components/TeamSection'
import GallerySection from '../components/GallerySection'
import MenuSection from '../components/MenuSection'
import ContactSection from '../components/ContactSection'
import AdminPanel from '../components/AdminPanel'

// ---- DATA TEMPORAIRE ---- //
const INITIAL_EVENTS = [
{ id: 1, title: 'Soirée Tropicale', date: '2025-12-02', desc: "DJ, cocktails et animation tiki" },
{ id: 2, title: 'After-Exam Chill', date: '2026-01-20', desc: "Brunch & jeux" }
]
const INITIAL_TEAM = [
{ id: 1, name: 'Alicia', role: 'Présidente', bio: 'Coordination & partenariats' },
{ id: 2, name: 'Lucas', role: 'Trésorier', bio: 'Budget & goodies' }
]
const INITIAL_GALLERY = [
'/placeholder.jpg','/placeholder.jpg','/placeholder.jpg','/placeholder.jpg','/placeholder.jpg','/placeholder.jpg'
]
const INITIAL_MENU = [
{ id:1, title:'Cocktail Exotique', price:'6€', desc:'Rhum, ananas et sirop maison' },
{ id:2, title:'Poke Bowl BDE', price:'8€', desc:'Option végétarienne' }
]

// ---- PAGE ---- //
export default function Home() {
    return (
        <>
            <Head>
                <title>Exoti'TSE</title>
            </Head>

            <Nav />

            <main className="pt-20">
                <Hero />

                {/* SECTION À PROPOS */}
                <section id="about" className="max-w-5xl mx-auto py-20 px-6 text-center text-white">
                    <h2 className="text-4xl font-bold mb-6">À propos</h2>
                    <p className="text-lg leading-relaxed text-white/90 max-w-3xl mx-auto">
                        Exoti'TSE est un Bureau Des Étudiants dynamique et créatif,
                        dont l’objectif est de proposer aux étudiants de la TSE
                        des événements mémorables, des partenariats avantageux
                        et une vie de campus riche et chaleureuse.
                        Notre équipe se mobilise pour organiser des soirées,
                        afterworks, animations et initiatives solidaires tout au long de notre semaine.
                    </p>
                </section>

                <section className="max-w-6xl mx-auto">
                    <EventsSection events={INITIAL_EVENTS} />
                    <TeamSection team={INITIAL_TEAM} />
                    <GallerySection items={INITIAL_GALLERY} />
                    <MenuSection items={INITIAL_MENU} />
                    <ContactSection />
                </section>
            </main>

            <AdminPanel />
</>
)
}