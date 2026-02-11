const User = require('../models/User.model');
const msg91Service = require('../services/msg91.service');

// @desc    Send OTP
// @route   POST /auth/send-otp
// @access  Public
exports.sendOtp = async (req, res) => {
    const { phone } = req.body;

    if (!phone) {
        return res.status(400).json({ message: 'Please provide a phone number' });
    }

    // Check if user exists
    const userExists = await User.findOne({ phone });
    if (!userExists) {
        return res.status(404).json({ message: 'User not found. Please contact administrator.' });
    }

    try {
        const response = await msg91Service.sendOtp(phone);

        // Msg91 response usually contains type: "success" or "error"
        if (response.type === 'success') {
            res.status(200).json({ message: 'OTP sent successfully', details: response });
        } else {
            res.status(400).json({ message: 'Failed to send OTP', details: response });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Retry OTP
// @route   POST /auth/retry-otp
// @access  Public
exports.retryOtp = async (req, res) => {
    const { phone } = req.body;

    if (!phone) {
        return res.status(400).json({ message: 'Please provide a phone number' });
    }

    try {
        const response = await msg91Service.retryOtp(phone);
        if (response.type === 'success') {
            res.status(200).json({ message: 'OTP resent successfully', details: response });
        } else {
            res.status(400).json({ message: 'Failed to resend OTP', details: response });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const jwt = require('jsonwebtoken');

// @desc    Verify OTP and Login
// @route   POST /auth/verify-otp
// @access  Public
exports.verifyOtp = async (req, res) => {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
        return res.status(400).json({ message: 'Please provide phone and OTP' });
    }

    try {
        const response = await msg91Service.verifyOtp(phone, otp);
        console.log('Msg91 Response:', JSON.stringify(response, null, 2));

        if (response.type === 'success') {
            // OTP Verified - Find User
            const user = await User.findOne({ phone });

            if (!user) {
                return res.status(404).json({ message: 'User record not found.' });
            }

            // Generate Token
            const token = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin },
                process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_prod',
                { expiresIn: '30d' }
            );

            res.status(200).json({
                message: 'Login successful',
                user: {
                    _id: user._id,
                    phone: user.phone,
                    name: user.name,
                    isAdmin: user.isAdmin,
                },
                token
            });
        } else {
            res.status(400).json({ message: 'Invalid OTP', details: response });
        }
    } catch (error) {
        // Axios error from Msg91 service (likely 4xx for invalid OTP)
        res.status(401).json({ message: 'Verification failed', error: error.response?.data?.message || error.message });
    }
};
