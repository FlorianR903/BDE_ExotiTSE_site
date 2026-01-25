    import Stripe from 'stripe';
    import { NextResponse } from 'next/server';

    export async function POST(req) {
    // Vérification de la clé secrète Stripe
    if (!process.env.STRIPE_SECRET_KEY) {
        console.error("❌ STRIPE_SECRET_KEY manquante !");
        return NextResponse.json(
        { error: "Configuration serveur manquante : STRIPE_SECRET_KEY" },
         { status: 500 }
        );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    try {
        const { items } = await req.json();

        // Récupération dynamique de l'origine pour success_url et cancel_url
        // Cela évite les erreurs si NEXT_PUBLIC_BASE_URL n'est pas défini en local
        const headerOrigin = req.headers.get('origin')

        let origin = headerOrigin
            || process.env.NEXT_PUBLIC_BASE_URL
            || (process.env.VERCEL_URL
                ? `https://${process.env.VERCEL_URL}`
                : null)
            || "http://localhost:3000";

        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
            { error: 'Panier vide ou données manquantes' },
            { status: 400 }
            );
        }

        // --- DÉBUT SÉCURISATION ---
        const lineItems = [];
        
        for (const item of items) {
            // Ignorer les items sans ID de prix valide (format string)
            if (!item.stripePriceId || typeof item.stripePriceId !== 'string') {
                continue;
            }

            // Conversion et validation de la quantité
            let qty = parseInt(item.quantity);
            
            // Si la quantité est invalide ou < 1, on met 1 par défaut
            if (isNaN(qty) || qty < 1) {
                qty = 1;
            }
            // Plafond de sécurité (anti-spam / anti-grosses commandes accidentelles)
            if (qty > 50) {
                qty = 50;
            }

            lineItems.push({
                price: item.stripePriceId,
                quantity: qty,
            });
        }

        if (lineItems.length === 0) {
            return NextResponse.json(
            { error: 'Aucun article valide dans le panier' },
            { status: 400 }
            );
        }
        // --- FIN SÉCURISATION ---

        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            line_items: lineItems,
            mode: 'payment',

            // Retourne toujours vers l'origine correcte, même sans variable d’env
            return_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,

            shipping_address_collection: {
                allowed_countries: ['FR'],
            },
            phone_number_collection: {
                enabled: true,
            },
        });

        return NextResponse.json({ clientSecret: session.client_secret });

    } catch (err) {
        console.error('Stripe Checkout error:', err);

        return NextResponse.json(
        { error: err.message || 'Erreur lors de la création de la session de paiement' },
        { status: 500 }
        );
    }
    }
