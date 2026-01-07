
const endpoints = [
    'http://localhost:8081/api/products/active',
    'http://localhost:8081/api/creators/top-followers',
    // 'http://localhost:8081/api/products/search?q=test', // Search might return empty but should 200
];

async function checkHealth() {
    console.log('Checking Backend Health...');
    for (const url of endpoints) {
        try {
            const res = await fetch(url);
            console.log(`${url} -> ${res.status} ${res.statusText}`);
        } catch (e) {
            console.error(`${url} -> FAILED:`, e.message);
        }
    }
}

checkHealth();
