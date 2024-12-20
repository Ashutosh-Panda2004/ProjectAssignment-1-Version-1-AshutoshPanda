const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          existingUser.accessToken = accessToken;
          await existingUser.save();
          return done(null, existingUser);
        }
        const newUser = await User.create({
          googleId: profile.id,
          accessToken,
          email: profile.emails[0].value,
          name: profile.displayName,
        });
        done(null, newUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
