// app/api/menu/route.js
import { NextResponse } from 'next/server';
import { products } from '../../../data/menu';

export async function GET() {
    // Utilisation du catalogue local généré depuis le CSV
    const menu = products.map(p => ({
        id: p.id,
        title: p.title,
        desc: p.desc || "",
        img: p.img || '/images/logo.png',
        stripePriceId: p.id, // compat front
        rawAmount: Math.round((p.price || 0) * 100),
        currency: p.currency || 'EUR',
        price: new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: (p.currency || 'EUR'),
        }).format(p.price || 0),
    }));

    return NextResponse.json(menu);
}


