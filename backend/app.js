// backend/app.js

const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors'); // Import the cors package
const passport = require('passport');
require('./config/passport');

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

// Configure CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  credentials: true, // Enable cookies and authentication headers if needed
}));

app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// MongoDB connection and server startup code
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });
