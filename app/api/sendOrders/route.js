import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {

    try {
        const body = await req.json();
        
        // Champs unifiés et champs historiques
        let { 
            firstName, 
            lastName, 
            address, 
            phone, 
            note,
            email, 
            itemName, 
            quantity, 
            fullName,
            items,
            totalAmount
        } = body;

        // Consolidate name
        let finalName = fullName || `${firstName || ''} ${lastName || ''}`.trim();

        // Validation
        if (!finalName || finalName.length > 100) {
             return NextResponse.json({ message: "Nom invalide ou trop long." }, { status: 400 });
        }
        if (!address || address.length > 500) {
             return NextResponse.json({ message: "Adresse trop longue." }, { status: 400 });
        }
        if (!phone) {
             return NextResponse.json({ message: "Numéro de téléphone requis." }, { status: 400 });
        }

        // Construct order details string
        let orderDetails = "";
        let subject = "";

        if (items && Array.isArray(items)) {
            // Cart order
            subject = `Nouvelle commande (Panier) de ${finalName}`;
            orderDetails = "Détails du panier :\n\n";
            items.forEach(item => {
                orderDetails += `- ${item.title} x${item.quantity || 1} (${item.price})\n`;
            });
            if (totalAmount) {
                const formattedTotal = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalAmount / 100);
                orderDetails += `\nTotal: ${formattedTotal}`;
            }
        } else if (itemName) {
            // Single item order (legacy compatibility)
            subject = `Nouvelle commande : ${itemName}`;
            orderDetails = `Produit : ${itemName}\nQuantité : ${quantity}`;
        } else {
            return NextResponse.json({ message: "Panier vide ou commande invalide." }, { status: 400 });
        }

        if (!process.env.MAIL_USERNAME || !process.env.MAIL_PASSWORD) {
            console.error("ERREUR CRITIQUE : Les variables d'environnement MAIL_USERNAME ou MAIL_PASSWORD ne sont pas définies.");
            return NextResponse.json({ message: "Configuration serveur incomplète (Email)." }, { status: 500 });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: false, // Gmail via nodemailer auto-detect ou starttls
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.MAIL_FROM_ADDRESS || process.env.MAIL_USERNAME,
            to: process.env.MAIL_USERNAME, // On envoie à soi-même
            replyTo: email || undefined,
            subject: subject,
            text: `
            Une nouvelle commande (Paiement à la réception / Cash) a été passée !
            
            Informations client :
            Nom : ${finalName}
            Email : ${email || "Non renseigné"}
            Téléphone : ${phone}
            Adresse de livraison : ${address}
            
            Note additionnelle : 
            ${note || "Aucune"}

            ----------------------------------------
            ${orderDetails}
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email envoyé avec succès. ID:", info.messageId);

        // --- ENVOI WEBHOOK ---
        // Envoi des infos à l'API externe
        try {
            const webhookUrl = "https://api.exotitse.fr/api/webhooks/generic/order"; // URL Cible corrigée
            
            const webhookPayload = {
                event: "order.created",
                createdAt: new Date().toISOString(),
                paymentMethod: "CASH_ON_DELIVERY",
                customer: {
                    fullName: finalName,
                    firstName: firstName || "",
                    lastName: lastName || "",
                    email: email || null,
                    phone: phone,
                    address: address,
                    note: note || ""
                },
                order: {
                    items: items ? items.map(i => ({
                        id: i.id || null,
                        title: i.title,
                        price: i.price,
                        quantity: i.quantity || 1,
                        stripePriceId: i.stripePriceId || null
                    })) : [{ title: itemName, quantity: quantity }],
                    totalAmount: totalAmount || null,
                    currency: "EUR"
                }
            };

            const webhookRes = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'User-Agent': 'ExotiTSE-Store/1.0'
                },
                body: JSON.stringify(webhookPayload)
            });

            if (!webhookRes.ok) {
                console.warn(`Webhook failed with status: ${webhookRes.status}`);
            }

        } catch (webhookError) {
            console.error("Erreur lors de l'envoi du webhook:", webhookError);
            // On ne bloque pas la réponse client si le webhook échoue
        }

        return NextResponse.json({ message: "Commande envoyée avec succès !" }, { status: 200 });

    } catch (error) {
        console.error("Erreur sendOrders:", error);
        // On renvoie le message d'erreur précis pour le débogage
        return NextResponse.json(
            { message: `Erreur serveur : ${error.message}` }, 
            { status: 500 }
        );
    }
}