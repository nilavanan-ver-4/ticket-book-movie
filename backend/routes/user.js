const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const { email, fullName, address, phoneNumber } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { fullName, address, phoneNumber },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
