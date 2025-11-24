require('dotenv').config({ path: '.env.local' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
  for (const item of menu) {
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
  }
}

createStripeMenu().catch(console.error);
