const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  city: {
    type: String
  },
  address: {
    type: String
  },
  // Add any other fields as needed
}, { timestamps: true }); // Optional: timestamps for createdAt and updatedAt

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;
