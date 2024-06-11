// controllers/gameController.js

const gameService = require('../services/gameService');
const userService = require('../services/userService');
const calculateImprovement = require('../utils/calculateImprovement');
const User = require('../models/User');


// Save Trace the Path game data
exports.saveTracePathGameData = async (req, res) => {
    try {
        const userId = req.user._id;
        const { score, progress, gameOver, level, secondsLeft, figurePath, isTracing } = req.body;

        // Call saveTracePathGameData with userId as the first argument
        await gameService.saveTracePathGameData(userId, score, progress, gameOver, level, secondsLeft, figurePath, isTracing);
        
        // Update user's game progress to mark Trace the Path game as completed
        await userService.updateGameProgress(userId, 'tracePathCompleted', true);
        
        // Calculate improvement/decrease in performance
        const improvement = await userService.calculateImprovement(userId, 'tracePath', score);

        res.status(201).json({ message: 'Trace the Path game data saved successfully', improvement });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Save Memory Match game data
exports.saveMemoryMatchGameData = async (req, res) => {
    try {
        const userId = req.user._id;
        const { score, timeTaken, trials, correctGuesses, wrongGuesses } = req.body;
        console.log(userId);
        console.log(score);
        console.log(timeTaken);
        console.log(trials);
        console.log(correctGuesses);
        console.log(wrongGuesses);

        // Check if the user has completed the previous game (Trace the Path)
        if (!req.user.gameProgress.tracePathCompleted) {
            return res.status(403).json({ error: 'Forbidden: Complete Trace the Path game first' });
        }

        // Call saveMemoryMatchGameData with userId as the first argument
        await gameService.saveMemoryMatchGameData(userId, score, timeTaken, trials, correctGuesses, wrongGuesses);
        
        // Update user's game progress to mark Memory Match game as completed
        await userService.updateGameProgress(userId, 'memoryMatchCompleted', true);
        
        // Calculate improvement/decrease in performance
        const improvement = await userService.calculateImprovement(userId, 'memoryMatch', score);

        res.status(201).json({ message: 'Memory Match game data saved successfully', improvement });
    } catch (error) {
        console.error("Error in saveMemoryMatchGameData:", error);
        if (error instanceof TypeError) {
            return res.status(400).json({ error: 'Bad request: Invalid data format' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Save Sound Matching game data
exports.saveSoundMatchingGameData = async (req, res) => {
    try {
        const userId = req.user._id;
        const { score, param1, param2, param3 } = req.body;
        console.log(score);
        console.log(param1);
        console.log(param2);
        console.log(param3);

        // Check if the user has completed the previous game (Memory Match)
        if (!req.user.gameProgress.memoryMatchCompleted) {
            console.log("complete memory match first");
            return res.status(403).json({ error: 'Forbidden: Complete Memory Match game first' });
        }

        // Call saveSoundMatchingGameData with userId as the first argument
        await gameService.saveSoundMatchingGameData(userId, score, param1, param2, param3);
        
        // Update user's game progress to mark Sound Matching game as completed
        await userService.updateGameProgress(userId, 'tracePathCompleted', true);
        await userService.updateGameProgress(userId, 'memoryMatchCompleted', true);
        
        // Calculate improvement/decrease in performance
        const improvement = await userService.calculateImprovement(userId, 'soundMatching', score);

        res.status(201).json({ message: 'Sound Matching game data saved successfully', improvement });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Save ImageSort game data
exports.saveImageSortGameData = async (req, res) => {
    try {
        const userId = req.user._id;
        const { time, score, accuracy, totalImages, param5 } = req.body;
        console.log(userId);
        console.log(time, score, accuracy, totalImages, param5);

        // Call saveImageSortGameData with userId as the first argument
        await gameService.saveImageSortGameData(userId, time, score, accuracy, totalImages, param5);

        // Update user's game progress to mark Image Sort game as completed
        await userService.updateGameProgress(userId, 'imageSortCompleted', true);

        // Calculate improvement/decrease in performance
        const improvement = await userService.calculateImprovement(userId, 'imageSort', score);

        res.status(201).json({ message: 'Image Sort game data saved successfully', improvement });
    } catch (error) {
        console.error("Error in saveImageSortGameData:", error);
        if (error instanceof TypeError) {
            return res.status(400).json({ error: 'Bad request: Invalid data format' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};




// Get details of specific game for a specific user
exports.getGameDetailsForUser = async (req, res) => {
    try {
        const { gameName, userId } = req.params;
        const gameDetails = await gameService.getGameDetailsForUser(gameName, userId);
        res.status(200).json(gameDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get details of all games played by a specific user
exports.getGamesPlayedByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const gamesPlayed = await gameService.getGamesPlayedByUser(userId);
        res.status(200).json(gamesPlayed);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get details of all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get details of scores and games played by all users
exports.getAllGames = async (req, res) => {
    try {
        const allGames = await gameService.getAllGames();
        res.status(200).json(allGames);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get details of scores and games played by a specific user across all games
exports.getUserGames = async (req, res) => {
    try {
        const { userId } = req.params;
        const userGames = await gameService.getUserGames(userId);
        res.status(200).json(userGames);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get improved score for the last game played
exports.getImprovedScoreLastGame = async (req, res) => {
    try {
        const userId = req.user._id;
        const { gameName } = req.params;

        // Get the last game score
        const lastGame = await gameService.getLastGameScore(userId, gameName);

        res.status(200).json({ lastGame });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get improved score for the last 5 games played
exports.getImprovedScoreLast5Games = async (req, res) => {
    try {
        const userId = req.user._id;
        const { gameName } = req.params;

        // Get the last 5 game scores
        const last5Games = await gameService.getLastNGamesScores(userId, gameName, 5);

        res.status(200).json({ last5Games });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get improved score for the last 10 games played
exports.getImprovedScoreLast10Games = async (req, res) => {
    try {
        const userId = req.user._id;
        const { gameName } = req.params;

        // Get the last 10 game scores
        const last10Games = await gameService.getLastNGamesScores(userId, gameName, 10);

        res.status(200).json({ last10Games });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get Score Analysis
exports.getScoreAnalysis = async (req, res) => {
    try {
        const { gameName } = req.params;
        const userId = req.user._id;

        const analysis = await gameService.getScoreAnalysis(userId, gameName);
        res.json(analysis);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get Overall Analysis
exports.getOverallAnalysis = async (req, res) => {
    try {
        const { gameName } = req.params;
        const userId = req.user._id;

        const analysis = await gameService.getOverallAnalysis(userId, gameName);
        res.json(analysis);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


// Calculate Trace Path Score
exports.calculateTracePathScore = async (req, res) => {
    try {
        const userId = req.user._id;
        const tracePathData = await gameService.getGameDetailsForUser('trace-path', userId);
        
        // Convert timeTaken from string to integer
        const timeTakenInt = parseInt(tracePathData.secondsLeft, 10);
        console.log("The time taken is (string):", tracePathData.secondsLeft);
        console.log("The time taken is (integer):", timeTakenInt);
        
        // Ensure to pass the converted integer to the score calculation function
        const score = gameService.calculateTracePathScore(tracePathData.score, timeTakenInt);
        res.json({ score });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


// Calculate Image Sort Score
exports.calculateImageSortScore = async (req, res) => {
    try {
        const userId = req.user._id;
        const imageSortData = await gameService.getGameDetailsForUser('image-sort', userId);
        const score = gameService.calculateImageSortScore(imageSortData.time, imageSortData.score, imageSortData.accuracy);
        res.json({ score });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Calculate Memory Match Score
exports.calculateMemoryMatchScore = async (req, res) => {
    try {
        const userId = req.user._id;
        const memoryMatchData = await gameService.getGameDetailsForUser('memory-match', userId);
        const score = gameService.calculateMemoryMatchScore(memoryMatchData.trials, memoryMatchData.wrongGuesses, memoryMatchData.timeTaken);
        res.json({ score });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Calculate Overall Health Score
exports.calculateOverallHealthScore = async (req, res) => {
    try {
        const userId = req.user._id;
        const tracePathData = await gameService.getGameDetailsForUser('trace-path', userId);
        const imageSortData = await gameService.getGameDetailsForUser('image-sort', userId);
        const memoryMatchData = await gameService.getGameDetailsForUser('memory-match', userId);

        const tracePathScore = gameService.calculateTracePathScore(tracePathData.score, tracePathData.secondsLeft);
        const imageSortScore = gameService.calculateImageSortScore(imageSortData.time, imageSortData.score, imageSortData.accuracy);
        const memoryMatchScore = gameService.calculateMemoryMatchScore(memoryMatchData.trials, memoryMatchData.wrongGuesses, memoryMatchData.timeTaken);

        const overallScore = gameService.calculateOverallHealthScore(tracePathScore, imageSortScore, memoryMatchScore);
        res.json({ overallScore });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
