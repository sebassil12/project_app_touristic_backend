const express = require('express');
const router = express.Router();
const { validateCreateMarker } = require('../middleware/validationMiddleware');
const { authenticateToken } = require('../middleware/authMiddleware');
const markerCtrl = require('../controllers/markerController');

router.get('/markers', authenticateToken, markerCtrl.getMarkers);
router.post('/markers', authenticateToken, validateCreateMarker, markerCtrl.createMarker);

module.exports = router;