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
    soundMatchingCompleted: { type: Boolean, default: true },
    imageSortCompleted: { type: Boolean, default: false }
  },
  gameScores: {
    tracePath: [Number],
    memoryMatch: [Number],
    soundMatching: [Number],
    imageSort: [Number]
  },
  isQuestionnaireComplete: { type: Boolean, default: false }  // New field
});

const User = mongoose.model('User', userSchema);

module.exports = User;
