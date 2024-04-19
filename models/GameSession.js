// models/GameSession.js

const mongoose = require('mongoose');

const gameSessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    gameName: { type: String, required: true },
    score: { type: Number, required: true },
    progress: { type: Number }, // Progress for Trace the Path game
    timeTaken: { type: Number }, // Time taken for Memory Match game
    trials: { type: Number }, // Number of trials for Memory Match game
    correctGuesses: { type: Number }, // Number of correct guesses for Memory Match game
    wrongGuesses: { type: Number }, // Number of wrong guesses for Memory Match game
    param1: { type: String }, // Additional parameter 1 for all games
    param2: { type: String }, // Additional parameter 2 for all games
    param3: { type: String }, // Additional parameter 3 for all games
    param4: { type: String }, // Additional parameter 4 for all games
    param5: { type: String }, // Additional parameter 5 for all games
    createdAt: { type: Date, default: Date.now }
});

const GameSession = mongoose.model('GameSession', gameSessionSchema);

module.exports = GameSession;
