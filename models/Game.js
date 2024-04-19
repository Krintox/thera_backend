// models/Game.js

const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' },
    category: { type: String, enum: ['physical', 'memory', 'sound'], required: true },
    instructions: { type: String },
    imageUrl: { type: String }, // URL for game image
    duration: { type: Number }, // Duration of the game in seconds
    createdAt: { type: Date, default: Date.now }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
