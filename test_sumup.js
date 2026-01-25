
const SUMUP_KEY_SECRET = "sup_sk_59HPlg3I7sOQ7pzGI9wGsL5tiAVOb6K4y"; // Clé fournie

async function testSumup() {
    console.log("1. Testing /me...");
    try {
        const resMe = await fetch('https://api.sumup.com/v0.1/me', {
            headers: { 'Authorization': `Bearer ${SUMUP_KEY_SECRET}` }
        });

        if (!resMe.ok) {
            console.error(`Error /me: ${resMe.status} ${resMe.statusText}`);
            const text = await resMe.text();
            console.error("Body:", text);
            return;
        }

        const dataMe = await resMe.json();
        console.log("Success /me. Merchant Code:", dataMe.merchant_profile.merchant_code);
        const merchantCode = dataMe.merchant_profile.merchant_code;

        console.log(`2. Testing /merchants/${merchantCode}/items...`);
        const resItems = await fetch(`https://api.sumup.com/v0.1/merchants/${merchantCode}/items`, {
            headers: { 'Authorization': `Bearer ${SUMUP_KEY_SECRET}` }
        });

        if (!resItems.ok) {
           console.error(`Error /items: ${resItems.status} ${resItems.statusText}`);
            const text = await resItems.text();
            console.error("Body:", text);
            return; 
        }

        const dataItems = await resItems.json();
        console.log("Success /items.");
        console.log("Received data structure keys:", Object.keys(dataItems));
        if (dataItems.items) {
            console.log("Number of items found:", dataItems.items.length);
            if(dataItems.items.length > 0) {
                console.log("First item sample:", JSON.stringify(dataItems.items[0], null, 2));
            }
        } else {
            console.log("No 'items' key in response. Raw response:", JSON.stringify(dataItems, null, 2));
        }

    } catch (e) {
        console.error("Exception:", e);
    }
}

testSumup();
