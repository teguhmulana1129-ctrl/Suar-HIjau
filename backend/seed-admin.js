const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

async function seedAdmin() {
    try {
        console.log('🌱 Seeding admin user...');

        // Check if admin already exists
        const checkResult = await pool.query('SELECT * FROM admin_users WHERE username = $1', ['admin']);
        if (checkResult.rows.length > 0) {
            console.log('✅ Admin user already exists.');
            process.exit(0);
        }

        // Create new admin
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash('suarhijau2024', salt);

        await pool.query(
            'INSERT INTO admin_users (username, password_hash, full_name, role) VALUES ($1, $2, $3, $4)',
            ['admin', passwordHash, 'Administrator', 'admin']
        );

        console.log('✅ Admin user "admin" successfully created with default password.');
    } catch (err) {
        console.error('❌ Error seeding admin user:', err.message);
    } finally {
        pool.end();
        process.exit();
    }
}

seedAdmin();
