const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp, retryOtp } = require('../controllers/auth.controller');

// @route   POST /auth/send-otp
router.post('/send-otp', sendOtp);

// @route   POST /auth/verify-otp
router.post('/verify-otp', verifyOtp);

// @route   POST /auth/retry-otp
router.post('/retry-otp', retryOtp);

module.exports = router;
