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
        "question": "Your senior manager suddenly asks for urgent progress updates.",
        "options": [
            { "type": "C", "text": "I gather accurate details before updating." },
            { "type": "D", "text": "I respond immediately with quick actions." },
            { "type": "I", "text": "I keep the atmosphere positive while addressing the request." },
            { "type": "S", "text": "I stay calm and proceed steadily under pressure." }
        ]
    },
    {
        "qId": 2,
        "question": "A project deadline is just hours away, and a lot of work remains.",
        "options": [
            { "type": "I", "text": "I motivate the team to keep the energy up." },
            { "type": "C", "text": "I avoid mistakes by working carefully." },
            { "type": "D", "text": "I speed up and push through aggressively." },
            { "type": "S", "text": "I remain steady and focused on each task." }
        ]
    },
    {
        "qId": 3,
        "question": "You find a big error in the final stage of a project.",
        "options": [
            { "type": "S", "text": "I calmly help the team correct it." },
            { "type": "D", "text": "I take control and fix it as fast as possible." },
            { "type": "C", "text": "I check the entire work to ensure no further errors." },
            { "type": "I", "text": "I involve others to keep everyone confident." }
        ]
    },
    {
        "qId": 4,
        "question": "Your team is stressed due to heavy workload.",
        "options": [
            { "type": "D", "text": "I quickly reorganize tasks and push the team forward." },
            { "type": "C", "text": "I reassess the plan to remove inefficiencies." },
            { "type": "I", "text": "I uplift their mood and reduce stress through communication." },
            { "type": "S", "text": "I calmly support everyone and maintain stability." }
        ]
    },
    {
        "qId": 5,
        "question": "A client requests a change moments before delivery.",
        "options": [
            { "type": "I", "text": "I talk positively with the client to manage expectations." },
            { "type": "C", "text": "I check if the change is feasible without risks." },
            { "type": "D", "text": "I decide whether to accept or reject the change quickly." },
            { "type": "S", "text": "I adjust carefully without creating panic." }
        ]
    },
    {
        "qId": 6,
        "question": "You have a meeting with multiple senior leaders who expect results.",
        "options": [
            { "type": "S", "text": "I speak calmly and respectfully." },
            { "type": "C", "text": "I focus on data and accuracy." },
            { "type": "D", "text": "I present confidently and take control." },
            { "type": "I", "text": "I communicate clearly and maintain rapport." }
        ]
    },
    {
        "qId": 7,
        "question": "You have several high-priority tasks at the same time.",
        "options": [
            { "type": "D", "text": "I attack the toughest one first." },
            { "type": "C", "text": "I analyze priorities and create a clear order." },
            { "type": "S", "text": "I complete tasks in a steady sequence." },
            { "type": "I", "text": "I involve the team to collaborate quickly." }
        ]
    },
    {
        "qId": 8,
        "question": "A stakeholder is unhappy and very demanding.",
        "options": [
            { "type": "C", "text": "I handle the issue with precise, factual information." },
            { "type": "D", "text": "I address their concerns firmly and directly." },
            { "type": "I", "text": "I use positive communication to calm them." },
            { "type": "S", "text": "I stay patient and let them express concerns." }
        ]
    },
    {
        "qId": 9,
        "question": "You are suddenly asked to join an urgent meeting.",
        "options": [
            { "type": "D", "text": "I join immediately and take the lead if needed." },
            { "type": "I", "text": "I engage actively to contribute ideas." },
            { "type": "C", "text": "I ask for context to be fully prepared." },
            { "type": "S", "text": "I join calmly and listen first." }
        ]
    },
    {
        "qId": 10,
        "question": "A project requires you to stay longer than planned.",
        "options": [
            { "type": "S", "text": "I stay steady and help others manage the load." },
            { "type": "D", "text": "I complete the work quickly so I can finish sooner." },
            { "type": "C", "text": "I take time to ensure everything is correct." },
            { "type": "I", "text": "I encourage the team to stay motivated together." }
        ]
    },
    {
        "qId": 11,
        "question": "A mistake you made is noticed during a meeting.",
        "options": [
            { "type": "D", "text": "I correct it immediately and move on." },
            { "type": "I", "text": "I acknowledge it lightly and keep the flow positive." },
            { "type": "S", "text": "I apologize calmly and correct the mistake." },
            { "type": "C", "text": "I check what caused the mistake to prevent repetition." }
        ]
    },
    {
        "qId": 12,
        "question": "Your team must immediately adopt a new tool.",
        "options": [
            { "type": "C", "text": "I read the guidelines before using it." },
            { "type": "D", "text": "I try it quickly and learn through action." },
            { "type": "S", "text": "I adapt slowly to avoid mistakes." },
            { "type": "I", "text": "I discuss it with teammates to understand together." }
        ]
    },
    {
        "qId": 13,
        "question": "A colleague blames you for something you didn’t do.",
        "options": [
            { "type": "S", "text": "I stay composed and talk privately to resolve it." },
            { "type": "D", "text": "I firmly defend myself immediately." },
            { "type": "C", "text": "I provide evidence to show the facts." },
            { "type": "I", "text": "I clear the misunderstanding through calm communication." }
        ]
    },
    {
        "qId": 14,
        "question": "Your workplace is chaotic due to heavy workload.",
        "options": [
            { "type": "I", "text": "I help others stay positive." },
            { "type": "D", "text": "I push hard to control the situation." },
            { "type": "C", "text": "I organize tasks to reduce chaos." },
            { "type": "S", "text": "I maintain calm and steady work." }
        ]
    },
    {
        "qId": 15,
        "question": "Your manager keeps assigning tasks back-to-back.",
        "options": [
            { "type": "C", "text": "I plan tasks to maintain quality." },
            { "type": "D", "text": "I handle them fast to stay ahead." },
            { "type": "I", "text": "I talk with the manager to discuss expectations." },
            { "type": "S", "text": "I stay patient and continue working." }
        ]
    },
    {
        "qId": 16,
        "question": "A system breakdown halts the entire team’s work.",
        "options": [
            { "type": "D", "text": "I act quickly to find a short-term workaround." },
            { "type": "I", "text": "I keep the team calm with positive communication." },
            { "type": "C", "text": "I check technical causes or contact IT with details." },
            { "type": "S", "text": "I wait patiently and support others." }
        ]
    },
    {
        "qId": 17,
        "question": "A disagreement occurs during a stressful moment.",
        "options": [
            { "type": "C", "text": "I look at facts to settle the disagreement." },
            { "type": "D", "text": "I assert my point and push for resolution." },
            { "type": "S", "text": "I encourage everyone to slow down and listen." },
            { "type": "I", "text": "I try to reduce tension through communication." }
        ]
    },
    {
        "qId": 18,
        "question": "An audit team arrives without prior notice.",
        "options": [
            { "type": "C", "text": "I collect documents and verify everything carefully." },
            { "type": "D", "text": "I take charge and coordinate responses." },
            { "type": "S", "text": "I support the team and ensure they stay calm." },
            { "type": "I", "text": "I communicate clearly with auditors to maintain rapport." }
        ]
    },
    {
        "qId": 19,
        "question": "Several tasks become urgent at the same time.",
        "options": [
            { "type": "I", "text": "I gather the team and energize them." },
            { "type": "D", "text": "I take fast action to regain control." },
            { "type": "C", "text": "I plan the correct order of tasks." },
            { "type": "S", "text": "I ensure we move together without panic." }
        ]
    },
    {
        "qId": 20,
        "question": "You face repetitive issues throughout a long day.",
        "options": [
            { "type": "C", "text": "I find the root cause to avoid repetition." },
            { "type": "D", "text": "I push through quickly to finish the day strong." },
            { "type": "S", "text": "I remain patient and consistent." },
            { "type": "I", "text": "I stay positive and keep everyone cheerful." }
        ]
    },
    {
        "qId": 21,
        "question": "You are presenting to a client and the software suddenly stops working.",
        "options": [
            { "type": "S", "text": "I stay calm and request support quietly." },
            { "type": "D", "text": "I quickly switch to a backup plan and continue." },
            { "type": "C", "text": "I troubleshoot the issue step-by-step." },
            { "type": "I", "text": "I keep the client engaged while the issue is fixed." }
        ]
    },
    {
        "qId": 22,
        "question": "You discover an error in a report right before submission.",
        "options": [
            { "type": "D", "text": "I fix it immediately and submit." },
            { "type": "I", "text": "I inform the team calmly and keep the energy steady." },
            { "type": "S", "text": "I correct it and reassure the team." },
            { "type": "C", "text": "I check the entire report thoroughly for more errors." }
        ]
    },
    {
        "qId": 23,
        "question": "You notice a data mismatch that impacts calculations.",
        "options": [
            { "type": "I", "text": "I discuss it with colleagues to get clarity." },
            { "type": "D", "text": "I take fast action to correct the mismatch." },
            { "type": "S", "text": "I inform the relevant team calmly." },
            { "type": "C", "text": "I trace the error back to its source." }
        ]
    },
    {
        "qId": 24,
        "question": "A customer reports a recurring issue with the product.",
        "options": [
            { "type": "S", "text": "I listen patiently to understand the full issue." },
            { "type": "D", "text": "I give them a quick resolution plan." },
            { "type": "I", "text": "I reassure them and maintain rapport." },
            { "type": "C", "text": "I analyze logs and details before responding." }
        ]
    },
    {
        "qId": 25,
        "question": "You face a complicated problem with no straightforward answer.",
        "options": [
            { "type": "C", "text": "I break the problem into smaller parts and analyze each one." },
            { "type": "D", "text": "I choose a direction and take action." },
            { "type": "S", "text": "I gather everyone’s perspective first." },
            { "type": "I", "text": "I brainstorm with the team for ideas." }
        ]
    },
    {
        "qId": 26,
        "question": "Right before a rollout, testers report major bugs.",
        "options": [
            { "type": "C", "text": "I analyze each bug carefully to prevent future issues." },
            { "type": "D", "text": "I drive the team to fix them fast." },
            { "type": "I", "text": "I encourage collaboration to solve them quickly." },
            { "type": "S", "text": "I help the team stay calm under pressure." }
        ]
    },
    {
        "qId": 27,
        "question": "You notice a potential risk in the project timeline.",
        "options": [
            { "type": "S", "text": "I support the team so we adjust smoothly." },
            { "type": "D", "text": "I make a quick adjustment to reduce risk." },
            { "type": "C", "text": "I document and evaluate the risk in detail." },
            { "type": "I", "text": "I discuss it openly with the team." }
        ]
    },
    {
        "qId": 28,
        "question": "A problem keeps happening in your team’s workflow.",
        "options": [
            { "type": "D", "text": "I change the method and push for a new approach." },
            { "type": "I", "text": "I encourage a group discussion for ideas." },
            { "type": "S", "text": "I help the team maintain stability while improving." },
            { "type": "C", "text": "I identify the root cause and fix the process." }
        ]
    },
    {
        "qId": 29,
        "question": "During a customer training session, participants seem confused.",
        "options": [
            { "type": "D", "text": "I quickly change the method and explain differently." },
            { "type": "I", "text": "I interact more to make it engaging and clear." },
            { "type": "C", "text": "I provide structured examples and clear steps." },
            { "type": "S", "text": "I slow down and clarify slowly." }
        ]
    },
    {
        "qId": 30,
        "question": "You realize an important detail was missed in your work.",
        "options": [
            { "type": "D", "text": "I fix it and move fast." },
            { "type": "C", "text": "I review the entire work for additional gaps." },
            { "type": "I", "text": "I discuss it with others to avoid similar gaps." },
            { "type": "S", "text": "I calmly correct the mistake." }
        ]
    },
    {
        "qId": 31,
        "question": "Multiple solutions are available for a problem.",
        "options": [
            { "type": "I", "text": "I gather input to find the best collaborative solution." },
            { "type": "D", "text": "I choose the fastest and most effective option." },
            { "type": "C", "text": "I compare data and pick the most accurate option." },
            { "type": "S", "text": "I choose the solution that creates stability." }
        ]
    },
    {
        "qId": 32,
        "question": "A customer does not understand a technical feature.",
        "options": [
            { "type": "C", "text": "I provide a detailed explanation with examples." },
            { "type": "D", "text": "I simplify and explain it quickly." },
            { "type": "S", "text": "I patiently walk them through it." },
            { "type": "I", "text": "I use clear communication to make them comfortable." }
        ]
    },
    {
        "qId": 33,
        "question": "A plan you built did not work as expected.",
        "options": [
            { "type": "C", "text": "I analyze why the plan failed before creating a new one." },
            { "type": "D", "text": "I immediately create a new plan." },
            { "type": "I", "text": "I involve the team to rethink the approach." },
            { "type": "S", "text": "I support the team emotionally and adjust slowly." }
        ]
    },
    {
        "qId": 34,
        "question": "You receive instructions that are unclear.",
        "options": [
            { "type": "S", "text": "I wait for proper instructions." },
            { "type": "D", "text": "I move ahead based on what I understand." },
            { "type": "C", "text": "I request clarity before starting." },
            { "type": "I", "text": "I talk to others to interpret the instructions." }
        ]
    },
    {
        "qId": 35,
        "question": "Your team is stuck on a complex assignment.",
        "options": [
            { "type": "C", "text": "I study the problem carefully and guide logically." },
            { "type": "D", "text": "I take charge and divide the task into parts." },
            { "type": "I", "text": "I inspire everyone to share ideas." },
            { "type": "S", "text": "I help them patiently and step-by-step." }
        ]
    },
    {
        "qId": 36,
        "question": "A product suddenly stops working in production.",
        "options": [
            { "type": "D", "text": "I take immediate action to reduce impact." },
            { "type": "I", "text": "I communicate updates to keep everyone calm." },
            { "type": "S", "text": "I support the team handling the issue." },
            { "type": "C", "text": "I analyze logs to identify the exact cause." }
        ]
    },
    {
        "qId": 37,
        "question": "Two teams send conflicting data reports.",
        "options": [
            { "type": "D", "text": "I choose one and move forward quickly." },
            { "type": "I", "text": "I call both teams for a discussion." },
            { "type": "C", "text": "I verify both reports to find which is correct." },
            { "type": "S", "text": "I bring the two teams together calmly." }
        ]
    },
    {
        "qId": 38,
        "question": "The team suggests different ways to solve a problem.",
        "options": [
            { "type": "C", "text": "I evaluate each option logically." },
            { "type": "D", "text": "I pick a direction and instruct the team." },
            { "type": "I", "text": "I encourage everyone to align on one solution." },
            { "type": "S", "text": "I look for the most comfortable solution for the team." }
        ]
    },
    {
        "qId": 39,
        "question": "You see a recurring issue that slows productivity.",
        "options": [
            { "type": "D", "text": "I change the process immediately." },
            { "type": "I", "text": "I bring the team together to share ideas." },
            { "type": "S", "text": "I suggest improvements slowly." },
            { "type": "C", "text": "I create a detailed improvement plan." }
        ]
    },
    {
        "qId": 40,
        "question": "You need to review final output before submission.",
        "options": [
            { "type": "D", "text": "I check the key points quickly and proceed." },
            { "type": "I", "text": "I ask for someone’s feedback before sending." },
            { "type": "C", "text": "I examine every detail carefully." },
            { "type": "S", "text": "I review calmly without rushing." }
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
