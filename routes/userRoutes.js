const express = require('express');
const router = express.Router();
const { validateUserUpdate } = require('../middleware/validationMiddleware');
const { authenticateToken } = require('../middleware/authMiddleware');
const userCtrl = require('../controllers/userController');

router.get('/users/me', authenticateToken, userCtrl.getUserMe);
router.put('/users/me', authenticateToken, validateUserUpdate, userCtrl.updateUserMe);
router.delete('/users/me', authenticateToken, userCtrl.deleteUserMe);

router.put('/users/:id', authenticateToken, validateUserUpdate, userCtrl.updateUserById);

module.exports = router;