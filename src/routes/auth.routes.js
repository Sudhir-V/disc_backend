const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp, retryOtp } = require('../controllers/auth.controller');

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/retry-otp', retryOtp);

module.exports = router;
