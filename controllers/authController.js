// controllers/authController.js

const authService = require('../services/authService');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { email, username, password, phoneNumber } = req.body;
        await authService.register(email, username, password, phoneNumber);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// User login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Invalid credentials' });
    }
};
