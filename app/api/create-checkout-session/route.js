import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    const { items } = await req.json();

    // Récupération dynamique de l'origine pour success_url et cancel_url
    // Cela évite les erreurs si NEXT_PUBLIC_BASE_URL n'est pas défini en local
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Panier vide ou données manquantes' },
        { status: 400 }
      );
    }

    const validItems = items.filter(item => item.stripePriceId);

    if (validItems.length === 0) {
      return NextResponse.json(
        { error: 'Aucun article valide pour le paiement (manque stripePriceId)' },
        { status: 400 }
      );
    }

    const lineItems = validItems.map((item) => ({
      price: item.stripePriceId,
      quantity: item.quantity ?? 1,
    }));

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: lineItems,
      mode: 'payment',
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
