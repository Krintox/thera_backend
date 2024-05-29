// models/Questionnaire.js

const mongoose = require('mongoose');

const questionnaireSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    age: { type: String, required: true },
    condition: [{ type: String, required: true }],
    therapyGoals: [{ type: String, required: true }],
    activityLevel: { type: String, required: true },
    preferredLearningStyle: { type: String, required: true },
    accessibilityNeeds: { type: String, required: true },
    previousTherapyExperience: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);

module.exports = Questionnaire;

