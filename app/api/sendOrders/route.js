import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {

    try {
        const { itemName, fullName, quantity, address, email } = await req.json();

        // --- SÉCURISATION (Validation des entrées) ---
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
             return NextResponse.json({ message: "Email invalide." }, { status: 400 });
        }
        if (!fullName || fullName.length > 100) {
             return NextResponse.json({ message: "Nom invalide ou trop long." }, { status: 400 });
        }
        if (!address || address.length > 500) {
             return NextResponse.json({ message: "Adresse trop longue." }, { status: 400 });
        }
        if (typeof quantity !== 'number' && typeof quantity !== 'string') {
             return NextResponse.json({ message: "Quantité invalide." }, { status: 400 });
        }
        // Nettoyage basique terminé
        
        // Transporteur email (exemple Gmail)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: process.env.MAIL_SECURE === "true",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: process.env.MAIL_DESTINATION, // adresse qui recevra les commandes
            replyTo: email, //email du client
            subject: `Nouvelle commande : ${itemName}`,
            text: `
            Une nouvelle commande a été passée !
            
            Nom : ${fullName}
            Email : ${email}
            Quantité : ${quantity}
            Adresse de livraison : ${address}
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Commande envoyée par mail." }, { status: 200 });

    } catch (error) {
        console.error("Erreur SMTP :", error);
        return NextResponse.json(
            { message: "Erreur lors de l'envoi du mail." }, 
            { status: 500 }
        );
    }
}