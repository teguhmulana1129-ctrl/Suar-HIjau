const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const Minio = require('minio');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
});

const BUCKET = process.env.MINIO_BUCKET_NAME;

async function uploadFileToMinio(filePath) {
    if (!filePath) return null;
    try {
        const fullPath = path.resolve(__dirname, '../src/assets', filePath);
        if (!fs.existsSync(fullPath)) {
            console.warn(`File not found: ${fullPath}, skipping image upload.`);
            return null;
        }

        const ext = path.extname(fullPath).substring(1); // remove dot
        const fileName = `images/${uuidv4()}.${ext}`;

        const stream = fs.createReadStream(fullPath);
        const stat = fs.statSync(fullPath);

        await minioClient.putObject(BUCKET, fileName, stream, stat.size, {
            'Content-Type': `image/${ext === 'jpg' ? 'jpeg' : ext}`,
        });

        return fileName;
    } catch (err) {
        console.error(`Failed to upload ${filePath}:`, err.message);
        return null;
    }
}

// ==========================================
// DATA
// ==========================================

// PRODUCTS
const products = [
    {
        title: "Bakul Anyaman",
        category: "Wadah",
        price: "Rp 50.000",
        stock: "Tersedia",
        material: "100% Bambu",
        desc: "Bakul anyaman bambu tradisional, cocok untuk wadah buah, sayuran, atau dekorasi rumah.",
        imagePath: 'produk/produk_bakul.webp'
    },
    {
        title: "Besek Bambu",
        category: "Kemasan",
        price: "Rp 20.000",
        stock: "Tersedia",
        material: "100% Bambu",
        desc: "Besek bambu berkualitas tinggi untuk kemasan makanan tradisional dan oleh-oleh.",
        imagePath: 'produk/produk_besek.webp'
    },
    {
        title: "Caping Petani",
        category: "Aksesoris",
        price: "Rp 35.000",
        stock: "Tersedia",
        material: "100% Bambu",
        desc: "Caping atau topi petani dari anyaman bambu, melindungi dari sinar matahari.",
        imagePath: 'produk/produk_capil.webp'
    },
    {
        title: "Tampah Bambu",
        category: "Peralatan",
        price: "Rp 40.000",
        stock: "Tersedia",
        material: "100% Bambu",
        desc: "Tampah bambu untuk menjemur hasil panen atau sebagai wadah sajian makanan.",
        imagePath: 'produk/produk_tampah.webp'
    }
];


// PROGRAMS
const programs = [
    {
        title: "Penanaman Bambu Jangkar",
        category: "Konservasi Hutan",
        location: "Kediri, Jawa Timur",
        target: "1000 Pohon",
        status: 'in-progress',
        imagePath: 'bamboo_planting_jangkar.webp'
    },
    {
        title: "Pemberdayaan Pengrajin Bambu",
        category: "Sosial Ekonomi",
        location: "Kediri, Jawa Timur",
        target: "500 Pengrajin",
        status: 'in-progress',
        imagePath: 'bamboo_craftsman_empowerment.webp'
    },
    {
        title: "Mitigasi Erosi Sungai",
        category: "Penghijauan",
        location: "Kediri, Jawa Timur",
        target: "20 Hektar",
        status: 'upcoming',
        imagePath: 'bamboo_river_erosion_mitigation.webp'
    },
    {
        title: "Edukasi Pemanfaatan Bambu",
        category: "Pendidikan",
        location: "Kediri, Jawa Timur",
        target: "50 Komunitas",
        status: 'in-progress',
        imagePath: 'bamboo_education_session.webp'
    },
    {
        title: "Mitigasi Pencegahan Longsor Lereng Gunung",
        category: "Mitigasi Bencana",
        location: "Kediri, Jawa Timur",
        target: "50 Hektar",
        status: 'upcoming',
        imagePath: 'bamboo_mitigation_in_mount.webp'
    }
];

// TEAM
const team = [
    { name: "Sanusi", role: "Tim SuaR Hijau", imagePath: 'Staff/Sanusi, S.Pd.webp' },
    { name: "Ijun", role: "Tim SuaR Hijau", imagePath: 'Staff/ijun.webp' },
    { name: "Wiwit", role: "Tim SuaR Hijau", imagePath: 'Staff/Wiwit.webp' },
    { name: "Budiman", role: "Tim SuaR Hijau", imagePath: 'Staff/Budiman.webp' },
    { name: "Novi Lestari", role: "Tim SuaR Hijau", imagePath: 'Staff/Novi Lestari.webp' },
    { name: "Via Andrisia", role: "Tim SuaR Hijau", imagePath: 'Staff/Via Andrisia.webp' },
    { name: "Bayu", role: "Tim SuaR Hijau", imagePath: 'Staff/Bayu.webp' },
    { name: "Ita", role: "Tim SuaR Hijau", imagePath: 'Staff/ita.webp' },
    { name: "Beiby Citra", role: "Tim SuaR Hijau", imagePath: 'Staff/Beiby Citra.webp' },
    { name: "Alfin", role: "Tim SuaR Hijau", imagePath: 'Staff/Alfin.webp' },
    { name: "Andris Nirwana", role: "Tim SuaR Hijau", imagePath: 'Staff/Andris Nirwana.webp' },
    { name: "Jiwo Ageng", role: "Tim SuaR Hijau", imagePath: 'Staff/Jiwo Ageng.webp' },
    { name: "Reni", role: "Tim SuaR Hijau", imagePath: 'Staff/Reni.webp' },
    { name: "Romlatul Hasanah", role: "Tim SuaR Hijau", imagePath: 'Staff/Romlatul Hasanah.webp' }
];

// EVENTS
const events = [
    {
        title: "Penanaman Bambu di Ngadiluwih",
        date: "2026-01-15",
        time: "07:00 - 11:00 WIB",
        location: "Desa Ngadiluwih, Kediri",
        description: "Kegiatan penanaman 1000 bibit bambu bersama warga desa Ngadiluwih dan komunitas pecinta alam.",
        fullDescription: "Bergabunglah dalam aksi nyata pelestarian lingkungan di Desa Ngadiluwih. Acara ini menargetkan penanaman 1000 bibit bambu jenis Petung dan Apus di area seluas 2 hektar yang rawan erosi. Selain menanam, peserta juga akan mendapatkan edukasi singkat tentang cara merawat bambu dan manfaatnya bagi ekosistem sungai.",
        price: "Gratis",
        status: "completed",
        imagePath: 'bamboo_planting_jangkar.webp'
    },
    {
        title: "Workshop Kerajinan Bambu",
        date: "2026-07-20",
        time: "09:00 - 15:00 WIB",
        location: "Pusat Kerajinan Suar Hijau, Pare",
        description: "Pelatihan dasar menganyam bambu untuk pemula. Belajar membuat besek dan produk sederhana lainnya.",
        fullDescription: "Pelajari seni anyaman bambu warisan leluhur bersama pengrajin ahli Suar Hijau. Dalam workshop sehari ini, Anda akan diajarkan teknik dasar mengirat bambu, pola anyaman dasar, hingga membuat produk jadi berupa besek serbaguna. Cocok untuk pemula yang ingin memulai hobi baru atau wirausaha.",
        price: "Rp 150.000",
        status: "upcoming",
        imagePath: 'bamboo_craftsman_empowerment.webp'
    },
    {
        title: "Festival Bambu Kediri 2026",
        date: "2026-10-10",
        time: "08:00 - 20:00 WIB",
        location: "Simpang Lima Gumul, Kediri",
        description: "Pameran produk bambu terbesar di Kediri, dimeriahkan dengan pentas seni dan pasar rakyat.",
        fullDescription: "Festival tahunan yang merayakan keajaiban bambu! Temukan ratusan produk inovatif dari UMKM lokal, instalasi seni bambu raksasa, dan pertunjukan musik menggunakan instrumen bambu. Acara ini juga menjadi ajang networking bagi pegiat lingkungan, pengrajin, dan investor hijau.",
        price: "Gratis",
        status: "upcoming",
        imagePath: 'bamboo_menu_bg.webp'
    }
];

// ==========================================
// SEEDING
// ==========================================

async function clearTables() {
    console.log('Clearing existing data...');
    await pool.query('TRUNCATE products, programs, team, events RESTART IDENTITY CASCADE');
}

async function seedData() {
    try {
        await clearTables();

        console.log('Seeding products...');
        for (const p of products) {
            const uploadedImageKey = await uploadFileToMinio(p.imagePath);
            await pool.query(
                `INSERT INTO products (title, category, price, stock, material, image, description) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [p.title, p.category, p.price, p.stock, p.material, uploadedImageKey, p.desc]
            );
        }

        console.log('Seeding programs...');
        for (const p of programs) {
            const uploadedImageKey = await uploadFileToMinio(p.imagePath);
            await pool.query(
                `INSERT INTO programs (title, category, location, target, status, image) 
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [p.title, p.category, p.location, p.target, p.status, uploadedImageKey]
            );
        }

        console.log('Seeding team...');
        for (const t of team) {
            const uploadedImageKey = await uploadFileToMinio(t.imagePath);
            await pool.query(
                `INSERT INTO team (name, role, image) 
                 VALUES ($1, $2, $3)`,
                [t.name, t.role, uploadedImageKey]
            );
        }

        console.log('Seeding events...');
        for (const e of events) {
            const uploadedImageKey = await uploadFileToMinio(e.imagePath);
            await pool.query(
                `INSERT INTO events (title, date, time, location, image, description, full_description, price, status) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                [e.title, e.date, e.time, e.location, uploadedImageKey, e.description, e.fullDescription, e.price, e.status]
            );
        }

        console.log('Seeding completed successfully.');
    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        pool.end();
    }
}

seedData();
