const express = require('express');
const router = express.Router();
const { startAssessment, submitAssessment, getAssessmentResult, saveProgress, getProgress, checkAssessmentStatus } = require('../controllers/assessment.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.get('/start/:userId', authMiddleware, startAssessment);
router.post('/submit/:userId', authMiddleware, submitAssessment);
router.get('/result/:userId', authMiddleware, getAssessmentResult);
router.post('/save-progress/:userId', authMiddleware, saveProgress);
router.get('/progress/:userId/:setId', authMiddleware, getProgress);
router.get('/status/:userId', authMiddleware, checkAssessmentStatus);

module.exports = router;
