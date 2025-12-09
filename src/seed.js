const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Questions = require('./models/Questions.model');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const questions = [
    {
        setId: 1,
        questions: [
            // User Provided (1-13)
            {
                qId: 1,
                question: "When leading a project,",
                options: [
                    { text: "Take charge and set direction", type: "D" },
                    { text: "Motivate with enthusiasm", type: "I" },
                    { text: "Support and keep harmony", type: "S" },
                    { text: "Ensure accuracy and rules are followed", type: "C" }
                ]
            },
            {
                qId: 2,
                question: "In conflict situations, I…",
                options: [
                    { text: "Confront directly", type: "D" },
                    { text: "Persuade with charm", type: "I" },
                    { text: "Seek compromise", type: "S" },
                    { text: "Stick to facts", type: "C" }
                ]
            },
            {
                qId: 3,
                question: "My decision-making style is…",
                options: [
                    { text: "Fast and firm", type: "D" },
                    { text: "Collaborative", type: "I" },
                    { text: "Patient", type: "S" },
                    { text: "Analytical", type: "C" }
                ]
            },
            {
                qId: 4,
                question: "I value…",
                options: [
                    { text: "Winning", type: "D" },
                    { text: "Recognition", type: "I" },
                    { text: "Stability", type: "S" },
                    { text: "Accuracy", type: "C" }
                ]
            },
            {
                qId: 5,
                question: "When under pressure, I…",
                options: [
                    { text: "Push harder", type: "D" },
                    { text: "Stay optimistic", type: "I" },
                    { text: "Remain calm", type: "S" },
                    { text: "Double-check details", type: "C" }
                ]
            },
            {
                qId: 6,
                question: "I prefer tasks that are…",
                options: [
                    { text: "Challenging", type: "D" },
                    { text: "Social", type: "I" },
                    { text: "Steady", type: "S" },
                    { text: "Structured", type: "C" }
                ]
            },
            {
                qId: 7,
                question: "My leadership style is…",
                options: [
                    { text: "Assertive", type: "D" },
                    { text: "Inspiring", type: "I" },
                    { text: "Supportive", type: "S" },
                    { text: "Methodical", type: "C" }
                ]
            },
            {
                qId: 8,
                question: "I get frustrated when…",
                options: [
                    { text: "Progress is slow", type: "D" },
                    { text: "People are quiet", type: "I" },
                    { text: "Things change suddenly", type: "S" },
                    { text: "Rules are ignored", type: "C" }
                ]
            },
            {
                qId: 9,
                question: "I am motivated by…",
                options: [
                    { text: "Results", type: "D" },
                    { text: "Approval", type: "I" },
                    { text: "Security", type: "S" },
                    { text: "Standards", type: "C" }
                ]
            },
            {
                qId: 10,
                question: "My communication style is…",
                options: [
                    { text: "Direct", type: "D" },
                    { text: "Expressive", type: "I" },
                    { text: "Calm", type: "S" },
                    { text: "Precise", type: "C" }
                ]
            },
            {
                qId: 11,
                question: "I handle obstacles by…",
                options: [
                    { text: "Confronting them head-on", type: "D" },
                    { text: "Rallying others", type: "I" },
                    { text: "Staying patient", type: "S" },
                    { text: "Researching solutions", type: "C" }
                ]
            },
            {
                qId: 12,
                question: "I prefer working with…",
                options: [
                    { text: "Competitive people", type: "D" },
                    { text: "Outgoing people", type: "I" },
                    { text: "Reliable people", type: "S" },
                    { text: "Careful people", type: "C" }
                ]
            },
            {
                qId: 13,
                question: "My biggest strength is…",
                options: [
                    { text: "Determination", type: "D" },
                    { text: "Charisma", type: "I" },
                    { text: "Patience", type: "S" },
                    { text: "Accuracy", type: "C" }
                ]
            },
            // Generated Questions (14-40) to complete the 40-question set
            {
                qId: 14,
                question: "In a team meeting, I am typically…",
                options: [
                    { text: "The one driving the agenda", type: "D" },
                    { text: "The one keeping the energy high", type: "I" },
                    { text: "The one listening and taking notes", type: "S" },
                    { text: "The one analyzing the data", type: "C" }
                ]
            },
            {
                qId: 15,
                question: "I fear…",
                options: [
                    { text: "Losing control", type: "D" },
                    { text: "Social rejection", type: "I" },
                    { text: "Unplanned change", type: "S" },
                    { text: "Criticism of my work", type: "C" }
                ]
            },
            {
                qId: 16,
                question: "When giving feedback, I am…",
                options: [
                    { text: "Blunt and to the point", type: "D" },
                    { text: "Positive and encouraging", type: "I" },
                    { text: "Gentle and considerate", type: "S" },
                    { text: "Specific and detailed", type: "C" }
                ]
            },
            {
                qId: 17,
                question: "I approach new rules by…",
                options: [
                    { text: "Challenging them if they block progress", type: "D" },
                    { text: "Following them loosely", type: "I" },
                    { text: "Accepting them to keep peace", type: "S" },
                    { text: "Following them strictly", type: "C" }
                ]
            },
            {
                qId: 18,
                question: "My ideal work environment is…",
                options: [
                    { text: "Fast-paced and results-oriented", type: "D" },
                    { text: "Fun and collaborative", type: "I" },
                    { text: "Peaceful and steady", type: "S" },
                    { text: "Quiet and organized", type: "C" }
                ]
            },
            {
                qId: 19,
                question: "When I make a mistake, I…",
                options: [
                    { text: "Fix it quickly and move on", type: "D" },
                    { text: "Laugh it off", type: "I" },
                    { text: "Hope no one handles it harshly", type: "S" },
                    { text: "Analyze why it happened", type: "C" }
                ]
            },
            {
                qId: 20,
                question: "I prefer people who are…",
                options: [
                    { text: "Competent", type: "D" },
                    { text: "Friendly", type: "I" },
                    { text: "Kind", type: "S" },
                    { text: "Thorough", type: "C" }
                ]
            },
            {
                qId: 21,
                question: "When planning a vacation, I…",
                options: [
                    { text: "Decide the destination and go", type: "D" },
                    { text: "Focus on the fun activities", type: "I" },
                    { text: "Want a relaxing, predictable trip", type: "S" },
                    { text: "Plan every detail in advance", type: "C" }
                ]
            },
            {
                qId: 22,
                question: "If I disagree with someone, I…",
                options: [
                    { text: "State my case strongly", type: "D" },
                    { text: "Try to talk it out", type: "I" },
                    { text: "Avoid the argument", type: "S" },
                    { text: "Use logic to prove my point", type: "C" }
                ]
            },
            {
                qId: 23,
                question: "I am most effective when…",
                options: [
                    { text: "In charge", type: "D" },
                    { text: "Interacting with others", type: "I" },
                    { text: "Supporting a team", type: "S" },
                    { text: "Working with clear guidelines", type: "C" }
                ]
            },
            {
                qId: 24,
                question: "Others see me as…",
                options: [
                    { text: "Strong-willed", type: "D" },
                    { text: "Energetic", type: "I" },
                    { text: "Relaxed", type: "S" },
                    { text: "Precise", type: "C" }
                ]
            },
            {
                qId: 25,
                question: "I dislike…",
                options: [
                    { text: "Inefficiency", type: "D" },
                    { text: "Isolation", type: "I" },
                    { text: "Aggression", type: "S" },
                    { text: "Vagueness", type: "C" }
                ]
            },
            {
                qId: 26,
                question: "When buying a product, I look for…",
                options: [
                    { text: "The newest and best", type: "D" },
                    { text: "What looks cool", type: "I" },
                    { text: "What is reliable", type: "S" },
                    { text: "The best value/quality ratio", type: "C" }
                ]
            },
            {
                qId: 27,
                question: "My goal in conversation is to…",
                options: [
                    { text: "Get to the point", type: "D" },
                    { text: "Connect and entertain", type: "I" },
                    { text: "Understand and help", type: "S" },
                    { text: "Exchange correct information", type: "C" }
                ]
            },
            {
                qId: 28,
                question: "I organize my day by…",
                options: [
                    { text: "Prioritizing key goals", type: "D" },
                    { text: "Being flexible", type: "I" },
                    { text: "Following a routine", type: "S" },
                    { text: "Making a detailed list", type: "C" }
                ]
            },
            {
                qId: 29,
                question: "Under stress, I become…",
                options: [
                    { text: "Demanding", type: "D" },
                    { text: "Emotional", type: "I" },
                    { text: "Withdrawn", type: "S" },
                    { text: "Critical", type: "C" }
                ]
            },
            {
                qId: 30,
                question: "I prefer a boss who is…",
                options: [
                    { text: "Decisive", type: "D" },
                    { text: "Open-minded", type: "I" },
                    { text: "Patient", type: "S" },
                    { text: "Consistent", type: "C" }
                ]
            },
            {
                qId: 31,
                question: "I solve problems by…",
                options: [
                    { text: "Taking immediate action", type: "D" },
                    { text: "Brainstorming with others", type: "I" },
                    { text: "Looking for a safe solution", type: "S" },
                    { text: "Analyzing the root cause", type: "C" }
                ]
            },
            {
                qId: 32,
                question: "I want to be recognized for…",
                options: [
                    { text: "My achievements", type: "D" },
                    { text: "My personality", type: "I" },
                    { text: "My loyalty", type: "S" },
                    { text: "My expertise", type: "C" }
                ]
            },
            {
                qId: 33,
                question: "I tend to trust…",
                options: [
                    { text: "Confidence", type: "D" },
                    { text: "Intuition", type: "I" },
                    { text: "Experience", type: "S" },
                    { text: "Facts", type: "C" }
                ]
            },
            {
                qId: 34,
                question: "My email style is…",
                options: [
                    { text: "Brief", type: "D" },
                    { text: "Chatty", type: "I" },
                    { text: "Polite", type: "S" },
                    { text: "Detailed", type: "C" }
                ]
            },
            {
                qId: 35,
                question: "I avoid…",
                options: [
                    { text: "Being taken advantage of", type: "D" },
                    { text: "Being ignored", type: "I" },
                    { text: "Conflict", type: "S" },
                    { text: "Being wrong", type: "C" }
                ]
            },
            {
                qId: 36,
                question: "When I have a task, I…",
                options: [
                    { text: "Want to finish it first", type: "D" },
                    { text: "Make it fun", type: "I" },
                    { text: "Do it steadily", type: "S" },
                    { text: "Do it perfectly", type: "C" }
                ]
            },
            {
                qId: 37,
                question: "I express anger by…",
                options: [
                    { text: "Exploding", type: "D" },
                    { text: "Talking loudly", type: "I" },
                    { text: "Shutting down", type: "S" },
                    { text: "Being sarcastic", type: "C" }
                ]
            },
            {
                qId: 38,
                question: "In a group, I provide…",
                options: [
                    { text: "Direction", type: "D" },
                    { text: "Motivation", type: "I" },
                    { text: "Support", type: "S" },
                    { text: "Structure", type: "C" }
                ]
            },
            {
                qId: 39,
                question: "I prefer questions that are…",
                options: [
                    { text: "What", type: "D" },
                    { text: "Who", type: "I" },
                    { text: "How", type: "S" },
                    { text: "Why", type: "C" }
                ]
            },
            {
                qId: 40,
                question: "My motto could be…",
                options: [
                    { text: "Just do it", type: "D" },
                    { text: "Don't worry, be happy", type: "I" },
                    { text: "One step at a time", type: "S" },
                    { text: "Do it right the first time", type: "C" }
                ]
            }
        ]
    }
];

const importData = async () => {
    try {
        await Questions.deleteMany();
        await Questions.insertMany(questions);
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
