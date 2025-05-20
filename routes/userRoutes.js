const express = require('express');
const router = express.Router();
const { validateUserUpdate } = require('../middleware/validationMiddleware');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/users/me', authenticateToken, userCtrl.getCurrentUser);
router.put('/users/me', authenticateToken, validateUserUpdate, userCtrl.updateCurrentUser);
router.delete('/users/me', authenticateToken, userCtrl.deleteCurrentUser);

router.get('/users/:id', authenticateToken, userCtrl.getUserById);
router.put('/users/:id', authenticateToken, validateUserUpdate, userCtrl.updateUserById);

module.exports = router;