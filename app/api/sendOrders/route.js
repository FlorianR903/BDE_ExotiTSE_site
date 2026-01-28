import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

/**
 * API /api/sendOrders - Traite les commandes avec support flexible du format adresse
 * 
 * FORMATS ACCEPTÉS:
 * 
 * 1. Format imbriqué (Cart - ACTUEL):
 *    POST /api/sendOrders
 *    {
 *      "customer": {
 *        "fullName": "Jean Dupont",
 *        "firstName": "Jean",
 *        "lastName": "Dupont",
 *        "email": "jean@example.com",
 *        "phone": "0612345678",
 *        "address": "123 rue de la Paix",
 *        "city": "Saint-Etienne",
 *        "note": "Digicode 4567"
 *      },
 *      "items": [
 *        { "id": "prod_123", "name": "Ticket", "quantity": 2, "price": 2500 }
 *      ],
 *      "totalAmount": 5000,
 *      "notes": "Digicode 4567"
 *    }
 * 
 * 2. Format plat (Legacy - COMPATIBLE):
 *    POST /api/sendOrders
 *    {
 *      "firstName": "Jean",
 *      "lastName": "Dupont",
 *      "email": "jean@example.com",
 *      "phone": "0612345678",
 *      "address": "123 rue de la Paix",
 *      "city": "Saint-Etienne",
 *      "itemName": "Ticket",
 *      "quantity": 2,
 *      "totalAmount": 5000
 *    }
 * 
 * RÉCUPÉRATION DE LA VILLE:
 * - Le serveur cherche d'abord "city" dans body.customer (structure imbriquée)
 * - Sinon, cherche "city" au premier niveau du body (format plat)
 * - Valide: city est REQUIS et limité à 100 caractères
 * - Utilisée dans: Email client, Webhook externe
 * 
 * VALIDATION:
 * - ✓ Nom requis (max 100 chars)
 * - ✓ Adresse requise (max 500 chars)
 * - ✓ Ville REQUISE (max 100 chars) - NOUVEAU
 * - ✓ Téléphone requis
 * - ✓ Email + Panier OU ItemName + Quantity
 */

export async function POST(req) {

    try {
        const body = await req.json();
        
        // Adaptation: accepte structure imbriquée { customer: {...} } ou flat { firstName, ... }
        const customer = body.customer || {};
        
        let { 
            firstName = customer.firstName || '', 
            lastName = customer.lastName || '', 
            address = customer.address || '',
            city = customer.city || '',
            phone = customer.phone || '', 
            note = customer.note || '',
            email = customer.email || '', 
            itemName, 
            quantity, 
            fullName = customer.fullName || '',
            items = body.items,
            totalAmount = body.totalAmount
        } = body;

        // Consolidate name
        let finalName = fullName || `${firstName} ${lastName}`.trim();

        // Validation
        if (!finalName || finalName.length > 100) {
             return NextResponse.json({ message: "Nom invalide ou trop long." }, { status: 400 });
        }
        if (!address || address.length > 500) {
             return NextResponse.json({ message: "Adresse trop longue." }, { status: 400 });
        }
        if (!city || city.length > 100) {
             return NextResponse.json({ message: "Ville requise ou trop longue." }, { status: 400 });
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
            Ville : ${city}
            
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
                    city: city,
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