const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/user.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.get('/profile/:userId', authMiddleware, getUserProfile);

module.exports = router;
