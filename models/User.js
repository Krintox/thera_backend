// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    gameProgress: {
        tracePathCompleted: { type: Boolean, default: true },
        memoryMatchCompleted: { type: Boolean, default: true },
        soundMatchingCompleted: { type: Boolean, default: true }
    },
    gameScores: {
      tracePath: [Number], // Last 10 game scores for Trace the Path
      memoryMatch: [Number], // Last 10 game scores for Memory Match
      soundMatching: [Number], // Last 10 game scores for Sound Matching
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
