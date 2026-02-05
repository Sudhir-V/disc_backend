const Questions = require('../models/Questions.model');
const Assessment = require('../models/Assessment.model');

// @desc    Start assessment (Get random questions)
// @route   GET /assessment/start/:userId
// @access  Public
exports.startAssessment = async (req, res) => {
    try {
        const userId = req.user._id;

        // Delete any old incomplete assessments for this user
        // This ensures a fresh start when retaking the assessment
        await Assessment.deleteMany({
            userId,
            highestTrait: { $exists: false }
        });
        console.log('Cleared old incomplete assessments for user:', userId);

        // Count how many sets are available
        const count = await Questions.countDocuments();

        if (count === 0) {
            return res.status(404).json({ message: 'No questions found in DB' });
        }

        // Get a random random index
        const random = Math.floor(Math.random() * count);

        // Fetch the random set
        const questionSet = await Questions.findOne().skip(random);

        res.status(200).json(questionSet);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Submit assessment
// @route   POST /assessment/submit/:userId
// @access  Public
exports.submitAssessment = async (req, res) => {
    const userId = req.user._id;
    const { setId, answers } = req.body;

    try {
        // Log incoming data for debugging
        console.log('=== Assessment Submission ===');
        console.log('UserId:', userId);
        console.log('SetId:', setId);
        console.log('Answers:', JSON.stringify(answers, null, 2));

        // Validate input
        if (!userId) {
            return res.status(400).json({ message: 'UserId is required' });
        }
        if (!setId) {
            return res.status(400).json({ message: 'SetId is required' });
        }
        if (!answers || !Array.isArray(answers) || answers.length === 0) {
            return res.status(400).json({ message: 'Answers array is required and must not be empty' });
        }

        const { timeTaken } = req.body; // Expecting time in seconds


        // Calculate Scores
        let scores = { D: 0, I: 0, S: 0, C: 0 };
        const TOTAL_QUESTIONS = 40; // Assuming 40 questions

        answers.forEach((ans) => {
            // Add point for Most Like Me (+1)
            if (ans.most && scores[ans.most] !== undefined) {
                scores[ans.most]++;
            }
            // Subtract point for Least Like Me (-1)
            if (ans.least && scores[ans.least] !== undefined) {
                scores[ans.least]--;
            }
        });

        console.log('Calculated Scores:', scores);

        // --- Calculate Percentages ---
        // Max possible score for a trait is +40 (selected as Most for all 40 questions) - Though practically impossible to be +40 if other traits exist.
        // Min possible score is -40.
        // Range is 80 (-40 to +40).
        // Percentage = ((Score + 40) / 80) * 100? 
        // OR simple proportion of total questions? 
        // User Requirement: "The ouput in results D,I,S,C need to show percentage instead of showing scores."
        // Let's use a mapping relative to the total number of questions to keep it intuitive.
        // Actually, let's look at the range. 
        // If I answer "Most D" 40 times, D=40. 
        // Percentage = (Score / TotalQuestions) * 100? No, score can be negative.
        // Let's treat valid range as -40 to +40. 
        // Let's normalize to 0-100 scale: ((Score + TotalQuestions) / (2 * TotalQuestions)) * 100.
        // Example: Score 0 => ((0+40)/80)*100 = 50%
        // Score 40 => ((40+40)/80)*100 = 100%
        // Score -40 => ((-40+40)/80)*100 = 0%

        let percentages = {};
        Object.keys(scores).forEach(trait => {
            // ensure result is between 0 and 100
            let p = Math.round(((scores[trait] + TOTAL_QUESTIONS) / (2 * TOTAL_QUESTIONS)) * 100);
            percentages[trait] = Math.max(0, Math.min(100, p));
        });


        // --- Style Determination ---
        // Sort traits by score (highest to lowest)
        const sortedTraits = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        const primaryTrait = sortedTraits[0][0];
        const primaryScore = sortedTraits[0][1];
        const secondaryTraitKey = sortedTraits[1][0];
        const secondaryScore = sortedTraits[1][1];

        let highestTrait = primaryTrait;
        let secondaryTrait = null;

        // Threshold logic: if highest score is at least 5 points higher than second, show only primary.
        // Otherwise, show combination.
        if ((primaryScore - secondaryScore) >= 5) {
            highestTrait = primaryTrait;
            secondaryTrait = null; // Single style
        } else {
            // Combination style
            highestTrait = primaryTrait;
            secondaryTrait = secondaryTraitKey;
        }

        console.log('Sorted Traits:', sortedTraits);
        console.log('Primary:', highestTrait, 'Secondary:', secondaryTrait);

        // Find existing incomplete assessment or create new one
        let assessment = await Assessment.findOne({
            userId,
            setId,
            highestTrait: { $exists: false }
        });

        if (assessment) {
            // Update existing incomplete assessment
            assessment.answers = answers;
            assessment.score = scores;
            assessment.percentages = percentages;
            assessment.highestTrait = highestTrait;
            assessment.secondaryTrait = secondaryTrait;
            assessment.timeTaken = timeTaken;
            await assessment.save();
            console.log('Assessment updated successfully:', assessment._id);
        } else {
            // Create new assessment
            assessment = await Assessment.create({
                userId,
                setId,
                answers,
                score: scores,
                percentages,
                highestTrait,
                secondaryTrait,
                timeTaken
            });
            console.log('Assessment created successfully:', assessment._id);
        }

        res.status(201).json(assessment);
    } catch (error) {
        console.error('=== Assessment Submission Error ===');
        console.error('Error Message:', error.message);
        console.error('Error Stack:', error.stack);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Save assessment progress (auto-save)
// @route   POST /assessment/save-progress/:userId
// @access  Public
exports.saveProgress = async (req, res) => {
    const userId = req.user._id;
    const { setId, answers } = req.body;

    try {
        console.log('=== Saving Assessment Progress ===');
        console.log('UserId:', userId);
        console.log('SetId:', setId);
        console.log('Answers count:', answers?.length);

        // Validate input
        if (!userId || !setId || !answers || !Array.isArray(answers)) {
            return res.status(400).json({ message: 'Invalid data' });
        }

        // Find existing in-progress assessment or create new one
        let assessment = await Assessment.findOne({
            userId,
            setId,
            highestTrait: { $exists: false } // Only find incomplete assessments
        });

        if (assessment) {
            // Update existing progress
            assessment.answers = answers;
            await assessment.save();
            console.log('Progress updated for existing assessment');
        } else {
            // Create new progress entry
            assessment = await Assessment.create({
                userId,
                setId,
                answers,
                score: { D: 0, I: 0, S: 0, C: 0 }
            });
            console.log('New progress entry created');
        }

        res.status(200).json({ message: 'Progress saved', assessment });
    } catch (error) {
        console.error('=== Save Progress Error ===');
        console.error('Error Message:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get saved progress
// @route   GET /assessment/progress/:userId/:setId
// @access  Public
exports.getProgress = async (req, res) => {
    const userId = req.user._id
    const { setId } = req.params;

    try {
        // Find incomplete assessment
        const assessment = await Assessment.findOne({
            userId,
            setId,
            highestTrait: { $exists: false }
        });

        if (!assessment) {
            return res.status(404).json({ message: 'No saved progress found' });
        }

        res.status(200).json(assessment);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get assessment result
// @route   GET /assessment/result/:userId
// @access  Public
exports.getAssessmentResult = async (req, res) => {
    try {
        // Get latest completed assessment (has highestTrait)
        const assessment = await Assessment.findOne({
            userId: req.user._id,
            highestTrait: { $exists: true }
        }).sort({ createdAt: -1 });

        if (!assessment) {
            return res.status(404).json({ message: 'Assessment not found' });
        }

        res.status(200).json(assessment);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Check if user has completed assessment
// @route   GET /assessment/status/:userId
// @access  Public
exports.checkAssessmentStatus = async (req, res) => {
    try {
        const userId = req.user._id;

        // Check for completed assessment (has highestTrait)
        const assessment = await Assessment.findOne({
            userId,
            highestTrait: { $exists: true }
        }).sort({ createdAt: -1 });

        if (assessment) {
            res.status(200).json({
                hasCompleted: true,
                assessmentId: assessment._id
            });
        } else {
            res.status(200).json({
                hasCompleted: false,
                assessmentId: null
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
