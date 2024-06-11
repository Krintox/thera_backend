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

// Save ImageSort game data
exports.saveImageSortGameData = async (userId, time, score, accuracy, totalImages, param5) => {
    await GameSession.create({
        userId,
        gameName: 'image-sort',
        time,
        score,
        accuracy,
        totalImages,
        param5
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

// Calculate Score Analysis
exports.getScoreAnalysis = async (userId, gameName) => {
    console.log(`Fetching game data for userId: ${userId}, gameName: ${gameName}`);
    const gameData = await GameSession.find({ userId, gameName }).sort({ createdAt: -1 });

    console.log(`Game data found: ${gameData.length}`);
    if (gameData.length === 0) {
        throw new Error(`No data found for game: ${gameName}`);
    }

    const latestGame = gameData[0];

    switch (gameName) {
        case 'trace-path':
            return {
                score: latestGame.score,
                timeTaken: latestGame.timeTaken,
                analysis: `Score: ${latestGame.score}, Time Taken: ${latestGame.timeTaken} seconds`
            };
        case 'memory-match':
            return {
                trials: latestGame.trials,
                timeTaken: latestGame.timeTaken,
                analysis: `Trials: ${latestGame.trials}, Time Taken: ${latestGame.timeTaken} seconds`
            };
        case 'image-sort':
            return {
                score: latestGame.score,
                timeTaken: latestGame.timeTaken,
                analysis: `Score: ${latestGame.score}, Time Taken: ${latestGame.timeTaken} seconds`
            };
        default:
            throw new Error(`Unknown game: ${gameName}`);
    }
};

// Calculate Overall Analysis
exports.getOverallAnalysis = async (userId, gameName) => {
    console.log(`Fetching overall game data for userId: ${userId}, gameName: ${gameName}`);
    const gameData = await GameSession.find({ userId, gameName });

    console.log(`Total game sessions found: ${gameData.length}`);
    if (gameData.length === 0) {
        throw new Error(`No data found for game: ${gameName}`);
    }

    let totalScore = 0;
    let totalTime = 0;
    let totalTrials = 0;

    gameData.forEach(game => {
        totalScore += game.score;
        totalTime += game.timeTaken || 0;
        totalTrials += game.trials || 0;
    });

    const averageScore = totalScore / gameData.length;
    const averageTime = totalTime / gameData.length;
    const averageTrials = totalTrials / gameData.length;

    switch (gameName) {
        case 'trace-path':
            return {
                averageScore,
                averageTime,
                analysis: `Average Score: ${averageScore}, Average Time Taken: ${averageTime} seconds`
            };
        case 'memory-match':
            return {
                averageTrials,
                averageTime,
                analysis: `Average Trials: ${averageTrials}, Average Time Taken: ${averageTime} seconds`
            };
        case 'image-sort':
            return {
                averageScore,
                averageTime,
                analysis: `Average Score: ${averageScore}, Average Time Taken: ${averageTime} seconds`
            };
        default:
            throw new Error(`Unknown game: ${gameName}`);
    }
};


// Calculate Trace Path Score
exports.calculateTracePathScore = (score, timeTaken) => {
    return 0.7 * score + 0.3 * (300 - timeTaken);
};

// Calculate Image Sort Score
exports.calculateImageSortScore = (time, score, accuracy) => {
    return 0.3 * (300 - time) + 0.4 * score + 0.3 * accuracy;
};

// Calculate Memory Match Score
exports.calculateMemoryMatchScore = (trials, wrongGuesses, timeTaken) => {
    return 0.3 * (100 - trials) + 0.4 * wrongGuesses + 0.3 * (300 - timeTaken);
};

// Calculate Overall Health Score
exports.calculateOverallHealthScore = (tracePathScore, imageSortScore, memoryMatchScore) => {
    return (tracePathScore + imageSortScore + memoryMatchScore) / 3;
};