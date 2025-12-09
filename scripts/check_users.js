const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });
const User = require('../src/models/User.model');

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const users = await User.find({}, 'name phone email');
        console.log('--- Registered Users ---');
        users.forEach(u => {
            console.log(`Name: ${u.name}, Phone: ${u.phone}`);
        });
        console.log('------------------------');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkUsers();
