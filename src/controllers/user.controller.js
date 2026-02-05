const User = require('../models/User.model');

// @desc    Get user profile
// @route   GET /user/profile/:userId
// @access  Public
exports.getUserProfile = async (req, res) => {
    try {
        // req.user is already set by authMiddleware
        // We can optionally verify if req.params.userId matches req.user._id if we want to be strict about the URL
        // But for security, we should return the logged-in user's profile.

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
