export default function Conditions() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-16 text-white">
            <h1 className="text-3xl font-bold mb-6">Conditions générales</h1>

            <p className="mb-4">
                Le site Exoti’TSE permet la consultation d’événements et la commande de menus
                dans le cadre d’événements étudiants.
            </p>

            <p className="mb-4">
                L’utilisation du site Exoti’TSE implique l’acceptation pleine et entière des présentes conditions :
                <ol className="list-disc">
                    <li>- Le site est accessible gratuitement</li>
                    <li>- Les informations diffusées sont données à titre indicatif</li>
                    <li>- Exoti’TSE ne saurait être tenu responsable d’éventuelles interruptions ou erreurs</li>
                </ol>
            </p>

            <p className="mb-4">
                Les paiements sont effectués via Stripe, prestataire de paiement sécurisé.
                Exoti’TSE ne stocke aucune donnée bancaire.
            </p>

            <p className="mb-4">
                Toute commande est ferme et non remboursable sauf annulation de l’événement.
            </p>

            <p className="text-white/70 text-sm mt-6">
                Dernière mise à jour : {new Date().toLocaleDateString()}
            </p>
        </main>
    );
}
