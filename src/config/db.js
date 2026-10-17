const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/disc-assessment', {
            serverSelectionTimeoutMS: 5000, // Fail fast instead of hanging
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Failed: ${error.message}`);
        console.error('⚠️  Server will continue running but DB operations will fail.');
        console.error('   → Check your MONGO_URI in .env or use a local MongoDB / Atlas URI.');
    }
};

module.exports = connectDB;
