// backend/routes/eventRoutes.js

const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController'); // Ensure the path is correct
const authMiddleware = require('../middlewares/authMiddleware'); // If you have authentication middleware

// More secure Authentication to be applied here ...
// router.use(authMiddleware.protect); // Uncomment if you have auth middleware

// Route to get events
router.get('/list', eventController.getEvents);

// Route to create an event
router.post('/create', eventController.createEvent);

module.exports = router;
