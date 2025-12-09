const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { isAdmin } = require('../middleware/admin.middleware');

// @route   GET /admin/users/report
// @desc    Get all users with assessment data
// @access  Admin only
router.get('/users/report', isAdmin, adminController.getAllUsersReport);

// @route   GET /admin/users/export/xlsx
// @desc    Export user reports to Excel
// @access  Admin only
router.get('/users/export/xlsx', isAdmin, adminController.exportToXLSX);

// @route   GET /admin/users/export/pdf
// @desc    Export user reports to PDF
// @access  Admin only
router.get('/users/export/pdf', isAdmin, adminController.exportToPDF);

module.exports = router;
