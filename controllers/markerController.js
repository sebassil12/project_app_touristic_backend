const pool = require('../config/db');

exports.getMarkers = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, title, description, 
           ST_X(geom) as lng, ST_Y(geom) as lat 
           FROM gis_schema.markers`
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createMarker = async (req, res) => {

    const { title, description, lat, lng } = req.body;
    const userId = req.user.userId;

    try {
        const result = await pool.query(
            `INSERT INTO gis_schema.markers 
         (title, description, geom, created_by) 
         VALUES ($1, $2, ST_SetSRID(ST_MakePoint($3, $4), 4326), $5)
         RETURNING id, title, description, 
         ST_X(geom) as lng, ST_Y(geom) as lat`,
            [title, description, lng, lat, userId]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};