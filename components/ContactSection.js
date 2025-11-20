// components/ContactSection.js
import { motion } from 'framer-motion'

export default function ContactSection() {
  return (
      <motion.section className="py-24 px-6 relative overflow-hidden text-center"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}>

        <h2 className="text-4xl font-bold mb-6">Contact</h2>
        <p className="mt-6 text-lg text-white/90">
            Une question ? Une idée ? Besoin d’infos ?
            Voici tous nos moyens de contact. N'hésitez pas !
        </p>

        <div className="mt-10 space-y-5 text-lg">

            {/* Numéro de téléphone */}
            <div>
                <span className="font-semibold">Téléphone : </span>
                <a href="tel:0601020304" className="underline hover:text-yellow-300">
                    07 81 29 55 74
                </a>
            </div>

            {/* Instagram */}
            <div>
                <span className="font-semibold">Instagram : </span>
                <a
                    href="https://instagram.com/ton_compte"
                    target="_blank"
                    className="underline hover:text-yellow-300"
                >
                    @florian.rmgs
                </a>
            </div>

            {/* Mail */}
            <div>
                <span className="font-semibold">Mail : </span>
                <a
                    href="mailto:exotitse.contact@example.com"
                    className="underline hover:text-yellow-300"
                >
                    exotitse.contact@example.com
                </a>
            </div>

            {/* Adresse postale */}
            <div>
                <span className="font-semibold">Quartier Général : </span>
                <p className="inline-block">
                    24 Rue des Tropiques, Toulouse, France
                </p>
            </div>

        </div>
    </motion.section>
  );
}