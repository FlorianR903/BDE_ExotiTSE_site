import nodemailer from "nodemailer";

export async function POST(req) {

    try {
        const { itemName, fullName, quantity, address, email } = await req.json();

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

        return new Response(JSON.stringify({ message: "Commande envoyée par mail." }), { status: 200 });

    } catch (error) {
        console.error("Erreur SMTP :", error);
        return new Response(JSON.stringify({message: "Erreur lors de l'envoi du mail."}), {
            status: 500,
        });
    }
}