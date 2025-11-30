// Charge .env.local si présent, mais ne plante pas s'il n'existe pas
try {
    require('dotenv').config({ path: '.env.local' });
} catch (_) {
    console.warn("⚠ Impossible de charger .env.local (fichier absent)");
}

// Vérification sécurisée de la clé Stripe
const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_KEY) {
    console.error("\n❌ ERREUR : STRIPE_SECRET_KEY manquant.");
    console.error("➡ Ajoute STRIPE_SECRET_KEY dans un .env.local ou .env avant d'exécuter ce script.\n");
    process.exit(1);
}

const stripe = require('stripe')(STRIPE_KEY);

// On part de ton menu, mais avec des prix en CENTIMES, comme Stripe le demande
const menu = [
    { id: 1, name: "Rougail Saucisse", amount: 800, currency: "eur", description: "Saucisse, riz, tomates, oignons, épices" },
    { id: 2, name: "Virgin Paradise", amount: 500, currency: "eur", description: "Mocktail fruits tropicaux" },
    { id: 3, name: "Poke Bowl BDE", amount: 800, currency: "eur", description: "Base riz, mangue, saumon ou végé" },
    { id: 4, name: "Wrap Poulet Crunch", amount: 600, currency: "eur", description: "Wrap croustillant sauce maison" },
    { id: 5, name: "Assiette Apéro", amount: 700, currency: "eur", description: "Nachos, guacamole & tapas" },
    { id: 6, name: "Smoothie Energy", amount: 400, currency: "eur", description: "Banane, fraise, lait d’amande" }
];

async function createStripeMenu() {
    console.log("\n🚀 Création des produits Stripe...\n");

    for (const item of menu) {
        try{
            // 1) Création du product Stripe
            const product = await stripe.products.create({
                name: item.name,
                description: item.description,
                metadata: {
                    menu_id: String(item.id)   // pratique pour faire le lien avec ton menu front
                }
            });

            // 2) Création du price Stripe (paiement one-shot)
            const price = await stripe.prices.create({
                unit_amount: item.amount,    // en centimes
                currency: item.currency,
                product: product.id
            });

            console.log(`✔ ${item.name}`);
            console.log(`   product_id: ${product.id}`);
            console.log(`   price_id:   ${price.id}\n`);
        } catch(err) {
            console.error(`❌ Erreur pour ${item.name} :`, err.message);
        }
    }
    console.log("🎉 Terminé !");
}

createStripeMenu().catch(console.error);
