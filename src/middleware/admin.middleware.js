const User = require('../models/User.model');

// Middleware to check if user is admin
exports.isAdmin = async (req, res, next) => {
    try {
        const userId = req.params.userId || req.query.userId || req.body.userId;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.isAdmin) {
            return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
