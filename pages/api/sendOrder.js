import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Méthode non autorisée" });
    }

    const { itemName, fullName, quantity, address, email } = req.body;

    try {
        // Transporteur email (exemple Gmail)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: process.env.MAIL_DESTINATION, // adresse qui recevra les commandes
            replyTo: email,
            subject: `Nouvelle commande : ${itemName}`,
            text: `
            Une nouvelle commande a été passée !
            
            Produit : ${itemName}
            Nom : ${fullName}
            Email : ${email}
            Quantité : ${quantity}
            Adresse de livraison : ${address}
            `,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: "Commande envoyée par mail." });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur lors de l'envoi du mail." });
    }
}