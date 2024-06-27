const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

// Create a new booking
router.post('/', async (req, res) => {
  const { name, email, movie, theater, date, time, seats } = req.body;

  try {
    // Create new booking
    const newBooking = new Booking({
      name,
      email,
      movie,
      theater,
      date,
      time,
      seats
    });

    // Save booking to database
    await newBooking.save();

    res.json(newBooking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all bookings for a user
router.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find bookings by user ID
    const bookings = await Booking.find({ user: userId });

    if (!bookings) {
      return res.status(404).json({ msg: 'No bookings found' });
    }

    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
