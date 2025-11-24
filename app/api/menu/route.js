// app/api/menu/route.js
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET() {
  try {
    const products = await stripe.products.list({
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
          img: p.images?.[0] || '/placeholder.webp',
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
    console.error('Stripe error:', err);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du menu.' },
      { status: 500 }
    );
  }
}
