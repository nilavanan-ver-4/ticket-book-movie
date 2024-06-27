const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Booking = require('../models/booking');

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get bookings for a user
router.get('/bookings', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });
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
