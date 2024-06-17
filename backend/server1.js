const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/movieBooking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Booking schema and model
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

// Routes
app.post('/api/bookings', async (req, res) => {
  const booking = new Booking(req.body);
  try {
    await booking.save();
    res.status(201).send(booking);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
