const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    setId: { type: Number, required: true },
    answers: [
        {
            qId: { type: Number, required: true },
            most: { type: String, required: true },
            least: { type: String, required: true },
        },
    ],
    score: {
        D: { type: Number, default: 0 },
        I: { type: Number, default: 0 },
        S: { type: Number, default: 0 },
        C: { type: Number, default: 0 },
    },
    percentages: {
        D: { type: Number, default: 0 },
        I: { type: Number, default: 0 },
        S: { type: Number, default: 0 },
        C: { type: Number, default: 0 },
    },
    highestTrait: { type: String },
    secondaryTrait: { type: String },
    timeTaken: { type: Number }, // Time in seconds
    createdAt: { type: Date, default: () => new Date(Date.now() + (5.5 * 60 * 60 * 1000)) },
});

module.exports = mongoose.model('Assessment', AssessmentSchema);
