const mongoose = require('mongoose');
const User = require('../src/models/User.model');
const Assessment = require('../src/models/Assessment.model');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const verifyTimeTracking = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // 1. Create Dummy User
        const testUser = await User.create({
            name: 'TimeTest User',
            email: `timetest_${Date.now()}@example.com`,
            phone: '9999999999',
            password: 'password123'
        });
        console.log('Created test user:', testUser._id);

        // 2. Submit Assessment with Time Taken
        const timeTaken = 185; // 3 minutes 5 seconds
        const submission = {
            userId: testUser._id.toString(),
            setId: 1,
            answers: [{ qId: 1, most: 'D', least: 'C' }], // Minimal answer
            score: { D: 1, I: 0, S: 0, C: 0 },
            highestTrait: 'D',
            timeTaken: timeTaken
        };

        // We can't use controller directly easily without mocking req/res, so we'll test the Model save directly first
        // effectively simulating what the controller does
        const assessment = await Assessment.create(submission);
        console.log('Created assessment with timeTaken:', assessment.timeTaken);

        // 3. Verify Retrieval
        const fetchedAssessment = await Assessment.findById(assessment._id);
        if (fetchedAssessment.timeTaken === timeTaken) {
            console.log('SUCCESS: Time Taken saved and retrieved correctly.');
        } else {
            console.error(`FAILURE: Expected ${timeTaken}, got ${fetchedAssessment.timeTaken}`);
        }

        // 4. Verify Admin Report Logic (simulate aggregation/map)
        const userReportObj = {
            name: testUser.name,
            timeTaken: fetchedAssessment.timeTaken
        };
        console.log('Admin Report Entry:', userReportObj);


        // Cleanup
        await User.findByIdAndDelete(testUser._id);
        await Assessment.findByIdAndDelete(assessment._id);
        console.log('Cleanup complete');

    } catch (error) {
        console.error('Verification failed:', error);
    } finally {
        await mongoose.disconnect();
    }
};

verifyTimeTracking();
