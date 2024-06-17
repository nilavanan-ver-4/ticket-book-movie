const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
const port = process.env.PORT || 5000;
const client = new OAuth2Client('1051311777803-o3qcfe0ip13bq3ufecqn7cvtuqvj32f7.apps.googleusercontent.com');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userAuth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to MongoDB:', err);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Google Login Route
app.post('/api/auth/google-login', async (req, res) => {
  const { tokenId } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: '1051311777803-o3qcfe0ip13bq3ufecqn7cvtuqvj32f7.apps.googleusercontent.com',
    });
    const payload = ticket.getPayload();

    console.log('Google login payload:', payload);

    const { name, email, picture } = payload;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ fullName: name, email, picture });
      await user.save();
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Error verifying Google token', err);
    res.status(400).json({ message: 'Invalid Google token' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
