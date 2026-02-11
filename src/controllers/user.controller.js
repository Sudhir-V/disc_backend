const User = require('../models/User.model');

// @desc    Get user profile
// @route   GET /user/profile/:userId
// @access  Public
exports.getUserProfile = async (req, res) => {
    try {
        const requestedUserId = req.params.userId;

        // Check if user is authorized (Admin or requesting their own profile)
        if (req.user.isAdmin || req.user._id.toString() === requestedUserId) {
            const user = await User.findById(requestedUserId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } else {
            return res.status(403).json({ message: 'Not authorized to view this profile' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
