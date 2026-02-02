// components/ContactSection.js
import { motion } from 'framer-motion'

export default function ContactSection() {
  return (
      <motion.section className="py-24 px-6 relative overflow-hidden text-center"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}>

        <h2 className="text-4xl font-extrabold mb-6">Contact</h2>
        <p className="mt-6 text-lg text-white/90">
            Une question ? Une idée ? Besoin d’infos ?
            Voici tous nos moyens de contact. N'hésitez pas !
        </p>

        <div className="mt-10 space-y-5 text-lg">

            {/* Numéro de téléphone */}
            <div>
                <span className="font-bold text-white/90">Téléphone : </span>
                <a href="tel:0651441013" className="underline hover:text-yellow-300 text-white/90">
                    06 51 44 10 13
                </a>
            </div>

            {/* Instagram */}
            <div>
                <span className="font-bold text-white/90">Instagram : </span>
                <a
                    href="https://instagram.com/exoti__tse"
                    target="_blank"
                    className="underline hover:text-yellow-300 text-white/90"
                >
                    @exoti__tse
                </a>
            </div>

            {/* Mail */}
            <div>
                <span className="font-bold text-white/90">Mail : </span>
                <a
                    href="mailto:exotitse.contact@example.com"
                    className="underline hover:text-yellow-300 text-white/90"
                >
                    exotitse.contact@gmail.com
                </a>
            </div>

            {/* Adresse postale */}
            <div>
                <span className="font-bold text-white/90">Quartier Général : </span>
                <p className="inline-block text-white/90">
                    2 Rue Clovis Hugues, 42000 Saint-Etienne
                </p>
            </div>

        </div>
    </motion.section>
  );
}