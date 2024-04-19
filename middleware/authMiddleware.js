// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    // Extract the JWT token from the request headers
    const authorizationHeader = req.headers.authorization;

    // Check if the Authorization header exists and starts with "Bearer "
    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    let token = authorizationHeader;

    // Check if the header starts with "Bearer "
    if (authorizationHeader.startsWith('Bearer ')) {
        // Remove the "Bearer " prefix
        token = authorizationHeader.substring(7); // "Bearer ".length = 7
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, secret);
        
        // Attach the user object to the request for further use
        req.user = await User.findById(decoded.userId);
        console.log('Authenticated user auth middle:', req.user);
        next(); // Proceed to the next middleware
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = authMiddleware;
