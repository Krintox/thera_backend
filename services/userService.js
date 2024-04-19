// services/userService.js
const User = require('../models/User');

const GameSession = require('../models/GameSession');
const calculateImprovement = require('../utils/calculateImprovement');
const gameService = require('../services/gameService')

// Calculate improvement analysis based on previous games
exports.calculateImprovement = async (userId) => {
    // Fetch previous game sessions
    const previousSessions = await GameSession.find({ userId }).sort({ createdAt: -1 }).limit(2);
    if (previousSessions.length < 2) {
        throw new Error('Insufficient data for improvement analysis');
    }
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
