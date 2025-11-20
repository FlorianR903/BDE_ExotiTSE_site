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

            <main className="pt-20 text-white">

                <Hero />

                {/* Rubrique À PROPOS */}
                <div className="mt-10 bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-lg">
                    <h2 className="text-3xl font-bold mb-4">À propos</h2>
                    <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                        Le BDE <strong>Exoti'TSE</strong> représente la vie étudiante
                        de la filière TSE en organisant des événements, soirées, sorties,
                        tournois et activités toute l’année.
                        <br /><br />
                        Notre mission ? Créer une ambiance chaleureuse, fédérer les étudiants
                        et vous offrir des moments mémorables.
                        <br /><br />
                        Prépare-toi : l’année s’annonce intense, fun et pleine de surprises 🌴🔥
                    </p>
                </div>
            </main>
        </>
    );
}