// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

  if (!token) return res.status(401).json({ message: 'டோக்கன் இல்லை, அனுமதி மறுக்கப்பட்டது' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'டோக்கன் செல்லுபடியாகவில்லை' });
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;