const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  movie: { type: String, required: true },
  theater: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  seats: { type: Number, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
