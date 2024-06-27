const mongoose = require('mongoose');

// Define Booking Schema
const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  movie: {
    type: String,
    required: true
  },
  theater: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  seats: {
    type: Number,
    required: true
  },
  // Add any other fields as needed
}, { timestamps: true }); // Optional: timestamps for createdAt and updatedAt

// Create Booking model
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
