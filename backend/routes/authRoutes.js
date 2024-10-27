// backend/routes/authRoutes.js

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Initiate authentication with Google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
    accessType: 'offline',
    prompt: 'consent',
  })
);

// Handle the callback after Google has authenticated the user
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    // Generate JWT token
    const token = jwt.sign({ id: req.user.id }, JWT_SECRET, { expiresIn: '1h' });
    // Redirect to frontend with the token
    res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
  }
);

module.exports = router;
