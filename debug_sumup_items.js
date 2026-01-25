
const SUMUP_KEY_SECRET = "sup_sk_59HPlg3I7sOQ7pzGI9wGsL5tiAVOb6K4y"; 

async function runDiagnostics() {
    console.log("=== SumUp Visibility Diagnostics ===");

    // 1. Verify Merchant Identity
    let merchantCode = "";
    try {
        const resMe = await fetch('https://api.sumup.com/v0.1/me', {
            headers: { 'Authorization': `Bearer ${SUMUP_KEY_SECRET}` }
        });
        if (!resMe.ok) throw new Error(`Auth failed: ${resMe.status}`);
        const dataMe = await resMe.json();
        merchantCode = dataMe.merchant_profile.merchant_code;
        console.log(`[OK] Merchant Code: ${merchantCode}`);
    } catch (e) {
        console.error("[FAIL] Could not get merchant profile:", e.message);
        return;
    }

    // 2. Test Known Endpoints with Interpretation
    const tests = [
        { 
            path: `/v0.1/merchants/${merchantCode}/items`, 
            desc: "Standard Items API",
        },
        { 
            path: `/v0.1/merchants/${merchantCode}/products`, 
            desc: "Alternative Products API",
        },
        { 
            path: `/v0.1/merchants/${merchantCode}/collections`, 
            desc: "Collections (Scope Check)",
        },
        { 
            path: `/v0.1/checkouts`, 
            desc: "Checkouts (Payment Links)",
        }
    ];

    console.log("\n--- Connectivity Test ---");
    for (const t of tests) {
        try {
            const res = await fetch(`https://api.sumup.com${t.path}`, {
                headers: { 'Authorization': `Bearer ${SUMUP_KEY_SECRET}` }
            });
            console.log(`[${res.status}] ${t.desc}\n      Path: ${t.path}`);
            
            if (res.status === 403) {
                console.log("      /!\\ FORBIDDEN: This suggests a missing SCOPE in the API Key.");
            } else if (res.status === 404) {
                console.log("      Not Found: Endpoint might be invalid or resource hidden.");
            } else if (res.ok) {
                const data = await res.json();
                // Handle different response structures
                let count = 'N/A';
                if (Array.isArray(data)) count = data.length;
                else if (data.items) count = data.items.length;
                
                console.log(`      SUCCESS: Found data (Count: ${count})`);
            }
        } catch (e) {
            console.log(`      Error: ${e.message}`);
        }
    }
}

runDiagnostics();
