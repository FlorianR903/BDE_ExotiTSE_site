// utils/sumup.js

const SUMUP_KEY_SECRET = process.env.SUMUP_KEY_SECRET;

/**
 * Récupère le profil marchand pour obtenir le merchant_code
 */
export async function getMerchantProfile() {
    const res = await fetch('https://api.sumup.com/v0.1/me', {
        headers: { 'Authorization': `Bearer ${SUMUP_KEY_SECRET}` }
    });
    
    if (!res.ok) {
        throw new Error(`SumUp /me error: ${res.statusText}`);
    }
    
    return res.json();
}

/**
 * Récupère la liste des produits depuis SumUp
 */
export async function getSumupProducts() {
    try {
        // 1. On a besoin du code marchand
        const profile = await getMerchantProfile();
        const merchantCode = profile.merchant_profile.merchant_code;

        // 2. On récupère les items
        const res = await fetch(`https://api.sumup.com/v0.1/merchants/${merchantCode}/items`, {
            headers: { 'Authorization': `Bearer ${SUMUP_KEY_SECRET}` }
        });

        if (res.status === 404) {
            console.warn("Catalogue SumUp vide ou introuvable (404).");
            return [];
        }

        if (!res.ok) {
            throw new Error(`SumUp items error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        return data.items || [];
    } catch (error) {
        console.error("Erreur SumUp API:", error.message);
        return [];
    }
}
