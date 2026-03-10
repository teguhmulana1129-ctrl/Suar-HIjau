-- Drop tables if they exist to start fresh
DROP TABLE IF EXISTS team;
DROP TABLE IF EXISTS news;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS programs;

CREATE TABLE programs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50),
    location VARCHAR(255),
    target VARCHAR(100),
    volunteers INT DEFAULT 0,
    start_date DATE,
    image TEXT,
    full_description TEXT,
    impact JSONB DEFAULT '[]',
    status VARCHAR(50) DEFAULT 'upcoming',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50),
    price VARCHAR(100),
    stock VARCHAR(50),
    material VARCHAR(255),
    craft_time VARCHAR(100),
    size VARCHAR(100),
    weight VARCHAR(50),
    image TEXT,
    description TEXT,
    features JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE,
    time VARCHAR(100),
    location VARCHAR(255),
    price VARCHAR(100),
    status VARCHAR(50),
    image TEXT,
    description TEXT,
    full_description TEXT,
    rundown JSONB DEFAULT '[]',
    requirements JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    author VARCHAR(100),
    date DATE,
    image TEXT,
    excerpt TEXT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE team (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100),
    bio TEXT,
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
