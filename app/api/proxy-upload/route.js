import { NextResponse } from 'next/server';

export async function POST(req) {
    // ⚠️ TODO: Déplacez cette URL dans votre fichier .env (GOOGLE_SCRIPT_URL)
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbweIC5VBTWR5eN7dtshdpYt-XIUsUMiv03NZyquXnH1Am1JF-GhdYEoq2IKP21sWz80/exec";

    try {
        const body = await req.json();

        // Validation basique côté serveur
        if (!body.base64 || !body.eventName) {
             return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
        }

        // On transfère la requête au script Google
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            // Pas besoin de no-cors ici car on est côté serveur
        });

        // Note: Google Script retourne parfois une redirection 302 pour le succès, 
        // fetch suit les redirections par défaut.
        
        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Erreur Proxy Upload:", error);
        return NextResponse.json({ error: "Erreur lors de l'envoi au script." }, { status: 500 });
    }
}
