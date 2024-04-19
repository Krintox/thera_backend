// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Get improvement analysis based on previous games
router.get('/improvement', authMiddleware, userController.getImprovementAnalysis);

module.exports = router;
