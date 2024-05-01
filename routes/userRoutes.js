// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Get improvement analysis based on previous games
router.get('/improvement', authMiddleware, userController.getImprovementAnalysis);

// Update user profile name
router.put('/update-name', authMiddleware, userController.updateName);

// Update user profile username
router.put('/update-username', authMiddleware, userController.updateUsername);

// Update user profile email
router.put('/update-email', authMiddleware, userController.updateEmail);

// Update user profile password
router.put('/update-password', authMiddleware, userController.updatePassword);

router.get('/profile', authMiddleware, userController.getUserProfile);

module.exports = router;
