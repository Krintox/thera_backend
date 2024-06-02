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
      imageSortCompleted: { type: Boolean, default: false } // New game
  },
  gameScores: {
    tracePath: [Number],
    memoryMatch: [Number],
    soundMatching: [Number],
    imageSort: [Number] // New game
  },
});


const User = mongoose.model('User', userSchema);

module.exports = User;
