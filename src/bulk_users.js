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
    { name: "Manikandan G", email: "manikandan.g@wele.in", phone: "9942306822", gender: "Male" },
    { name: "Ashwinth Kumar K", email: "ashwinthkumar.k@wele.in", phone: "6374233123", gender: "Male" },
    { name: "Ajay M", email: "ajay.m@wele.in", phone: "7397594904", gender: "Male" },
    { name: "Jalaldhalip M", email: "jalaldhalip.m@wele.in", phone: "8248769237", gender: "Male" },
    { name: "Krishnakanth", email: "krishnakanth.s@wele.in", phone: "9150131154", gender: "Male" },
    { name: "Kaviyarasan K", email: "kaviyarasan.k@wele.in", phone: "9786651033", gender: "Male" },
    { name: "Bharani Kumar C", email: "bharanikumar.c@wele.in", phone: "6384797251", gender: "Male" },
    { name: "Karthik P", email: "karthik.p@wele.in", phone: "7695815728", gender: "Male" },
    { name: "MS Mathiazhagan", email: "mathiazhagan.ms@wele.in", phone: "9943431297", gender: "Male" },
    { name: "Abinaya R", email: "abinaya@thepenindia.com", phone: "9042389978", gender: "Male" },
    { name: "Vennila J", email: "vennila.j@wele.in", phone: "7010951378", gender: "Male" },
    { name: "Vigneshwari S", email: "vigneshwari.s@wele.in", phone: "8838826374", gender: "Male" },
    { name: "Sathish S", email: "sathish.s@wele.in", phone: "8825569339", gender: "Male" },
    { name: "Abilash S", email: "abilash@wele.in", phone: "8778168747", gender: "Male" },
    { name: "Praburaju S", email: "prabu@wele.in", phone: "9940255655", gender: "Male" },
    { name: "Suriya", email: "suriya@wele.in", phone: "9994594871", gender: "Male" },
    { name: "Ashika E", email: "ashika@wele.in", phone: "7010437818", gender: "Male" }
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
