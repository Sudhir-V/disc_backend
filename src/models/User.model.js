const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    phone: { type: String, required: true, unique: true },
    name: { type: String },
    email: { type: String },
    gender: { type: String },
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: () => new Date(Date.now() + (5.5 * 60 * 60 * 1000)) },
});

module.exports = mongoose.model('User', UserSchema);
