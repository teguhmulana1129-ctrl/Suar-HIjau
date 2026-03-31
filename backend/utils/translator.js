// Predefined dictionary from auto_translate.js
const translations = {
    // Products
    "Bakul Anyaman": "Woven Basket",
    "Wadah": "Container",
    "Bakul anyaman bambu tradisional, cocok untuk wadah buah, sayuran, atau dekorasi rumah.": "Traditional bamboo woven basket, suitable for fruit, vegetables, or home decoration.",
    "Besek Bambu": "Bamboo Box (Besek)",
    "Kemasan": "Packaging",
    "Besek bambu berkualitas tinggi untuk kemasan makanan tradisional dan oleh-oleh.": "High-quality bamboo box for traditional food packaging and souvenirs.",
    "Caping Petani": "Farmer's Hat (Caping)",
    "Aksesoris": "Accessories",
    "Caping atau topi petani dari anyaman bambu, melindungi dari sinar matahari.": "Farmer's hat made of bamboo weave, protects from sunlight.",
    "Tampah Bambu": "Bamboo Tray (Tampah)",
    "Peralatan": "Equipment",
    "Tampah bambu untuk menjemur hasil hasil panen atau sebagai wadah sajian makanan.": "Bamboo tray for drying harvests or as a food serving container.",
    "100% Bambu": "100% Bamboo",

    // Programs
    "Penanaman": "Planting",
    "Penanaman Bambu Jangkar": "Jangkar Bamboo Planting",
    "Konservasi Hutan": "Forest Conservation",
    "Kediri, Jawa Timur": "Kediri, East Java",
    "1000 Pohon": "1000 Trees",
    "Pemberdayaan Pengrajin Bambu": "Bamboo Artisan Empowerment",
    "Sosial Ekonomi": "Socio-Economic",
    "500 Pengrajin": "500 Artisans",
    "Mitigasi Erosi Sungai": "River Erosion Mitigation",
    "Penghijauan": "Reforestation",
    "20 Hektar": "20 Hectares",
    "Edukasi Pemanfaatan Bambu": "Bamboo Utilization Education",
    "Pendidikan": "Education",
    "50 Komunitas": "50 Communities",
    "Mitigasi Pencegahan Longsor Lereng Gunung": "Mountain Slope Landslide Mitigation",
    "Mitigasi Bencana": "Disaster Mitigation",
    "50 Hektar": "50 Hectares",

    // Events
    "Penanaman Bambu di Ngadiluwih": "Bamboo Planting in Ngadiluwih",
    "Desa Ngadiluwih, Kediri": "Ngadiluwih Village, Kediri",
};

/**
 * Translates text from Indonesian to English.
 * Uses a predefined dictionary, or returns original text if not found.
 * Future enhancement: Add dynamic translation API fallback.
 */
const https = require('https');

// Predefined dictionary 
// ... (same as before)

async function translateText(text, target = 'en') {
    if (!text) return '';
    
    // 1. Check dictionary
    if (translations[text]) {
        return translations[text];
    }

    // 2. Dynamic Fallback (Simple & Optimal)
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;
        return new Promise((resolve) => {
            https.get(url, (res) => {
                let data = '';
                res.on('data', (chunk) => data += chunk);
                res.on('end', () => {
                    try {
                        const json = JSON.parse(data);
                        resolve(json[0][0][0]);
                    } catch (e) {
                        resolve(text);
                    }
                });
            }).on('error', () => resolve(text));
        });
    } catch (e) {
        return text;
    }
}

module.exports = { translateText };
