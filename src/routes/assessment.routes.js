const express = require('express');
const router = express.Router();
const { startAssessment, submitAssessment, getAssessmentResult, saveProgress, getProgress, checkAssessmentStatus } = require('../controllers/assessment.controller');

router.get('/start/:userId', startAssessment);
router.post('/submit/:userId', submitAssessment);
router.get('/result/:userId', getAssessmentResult);
router.post('/save-progress/:userId', saveProgress);
router.get('/progress/:userId/:setId', getProgress);
router.get('/status/:userId', checkAssessmentStatus);

module.exports = router;
