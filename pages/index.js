import Head from 'next/head'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

// ---- PAGE ACCUEIL ---- //
export default function Home() {
    return (
        <>
            <Head>
                <title>Exoti'TSE</title>
            </Head>

            <Nav/>

            <main className="pt-20 text-white">

                <Hero />

                {/* Rubrique À PROPOS */}
                <div className="mt-10 bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-lg">
                    <h2 className="text-3xl font-bold mb-4">À propos</h2>
                    <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                        La liste <strong>Exoti'TSE</strong> va vous régaler durant <strong>TOUTE</strong> cette semaine
                        en vous organisant des soirées inoubliables, des plats succulents, et des events avec des partenariats de qualité !
                        <br /><br />
                        Notre mission ? Créer une ambiance chaleureuse, fédérer les étudiants
                        et vous offrir des moments mémorables. Vous faire kiffer tout simplement !
                        <br /><br />
                        Prépare-toi : la semaine s’annonce intense, fun et pleine de surprises 🌴🔥
                    </p>
                </div>
            </main>

            <Footer />
        </>
    );
}