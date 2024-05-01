// services/gameService.js

const GameSession = require('../models/GameSession');

// Save Trace the Path game data
exports.saveTracePathGameData = async (userId, score, progress,  gameOver, level, secondsLeft, figurePath, isTracing) => {
    console.log('Saving Trace the Path game data for user:', userId);
    await GameSession.create({
        userId,
        gameName: 'trace-path',
        score,
        progress,
        gameOver,
        level,
        secondsLeft,
        figurePath,
        isTracing
    });
};


// Save Memory Match game data
exports.saveMemoryMatchGameData = async (userId, score, timeTaken, trials, correctGuesses, wrongGuesses) => {
    await GameSession.create({
        userId,
        gameName: 'memory-match',
        score,
        timeTaken,
        trials,
        correctGuesses,
        wrongGuesses
    });
};

// Save Sound Matching game data
exports.saveSoundMatchingGameData = async (userId, score, param1, param2, param3) => {
    await GameSession.create({
        userId,
        gameName: 'sound-matching',
        score,
        param1,
        param2,
        param3
    });
};

exports.getGameDetailsForUser = async (gameName, userId) => {
    return await GameSession.findOne({ userId, gameName });
};

// Get details of all games played by a specific user
exports.getGamesPlayedByUser = async (userId) => {
    return await GameSession.find({ userId });
};

// Get details of scores and games played by all users
exports.getAllGames = async () => {
    return await GameSession.find();
};

// Get details of scores and games played by a specific user across all games
exports.getUserGames = async (userId) => {
    return await GameSession.find({ userId });
};


// Define getLastGameScore function
exports.getLastGameScore = async (userId, gameName) => {
    try {
        const lastGame = await GameSession.findOne({ userId, gameName }).sort({ createdAt: -1 });
        return lastGame ? lastGame.score : null;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching last game score');
    }
};

// Define getLastNGamesScores function
exports.getLastNGamesScores = async (userId, gameName, n) => {
    try {
        const lastNGames = await GameSession.find({ userId, gameName }).sort({ createdAt: -1 }).limit(n);
        return lastNGames.map(game => game.score);
    } catch (error) {
        console.error(error);
        throw new Error(`Error fetching last ${n} games scores`);
    }
};