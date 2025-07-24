// routes/userRoutes.js or inside app.js
const express = require('express');
const router = express.Router();
//const User = require('../models/User'); // assuming Mongoose model
const User = require('../models/userModel');

router.post('/api/users', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Simple validation
  if (!username || !email || !password || password !== confirmPassword) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error creating user:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;