// models/GameSession.js

const mongoose = require('mongoose');

const gameSessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    gameName: { type: String, required: true },
    score: { type: Number, required: true },
    progress: { type: Number },
    timeTaken: { type: Number },
    trials: { type: Number },
    correctGuesses: { type: Number },
    wrongGuesses: { type: Number },
    param1: { type: String },
    param2: { type: String },
    param3: { type: String },
    param4: { type: String },
    param5: { type: String },
    gameOver: { type: Boolean },
    level: { type: String },
    secondsLeft: { type: String },
    figurePath: { type: String },
    isTracing: { type: Boolean },
    time: { type: Number }, // Specific to ImageSort
    accuracy: { type: Number }, // Specific to ImageSort
    totalImages: { type: Number }, // Specific to ImageSort
    createdAt: { type: Date, default: Date.now }
});


const GameSession = mongoose.model('GameSession', gameSessionSchema);

module.exports = GameSession;
