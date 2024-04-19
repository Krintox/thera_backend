// controllers/userController.js

const userService = require('../services/userService');

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
