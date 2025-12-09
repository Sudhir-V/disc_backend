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
    {
        qId: 1,
        question: "When facing a tight deadline, I…",
        options: [
            { text: "Focus intensely and push hard", type: "D" },
            { text: "Organize every detail carefully", type: "C" },
            { text: "Seek help and talk through ideas", type: "I" },
            { text: "Stay calm and steady", type: "S" }
        ]
    },
    {
        qId: 2,
        question: "Others appreciate me because I am…",
        options: [
            { text: "Reliable and supportive", type: "S" },
            { text: "Logical and accurate", type: "C" },
            { text: "Confident and action-driven", type: "D" },
            { text: "Friendly and positive", type: "I" }
        ]
    },
    {
        qId: 3,
        question: "In a team discussion, I usually…",
        options: [
            { text: "Share ideas enthusiastically", type: "I" },
            { text: "Listen patiently", type: "S" },
            { text: "Analyze and clarify facts", type: "C" },
            { text: "Push decisions forward", type: "D" }
        ]
    },
    {
        qId: 4,
        question: "I get frustrated when tasks…",
        options: [
            { text: "Lack structure or clarity", type: "C" },
            { text: "Move too slowly", type: "D" },
            { text: "Have too much conflict", type: "S" },
            { text: "Feel boring or routine", type: "I" }
        ]
    },
    {
        qId: 5,
        question: "When learning something new, I prefer…",
        options: [
            { text: "Guidance that is calm and clear", type: "S" },
            { text: "Hands-on learning through action", type: "D" },
            { text: "Talking through examples", type: "I" },
            { text: "Reading instructions and studying details", type: "C" }
        ]
    },
    {
        qId: 6,
        question: "I feel most motivated when…",
        options: [
            { text: "I am recognized by others", type: "I" },
            { text: "I achieve tasks independently", type: "D" },
            { text: "I have stability and routine", type: "S" },
            { text: "I see accuracy and quality results", type: "C" }
        ]
    },
    {
        qId: 7,
        question: "When making important decisions, I…",
        options: [
            { text: "Act quickly with confidence", type: "D" },
            { text: "Consider people’s feelings", type: "I" },
            { text: "Think logically through details", type: "C" },
            { text: "Take time and move steadily", type: "S" }
        ]
    },
    {
        qId: 8,
        question: "I prefer working with people who…",
        options: [
            { text: "Share positive energy", type: "I" },
            { text: "Work calmly without pressure", type: "S" },
            { text: "Get straight to the point", type: "D" },
            { text: "Follow processes properly", type: "C" }
        ]
    },
    {
        qId: 9,
        question: "During conflicts, I typically…",
        options: [
            { text: "Try to resolve calmly", type: "S" },
            { text: "Stand firm and assert myself", type: "D" },
            { text: "Discuss feelings and understand others", type: "I" },
            { text: "Stick to facts and logic", type: "C" }
        ]
    },
    {
        qId: 10,
        question: "I am most satisfied when my work is…",
        options: [
            { text: "Accurate and detailed", type: "C" },
            { text: "Fast and challenging", type: "D" },
            { text: "Collaborative and fun", type: "I" },
            { text: "Consistent and predictable", type: "S" }
        ]
    },

    // 11–20
    {
        qId: 11,
        question: "My natural strength is being…",
        options: [
            { text: "Patient and calm", type: "S" },
            { text: "Analytical and organized", type: "C" },
            { text: "Bold and confident", type: "D" },
            { text: "Expressive and inspiring", type: "I" }
        ]
    },
    {
        qId: 12,
        question: "I tend to avoid situations where…",
        options: [
            { text: "Decisions must be made instantly", type: "C" },
            { text: "Emotions run high", type: "S" },
            { text: "People are too quiet or passive", type: "I" },
            { text: "There is too much control", type: "D" }
        ]
    },
    {
        qId: 13,
        question: "When starting a conversation, I often…",
        options: [
            { text: "Break the ice and connect socially", type: "I" },
            { text: "Get straight to the point", type: "D" },
            { text: "Wait for others to speak", type: "S" },
            { text: "Ask questions to understand details", type: "C" }
        ]
    },
    {
        qId: 14,
        question: "I feel confident when…",
        options: [
            { text: "I am achieving big results", type: "D" },
            { text: "I am contributing harmony", type: "S" },
            { text: "I am influencing others positively", type: "I" },
            { text: "I am demonstrating precision", type: "C" }
        ]
    },
    {
        qId: 15,
        question: "I struggle the most when…",
        options: [
            { text: "I must follow strict rules", type: "I" },
            { text: "I need to compromise slowly", type: "D" },
            { text: "There is sudden change", type: "S" },
            { text: "I lack enough data", type: "C" }
        ]
    },
    {
        qId: 16,
        question: "My communication style is usually…",
        options: [
            { text: "Structured and formal", type: "C" },
            { text: "Enthusiastic and expressive", type: "I" },
            { text: "Direct and firm", type: "D" },
            { text: "Warm and thoughtful", type: "S" }
        ]
    },
    {
        qId: 17,
        question: "When people disagree with me, I…",
        options: [
            { text: "Try to stay calm and patient", type: "S" },
            { text: "Push harder to prove my point", type: "D" },
            { text: "Explain emotionally or socially", type: "I" },
            { text: "Provide facts and evidence", type: "C" }
        ]
    },
    {
        qId: 18,
        question: "I value relationships that are…",
        options: [
            { text: "Friendly and open", type: "I" },
            { text: "Stable and dependable", type: "S" },
            { text: "Honest and straightforward", type: "D" },
            { text: "Clear and respectful", type: "C" }
        ]
    },
    {
        qId: 19,
        question: "I am uncomfortable when…",
        options: [
            { text: "I must wait for decisions", type: "D" },
            { text: "Details are unclear", type: "C" },
            { text: "People avoid communicating", type: "I" },
            { text: "Conflict occurs suddenly", type: "S" }
        ]
    },
    {
        qId: 20,
        question: "I am best described as a person who…",
        options: [
            { text: "Supports others", type: "S" },
            { text: "Drives results", type: "D" },
            { text: "Connects socially", type: "I" },
            { text: "Ensures accuracy", type: "C" }
        ]
    },

    // 21–40
    {
        qId: 21,
        question: "In group projects, I like to…",
        options: [
            { text: "Take charge and assign roles", type: "D" },
            { text: "Maintain stability and support", type: "S" },
            { text: "Create excitement and participation", type: "I" },
            { text: "Organize steps and structure", type: "C" }
        ]
    },
    {
        qId: 22,
        question: "When communicating, I prefer…",
        options: [
            { text: "Concise and direct language", type: "D" },
            { text: "Friendly conversation", type: "I" },
            { text: "Detailed written instructions", type: "C" },
            { text: "Soft and calm tone", type: "S" }
        ]
    },
    {
        qId: 23,
        question: "I become impatient when…",
        options: [
            { text: "People take too long", type: "D" },
            { text: "Tasks become repetitive", type: "I" },
            { text: "Plans change unexpectedly", type: "S" },
            { text: "People ignore accuracy", type: "C" }
        ]
    },
    {
        qId: 24,
        question: "My greatest reward is…",
        options: [
            { text: "Seeing perfect results", type: "C" },
            { text: "Being recognized socially", type: "I" },
            { text: "Achieving strong performance", type: "D" },
            { text: "Helping others succeed", type: "S" }
        ]
    },
    {
        qId: 25,
        question: "I perform best when…",
        options: [
            { text: "Expectations are clear and detailed", type: "C" },
            { text: "The atmosphere is positive", type: "I" },
            { text: "I have freedom to act quickly", type: "D" },
            { text: "Things move at a steady pace", type: "S" }
        ]
    },
    {
        qId: 26,
        question: "I struggle in environments where…",
        options: [
            { text: "There are strict rules", type: "I" },
            { text: "There is too much conflict", type: "S" },
            { text: "There is slow progress", type: "D" },
            { text: "There is emotional pressure", type: "C" }
        ]
    },
    {
        qId: 27,
        question: "I admire people who…",
        options: [
            { text: "Lead confidently", type: "D" },
            { text: "Care deeply about others", type: "S" },
            { text: "Communicate with charm", type: "I" },
            { text: "Work with precision", type: "C" }
        ]
    },
    {
        qId: 28,
        question: "In a crisis, I usually…",
        options: [
            { text: "Take control immediately", type: "D" },
            { text: "Seek calm and patience", type: "S" },
            { text: "Talk and gather people together", type: "I" },
            { text: "Evaluate details carefully", type: "C" }
        ]
    },
    {
        qId: 29,
        question: "When working on long-term tasks, I…",
        options: [
            { text: "Maintain slow steady progress", type: "S" },
            { text: "Focus intensely and compete", type: "D" },
            { text: "Plan by analyzing all data", type: "C" },
            { text: "Stay motivated by interaction", type: "I" }
        ]
    },
    {
        qId: 30,
        question: "My weakness could be…",
        options: [
            { text: "Being overly cautious", type: "C" },
            { text: "Being too emotional", type: "I" },
            { text: "Being too forceful", type: "D" },
            { text: "Being too passive", type: "S" }
        ]
    },
    {
        qId: 31,
        question: "I feel happiest when…",
        options: [
            { text: "Life is stable and predictable", type: "S" },
            { text: "People appreciate my knowledge", type: "C" },
            { text: "People admire my strength", type: "D" },
            { text: "I am surrounded by energy and fun", type: "I" }
        ]
    },
    {
        qId: 32,
        question: "I prefer leaders who…",
        options: [
            { text: "Are calm and supportive", type: "S" },
            { text: "Are smart and structured", type: "C" },
            { text: "Are enthusiastic and inspiring", type: "I" },
            { text: "Are strong and confident", type: "D" }
        ]
    },
    {
        qId: 33,
        question: "When participating in a project, I…",
        options: [
            { text: "Organize and correct errors", type: "C" },
            { text: "Bring energy and motivate others", type: "I" },
            { text: "Create peace and balance", type: "S" },
            { text: "Set goals and push forward", type: "D" }
        ]
    },
    {
        qId: 34,
        question: "I tend to lead by…",
        options: [
            { text: "Encouraging others socially", type: "I" },
            { text: "Providing structure and clarity", type: "C" },
            { text: "Staying calm and steady", type: "S" },
            { text: "Taking fast decisive actions", type: "D" }
        ]
    },
    {
        qId: 35,
        question: "I admire teammates who…",
        options: [
            { text: "Work quietly and reliably", type: "S" },
            { text: "Communicate confidently", type: "I" },
            { text: "Deliver strong results", type: "D" },
            { text: "Maintain consistency and order", type: "C" }
        ]
    },
    {
        qId: 36,
        question: "I tend to lose focus when…",
        options: [
            { text: "Work becomes repetitive", type: "I" },
            { text: "Details become overwhelming", type: "D" },
            { text: "People rush solutions", type: "C" },
            { text: "Situations become tense", type: "S" }
        ]
    },
    {
        qId: 37,
        question: "People describe my personality as…",
        options: [
            { text: "Caring and dependable", type: "S" },
            { text: "Energetic and expressive", type: "I" },
            { text: "Powerful and determined", type: "D" },
            { text: "Precise and thoughtful", type: "C" }
        ]
    },
    {
        qId: 38,
        question: "I become frustrated when others…",
        options: [
            { text: "Avoid responsibility", type: "D" },
            { text: "Pressure me emotionally", type: "S" },
            { text: "Ignore facts", type: "C" },
            { text: "Show little enthusiasm", type: "I" }
        ]
    },
    {
        qId: 39,
        question: "I like to influence others through…",
        options: [
            { text: "Positive encouragement", type: "I" },
            { text: "Clear logical reasoning", type: "C" },
            { text: "Strong confident direction", type: "D" },
            { text: "Support and understanding", type: "S" }
        ]
    },
    {
        qId: 40,
        question: "I feel strongest when I am…",
        options: [
            { text: "Thinking deeply and accurately", type: "C" },
            { text: "Connecting with others", type: "I" },
            { text: "Leading from the front", type: "D" },
            { text: "Creating peace and cooperation", type: "S" }
        ]
    }

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
