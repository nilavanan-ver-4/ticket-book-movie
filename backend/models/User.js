const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  picture: String,
  address: String,
  phoneNumber: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
