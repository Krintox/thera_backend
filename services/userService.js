// services/userService.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

const GameSession = require('../models/GameSession');
const calculateImprovement = require('../utils/calculateImprovement');
const gameService = require('../services/gameService')

// Calculate improvement analysis based on previous games
exports.calculateImprovement = async (userId) => {
    // Fetch previous game sessions
    const previousSessions = await GameSession.find({ userId }).sort({ createdAt: -1 }).limit(2);
    // if (previousSessions.length < 2) {
    //     throw new Error('Insufficient data for improvement analysis');
    // }
    const lastGameScore = previousSessions[0].score;
    const secondLastGameScore = previousSessions[1].score;
    // Calculate improvement percentage
    const improvement = calculateImprovement(lastGameScore, secondLastGameScore);
    return improvement;
};

// Update user's game progress
exports.updateGameProgress = async (userId, game, completed) => {
    await User.findByIdAndUpdate(userId, { $set: { [`gameProgress.${game}`]: completed } });
};


exports.getAllUsers = async () => {
    return await User.find();
};

// Update user's game progress
exports.updateGameProgress = async (userId, game, completed) => {
    await User.findByIdAndUpdate(userId, { $set: { [`gameProgress.${game}`]: completed } });
};

// Calculate improvement analysis for the last game
exports.calculateImprovementLastGame = async (userId) => {
    const lastGameScore = await gameService.getLastGameScore(userId);
    const previousGameScore = await gameService.getPreviousGameScore(userId);
    return calculateImprovement(lastGameScore, previousGameScore);
};

// Calculate improvement analysis for the last N games
exports.calculateImprovementLastNGames = async (userId, n) => {
    const lastNScores = await gameService.getLastNGameScores(userId, n);
    const previousNScores = await gameService.getPreviousNGameScores(userId, n);
    return calculateImprovement(lastNScores.reduce((a, b) => a + b, 0) / n, previousNScores.reduce((a, b) => a + b, 0) / n);
};

// Update user profile name
exports.updateName = async (userId, name) => {
    return await User.findByIdAndUpdate(userId, { $set: { name } }, { new: true });
};

// Update user profile username
exports.updateUsername = async (userId, username) => {
    return await User.findByIdAndUpdate(userId, { $set: { username } }, { new: true });
};

// Update user profile email
exports.updateEmail = async (userId, email) => {
    return await User.findByIdAndUpdate(userId, { $set: { email } }, { new: true });
};

// Update user profile password
exports.updatePassword = async (userId, password) => {
    // Update password using your preferred password hashing method
    // For example, using bcrypt:
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.findByIdAndUpdate(userId, { $set: { password: hashedPassword } }, { new: true });
};

exports.getUserProfile = async (userId) => {
    return await User.findById(userId).select('username email');
};