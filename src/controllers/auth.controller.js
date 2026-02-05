const User = require('../models/User.model');
const jwt = require('jsonwebtoken');

// @desc    Login with email or phone number only
// @route   POST /auth/login
// @access  Public
exports.login = async (req, res) => {
    const { identifier } = req.body;

    if (!identifier) {
        return res.status(400).json({ message: 'Please provide email or phone number' });
    }

    // Validate email format
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Validate phone format (Indian phone numbers: 10 digits starting with 6-9)
    const validatePhone = (phone) => {
        const cleanedPhone = phone.replace(/\D/g, '');
        const indianPhoneRegex = /^[6-9]\d{9}$/;
        return indianPhoneRegex.test(cleanedPhone);
    };

    try {
        // Check if identifier is email or phone
        const isEmail = identifier.includes('@');

        // Validate format
        if (isEmail) {
            if (!validateEmail(identifier)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }
        } else {
            if (!validatePhone(identifier)) {
                return res.status(400).json({ message: 'Invalid phone number format. Please enter a valid 10-digit phone number.' });
            }
        }

        // Find user by email or phone
        const user = await User.findOne(
            isEmail ? { email: identifier } : { phone: identifier.replace(/\D/g, '') }
        );

        if (!user) {
            return res.status(404).json({ message: 'You are not an authenticated user. Please contact your support team.' });
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
                email: user.email,
                name: user.name,
                isAdmin: user.isAdmin,
            },
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
