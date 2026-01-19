"use client";

import { motion } from "framer-motion";
import { openCookieBanner } from "./CookieBanner";

export default function CookieFloatingButton() {
    return (
        <motion.button
            onClick={openCookieBanner}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="
        fixed bottom-6 right-6 z-[90]
        w-14 h-14 rounded-full
        bg-white/20 backdrop-blur-xl
        border border-white/30
        shadow-xl shadow-emerald-500/20
        flex items-center justify-center
        text-2xl
        hover:bg-emerald-400/30
        transition-all
      "
            aria-label="Gestion des cookies"
            title="Gestion des cookies"
        >
            🍪
        </motion.button>
    );
}
