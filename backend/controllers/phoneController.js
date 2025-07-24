const PhoneEntry = require('../models/phoneModel');
const bcrypt = require('bcrypt');

// ✅ Define the function FIRST
const registerPhoneEntry = async (req, res) => {
  const { phone, name, password } = req.body;

  if (!phone || !name || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existing = await PhoneEntry.findOne({ phone });
    if (existing) {
      return res.status(409).json({ message: 'Phone number already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEntry = new PhoneEntry({
      phone,
      name,
      password: hashedPassword,
    });

    await newEntry.save();
    res.status(201).json({ message: 'Phone entry saved successfully' });

  } catch (error) {
    console.error('Error saving phone entry:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Then export it correctly
module.exports = { registerPhoneEntry };
