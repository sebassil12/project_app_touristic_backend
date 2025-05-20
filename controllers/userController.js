const pool = require('../config/db');
const bcrypt = require('bcryptjs');

exports.getUserMe = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, username, email FROM gis_schema.users WHERE id = $1',
            [req.user.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUserMe = async (req, res) => {
    const { username, email, newPassword } = req.body;

    try {
        let query = 'UPDATE gis_schema.users SET';
        const values = [];
        let paramCount = 1;

        if (username) {
            query += ` username = $${paramCount++},`;
            values.push(username);
        }
        if (email) {
            query += ` email = $${paramCount++},`;
            values.push(email);
        }
        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            query += ` password = $${paramCount++},`;
            values.push(hashedPassword);
        }

        query = query.slice(0, -1) + ` WHERE id = $${paramCount} RETURNING id, username, email`;
        values.push(req.user.userId);

        const result = await pool.query(query, values);

        res.json({
            success: true,
            user: result.rows[0]
        });
    } catch (err) {
        if (err.code === '23505') {
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUserMe = async (req, res) => {
    try {
        await pool.query('DELETE FROM gis_schema.users WHERE id = $1', [req.user.userId]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUserById = async (req, res) => {
    const { id } = req.params;
    const { username, email, newPassword } = req.body;

    try {
        let query = 'UPDATE gis_schema.users SET';
        const values = [];
        let paramCount = 1;

        if (username) {
            query += ` username = $${paramCount++},`;
            values.push(username);
        }
        if (email) {
            query += ` email = $${paramCount++},`;
            values.push(email);
        }
        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            query += ` password = $${paramCount++},`;
            values.push(hashedPassword);
        }

        query = query.slice(0, -1) + ` WHERE id = $${paramCount} RETURNING id, username, email`;
        values.push(id);

        const result = await pool.query(query, values);

        res.json({
            success: true,
            user: result.rows[0]
        });
    } catch (err) {
        if (err.code === '23505') {
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUserById = async (req, res) => {
    try {
        await pool.query('DELETE FROM gis_schema.users WHERE id = $1', [req.params.id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};