import Head from 'next/head'
import Nav from '../components/Nav'
import Hero from '../components/Hero'

// ---- PAGE ACCUEIL ---- //
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
            </main>
        </>
    );
}