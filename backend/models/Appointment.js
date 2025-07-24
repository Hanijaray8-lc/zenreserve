// models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  date: String,
  particularName: String,
  department: String,
  name: String,
  mobile: String,
  hospitalId: mongoose.Schema.Types.ObjectId,
  orgName: String,           // Add this line
 serviceType: String, 
});

module.exports = mongoose.model('Appointment', appointmentSchema);
