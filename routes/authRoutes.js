const express = require('express');
const router = express.Router();
const { validateUser } = require('../middleware/validationMiddleware');
const authCtrl = require('../controllers/authController');

router.post('/register', validateUser, authCtrl.register);
router.post('/login', authCtrl.login);

module.exports = router;