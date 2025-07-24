const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('PhoneEntry', phoneSchema);
