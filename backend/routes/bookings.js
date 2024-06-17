const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
  const { name, email, movie, theater, date, time, seats } = req.body;
  try {
    const newBooking = new Booking({
      name,
      email,
      movie,
      theater,
      date,
      time,
      seats,
    });
    await newBooking.save();
    res.status(201).json({ msg: 'Booking successful', booking: newBooking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
