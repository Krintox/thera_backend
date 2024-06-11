const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const authMiddleware = require('../middleware/authMiddleware');

// Save Trace the Path game data
router.post('/trace-path', authMiddleware, gameController.saveTracePathGameData);

// Save Memory Match game data
router.post('/memory-match', authMiddleware, gameController.saveMemoryMatchGameData);

// Save Sound Matching game data
router.post('/sound-matching', authMiddleware, gameController.saveSoundMatchingGameData);

// Save ImageSort game data
router.post('/image-sort', authMiddleware, gameController.saveImageSortGameData);

// Get details of specific game for a specific user
router.get('/:gameName/user/:userId', authMiddleware, gameController.getGameDetailsForUser);

// Get details of all games played by a specific user
router.get('/user/:userId', authMiddleware, gameController.getGamesPlayedByUser);

// Get details of all users
router.get('/users', authMiddleware, gameController.getAllUsers);

// Get details of scores and games played by all users
router.get('/games', authMiddleware, gameController.getAllGames);

// Get details of scores and games played by a specific user across all games
router.get('/users/:userId/games', authMiddleware, gameController.getUserGames);

// Get improved score for the last game played
router.get('/:gameName/improved-score/last-game', authMiddleware, gameController.getImprovedScoreLastGame);

// Get improved score for the last 5 games played
router.get('/:gameName/improved-score/last-5-games', authMiddleware, gameController.getImprovedScoreLast5Games);

// Get improved score for the last 10 games played
router.get('/:gameName/improved-score/last-10-games', authMiddleware, gameController.getImprovedScoreLast10Games);

// New Endpoints for Analysis
router.get('/:gameName/score/analysis', authMiddleware, gameController.getScoreAnalysis);
router.get('/:gameName/overall/analysis', authMiddleware, gameController.getOverallAnalysis);

// Add routes with middleware
router.get('/trace-path/score/calculate', authMiddleware, gameController.calculateTracePathScore);
router.get('/image-sort/score/calculate', authMiddleware, gameController.calculateImageSortScore);
router.get('/memory-match/score/calculate', authMiddleware, gameController.calculateMemoryMatchScore);
router.get('/overall/calculate', authMiddleware, gameController.calculateOverallHealthScore);


module.exports = router;
