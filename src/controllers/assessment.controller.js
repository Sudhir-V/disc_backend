const Questions = require('../models/Questions.model');
const Assessment = require('../models/Assessment.model');

// @desc    Start assessment (Get random questions)
// @route   GET /assessment/start/:userId
// @access  Public
exports.startAssessment = async (req, res) => {
    try {
        const { userId } = req.params;

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
    const { userId } = req.params;
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

        answers.forEach((ans) => {
            // Add point for Most Like Me
            if (ans.most && scores[ans.most] !== undefined) {
                scores[ans.most]++;
            }
            // Subtract point for Least Like Me
            if (ans.least && scores[ans.least] !== undefined) {
                scores[ans.least]--;
            }
        });

        console.log('Calculated Scores:', scores);

        // Determine Highest Trait
        // This might need refinement if scores are tied or negative, but standard logic applies: max value.
        let highestTrait = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
        console.log('Highest Trait:', highestTrait);

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
            assessment.highestTrait = highestTrait;
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
                highestTrait,
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
    const { userId } = req.params;
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
    const { userId, setId } = req.params;

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
            userId: req.params.userId,
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
        const { userId } = req.params;

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
