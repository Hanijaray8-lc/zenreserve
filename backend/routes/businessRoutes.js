const express = require('express');
const router = express.Router();
const Business = require('../models/businessModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST route with file upload
router.post(
  '/',
  upload.fields([
    { name: 'idProof', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        orgType, orgName, mobile, email, city, landmark,
        vendorType, openingTime, listingType, ownerName, altMobile,
        gstNumber, areaName, doorStreet, pincode, closingTime
      } = req.body;

      const newBusiness = new Business({
        orgType,
        orgName,
        mobileNumber: mobile,
        email,
        city,
        landmark,
        vendorType,
        openingTime,
        listingType,
        ownerName,
        altMobileNumber: altMobile,
        gstNumber,
        areaName,
        doorStreet,
        pincode,
        closingTime,
        idProof: req.files['idProof'] ? req.files['idProof'][0].filename : '',
        profileImage: req.files['profileImage'] ? req.files['profileImage'][0].filename : '',
      });

      await newBusiness.save();
      res.status(201).json({ message: 'Business saved successfully' });
    } catch (err) {
      console.error('Business POST error:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
);

// GET hospitals only
router.get('/hospitals', async (req, res) => {
  try {
    const hospitals = await Business.find({ listingType: 'Hospital' });
    res.json(hospitals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
// routes/business.js
router.get('/carshowrooms', async (req, res) => {
  try {
    const showrooms = await Business.find({ listingType: "Car Showroom" });
    res.json(showrooms);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


// routes/business.js (example)
router.get('/gyms', async (req, res) => {
  try {
    const gyms = await Business.find({ listingType: "Gym" });
    res.json(gyms);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
router.get('/electronicservices', async (req, res) => {
  try {
    const data = await Business.find({ listingType: 'Electronic Service' });
    res.json(data);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});
router.get('/mechanicshops', async (req, res) => {
  try {
    const shops = await Business.find({ listingType: "Mechanic Shop" });
    res.json(shops);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


// routes/business.js
router.get('/beautyparlours', async (req, res) => {
  try {
    const parlours = await Business.find({ listingType: "Parlours" });
    res.json(parlours);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// routes/business.js
router.get('/labs', async (req, res) => {
  try {
    const labs = await Business.find({ listingType: "Laboratories" });
    res.json(labs);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// routes/business.js
router.get('/salons', async (req, res) => {
  try {
    const salons = await Business.find({ listingType: "Salons" });
    res.json(salons);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// routes/business.js
router.get('/drawingclasses', async (req, res) => {
  try {
    const classes = await Business.find({ listingType: "Drawingclass" });
    res.json(classes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedBusiness = await Business.findByIdAndDelete(req.params.id);
    if (!deletedBusiness) {
      return res.status(404).json({ message: "Business not found" });
    }
    res.json({ message: "Business deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while deleting" });
  }
});

// routes/business.js


// GET all distinct cities
router.get('/cities', async (req, res) => {
  try {
    const cities = await Business.distinct('city');
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all distinct listing types
router.get('/listingTypes', async (req, res) => {
  try {
    const types = await Business.distinct('listingType');
    res.json(types);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// ✅ Fetch all businesses
router.get('/', async (req, res) => {
  try {
    const businesses = await Business.find().sort({ createdAt: -1 });
    res.json(businesses);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});




module.exports = router;


