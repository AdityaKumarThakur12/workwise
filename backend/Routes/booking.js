const express = require('express');
const router = express.Router();
const auth = require('../Middlewares/auth');
const { setup, reserveSeats, seats, reset } = require('../Controllers/bookingController');

// Setup Route to add 80 seats (only use this once for setup)
router.post('/setup', setup );

// Route to reserve seats
router.post('/reserve', auth, reserveSeats );

// Route to get all seats
router.get('/seats', seats);

// Route to reset all seats
router.post('/reset', reset);

module.exports = router;
