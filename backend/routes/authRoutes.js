// backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Register route

router.post('/register', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || password !== confirmPassword) {
    return res.status(400).json({ message: 'Invalid input or passwords do not match' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({
        message: existingUser.username === username
          ? 'Username already exists'
          : 'Email already registered'
      });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving user' });
  }
});
// Login with username and password
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password)
//     return res.status(400).json({ message: 'Please fill all fields' });

//   try {
//     const user = await User.findOne({ username });
//     if (!user || user.password !== password) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     res.status(200).json({ message: 'Login successful' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error logging in' });
//   }
// });











router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Optional: You can remove this static check here (we handle it in frontend)
  if (username === 'Tech' && password === 'Tech@123') {
    return res.status(200).json({ message: 'Static admin login' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// Delete user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});




router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

module.exports = router;