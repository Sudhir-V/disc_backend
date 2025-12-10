const User = require('../models/User.model');
const Assessment = require('../models/Assessment.model');

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
                highestTrait: assessment ? assessment.highestTrait : null,
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

            return {
                'Name': user.name || 'N/A',
                'Email': user.email || 'N/A',
                'Phone': user.phone,
                'Gender': user.gender || 'N/A',
                'Admin': user.isAdmin ? 'Yes' : 'No',
                'Assessment Status': assessment ? 'Completed' : 'Not Completed',
                'D Score': assessment ? assessment.score.D : '-',
                'I Score': assessment ? assessment.score.I : '-',
                'S Score': assessment ? assessment.score.S : '-',
                'C Score': assessment ? assessment.score.C : '-',
                'Highest Trait': assessment ? assessment.highestTrait : '-',
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
            { wch: 10 }, // D Score
            { wch: 10 }, // I Score
            { wch: 10 }, // S Score
            { wch: 10 }, // C Score
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
        const doc = new PDFDocument({ margin: 50, size: 'A4', layout: 'landscape' });

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
        doc.fontSize(9).font('Helvetica-Bold');
        doc.text('Name', 50, currentY, { width: 80 });
        doc.text('Email', 135, currentY, { width: 100 });
        doc.text('Phone', 240, currentY, { width: 80 });
        doc.text('Status', 325, currentY, { width: 70 });
        doc.text('D', 400, currentY, { width: 30 });
        doc.text('I', 435, currentY, { width: 30 });
        doc.text('S', 470, currentY, { width: 30 });
        doc.text('C', 505, currentY, { width: 30 });
        doc.text('Trait', 540, currentY, { width: 50 });
        doc.text('Time', 595, currentY, { width: 40 });
        doc.text('Completed', 640, currentY, { width: 80 });

        currentY += rowHeight;
        doc.moveTo(50, currentY - 5).lineTo(750, currentY - 5).stroke();

        // Draw rows
        doc.font('Helvetica').fontSize(8);
        users.forEach((user, index) => {
            const assessment = assessmentMap[user._id.toString()];

            // Check if we need a new page
            if (currentY > 500) {
                doc.addPage();
                currentY = 50;
            }

            doc.text(user.name || 'N/A', 50, currentY, { width: 80, ellipsis: true });
            doc.text(user.email || 'N/A', 135, currentY, { width: 100, ellipsis: true });
            doc.text(user.phone, 240, currentY, { width: 80 });
            doc.text(assessment ? 'Completed' : 'Pending', 325, currentY, { width: 70 });
            doc.text(assessment ? assessment.score.D.toString() : '-', 400, currentY, { width: 30 });
            doc.text(assessment ? assessment.score.I.toString() : '-', 435, currentY, { width: 30 });
            doc.text(assessment ? assessment.score.S.toString() : '-', 470, currentY, { width: 30 });
            doc.text(assessment ? assessment.score.C.toString() : '-', 505, currentY, { width: 30 });
            doc.text(assessment ? assessment.highestTrait : '-', 540, currentY, { width: 50 });
            doc.text(
                assessment && assessment.timeTaken ? `${Math.floor(assessment.timeTaken / 60)}:${(assessment.timeTaken % 60).toString().padStart(2, '0')}` : '-',
                595,
                currentY,
                { width: 40 }
            );
            doc.text(
                assessment ? new Date(assessment.createdAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }) : '-',
                640,
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
