// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// POST /api/appointments
router.post('/', async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json({ message: 'Appointment saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET appointments for a specific user based on mobile number
router.get('/:mobile', async (req, res) => {
  try {
    const { mobile } = req.params;
    const appointments = await Appointment.find({ mobile });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;