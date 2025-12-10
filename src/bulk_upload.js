const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Questions = require('./models/Questions.model');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

// ==========================================================
// PASTE YOUR 40 QUESTIONS HERE (Just the questions array!)
// ==========================================================
// IMPORTANT: Just paste your 40 questions directly.
// DO NOT add setId - it will be auto-generated!
//
// The script will automatically:
// 1. Find the highest setId in the database
// 2. Create a new set with setId = highest + 1
// 3. Upload your questions to that new set
//
// Example:
// const newQuestions = [
//     { qId: 1, question: "...", options: [...] },
//     { qId: 2, question: "...", options: [...] },
//     ... (40 questions total)
// ];

const newQuestions = [


];

// ==========================================================
// AUTO-UPLOAD LOGIC (Do not modify below this line)
// ==========================================================

const importData = async () => {
    try {
        // Validation
        if (!newQuestions || newQuestions.length === 0) {
            console.log('❌ No questions found. Please add your 40 questions to the "newQuestions" array.');
            process.exit();
        }

        if (newQuestions.length !== 40) {
            console.log(`⚠️  Warning: Expected 40 questions, but found ${newQuestions.length}.`);
        }

        // Find the highest existing setId in the database
        const allSets = await Questions.find().sort({ setId: -1 }).limit(1);
        const nextSetId = allSets.length > 0 ? allSets[0].setId + 1 : 1;

        console.log(`📊 Found ${allSets.length > 0 ? allSets[0].setId : 0} existing set(s) in database.`);
        console.log(`🆕 Auto-generating Set ID: ${nextSetId}`);

        // Create the new set with auto-generated setId
        const newSet = {
            setId: nextSetId,
            questions: newQuestions
        };

        await Questions.create(newSet);
        console.log(`✅ Successfully uploaded Set ID ${nextSetId} with ${newQuestions.length} questions!`);
        console.log('-----------------------------------');
        console.log('✨ Upload Complete!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

importData();
