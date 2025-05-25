-- Enable PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create schema and objects
CREATE SCHEMA IF NOT EXISTS gis_schema;

-- Grant permissions to user
GRANT CREATE, USAGE ON SCHEMA gis_schema TO uisrael_user;

-- Set the current schema
SET LOCAL search_path TO gis_schema;

-- Users table
CREATE TABLE IF NOT EXISTS gis_schema.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR(255) UNIQUE,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Markers table
CREATE TABLE IF NOT EXISTS gis_schema.markers (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    geom GEOMETRY(POINT, 4326) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by VARCHAR(100),
    updated_at TIMESTAMP WITH TIME ZONE,
    updated_by VARCHAR(100)
);

-- Spatial index
CREATE INDEX IF NOT EXISTS idx_markers_geom ON markers USING GIST(geom);