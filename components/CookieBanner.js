"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const openCookieBanner = () => {
    window.dispatchEvent(new Event("open-cookie-banner"));
};

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) setVisible(true);

        const handler = () => setVisible(true);
        window.addEventListener("open-cookie-banner", handler);

        return () => window.removeEventListener("open-cookie-banner", handler);
    }, []);


    const acceptCookies = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setVisible(false);
    };

    const refuseCookies = () => {
        localStorage.setItem("cookie-consent", "refused");
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="fixed bottom-4 left-4 right-4 z-[100] md:left-1/2 md:-translate-x-1/2 md:max-w-3xl"
                >
                    <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-6 text-white">

                        <h3 className="text-xl font-bold mb-2">
                            🍪 Un peu de cookies sous les tropiques ?
                        </h3>

                        <p className="text-sm text-white/90 mb-4">
                            Exoti’TSE utilise des cookies pour assurer le bon fonctionnement du site
                            et améliorer votre expérience. Vous êtes libre d’accepter ou refuser.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-end">
                            <button
                                onClick={refuseCookies}
                                className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 transition text-sm"
                            >
                                Refuser
                            </button>

                            <button
                                onClick={acceptCookies}
                                className="px-6 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 transition font-semibold shadow-lg"
                            >
                                Accepter 🌺
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}