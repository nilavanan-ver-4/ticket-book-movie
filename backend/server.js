const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const jwtSecret = 'your_jwt_secret'; // Use a more secure method for storing secrets

app.use(bodyParser.json());
app.use(cors());

// Mongoose models
const User = require('./models/User');
const Booking = require('./models/Booking');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  const { fullName, username, email, password, city, address } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
      city,
      address,
    });

    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).send({ message: 'Error registering user', error });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(400).send({ message: 'Error logging in', error });
  }
});

// Middleware to authenticate and decode token
const auth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized' });
  }
};

// Fetch user data endpoint
app.get('/api/auth/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.send(user);
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized' });
  }
});

// Update user data endpoint
app.put('/api/auth/user', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.userId, req.body, { new: true }).select('-password');
    res.send(user);
  } catch (error) {
    res.status(400).send({ message: 'Error updating profile', error });
  }
});

// Fetch bookings for the user
app.get('/api/bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId });
    res.send(bookings);
  } catch (error) {
    res.status(400).send({ message: 'Error fetching bookings', error });
  }
});

// Create a new booking
app.post('/api/bookings', auth, async (req, res) => {
  const { name, email, movie, theater, date, time, seats, showtime } = req.body;

  try {
    const booking = new Booking({
      userId: req.user.userId,
      name,
      email,
      movie,
      theater,
      date,
      time,
      seats,
      showtime,
    });

    await booking.save();
    res.status(201).send({ message: 'Booking successful', booking });
  } catch (error) {
    res.status(400).send({ message: 'Error creating booking', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
