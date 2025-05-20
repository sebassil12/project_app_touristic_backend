const { body } = require('express-validator');

const validateUser = [
    body('username')
        .trim()
        .isString()
        .withMessage('Username must be a string')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters'),
    body('password')
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 6 }) // Changed from 8 to match Flutter
        .withMessage('Password must be at least 6 characters'),
    body('email')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail()
]

const validateUserUpdate = [
    body('username').optional().isLength({ min: 3 }),
    body('email').optional().isEmail(),
    body('newPassword').optional().isLength({ min: 6 })
]

const validateCreateMarker = [
    body('title').isString().notEmpty(),
    body('description').isString(),
    body('lat').isFloat({ min: -90, max: 90 }),
    body('lng').isFloat({ min: -180, max: 180 })
]

module.exports = {
    validateUser,
    validateUserUpdate,
    validateCreateMarker
}