const express = require('express');
const router = express.Router();
const PhoneEntry = require('../models/phoneModel');
const upload = require('../middleware/uploadmiddlewar');

const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone);

router.post('/verify-otp', upload.single('profileImage'), async (req, res) => {
  const { phoneNumber, name, password } = req.body;
  const profileImage = req.file ? req.file.filename : '';

  if (!isValidPhone(phoneNumber)) {
    return res.status(400).json({ message: 'Invalid mobile number format' });
  }

  try {
    const existing = await PhoneEntry.findOne({ phone: phoneNumber });
    if (existing) {
      return res.status(200).json({ message: 'User already exists', user: existing });
    }

    const newUser = new PhoneEntry({ phone: phoneNumber, name, password, profileImage });
    await newUser.save();

    return res.status(200).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error('Registration Error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ✅ Check phone exists
router.get('/check-phone/:phone', async (req, res) => {
  try {
    const user = await PhoneEntry.findOne({ phone: req.params.phone });
    return res.status(200).json({ exists: !!user });
  } catch (err) {
    return res.status(500).json({ message: 'Error checking phone', error: err.message });
  }
});

// ✅ Login
router.post('/login', async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: 'Phone and password required' });
  }

  try {
    const user = await PhoneEntry.findOne({ phone });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.password !== password) return res.status(401).json({ message: 'Invalid password' });

    return res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// ✅ Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await PhoneEntry.find({}, 'name phone profileImage');
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

// DELETE route to remove a user by phone number
router.delete('/delete-user/:phone', async (req, res) => {
  const { phone } = req.params;

  try {
    const deleted = await PhoneEntry.findOneAndDelete({ phone });
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
});



module.exports = router;