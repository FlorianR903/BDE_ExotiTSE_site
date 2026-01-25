// app/api/create-checkout-session/route.js
import { NextResponse } from 'next/server';
import { getSumupProducts } from '../../../utils/sumup';

const SUMUP_KEY_SECRET = process.env.SUMUP_KEY_SECRET || "sup_sk_NiXsP46x9SvhcLDXlD7edLAUznrhLC0ni";

export async function POST(req) {
    try {
        const { items } = await req.json();

        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json({ error: 'Panier vide' }, { status: 400 });
        }

        // 1. Récupérer les produits frais depuis SumUp uniquement
        let sumupCatalog = await getSumupProducts();
        if (!sumupCatalog || sumupCatalog.length === 0) {
            return NextResponse.json({ error: 'Aucun produit disponible (catalogue SumUp vide)' }, { status: 400 });
        }

        let totalAmount = 0;
        let descriptionItems = [];

        for (const item of items) {
            const productId = item.stripePriceId;
            const product = sumupCatalog.find(p => p.id === productId);
            if (!product) continue;
            const activeVariant = product.variants && product.variants.length > 0 ? product.variants[0] : null;
            const unitPrice = product.price || (activeVariant ? activeVariant.price : 0);
            const productName = product.name;
            if (!unitPrice && unitPrice !== 0) continue;
            let qty = parseInt(item.quantity);
            if (isNaN(qty) || qty < 1) qty = 1;
            if (qty > 50) qty = 50;
            totalAmount += unitPrice * qty;
            descriptionItems.push(`${qty}x ${productName}`);
        }


        if (totalAmount <= 0) {
             return NextResponse.json({ error: 'Montant total invalide' }, { status: 400 });
        }
        

        // Formatage strict pour SumUp
        // 1. amount doit être une string "10.00"
        const amountStr = totalAmount.toFixed(2);

        // 2. description : plain text, max 128 caractères, pas de caractères spéciaux
        let description = descriptionItems.join(', ');
        description = description.replace(/[^\w\s,.'\-]/g, '').substring(0, 128);
        if (!description) description = 'Commande ExotiTSE';

        // 3. URL de retour
        const headerOrigin = req.headers.get('origin');
        const origin = headerOrigin 
            || process.env.NEXT_PUBLIC_BASE_URL 
            || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

        const checkoutRef = `CMD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const sumupPayload = {
            checkout_reference: checkoutRef,
            amount: amountStr,
            currency: "EUR",
            pay_to_email: "tresorerie.exotitse@gmail.com",
            description,
            return_url: `${origin}/success?session_id=${checkoutRef}`,
        };

        const response = await fetch('https://api.sumup.com/v0.1/checkouts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${SUMUP_KEY_SECRET}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sumupPayload),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('SumUp Error:', data);
            return NextResponse.json({ error: `Erreur SumUp: ${data.message || 'Inconnue'}` }, { status: 500 });
        }
        
        return NextResponse.json({ 
            checkoutId: data.id, 
            amount: totalAmount
        });

    } catch (err) {
        console.error('Server error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}


