const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

const { isAdmin } = require('../middleware/admin.middleware');
const { authMiddleware } = require('../middleware/auth.middleware');

// @route   GET /admin/users/report
// @desc    Get all users with assessment data
// @access  Admin only
router.get('/users/report', authMiddleware, isAdmin, adminController.getAllUsersReport);

// @route   GET /admin/users/export/xlsx
// @desc    Export user reports to Excel
// @access  Admin only
router.get('/users/export/xlsx', authMiddleware, isAdmin, adminController.exportToXLSX);

// @route   GET /admin/users/export/pdf
// @desc    Export user reports to PDF
// @access  Admin only
router.get('/users/export/pdf', authMiddleware, isAdmin, adminController.exportToPDF);

// @route   POST /admin/settings/toggle-results
// @desc    Toggle results visibility
// @access  Admin only
router.post('/settings/toggle-results', authMiddleware, isAdmin, adminController.toggleResults);

// @route   GET /admin/settings/results-status
// @desc    Get results visibility status
// @access  Public (or protected, but frontend needs it)
router.get('/settings/results-status', adminController.getResultVisibility);

module.exports = router;
