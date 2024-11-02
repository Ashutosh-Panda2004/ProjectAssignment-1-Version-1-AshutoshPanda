const jwt = require('jsonwebtoken');
require('dotenv').config(); // Ensure environment variables are loaded

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to authenticate users using JWT
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is present and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];

    // Verify the token using the secret
    const decoded = jwt.verify(token, JWT_SECRET);

    // Debugging: Log the decoded token to verify its structure
    console.log('Decoded JWT:', decoded);

    // Ensure that 'id' exists in the decoded token
    if (!decoded.id) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token payload' });
    }

    // Attach the user information to the request object
    req.user = { id: decoded.id };

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error('Auth Middleware Error:', err.message);
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;
