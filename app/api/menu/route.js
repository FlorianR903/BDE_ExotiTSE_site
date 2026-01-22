// app/api/menu/route.js
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

// Menu de secours si Stripe est indisponible
const fallbackMenu = [
    {
        id: "fallback-1",
        title: "Menu indisponible",
        desc: "Le menu en ligne est temporairement indisponible.",
        img: "/images/logo.png",
        stripePriceId: null,
        rawAmount: null,
        currency: null,
        price: "Indisponible",
    },
];

export async function GET() {

    // 1️⃣ Vérification de la clé Stripe
    if (!process.env.STRIPE_SECRET_KEY) {
        console.error("❌ STRIPE_SECRET_KEY manquante. Utilisation du menu fallback.");
        return NextResponse.json(fallbackMenu);
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    try {
        const products = await stripe.products.list({
            limit: 20,
            active: true,
            expand: ['data.default_price'],
        });

        const menu = products.data
            // Optionnel : ne garder que les produits du menu (via metadata)
            // .filter(p => p.metadata?.type === 'menu')
            .map((p) => {
                const price = p.default_price;

            if (!price) {
                console.warn('Produit sans default_price (ignoré) :', p.name);
                return null;
            }

            return {
                id: p.id,
                title: p.name,
                desc: p.description,
                img: p.images?.[0] || '/images/logo.png',
                day: p.metadata?.Day, // on récupère le jour (lun, mar, etc.)
                stripePriceId: price.id,
                rawAmount: price.unit_amount,
                currency: price.currency,
                price: new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: price.currency.toUpperCase(),
                }).format(price.unit_amount / 100),
            };
            })
            .filter(Boolean);

        return NextResponse.json(menu);
    } catch (err) {
        console.error("❌ Erreur Stripe:", err);

        // 2️⃣ Stripe error → menu fallback
        return NextResponse.json(fallbackMenu);
    }
}
