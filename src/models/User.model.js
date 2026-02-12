const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    employeeId: { type: String, unique: true, sparse: true },
    phone: { type: String, required: true, unique: true },
    name: { type: String },
    email: { type: String },
    password: { type: String, required: true, default: '12345678' },
    gender: { type: String },
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: () => new Date(Date.now() + (5.5 * 60 * 60 * 1000)) },
});

module.exports = mongoose.model('User', UserSchema);
