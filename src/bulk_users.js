const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User.model');
const connectDB = require('./config/db');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });
connectDB();

// ==========================================================
// PASTE YOUR USERS HERE
// ==========================================================
// You can add one user or multiple users.
// Required: phone
// Optional: name, email, gender, employeeId, isAdmin (defaults to false)
//
// Example:
// const users = [
//     { name: "John Doe", email: "john@example.com", phone: "1234567890", gender: "Male", employeeId: "EMP001" },
//     { name: "Jane Doe", email: "jane@example.com", phone: "0987654321", gender: "Female", isAdmin: true, employeeId: "EMP002" }
// ];

const users = [
    {
        "name": "Thulasiraman",
        "email": "thulasiraman.s@wele.in",
        "phone": "9043104868",
        "gender": "Male",
        "employeeId": "TH001"
    }

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

        // Check for duplicate phone numbers in the input array itself
        const phoneMap = {};
        const duplicatesInFile = [];

        users.forEach((user, index) => {
            if (phoneMap[user.phone]) {
                duplicatesInFile.push({ ...user, duplicateOfIndex: phoneMap[user.phone] });
            } else {
                phoneMap[user.phone] = index;
            }
        });

        if (duplicatesInFile.length > 0) {
            console.log('⚠️  The following users have DUPLICATE phone numbers in this file:');
            duplicatesInFile.forEach(d => {
                console.log(`   - Name: ${d.name}, Phone: ${d.phone}, Email: ${d.email} (Duplicate of entry at index ${d.duplicateOfIndex})`);
            });
            console.log('\nProcessing will continue, but duplicates will be skipped based on database constraints...\n');
        }

        for (const user of users) {
            try {
                // Check if phone already exists
                const existingUser = await User.findOne({ phone: user.phone });

                if (existingUser) {
                    console.log(`⚠️  Skipping ${user.name || user.phone}: Phone number already exists.`);
                    skipCount++;
                    continue;
                }

                if (user.password) delete user.password;
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
