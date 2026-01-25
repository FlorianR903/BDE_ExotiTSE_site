
const SUMUP_KEY_SECRET = "sup_sk_59HPlg3I7sOQ7pzGI9wGsL5tiAVOb6K4y"; 

async function probe() {
    console.log("Starting probe...");
    
    // 1. Get Merchant Code
    let merchantCode;
    try {
        const resMe = await fetch('https://api.sumup.com/v0.1/me', {
            headers: { 'Authorization': `Bearer ${SUMUP_KEY_SECRET}` }
        });
        const dataMe = await resMe.json();
        merchantCode = dataMe.merchant_profile.merchant_code;
        console.log("Merchant Code:", merchantCode);
    } catch (e) {
        console.error("Failed to get merchant code", e);
        return;
    }

    const endpoints = [
        `/v0.1/merchants/${merchantCode}/items`,
        `/v0.1/merchants/${merchantCode}/products`,
        `/v0.1/merchants/${merchantCode}/catalog`,
        `/v0.1/merchants/${merchantCode}/inventory`,
        `/v0.1/products`, // Maybe global?
        `/v0.1/items`,
        `/v2/merchants/${merchantCode}/products`,
        `/v2/merchants/${merchantCode}/items`,
        // Online Store specific?
        `/v1/merchants/${merchantCode}/store/products`,
    ];

    for (const ep of endpoints) {
        const url = `https://api.sumup.com${ep}`;
        console.log(`Testing ${url} ...`);
        try {
            const res = await fetch(url, {
                headers: { 'Authorization': `Bearer ${SUMUP_KEY_SECRET}` }
            });
            console.log(`  -> Status: ${res.status} ${res.statusText}`);
            if (res.ok) {
                const data = await res.json();
                console.log("  -> SUCCESS! Data keys:", Object.keys(data));
                if (data.items || data.products || data.length) {
                    // console.log("Sample:", JSON.stringify(data, null, 2).substring(0, 200));
                }
            } else if (res.status !== 404) {
                 const text = await res.text();
                 console.log("  -> Error body:", text.substring(0, 100));
            }
        } catch (e) {
            console.log("  -> Exception:", e.message);
        }
    }
}

probe();
