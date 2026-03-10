require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

async function initDB() {
    try {
        console.log('Connecting to database...');
        const sqlParams = fs.readFileSync(path.join(__dirname, 'schema.sql')).toString();

        console.log('Executing schema.sql...');
        await pool.query(sqlParams);

        console.log('✅ All tables successfully created/initialized!');
    } catch (err) {
        console.error('❌ Error initializing database:', err);
    } finally {
        await pool.end();
    }
}

initDB();
