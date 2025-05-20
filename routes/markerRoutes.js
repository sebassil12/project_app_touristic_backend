const express = require('express');
const router = express.Router();
const { validateCreateMarker } = require('../middleware/validationMiddleware');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/markers', authenticateToken, markerCtrl.getAllMarkers);
router.post('/markers', authenticateToken, validateCreateMarker, markerCtrl.createMarker);

module.exports = router;