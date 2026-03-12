require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

async function run() {
    try {
        await pool.query('ALTER TABLE news ADD COLUMN IF NOT EXISTS slug VARCHAR(255)');
        await pool.query('ALTER TABLE news ADD COLUMN IF NOT EXISTS excerpt TEXT');
        await pool.query('ALTER TABLE news ADD COLUMN IF NOT EXISTS tags VARCHAR(255)');
        await pool.query('ALTER TABLE news ADD COLUMN IF NOT EXISTS sections JSONB');
        console.log('Migration successful');
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

run();
