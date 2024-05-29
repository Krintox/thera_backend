// controllers/userController.js

const userService = require('../services/userService');
const Questionnaire = require('../models/Questionnaire');

// Get improvement analysis based on previous games
exports.getImprovementAnalysis = async (req, res) => {
    try {
        const improvement = await userService.calculateImprovement(req.user.userId);
        res.json({ improvement });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update user profile name
exports.updateName = async (req, res) => {
    try {
        const { name } = req.body;
        const updatedUser = await userService.updateName(req.user._id, name);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update user profile username
exports.updateUsername = async (req, res) => {
    try {
        const { username } = req.body;
        const updatedUser = await userService.updateUsername(req.user._id, username);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update user profile email
exports.updateEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const updatedUser = await userService.updateEmail(req.user._id, email);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update user profile password
exports.updatePassword = async (req, res) => {
    try {
        const { password } = req.body;
        const updatedUser = await userService.updatePassword(req.user._id, password);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const userProfile = await userService.getUserProfile(req.user._id);
        res.status(200).json(userProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.submitQuestionnaire = async (req, res) => {
    try {
        const questionnaireData = req.body;
        const userId = req.user._id;

        // Save questionnaire data to the database
        await userService.saveQuestionnaireData(userId, questionnaireData);

        res.status(201).json({ message: 'Questionnaire submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
