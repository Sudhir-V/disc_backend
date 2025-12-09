const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    setId: { type: Number, required: true },
    questions: [
        {
            qId: { type: Number, required: true },
            question: { type: String, required: true },
            options: [
                {
                    text: { type: String, required: true },
                    type: { type: String, required: true } // D, I, S, C
                }
            ]
        },
    ],
});

module.exports = mongoose.model('Questions', QuestionSchema);
