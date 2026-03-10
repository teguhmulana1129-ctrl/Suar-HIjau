require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const Minio = require('minio');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ======================================
// DATABASE CONNECTION
// ======================================
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('❌ Gagal terhubung ke database PostgreSQL:', err.stack);
    } else {
        console.log('✅ Berhasil terhubung ke database PostgreSQL!');
        release();
    }
});

// ======================================
// MINIO CONNECTION
// ======================================
const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
});

const BUCKET = process.env.MINIO_BUCKET_NAME;

// Pastikan bucket ada
minioClient.bucketExists(BUCKET, (err, exists) => {
    if (err) {
        console.error('❌ MinIO bucket check error:', err.message);
        return;
    }
    if (exists) {
        console.log(`✅ MinIO bucket "${BUCKET}" ditemukan!`);
    } else {
        minioClient.makeBucket(BUCKET, '', (err) => {
            if (err) console.error('❌ Gagal membuat bucket:', err.message);
            else console.log(`✅ MinIO bucket "${BUCKET}" berhasil dibuat!`);
        });
    }
});

// ======================================
// HELPER: Upload base64 image ke MinIO
// ======================================
async function uploadBase64ToMinio(base64String) {
    // base64String format: "data:image/png;base64,iVBOR..."
    const matches = base64String.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!matches) return null;

    const ext = matches[1]; // png, jpeg, webp, etc.
    const buffer = Buffer.from(matches[2], 'base64');
    const fileName = `images/${uuidv4()}.${ext}`;

    await minioClient.putObject(BUCKET, fileName, buffer, buffer.length, {
        'Content-Type': `image/${ext}`,
    });

    // Simpan path sebagai URL backend proxy (bukan CDN langsung)
    // Image akan diakses via: http://localhost:3000/api/image/images/xxx.png
    return fileName;
}

// ======================================
// HELPER: Hapus image dari MinIO
// ======================================
async function deleteImageFromMinio(imageKey) {
    if (!imageKey) return;
    if (imageKey.startsWith('http://') || imageKey.startsWith('https://')) {
        // Jika menyimpan URL CDN lama, ekstrak object key-nya (images/xxx.png)
        if (imageKey.includes('cdn.kediritechnopark.com/suarhijau/')) {
            imageKey = imageKey.split('cdn.kediritechnopark.com/suarhijau/')[1];
        } else {
            return; // URL eksternal lain, biarkan
        }
    }

    try {
        await minioClient.removeObject(BUCKET, imageKey);
        console.log(`🗑️ Berhasil menghapus gambar dari MinIO: ${imageKey}`);
    } catch (err) {
        console.error(`❌ Gagal menghapus gambar dari MinIO ${imageKey}:`, err.message);
    }
}

// ======================================
// HELPER: Proses field image sebelum simpan
// ======================================
async function processImage(image) {
    if (!image) return null;
    if (image.startsWith('data:image/')) {
        return await uploadBase64ToMinio(image);
    }
    return image; // Sudah berupa key/URL, langsung pakai
}

const PORT = process.env.PORT || 3000;

// ======================================
// IMAGE PROXY ENDPOINT
// Stream gambar langsung dari MinIO melalui backend (menghindari SSL error)
// ======================================
app.get('/api/image', async (req, res) => {
    try {
        const objectKey = req.query.key; // e.g. "?key=images/uuid.png"
        if (!objectKey) return res.status(400).json({ error: 'No image key provided' });

        // Get object stat untuk content-type
        const stat = await minioClient.statObject(BUCKET, objectKey);
        res.setHeader('Content-Type', stat.metaData['content-type'] || 'image/png');
        res.setHeader('Cache-Control', 'public, max-age=604800'); // cache 7 hari

        // Stream langsung dari MinIO ke browser
        const stream = await minioClient.getObject(BUCKET, objectKey);
        stream.pipe(res);
    } catch (err) {
        console.error('Image proxy error:', err.message);
        res.status(404).json({ error: 'Image not found' });
    }
});

// ======================================
// PROGRAMS
// ======================================
app.get('/api/programs', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM programs ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/programs', async (req, res) => {
    const { title, category, location, target, volunteers, startDate, image, fullDescription, impact, status } = req.body;
    try {
        const imageUrl = await processImage(image);
        const result = await pool.query(
            `INSERT INTO programs (title, category, location, target, volunteers, start_date, image, full_description, impact, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [title, category, location, target || '', volunteers || 0, startDate, imageUrl, fullDescription, JSON.stringify(impact || []), status || 'upcoming']
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/programs/:id', async (req, res) => {
    const { id } = req.params;
    const { title, category, location, target, volunteers, startDate, image, fullDescription, impact, status } = req.body;
    try {
        // Cek jika gambar adalah upload base64 baru
        let imageUrl = image;
        if (image && image.startsWith('data:image/')) {
            const doc = await pool.query('SELECT image FROM programs WHERE id=$1', [id]);
            const oldImage = doc.rows[0]?.image;
            imageUrl = await uploadBase64ToMinio(image);
            if (oldImage && oldImage !== imageUrl) await deleteImageFromMinio(oldImage);
        }

        const result = await pool.query(
            `UPDATE programs SET title=$1, category=$2, location=$3, target=$4, volunteers=$5, start_date=$6, image=$7, full_description=$8, impact=$9, status=$10 WHERE id=$11 RETURNING *`,
            [title, category, location, target || '', volunteers || 0, startDate, imageUrl, fullDescription, JSON.stringify(impact || []), status || 'upcoming', id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Program tidak ditemukan' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/programs/:id', async (req, res) => {
    try {
        const doc = await pool.query('SELECT image FROM programs WHERE id=$1', [req.params.id]);
        if (doc.rows[0]?.image) await deleteImageFromMinio(doc.rows[0].image);

        await pool.query('DELETE FROM programs WHERE id=$1', [req.params.id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ======================================
// PRODUCTS
// ======================================
app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/products', async (req, res) => {
    const { title, category, price, stock, material, craftTime, size, weight, image, desc, features } = req.body;
    try {
        const imageUrl = await processImage(image);
        const result = await pool.query(
            `INSERT INTO products (title, category, price, stock, material, craft_time, size, weight, image, description, features) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
            [title, category, price, stock, material, craftTime, size, weight, imageUrl, desc, JSON.stringify(features || [])]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const { title, category, price, stock, material, craftTime, size, weight, image, desc, features } = req.body;
    try {
        let imageUrl = image;
        if (image && image.startsWith('data:image/')) {
            const doc = await pool.query('SELECT image FROM products WHERE id=$1', [id]);
            const oldImage = doc.rows[0]?.image;
            imageUrl = await uploadBase64ToMinio(image);
            if (oldImage && oldImage !== imageUrl) await deleteImageFromMinio(oldImage);
        }

        const result = await pool.query(
            `UPDATE products SET title=$1, category=$2, price=$3, stock=$4, material=$5, craft_time=$6, size=$7, weight=$8, image=$9, description=$10, features=$11 WHERE id=$12 RETURNING *`,
            [title, category, price, stock, material, craftTime, size, weight, imageUrl, desc, JSON.stringify(features), id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Produk tidak ditemukan' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const doc = await pool.query('SELECT image FROM products WHERE id=$1', [req.params.id]);
        if (doc.rows[0]?.image) await deleteImageFromMinio(doc.rows[0].image);

        await pool.query('DELETE FROM products WHERE id=$1', [req.params.id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ======================================
// EVENTS
// ======================================
app.get('/api/events', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM events ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/events', async (req, res) => {
    const { title, date, time, location, price, status, image, description, fullDescription, rundown, requirements } = req.body;
    try {
        const imageUrl = await processImage(image);
        const result = await pool.query(
            `INSERT INTO events (title, date, time, location, price, status, image, description, full_description, rundown, requirements) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
            [title, date, time, location, price, status, imageUrl, description, fullDescription, JSON.stringify(rundown || []), JSON.stringify(requirements || [])]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/events/:id', async (req, res) => {
    const { id } = req.params;
    const { title, date, time, location, price, status, image, description, fullDescription, rundown, requirements } = req.body;
    try {
        let imageUrl = image;
        if (image && image.startsWith('data:image/')) {
            const doc = await pool.query('SELECT image FROM events WHERE id=$1', [id]);
            const oldImage = doc.rows[0]?.image;
            imageUrl = await uploadBase64ToMinio(image);
            if (oldImage && oldImage !== imageUrl) await deleteImageFromMinio(oldImage);
        }

        const result = await pool.query(
            `UPDATE events SET title=$1, date=$2, time=$3, location=$4, price=$5, status=$6, image=$7, description=$8, full_description=$9, rundown=$10, requirements=$11 WHERE id=$12 RETURNING *`,
            [title, date, time, location, price, status, imageUrl, description, fullDescription, JSON.stringify(rundown), JSON.stringify(requirements), id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event tidak ditemukan' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/events/:id', async (req, res) => {
    try {
        const doc = await pool.query('SELECT image FROM events WHERE id=$1', [req.params.id]);
        if (doc.rows[0]?.image) await deleteImageFromMinio(doc.rows[0].image);

        await pool.query('DELETE FROM events WHERE id=$1', [req.params.id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ======================================
// NEWS
// ======================================
app.get('/api/news', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM news ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/news', async (req, res) => {
    const { title, category, author, date, image, excerpt, content } = req.body;
    try {
        const imageUrl = await processImage(image);
        const result = await pool.query(
            `INSERT INTO news (title, category, author, date, image, excerpt, content) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [title, category, author, date || new Date(), imageUrl, excerpt, content]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/news/:id', async (req, res) => {
    const { id } = req.params;
    const { title, category, author, date, image, excerpt, content } = req.body;
    try {
        let imageUrl = image;
        if (image && image.startsWith('data:image/')) {
            const doc = await pool.query('SELECT image FROM news WHERE id=$1', [id]);
            const oldImage = doc.rows[0]?.image;
            imageUrl = await uploadBase64ToMinio(image);
            if (oldImage && oldImage !== imageUrl) await deleteImageFromMinio(oldImage);
        }

        const result = await pool.query(
            `UPDATE news SET title=$1, category=$2, author=$3, date=$4, image=$5, excerpt=$6, content=$7 WHERE id=$8 RETURNING *`,
            [title, category, author, date, imageUrl, excerpt, content, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Berita tidak ditemukan' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/news/:id', async (req, res) => {
    try {
        const doc = await pool.query('SELECT image FROM news WHERE id=$1', [req.params.id]);
        if (doc.rows[0]?.image) await deleteImageFromMinio(doc.rows[0].image);

        await pool.query('DELETE FROM news WHERE id=$1', [req.params.id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ======================================
// TEAM
// ======================================
app.get('/api/team', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM team ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/team', async (req, res) => {
    const { name, role, bio, image } = req.body;
    try {
        const imageUrl = await processImage(image);
        const result = await pool.query(
            `INSERT INTO team (name, role, bio, image) VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, role, bio, imageUrl]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/team/:id', async (req, res) => {
    const { id } = req.params;
    const { name, role, bio, image } = req.body;
    try {
        let imageUrl = image;
        if (image && image.startsWith('data:image/')) {
            const doc = await pool.query('SELECT image FROM team WHERE id=$1', [id]);
            const oldImage = doc.rows[0]?.image;
            imageUrl = await uploadBase64ToMinio(image);
            if (oldImage && oldImage !== imageUrl) await deleteImageFromMinio(oldImage);
        }

        const result = await pool.query(
            `UPDATE team SET name=$1, role=$2, bio=$3, image=$4 WHERE id=$5 RETURNING *`,
            [name, role, bio, imageUrl, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tim tidak ditemukan' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/team/:id', async (req, res) => {
    try {
        const doc = await pool.query('SELECT image FROM team WHERE id=$1', [req.params.id]);
        if (doc.rows[0]?.image) await deleteImageFromMinio(doc.rows[0].image);

        await pool.query('DELETE FROM team WHERE id=$1', [req.params.id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// START SERVER
app.listen(PORT, () => {
    console.log(`🚀 Suar Hijau API berjalan di port ${PORT}`);
});
