export default function Confidentialite() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-16 text-white">
            <h1 className="text-3xl font-bold mb-6">Politique de confidentialité</h1>

            <h2 className="text-2xl font-bold mb-6">Données collectées</h2>
            <p className="mb-4">
                Exoti’TSE collecte uniquement les données nécessaires à la gestion
                des commandes et événements.
            </p>

            <ul className="list-disc pl-6 mb-4">
                <li>Nom / Prénom</li>
                <li>Adresse mail</li>
                <li>Adresse postale (commandes)</li>
                <li>Données de paiements <strong>(traitées exclusivement par Stripe)</strong></li>
            </ul>

            <h2 className="text-2xl font-bold mb-6">Utilisation des données</h2>
            <ul className="list-disc pl-6 mb-4">
                <li>Gestion des commandes</li>
                <li>Communication liée aux événements</li>
                <li>Amélioration de l’expérience utilisateur</li>
            </ul>

            <h2 className="text-2xl font-bold mb-6">Paiement</h2>
            <p className="mb-4">
                Les paiements sont sécurisés et traités via Stripe.<br/>
                Aucune donnée bancaire n’est stockée sur nos serveurs.
            </p>

            <h2 className="text-2xl font-bold mb-6">Durée de conservation</h2>
            <p>
                Les données sont conservées uniquement le temps nécessaire aux finalités prévues.
            </p>

            <br/>

            <h2 className="text-2xl font-bold mb-6">Vos droits</h2>
            <p>
                Conformément au RGPD, vous disposez d'un droit :<br/>
                <ul className="list-disc pl-6 mb-4">
                    <li>- d'accès</li>
                    <li>- de rectification</li>
                    <li>- de suppression</li>
                </ul>
                Vous pouvez demander la suppression de vos données en écrivant à : contact@exotitse.fr
            </p>
        </main>
    );
}
