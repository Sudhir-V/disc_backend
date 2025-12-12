const User = require('../models/User.model');
const Assessment = require('../models/Assessment.model');
const Settings = require('../models/Settings.model');

// @desc    Get all users with assessment data
// @route   GET /admin/users/report
// @access  Admin only
exports.getAllUsersReport = async (req, res) => {
    try {
        // Get all users
        const users = await User.find({}).sort({ createdAt: -1 });

        // Get all assessments
        const assessments = await Assessment.find({});

        // Create a map of userId to assessment data
        const assessmentMap = {};
        assessments.forEach(assessment => {
            assessmentMap[assessment.userId] = assessment;
        });

        // Combine user data with assessment data
        const userReports = users.map(user => {
            const assessment = assessmentMap[user._id.toString()];

            return {
                _id: user._id,
                name: user.name || 'N/A',
                email: user.email || 'N/A',
                phone: user.phone,
                gender: user.gender || 'N/A',
                isAdmin: user.isAdmin,
                assessmentCompleted: !!assessment,
                discScores: assessment ? assessment.score : null,
                percentages: assessment ? assessment.percentages : null,
                highestTrait: assessment ? assessment.highestTrait : null,
                secondaryTrait: assessment ? assessment.secondaryTrait : null,
                timeTaken: assessment ? assessment.timeTaken : null,
                completedAt: assessment ? assessment.createdAt : null,
                createdAt: user.createdAt
            };
        });

        res.status(200).json({
            success: true,
            count: userReports.length,
            data: userReports
        });
    } catch (error) {
        console.error('Error fetching user reports:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Export users report to XLSX
// @route   GET /admin/users/export/xlsx
// @access  Admin only
exports.exportToXLSX = async (req, res) => {
    try {
        const XLSX = require('xlsx');

        // Get all users
        const users = await User.find({}).sort({ createdAt: -1 });
        const assessments = await Assessment.find({});

        // Create assessment map
        const assessmentMap = {};
        assessments.forEach(assessment => {
            assessmentMap[assessment.userId] = assessment;
        });

        // Prepare data for Excel
        const excelData = users.map(user => {
            const assessment = assessmentMap[user._id.toString()];

            let dScore = '-', iScore = '-', sScore = '-', cScore = '-';
            let trait = '-';

            if (assessment) {
                const s = assessment.score;
                const p = assessment.percentages || { D: 0, I: 0, S: 0, C: 0 };
                dScore = `${s.D} (${Math.round(p.D)}%)`;
                iScore = `${s.I} (${Math.round(p.I)}%)`;
                sScore = `${s.S} (${Math.round(p.S)}%)`;
                cScore = `${s.C} (${Math.round(p.C)}%)`;

                trait = assessment.highestTrait;
                if (assessment.secondaryTrait) {
                    trait += `/${assessment.secondaryTrait}`;
                }
            }

            return {
                'Name': user.name || 'N/A',
                'Email': user.email || 'N/A',
                'Phone': user.phone,
                'Gender': user.gender || 'N/A',
                'Admin': user.isAdmin ? 'Yes' : 'No',
                'Assessment Status': assessment ? 'Completed' : 'Not Completed',
                'D Score': dScore,
                'I Score': iScore,
                'S Score': sScore,
                'C Score': cScore,
                'Primary/Secondary': trait,
                'Time Taken': assessment && assessment.timeTaken ? `${Math.floor(assessment.timeTaken / 60)}:${(assessment.timeTaken % 60).toString().padStart(2, '0')}` : '-',
                'Completed Date': assessment ? new Date(assessment.createdAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }) : '-',
                'Completed Time': assessment ? new Date(assessment.createdAt).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }) : '-',
                'User Registered': new Date(user.createdAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })
            };
        });

        // Create workbook and worksheet
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(excelData);

        // Set column widths
        ws['!cols'] = [
            { wch: 20 }, // Name
            { wch: 30 }, // Email
            { wch: 15 }, // Phone
            { wch: 10 }, // Gender
            { wch: 8 },  // Admin
            { wch: 18 }, // Assessment Status
            { wch: 15 }, // D Score
            { wch: 15 }, // I Score
            { wch: 15 }, // S Score
            { wch: 15 }, // C Score
            { wch: 15 }, // Highest Trait
            { wch: 12 }, // Time Taken
            { wch: 15 }, // Completed Date
            { wch: 15 }, // Completed Time
            { wch: 15 }  // User Registered
        ];

        XLSX.utils.book_append_sheet(wb, ws, 'User Reports');

        // Generate buffer
        const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

        // Set headers for download
        res.setHeader('Content-Disposition', `attachment; filename=user-reports-${Date.now()}.xlsx`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        res.send(buffer);
    } catch (error) {
        console.error('Error exporting to XLSX:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Export users report to PDF
// @route   GET /admin/users/export/pdf
// @access  Admin only
exports.exportToPDF = async (req, res) => {
    try {
        const PDFDocument = require('pdfkit');

        // Get all users
        const users = await User.find({}).sort({ createdAt: -1 });
        const assessments = await Assessment.find({});

        // Create assessment map
        const assessmentMap = {};
        assessments.forEach(assessment => {
            assessmentMap[assessment.userId] = assessment;
        });

        // Create PDF document
        const doc = new PDFDocument({ margin: 30, size: 'A4', layout: 'landscape' });

        // Set response headers
        res.setHeader('Content-Disposition', `attachment; filename=user-reports-${Date.now()}.pdf`);
        res.setHeader('Content-Type', 'application/pdf');

        // Pipe PDF to response
        doc.pipe(res);

        // Add title
        doc.fontSize(20).text('DISC Assessment User Reports', { align: 'center' });
        doc.moveDown();
        doc.fontSize(10).text(`Generated on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`, { align: 'center' });
        doc.moveDown(2);

        // Table headers
        const tableTop = 150;
        const rowHeight = 30;
        let currentY = tableTop;

        // Draw header
        doc.fontSize(8).font('Helvetica-Bold');
        doc.text('Name', 30, currentY, { width: 80 });
        doc.text('Email', 110, currentY, { width: 100 });
        doc.text('Phone', 210, currentY, { width: 70 });
        doc.text('Status', 280, currentY, { width: 50 });
        doc.text('D', 330, currentY, { width: 50 });
        doc.text('I', 380, currentY, { width: 50 });
        doc.text('S', 430, currentY, { width: 50 });
        doc.text('C', 480, currentY, { width: 50 });
        doc.text('Trait', 530, currentY, { width: 60 });
        doc.text('Time', 600, currentY, { width: 40 });
        doc.text('Completed', 650, currentY, { width: 80 });

        currentY += rowHeight;
        doc.moveTo(30, currentY - 5).lineTo(800, currentY - 5).stroke();

        // Draw rows
        doc.font('Helvetica').fontSize(7);
        users.forEach((user, index) => {
            const assessment = assessmentMap[user._id.toString()];

            // Check if we need a new page
            if (currentY > 500) {
                doc.addPage();
                currentY = 50;
            }

            let dScore = '-', iScore = '-', sScore = '-', cScore = '-';
            let trait = '-';
            if (assessment) {
                const s = assessment.score;
                const p = assessment.percentages || { D: 0, I: 0, S: 0, C: 0 };
                dScore = `${s.D} (${Math.round(p.D)}%)`;
                iScore = `${s.I} (${Math.round(p.I)}%)`;
                sScore = `${s.S} (${Math.round(p.S)}%)`;
                cScore = `${s.C} (${Math.round(p.C)}%)`;

                trait = assessment.highestTrait;
                if (assessment.secondaryTrait) {
                    trait += `/${assessment.secondaryTrait}`;
                }
            }

            doc.text(user.name || 'N/A', 30, currentY, { width: 80, ellipsis: true });
            doc.text(user.email || 'N/A', 110, currentY, { width: 100, ellipsis: true });
            doc.text(user.phone, 210, currentY, { width: 70 });
            doc.text(assessment ? 'Completed' : 'Pending', 280, currentY, { width: 50 });
            doc.text(dScore, 330, currentY, { width: 50 });
            doc.text(iScore, 380, currentY, { width: 50 });
            doc.text(sScore, 430, currentY, { width: 50 });
            doc.text(cScore, 480, currentY, { width: 50 });
            doc.text(trait, 530, currentY, { width: 60 });
            doc.text(
                assessment && assessment.timeTaken ? `${Math.floor(assessment.timeTaken / 60)}:${(assessment.timeTaken % 60).toString().padStart(2, '0')}` : '-',
                600,
                currentY,
                { width: 40 }
            );
            doc.text(
                assessment ? new Date(assessment.createdAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }) : '-',
                650,
                currentY,
                { width: 80 }
            );

            currentY += rowHeight;
        });

        // Add footer
        doc.fontSize(8).text(
            `Total Users: ${users.length} | Completed: ${assessments.length} | Pending: ${users.length - assessments.length}`,
            50,
            doc.page.height - 50,
            { align: 'center' }
        );

        // Finalize PDF
        doc.end();
    } catch (error) {
        console.error('Error exporting to PDF:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Toggle results visibility
// @route   POST /admin/settings/toggle-results
// @access  Admin only
exports.toggleResults = async (req, res) => {
    try {
        const { enabled } = req.body;

        const setting = await Settings.findOneAndUpdate(
            { key: 'results_enabled' },
            { value: enabled, description: 'Controls whether users can see their results immediately.' },
            { upsert: true, new: true }
        );

        res.status(200).json({ success: true, enabled: setting.value });
    } catch (error) {
        console.error('Error toggling results:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get results visibility status
// @route   GET /admin/settings/results-status
// @access  Public (so results page can check)
exports.getResultVisibility = async (req, res) => {
    try {
        const setting = await Settings.findOne({ key: 'results_enabled' });
        // Default to true if not set
        const enabled = setting ? setting.value : true;

        res.status(200).json({ enabled });
    } catch (error) {
        console.error('Error getting result visibility:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
