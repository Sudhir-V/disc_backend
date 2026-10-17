const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });
const User = require('../src/models/User.model');

const usersToSeed = [
    // ✅ Real admin user
    {
        name: 'Thulasiraman S',
        phone: '9043104868',   // stored without +91 prefix
        email: 'thulasisiva97@gmail.com',
        employeeId: 'EMP001',
        gender: 'Male',
        isAdmin: true,
    }
];

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected\n');

        for (const userData of usersToSeed) {
            const result = await User.updateOne(
                { phone: userData.phone },   // match by phone (no duplicates)
                { $set: userData },
                { upsert: true }             // insert if not exists, update if exists
            );

            if (result.upsertedCount > 0) {
                console.log(`➕ Created : ${userData.name} (${userData.phone}) | Admin: ${userData.isAdmin}`);
            } else {
                console.log(`🔄 Updated : ${userData.name} (${userData.phone}) | Admin: ${userData.isAdmin}`);
            }
        }

        console.log('\n✅ Seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

seedUsers();
