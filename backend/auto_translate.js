const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

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
    "Tampah bambu untuk menjemur hasil panen atau sebagai wadah sajian makanan.": "Bamboo tray for drying harvests or as a food serving container.",
    "100% Bambu": "100% Bamboo",

    // Programs
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
    "Kegiatan penanaman 1000 bibit bambu bersama warga desa Ngadiluwih dan komunitas pecinta alam.": "Planting activity of 1000 bamboo seedlings with Ngadiluwih villagers and nature lover communities.",
    "Bergabunglah dalam aksi nyata pelestarian lingkungan di Desa Ngadiluwih. Acara ini menargetkan penanaman 1000 bibit bambu jenis Petung dan Apus di area seluas 2 hektar yang rawan erosi. Selain menanam, peserta juga akan mendapatkan edukasi singkat tentang cara merawat bambu dan manfaatnya bagi ekosistem sungai.": "Join a real environmental conservation action in Ngadiluwih Village. This event targets the planting of 1000 Petung and Apus bamboo seedlings in a 2-hectare erosion-prone area. Besides planting, participants will receive a brief education on how to care for bamboo and its benefits for the river ecosystem.",
    "Gratis": "Free",
    "Workshop Kerajinan Bambu": "Bamboo Craft Workshop",
    "Pusat Kerajinan Suar Hijau, Pare": "Suar Hijau Craft Center, Pare",
    "Pelatihan dasar menganyam bambu untuk pemula. Belajar membuat besek dan produk sederhana lainnya.": "Basic bamboo weaving training for beginners. Learn to make besek and other simple products.",
    "Pelajari seni anyaman bambu warisan leluhur bersama pengrajin ahli Suar Hijau. Dalam workshop sehari ini, Anda akan diajarkan teknik dasar mengirat bambu, pola anyaman dasar, hingga membuat produk jadi berupa besek serbaguna. Cocok untuk pemula yang ingin memulai hobi baru atau wirausaha.": "Learn the ancestral art of bamboo weaving with Suar Hijau expert artisans. In this one-day workshop, you will be taught basic bamboo splitting techniques, basic weaving patterns, and how to create a finished product like a versatile besek box. Suitable for beginners wanting to start a new hobby or business.",
    "Festival Bambu Kediri 2026": "Kediri Bamboo Festival 2026",
    "Simpang Lima Gumul, Kediri": "Simpang Lima Gumul, Kediri",
    "Pameran produk bambu terbesar di Kediri, dimeriahkan dengan pentas seni dan pasar rakyat.": "The largest bamboo product exhibition in Kediri, enlivened with art performances and a folk market.",
    "Festival tahunan yang merayakan keajaiban bambu! Temukan ratusan produk inovatif dari UMKM lokal, instalasi seni bambu raksasa, dan pertunjukan musik menggunakan instrumen bambu. Acara ini juga menjadi ajang networking bagi pegiat lingkungan, pengrajin, dan investor hijau.": "An annual festival celebrating the wonder of bamboo! Discover hundreds of innovative products from local MSMEs, giant bamboo art installations, and musical performances using bamboo instruments. This event is also a networking opportunity for environmental activists, artisans, and green investors.",

    // Team
    "Tim SuaR Hijau": "SuaR Hijau Team",
};

async function translateTable(tableName, fields) {
    console.log(`Translating table: ${tableName}`);
    const { rows } = await pool.query(`SELECT id, ${fields.join(', ')} FROM ${tableName}`);
    
    for (const row of rows) {
        const updates = [];
        const values = [];
        let index = 1;

        for (const field of fields) {
            const originalValue = row[field];
            if (originalValue && translations[originalValue]) {
                updates.push(`${field}_en = $${index}`);
                values.push(translations[originalValue]);
                index++;
            }
        }

        if (updates.length > 0) {
            values.push(row.id);
            await pool.query(`UPDATE ${tableName} SET ${updates.join(', ')} WHERE id = $${index}`, values);
        }
    }
}

async function run() {
    try {
        await translateTable('products', ['title', 'category', 'material', 'description']);
        await translateTable('programs', ['title', 'category', 'location', 'target']);
        await translateTable('events', ['title', 'location', 'description', 'full_description']);
        await translateTable('team', ['role']);
        await translateTable('news', ['title', 'category', 'excerpt', 'content']);
        console.log('Translation completed!');
    } catch (err) {
        console.error('Translation failed:', err);
    } finally {
        await pool.end();
    }
}

run();
