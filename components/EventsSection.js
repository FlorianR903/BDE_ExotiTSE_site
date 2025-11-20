/* ÉVÉNEMENTS À VENIR */

export default function EventsSection({ events=[] }){

    return (
        <section id="evenements" className="py-20 px-6 bg-gradient-to-br from-purple-700/20 to-pink-500/20">
            <h2 className="text-3xl font-bold text-center mb-6">Événements</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

                {/* Carte 1 */}
                <div className="card-bg p-6 rounded-2xl border border-white/10 shadow-lg hover:scale-[1.02] transition-all">
                    <h3 className="text-2xl font-semibold text-white">Soirée d’intégration</h3>
                    <p className="text-white/80 mt-2">15 octobre 2025</p>
                    <p className="text-white/70 mt-4">
                        Une soirée mémorable pour accueillir les nouveaux étudiants dans une ambiance festive !
                    </p>
                </div>

                {/* Carte 2 */}
                <div className="card-bg p-6 rounded-2xl border border-white/10 shadow-lg hover:scale-[1.02] transition-all">
                    <h3 className="text-2xl font-semibold text-white">Tournoi de jeux vidéo</h3>
                    <p className="text-white/80 mt-2">27 octobre 2025</p>
                    <p className="text-white/70 mt-4">
                        Affrontez les autres étudiants dans un tournoi fun et compétitif sur plusieurs jeux.
                    </p>
                </div>

                {/* Carte 3 */}
                <div className="card-bg p-6 rounded-2xl border border-white/10 shadow-lg hover:scale-[1.02] transition-all">
                    <h3 className="text-2xl font-semibold text-white">Sortie patinoire</h3>
                    <p className="text-white/80 mt-2">4 novembre 2025</p>
                    <p className="text-white/70 mt-4">
                        Une après-midi conviviale à la patinoire pour créer des souvenirs et partager de bons moments.
                    </p>
                </div>

            </div>
        </section>
    );
}