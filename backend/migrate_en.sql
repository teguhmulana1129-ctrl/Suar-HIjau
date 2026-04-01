-- Add _en columns to programs
ALTER TABLE programs ADD COLUMN title_en VARCHAR(255);
ALTER TABLE programs ADD COLUMN category_en VARCHAR(100);
ALTER TABLE programs ADD COLUMN location_en VARCHAR(255);
ALTER TABLE programs ADD COLUMN target_en VARCHAR(100);
ALTER TABLE programs ADD COLUMN full_description_en TEXT;

-- Add _en columns to products
ALTER TABLE products ADD COLUMN title_en VARCHAR(255);
ALTER TABLE products ADD COLUMN category_en VARCHAR(100);
ALTER TABLE products ADD COLUMN material_en VARCHAR(255);
ALTER TABLE products ADD COLUMN description_en TEXT;

-- Add _en columns to events
ALTER TABLE events ADD COLUMN title_en VARCHAR(255);
ALTER TABLE events ADD COLUMN location_en VARCHAR(255);
ALTER TABLE events ADD COLUMN description_en TEXT;
ALTER TABLE events ADD COLUMN full_description_en TEXT;

-- Add _en columns to news
ALTER TABLE news ADD COLUMN title_en VARCHAR(255);
ALTER TABLE news ADD COLUMN category_en VARCHAR(100);
ALTER TABLE news ADD COLUMN excerpt_en TEXT;
ALTER TABLE news ADD COLUMN content_en TEXT;

-- Add _en columns to team
ALTER TABLE team ADD COLUMN role_en VARCHAR(100);
ALTER TABLE team ADD COLUMN bio_en TEXT;

-- Add slug and tags/sections if missing for news (based on newsData.js seen in App.jsx earlier)
ALTER TABLE news ADD COLUMN IF NOT EXISTS slug VARCHAR(255);
ALTER TABLE news ADD COLUMN IF NOT EXISTS tags JSONB DEFAULT '[]';
ALTER TABLE news ADD COLUMN IF NOT EXISTS sections JSONB DEFAULT '[]';
