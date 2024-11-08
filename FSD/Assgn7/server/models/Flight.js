const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  passengerName: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  departureDate: { type: Date, required: true },
  arrivalDate: { type: Date, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  emailId: { type: String, required: true }
});

module.exports = mongoose.model('Flight', flightSchema);
