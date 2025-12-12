const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User.model');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

// ==========================================================
// PASTE YOUR USERS HERE
// ==========================================================
// You can add one user or multiple users.
// Required: phone
// Optional: name, email, gender, isAdmin (defaults to false)
//
// Example:
// const users = [
//     { name: "John Doe", email: "john@example.com", phone: "1234567890", gender: "Male" },
//     { name: "Jane Doe", email: "jane@example.com", phone: "0987654321", gender: "Female", isAdmin: true }
// ];

const users = [
    // { name: "Test User", email: "test@example.com", phone: "9999999999", gender: "Male" }
];

// ==========================================================
// AUTO-UPLOAD LOGIC (Do not modify below this line)
// ==========================================================

const importUsers = async () => {
    try {
        if (!users || users.length === 0) {
            console.log('❌ No users found to upload. Please add users to the "users" array.');
            process.exit();
        }

        console.log(`📊 Found ${users.length} user(s) to process...`);

        let successCount = 0;
        let skipCount = 0;
        let errorCount = 0;

        for (const user of users) {
            try {
                // Check if phone already exists
                const existingUser = await User.findOne({ phone: user.phone });

                if (existingUser) {
                    console.log(`⚠️  Skipping ${user.name || user.phone}: Phone number already exists.`);
                    skipCount++;
                    continue;
                }

                await User.create(user);
                console.log(`✅ Created user: ${user.name || user.phone}`);
                successCount++;
            } catch (err) {
                console.error(`❌ Error creating ${user.name || user.phone}: ${err.message}`);
                errorCount++;
            }
        }

        console.log('-----------------------------------');
        console.log(`✨ Upload Complete!`);
        console.log(`✅ Added: ${successCount}`);
        console.log(`⚠️  Skipped (Duplicate): ${skipCount}`);
        console.log(`❌ Failed: ${errorCount}`);

        process.exit();
    } catch (error) {
        console.error(`❌ Fatal Error: ${error.message}`);
        process.exit(1);
    }
};

importUsers();
