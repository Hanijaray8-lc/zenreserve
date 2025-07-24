const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  orgType: {
    type: String,
    required: true,
  },
  orgName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
  },
  vendorType: {
    type: String,
  },
  openingTime: {
    type: String,
  },
  listingType: {
    type: String,
  },
  ownerName: {
    type: String,
    required: true,
  },
  altMobileNumber: {
    type: String,
  },
  gstNumber: {
    type: String,
  },
  areaName: {
    type: String,
  },
  doorStreet: {
    type: String,
  },
  pincode: {
    type: String,
  },
  closingTime: {
    type: String,
  },
  idProof: {
    type: String, // filename stored by multer
  },
  profileImage: {
    type: String, // filename stored by multer
  },
}, { timestamps: true });

module.exports = mongoose.model('Business', businessSchema);