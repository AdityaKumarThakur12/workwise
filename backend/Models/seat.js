const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema({
    number: Number,
    isBooked: { type: Boolean, default: false },
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  });

  
module.exports = mongoose.model('Seat', SeatSchema);