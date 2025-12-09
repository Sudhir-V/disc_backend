const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./src/models/User.model');

const createAdminUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Check if user already exists
        const existingUser = await User.findOne({ phone: '9043104868' });

        if (existingUser) {
            console.log('User already exists. Updating to admin...');
            existingUser.name = 'Thulasiraman';
            existingUser.email = 'thulasiraman.s@wele.in';
            existingUser.gender = 'Male';
            existingUser.isAdmin = true;
            await existingUser.save();
            console.log('✅ User updated successfully!');
            console.log(existingUser);
        } else {
            // Create new admin user
            const adminUser = new User({
                phone: '9043104868',
                name: 'Thulasiraman',
                email: 'thulasiraman.s@wele.in',
                gender: 'Male',
                isAdmin: true
            });

            await adminUser.save();
            console.log('✅ Admin user created successfully!');
            console.log(adminUser);
        }

        // Close connection
        await mongoose.connection.close();
        console.log('Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin user:', error);
        process.exit(1);
    }
};

createAdminUser();
