require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const markerRoutes = require('./routes/markerRoutes');
const pool = require('./config/db');

const app = express();
const PORT = 3000;
const DB_HOST = process.env.POSTGRES_HOST || 'localhost';

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*', // Allow all origins by default
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', db: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', db: err.message });
  }
});
// Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', markerRoutes);

// Get all products

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://${DB_HOST}:${PORT}`);
});