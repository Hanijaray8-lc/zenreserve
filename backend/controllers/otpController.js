const sendOtpSMS = require('../utils/smsService');

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOtp = async (req, res) => {
  const { phone } = req.body;

  if (!phone) return res.status(400).json({ message: 'Phone number is required' });

  const otp = generateOtp();

  try {
    // Save OTP to DB if needed (future verification)
    await sendOtpSMS(phone, otp); // ✅ Send via Twilio
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('❌ Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

module.exports = { sendOtp };


{/*const sendOtpSMS = require('../utils/smsService');

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOtp = async (req, res) => {
  const { phone } = req.body;

  if (!phone) return res.status(400).json({ message: 'Phone number is required' });

  const otp = generateOtp();

  try {
    // Optionally save to DB for verification
    // await OTPModel.create({ phone, otp, createdAt: Date.now() });

    await sendOtpSMS(phone, otp); // ✅ Send via SMS
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

module.exports = { sendOtp };


{/*const OtpEntry = require('../models/otpModel');

// Dummy function to "send" OTP – replace with real SMS service
const sendOtpToPhone = (phone, otp) => {
  console.log(`Sending OTP ${otp} to phone ${phone}`);
};

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.sendOtp = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: 'Phone is required' });

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // valid 5 min

  await OtpEntry.findOneAndUpdate(
    { phone },
    { otp, expiresAt },
    { upsert: true }
  );

  sendOtpToPhone(phone, otp);
  res.json({ message: 'OTP sent' });
};

exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) return res.status(400).json({ message: 'Phone and OTP are required' });

  const entry = await OtpEntry.findOne({ phone });
  if (!entry || entry.otp !== otp || entry.expiresAt < new Date()) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  await OtpEntry.deleteOne({ phone });
  res.json({ message: 'OTP verified' });
};*/}
