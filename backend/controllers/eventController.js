// // backend/controllers/eventController.js

// const User = require('../models/User');
// const { google } = require('googleapis');
// const { parseISO, addHours } = require('date-fns');
// const { validationResult } = require('express-validator');

// // Function to get events
// exports.getEvents = async (req, res, next) => {
//   try {
//     // Fetch user and access token
//     const user = await User.findById(req.user.id).select('accessToken');

//     if (!user || !user.accessToken) {
//       return res.status(401).json({ error: 'User not authenticated' });
//     }

//     // Initialize Google OAuth2 client
//     const oauth2Client = new google.auth.OAuth2();
//     oauth2Client.setCredentials({ access_token: user.accessToken });

//     const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

//     let events = [];
//     let pageToken = null;
//     const maxResults = 2500; // Adjust as needed

//     do {
//       const response = await calendar.events.list({
//         calendarId: 'primary',
//         singleEvents: true,
//         orderBy: 'startTime',
//         maxResults,
//         pageToken,
//       });

//       if (response.data.items && response.data.items.length > 0) {
//         events.push(...response.data.items);
//       }

//       pageToken = response.data.nextPageToken;
//     } while (pageToken);

//     res.status(200).json({ events });
//   } catch (err) {
//     console.error('Error retrieving events:', err.message);
//     next(err); // Passes error to centralized error handler
//   }
// };

// // Function to create an event
// exports.createEvent = async (req, res, next) => {
//   // Validate request body
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const { name, date, time, duration, description } = req.body;

//     // Fetch user and access token
//     const user = await User.findById(req.user.id).select('accessToken');

//     if (!user || !user.accessToken) {
//       return res.status(401).json({ error: 'User not authenticated' });
//     }

//     // Parse and validate date and time
//     const startDateTime = parseISO(`${date}T${time}:00`);
//     if (isNaN(startDateTime)) {
//       return res.status(400).json({ error: 'Invalid date or time format' });
//     }

//     const durationHours = Number(duration);
//     if (isNaN(durationHours) || durationHours <= 0) {
//       return res.status(400).json({ error: 'Invalid duration' });
//     }

//     const endDateTime = addHours(startDateTime, durationHours);

//     // Initialize Google OAuth2 client
//     const oauth2Client = new google.auth.OAuth2();
//     oauth2Client.setCredentials({ access_token: user.accessToken });

//     const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

//     const event = {
//       summary: name,
//       description: description || '',
//       start: { dateTime: startDateTime.toISOString() },
//       end: { dateTime: endDateTime.toISOString() },
//     };

//     const response = await calendar.events.insert({
//       calendarId: 'primary',
//       resource: event,
//     });

//     res.status(201).json({ message: 'Event created successfully', event: response.data });
//   } catch (err) {
//     console.error('Error creating event:', err.message);

//     // Handle specific Google API errors
//     if (err.response && err.response.data && err.response.data.error) {
//       return res.status(err.response.status || 500).json({ error: err.response.data.error.message });
//     }

//     next(err); // Passes error to centralized error handler
//   }
// };








// backend/controllers/eventController.js

const User = require('../models/User');
const { google } = require('googleapis');
const { parseISO, addHours } = require('date-fns');
const { validationResult } = require('express-validator');

// Function to get events
exports.getEvents = async (req, res, next) => {
  try {
    // Fetch user and access token
    const user = await User.findById(req.user.id).select('accessToken');

    if (!user || !user.accessToken) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Initialize Google OAuth2 client
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: user.accessToken });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    let events = [];
    let pageToken = null;
    const maxResults = 2500; // Adjust as needed

    do {
      const response = await calendar.events.list({
        calendarId: 'primary',
        singleEvents: true,
        orderBy: 'startTime',
        maxResults,
        pageToken,
      });

      if (response.data.items && response.data.items.length > 0) {
        events.push(...response.data.items);
      }

      pageToken = response.data.nextPageToken;
    } while (pageToken);

    res.status(200).json({ events });
  } catch (err) {
    console.error('Error retrieving events:', err.message);
    next(err); // Passes error to centralized error handler
  }
};

// Function to create an event
exports.createEvent = async (req, res, next) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, date, time, duration, description } = req.body;

    // Fetch user and access token
    const user = await User.findById(req.user.id).select('accessToken');

    if (!user || !user.accessToken) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Parse and validate date and time
    const startDateTime = parseISO(`${date}T${time}:00`);
    if (isNaN(startDateTime)) {
      return res.status(400).json({ error: 'Invalid date or time format' });
    }

    const durationHours = Number(duration);
    if (isNaN(durationHours) || durationHours <= 0) {
      return res.status(400).json({ error: 'Invalid duration' });
    }

    const endDateTime = addHours(startDateTime, durationHours);

    // Initialize Google OAuth2 client
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: user.accessToken });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const event = {
      summary: name,
      description: description || '',
      start: { dateTime: startDateTime.toISOString() },
      end: { dateTime: endDateTime.toISOString() },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    res.status(201).json({ message: 'Event created successfully', event: response.data });
  } catch (err) {
    console.error('Error creating event:', err.message);

    // Handle specific Google API errors
    if (err.response && err.response.data && err.response.data.error) {
      return res.status(err.response.status || 500).json({ error: err.response.data.error.message });
    }

    next(err); // Passes error to centralized error handler
  }
};
