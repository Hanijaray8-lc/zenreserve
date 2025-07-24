// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const appointmentRoutes = require('./routes/appointmentRoutes');
const phoneRoutes = require('./routes/phoneRoutes');

const app = express();

// Connect to MongoDB
connectDB();



app.use(cors()); // இதை சேர்க்கவும்
app.use(express.json()); // JSON data ஏற்ற

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



const userRoutes = require('./routes/userRoutes');
app.use(userRoutes); // or app.use('/api/users', userRoutes);
app.use('/api/business', require('./routes/businessRoutes'));
app.use('/api/appointments', appointmentRoutes);
app.use('/api/phone', phoneRoutes);


// Middleware
app.use(express.json());
app.use(cors());
// API routes
app.use('/api/auth', authRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.send('Server has started successfully');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});