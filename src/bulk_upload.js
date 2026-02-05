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
        "qId": 1,
        "question": "When leadership introduces a strategic initiative that impacts several teams at once, you usually respond by:",
        "options": [
            { "type": "I", "text": "Communicating purpose and intent clearly" },
            { "type": "S", "text": "Supporting teams to adjust at a steady pace" },
            { "type": "C", "text": "Assessing implications and risks carefully" },
            { "type": "D", "text": "Driving initial actions to build momentum" }
        ]
    },
    {
        "qId": 2,
        "question": "When an important decision must be made but opinions across the team differ strongly, you typically:",
        "options": [
            { "type": "S", "text": "Maintain execution until consensus forms" },
            { "type": "D", "text": "Decide and move forward to avoid delays" },
            { "type": "C", "text": "Evaluate options using objective criteria" },
            { "type": "I", "text": "Facilitate discussion to reach alignment" }
        ]
    },
    {
        "qId": 3,
        "question": "When project timelines are extended due to external constraints, you tend to:",
        "options": [
            { "type": "I", "text": "Communicate updates and revised expectations" },
            { "type": "C", "text": "Review impact on quality and outcomes" },
            { "type": "S", "text": "Maintain consistent execution despite changes" },
            { "type": "D", "text": "Re-plan activities to regain progress" }
        ]
    },
    {
        "qId": 4,
        "question": "When senior stakeholders expect high confidence in numbers and assumptions, you usually focus on:",
        "options": [
            { "type": "S", "text": "Ensuring information is presented steadily" },
            { "type": "D", "text": "Delivering conclusions clearly" },
            { "type": "I", "text": "Explaining context and rationale" },
            { "type": "C", "text": "Verifying accuracy and data integrity" }
        ]
    },
    {
        "qId": 5,
        "question": "When a recurring issue begins to affect delivery predictability, you typically:",
        "options": [
            { "type": "C", "text": "Investigate root causes thoroughly" },
            { "type": "S", "text": "Reinforce stable processes and routines" },
            { "type": "I", "text": "Discuss the issue openly to gain buy-in" },
            { "type": "D", "text": "Take decisive action to eliminate it" }
        ]
    },
    {
        "qId": 6,
        "question": "When responsibilities are redistributed across the team, you usually:",
        "options": [
            { "type": "I", "text": "Communicate changes clearly to everyone" },
            { "type": "S", "text": "Support smooth transitions for the team" },
            { "type": "D", "text": "Clarify expectations and move forward" },
            { "type": "C", "text": "Review role boundaries and dependencies" }
        ]
    },
    {
        "qId": 7,
        "question": "When you are required to present progress to a new stakeholder group, you tend to:",
        "options": [
            { "type": "C", "text": "Ensure all facts and details are correct" },
            { "type": "D", "text": "Highlight key achievements and next steps" },
            { "type": "S", "text": "Provide a structured and calm update" },
            { "type": "I", "text": "Engage the group through explanation and dialogue" }
        ]
    },
    {
        "qId": 8,
        "question": "When ongoing work is disrupted by frequent ad-hoc requests, you usually:",
        "options": [
            { "type": "D", "text": "Re-prioritize actively to keep delivery on track" },
            { "type": "S", "text": "Maintain steady progress despite disruptions" },
            { "type": "I", "text": "Discuss priorities to reduce interruptions" },
            { "type": "C", "text": "Evaluate impact before responding to requests" }
        ]
    },
    {
        "qId": 9,
        "question": "When you notice declining engagement within the team, you typically:",
        "options": [
            { "type": "C", "text": "Review workload and contributing factors" },
            { "type": "I", "text": "Check in with individuals to understand concerns" },
            { "type": "S", "text": "Provide consistency and reassurance" },
            { "type": "D", "text": "Set clearer goals to re-focus effort" }
        ]
    },
    {
        "qId": 10,
        "question": "When you are asked to take responsibility for an area with limited historical data, you usually:",
        "options": [
            { "type": "S", "text": "Proceed cautiously while maintaining stability" },
            { "type": "D", "text": "Act quickly and learn through execution" },
            { "type": "C", "text": "Analyze available information before acting" },
            { "type": "I", "text": "Align expectations through discussion" }
        ]
    },
    {
        "qId": 11,
        "question": "When different stakeholders measure success differently, you tend to:",
        "options": [
            { "type": "D", "text": "Define a clear success metric and proceed" },
            { "type": "S", "text": "Balance expectations to maintain harmony" },
            { "type": "I", "text": "Facilitate agreement on shared measures" },
            { "type": "C", "text": "Compare measures against objectives" }
        ]
    },
    {
        "qId": 12,
        "question": "When a long-term initiative shows slow but steady progress, you usually:",
        "options": [
            { "type": "C", "text": "Track trends to validate progress" },
            { "type": "D", "text": "Push for faster results" },
            { "type": "S", "text": "Stay consistent and patient" },
            { "type": "I", "text": "Encourage continued alignment and motivation" }
        ]
    },
    {
        "qId": 13,
        "question": "When changes are introduced without sufficient notice, you typically:",
        "options": [
            { "type": "I", "text": "Communicate actively to reduce confusion" },
            { "type": "D", "text": "Adapt quickly and keep moving" },
            { "type": "S", "text": "Maintain routines where possible" },
            { "type": "C", "text": "Assess impact before making adjustments" }
        ]
    },
    {
        "qId": 14,
        "question": "When a critical decision has potential downstream consequences, you usually:",
        "options": [
            { "type": "C", "text": "Evaluate risks and assumptions carefully" },
            { "type": "I", "text": "Discuss implications with stakeholders" },
            { "type": "D", "text": "Decide and take responsibility" },
            { "type": "S", "text": "Maintain stability while evaluating outcomes" }
        ]
    },
    {
        "qId": 15,
        "question": "When knowledge transfer is required under time pressure, you tend to:",
        "options": [
            { "type": "I", "text": "Explain context and reasoning" },
            { "type": "S", "text": "Ensure continuity during transition" },
            { "type": "D", "text": "Focus on key actions and essentials" },
            { "type": "C", "text": "Document information clearly" }
        ]
    },
    {
        "qId": 16,
        "question": "When team performance improves unevenly across areas, you usually:",
        "options": [
            { "type": "D", "text": "Address weaker areas directly" },
            { "type": "C", "text": "Analyze metrics to understand variation" },
            { "type": "S", "text": "Reinforce consistent practices" },
            { "type": "I", "text": "Discuss performance patterns openly" }
        ]
    },
    {
        "qId": 17,
        "question": "When you are asked to balance innovation with established processes, you typically:",
        "options": [
            { "type": "I", "text": "Build support through discussion" },
            { "type": "C", "text": "Evaluate alignment with standards" },
            { "type": "S", "text": "Introduce change gradually" },
            { "type": "D", "text": "Push new ideas into action" }
        ]
    },
    {
        "qId": 18,
        "question": "When you receive feedback that execution is strong but documentation is weak, you usually:",
        "options": [
            { "type": "S", "text": "Integrate documentation into regular workflow" },
            { "type": "D", "text": "Improve documentation quickly" },
            { "type": "C", "text": "Review documentation standards" },
            { "type": "I", "text": "Clarify expectations around documentation" }
        ]
    },
    {
        "qId": 19,
        "question": "When external conditions change suddenly and impact your plans, you tend to:",
        "options": [
            { "type": "C", "text": "Reassess assumptions and risks" },
            { "type": "I", "text": "Communicate changes clearly" },
            { "type": "S", "text": "Maintain steady execution where possible" },
            { "type": "D", "text": "Adjust direction and move forward" }
        ]
    },
    {
        "qId": 20,
        "question": "When reflecting on how you handle complex work situations overall, you typically value most:",
        "options": [
            { "type": "S", "text": "Providing reliability and stability" },
            { "type": "D", "text": "Achieving outcomes efficiently" },
            { "type": "I", "text": "Building alignment and understanding" },
            { "type": "C", "text": "Maintaining quality and accuracy" }
        ]
    },
    {
        "qId": 21,
        "question": "When a senior leader asks you to justify a decision that was already executed, you usually respond by:",
        "options": [
            { "type": "D", "text": "Reinforcing the outcome and moving forward" },
            { "type": "S", "text": "Responding calmly while maintaining stability" },
            { "type": "I", "text": "Ensuring shared understanding through discussion" },
            { "type": "C", "text": "Explaining the decision with data and rationale" }
        ]
    },
    {
        "qId": 22,
        "question": "When you are assigned to stabilize an initiative that has seen frequent changes, you typically:",
        "options": [
            { "type": "D", "text": "Clarify priorities and push progress" },
            { "type": "S", "text": "Re-establish consistent execution routines" },
            { "type": "C", "text": "Review what changes are essential" },
            { "type": "I", "text": "Communicate direction clearly to stakeholders" }
        ]
    },
    {
        "qId": 23,
        "question": "When delivery requires balancing multiple small improvements rather than one major change, you tend to:",
        "options": [
            { "type": "I", "text": "Discuss priorities to align expectations" },
            { "type": "S", "text": "Implement improvements gradually" },
            { "type": "D", "text": "Prioritize improvements that move results faster" },
            { "type": "C", "text": "Evaluate impact before implementing" }
        ]
    },
    {
        "qId": 24,
        "question": "When leadership requests a forward-looking view with limited historical data, you usually:",
        "options": [
            { "type": "S", "text": "Maintain current execution while planning" },
            { "type": "D", "text": "Make assumptions and proceed" },
            { "type": "I", "text": "Discuss scenarios with stakeholders" },
            { "type": "C", "text": "Assess risks and constraints carefully" }
        ]
    },
    {
        "qId": 25,
        "question": "When accountability for a cross-team outcome is unclear but delivery is expected, you typically:",
        "options": [
            { "type": "C", "text": "Clarify accountability formally" },
            { "type": "I", "text": "Align teams through conversation" },
            { "type": "S", "text": "Support execution until clarity emerges" },
            { "type": "D", "text": "Take ownership to ensure delivery" }
        ]
    },
    {
        "qId": 26,
        "question": "When a trusted process is questioned during a review, you usually:",
        "options": [
            { "type": "C", "text": "Validate the process against standards" },
            { "type": "S", "text": "Maintain consistency while reviewing feedback" },
            { "type": "D", "text": "Defend the process and proceed" },
            { "type": "I", "text": "Explain the reasoning and benefits" }
        ]
    },
    {
        "qId": 27,
        "question": "When you are asked to lead an initiative outside your functional expertise, you tend to:",
        "options": [
            { "type": "S", "text": "Proceed cautiously while maintaining stability" },
            { "type": "D", "text": "Step in and learn through execution" },
            { "type": "C", "text": "Study requirements before acting" },
            { "type": "I", "text": "Engage experts through discussion" }
        ]
    },
    {
        "qId": 28,
        "question": "When work quality is acceptable but not meeting expected standards, you usually:",
        "options": [
            { "type": "I", "text": "Discuss gaps to build understanding" },
            { "type": "C", "text": "Identify and address specific deviations" },
            { "type": "S", "text": "Improve quality incrementally" },
            { "type": "D", "text": "Raise expectations and push improvement" }
        ]
    },
    {
        "qId": 29,
        "question": "When different versions of information circulate within the team, you typically:",
        "options": [
            { "type": "C", "text": "Verify accuracy before finalizing" },
            { "type": "D", "text": "Decide which version to use and proceed" },
            { "type": "S", "text": "Continue execution while clarity improves" },
            { "type": "I", "text": "Align everyone on a common version" }
        ]
    },
    {
        "qId": 30,
        "question": "When timelines slip slightly but outcomes remain achievable, you tend to:",
        "options": [
            { "type": "I", "text": "Communicate revised expectations" },
            { "type": "S", "text": "Maintain steady execution" },
            { "type": "D", "text": "Re-focus effort to regain momentum" },
            { "type": "C", "text": "Assess downstream impact" }
        ]
    },
    {
        "qId": 31,
        "question": "When you notice inefficiencies in a long-running process, you usually:",
        "options": [
            { "type": "I", "text": "Discuss ideas to gain buy-in" },
            { "type": "D", "text": "Push for immediate improvements" },
            { "type": "C", "text": "Analyze the process to identify root causes" },
            { "type": "S", "text": "Improve the process gradually" }
        ]
    },
    {
        "qId": 32,
        "question": "When a stakeholder challenges the value of a deliverable late in the cycle, you typically:",
        "options": [
            { "type": "C", "text": "Support the value with data and evidence" },
            { "type": "S", "text": "Maintain composure and continue execution" },
            { "type": "D", "text": "Reinforce the purpose and move forward" },
            { "type": "I", "text": "Explain the value through discussion" }
        ]
    },
    {
        "qId": 33,
        "question": "When learning needs arise alongside ongoing delivery pressure, you usually:",
        "options": [
            { "type": "C", "text": "Study materials in depth" },
            { "type": "D", "text": "Learn quickly while executing" },
            { "type": "S", "text": "Spread learning over time" },
            { "type": "I", "text": "Learn through interaction and guidance" }
        ]
    },
    {
        "qId": 34,
        "question": "When project ownership transitions from one team to another, you tend to:",
        "options": [
            { "type": "I", "text": "Align expectations between teams" },
            { "type": "D", "text": "Define next actions clearly" },
            { "type": "C", "text": "Confirm completeness of handover" },
            { "type": "S", "text": "Ensure continuity of work" }
        ]
    },
    {
        "qId": 35,
        "question": "When you are asked to evaluate a proposal with limited time, you usually:",
        "options": [
            { "type": "C", "text": "Assess risks and assumptions" },
            { "type": "D", "text": "Decide quickly based on key factors" },
            { "type": "S", "text": "Maintain current direction until reviewed" },
            { "type": "I", "text": "Discuss the proposal to clarify intent" }
        ]
    },
    {
        "qId": 36,
        "question": "When competing priorities create frequent interruptions, you typically:",
        "options": [
            { "type": "S", "text": "Manage interruptions calmly" },
            { "type": "I", "text": "Communicate boundaries clearly" },
            { "type": "C", "text": "Evaluate impact before responding" },
            { "type": "D", "text": "Reassert priorities firmly" }
        ]
    },
    {
        "qId": 37,
        "question": "When feedback suggests good results but strained collaboration, you usually:",
        "options": [
            { "type": "D", "text": "Focus on outcomes first" },
            { "type": "I", "text": "Address collaboration through conversation" },
            { "type": "S", "text": "Improve working rhythm gradually" },
            { "type": "C", "text": "Analyze feedback patterns" }
        ]
    },
    {
        "qId": 38,
        "question": "When an initiative nears completion but small issues remain, you typically:",
        "options": [
            { "type": "S", "text": "Resolve issues steadily" },
            { "type": "D", "text": "Push to close remaining actions" },
            { "type": "C", "text": "Ensure all standards are met" },
            { "type": "I", "text": "Align stakeholders on closure" }
        ]
    },
    {
        "qId": 39,
        "question": "When a strategic decision must balance innovation with risk, you usually:",
        "options": [
            { "type": "I", "text": "Discuss implications broadly" },
            { "type": "S", "text": "Maintain stability while evaluating" },
            { "type": "D", "text": "Move ahead with the opportunity" },
            { "type": "C", "text": "Weigh risks carefully before deciding" }
        ]
    },
    {
        "qId": 40,
        "question": "When reflecting on how you consistently contribute in complex work environments, you most identify with:",
        "options": [
            { "type": "C", "text": "Ensuring quality and discipline" },
            { "type": "I", "text": "Building alignment and trust" },
            { "type": "D", "text": "Driving results and progress" },
            { "type": "S", "text": "Providing stability and reliability" }
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
