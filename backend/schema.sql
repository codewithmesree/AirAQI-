-- USERS (Firebase references only)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firebase_uid VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- LOCATIONS
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6)
);

-- AIR QUALITY READINGS (time-series)
CREATE TABLE air_quality_readings (
    id BIGSERIAL PRIMARY KEY,
    location_id INTEGER NOT NULL REFERENCES locations(id),
    recorded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    pm2_5 DECIMAL,
    pm10 DECIMAL,
    co DECIMAL,
    no2 DECIMAL,
    o3 DECIMAL,
    so2 DECIMAL,
    aqi INTEGER
);

-- Indexes for performance
CREATE INDEX idx_aq_location_time
ON air_quality_readings (location_id, recorded_at DESC);

-- REPORTS METADATA
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name VARCHAR(255),
    generated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    type VARCHAR(50),
    status VARCHAR(50),
    file_url VARCHAR(512)
);
