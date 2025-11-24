import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Panier vide ou données manquantes' },
        { status: 400 }
      );
    }

    // Validate that all items have required fields
    const invalidItems = items.filter(item => !item.stripePriceId || !item.quantity);
    if (invalidItems.length > 0) {
      return NextResponse.json(
        { error: 'Certains articles du panier sont invalides' },
        { status: 400 }
      );
    }

    const lineItems = items.map((item) => ({
      price: item.stripePriceId,
      quantity: item.quantity ?? 1,
    }));

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
      locale: 'fr',
      billing_address_collection: 'auto',
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe Checkout error:', err);
    
    // Don't expose internal error details in production
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Erreur lors de la création de la session de paiement'
      : err.message;
    
    return NextResponse.json(
      { error: 'Erreur lors de la création de la session de paiement', details: errorMessage },
      { status: 500 }
    );
  }
}
