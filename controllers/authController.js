const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { validationResult } = require('express-validator');

exports.login = async (req, res) => {

    const { username, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM gis_schema.users WHERE username = $1',
            [username]
        );

        if (result.rows.length === 0) {
            return res.status(401).send('Invalid credentials');
        }

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    const { username, password, email } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO gis_schema.users (username, password, email) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username, hashedPassword, email]
        );

        res.status(201).json({
            success: true,
            user: result.rows[0],
            message: 'Registration successful'
        });
    } catch (err) {
        console.error(err); // 🔥 MUY IMPORTANTE: Loggear el error real

        if (err.code === '23505') {
            const detail = err.detail.includes('email')
                ? 'Email already exists'
                : 'Username already exists';

            return res.status(400).json({
                success: false,
                message: detail
            });
        }

        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};