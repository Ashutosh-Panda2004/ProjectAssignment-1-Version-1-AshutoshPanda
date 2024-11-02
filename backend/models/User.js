const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  email: String,
  accessToken: String,
  refreshToken: String,
});

module.exports = mongoose.model('User', userSchema);
