require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const markerRoutes = require('./routes/markerRoutes');


const app = express();
const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST || 'localhost';

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*', // Allow all origins by default
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', markerRoutes);

// Get all products

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://${DB_HOST}:${PORT}`);
});