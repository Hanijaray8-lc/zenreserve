import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, TextField, MenuItem, Button, Checkbox,
  FormControlLabel, Chip, Grid
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const GymLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const gym = location.state?.gym;

  const [date, setDate] = useState('');
  const [particularName, setParticularName] = useState('');
  const [department, setDepartment] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [fillDetails, setFillDetails] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  // Auto-fill today's date
  useEffect(() => {
    const today = new Date().toLocaleDateString('en-GB'); // format: dd/mm/yyyy
    setDate(today);
  }, []);

  const handleSubmit = async () => {
    if (!gym?._id) {
      alert('Gym data not found');
      return;
    }

    const appointmentData = {
      date,
      particularName,
      department,
      timeSlot,
      name,
      mobile,
      hospitalId: gym._id, // Store gym ID here
           orgName: gym?.orgName, 
             serviceType: "gym", 
    };

    try {
      await axios.post('https://zenreserve-lc.onrender.com/api/appointments', appointmentData);
      alert('Appointment saved successfully');
      navigate('/'); // or redirect somewhere else
    } catch (error) {
      console.error('Error saving appointment:', error);
      alert('Failed to save appointment');
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: 'rgb(87, 106, 142)', minHeight: '100vh' }}>
      <Grid
        container
        spacing={3}
        sx={{
          maxWidth: 750,
          mx: 'auto',
          backgroundColor: ' #1e3c72',
          borderRadius: 3,
          p: 2,
          boxShadow: 3,
        }}
      >
        {/* Left Panel */}
        <Grid item xs={12} sm={6}>
          <motion.div initial={{ x: -80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
            <Card sx={{ backgroundColor: '#f0f0f0', borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
                  <img
                   src="./gym2.jpg"
                
                    alt="Gym Announcement"
                    style={{
                      border: '2px solid #000',
                      padding: 16,
                      borderRadius: 12,
                      backgroundColor: '#fff',
                      maxWidth: '100%',
                      height: 160,
                    }}
                  />
                </Box>

                <Typography variant="h6" fontWeight="bold" gutterBottom>Service Details</Typography>
                <Chip label="Pay Offline" size="small" sx={{ backgroundColor: '#90ee90', fontWeight: 'bold', mb: 2 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <img
                       src={`https://zenreserve-lc.onrender.com/uploads/${gym?.profileImage}`}
                    alt="Gym Logo"
                    style={{ width: 70, height: 70, borderRadius: 8 }}
                  />
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {gym?.orgName || 'Fitness Hub'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {gym?.areaName}, {gym?.city}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ backgroundColor: '#d0f0c0', p: 1.5, borderRadius: 2 }}>
                  <Typography variant="body2" fontWeight="bold">🛎️ Special announcement! Slots open from</Typography>
                  <Typography variant="body2">
                    {gym?.openingTime} - {gym?.closingTime}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Right Panel */}
        <Grid item xs={12} sm={6}>
          <motion.div initial={{ x: 80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                  label="Choose Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{ backgroundColor: 'white' }}
                />
                  <TextField
                    label="Particular Name *"
                    value={particularName}
                    onChange={(e) => setParticularName(e.target.value)}
                    fullWidth
                    sx={{ backgroundColor: 'white' }}
                  />
                  <TextField
                    label="Departments *"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    fullWidth
                    sx={{ backgroundColor: 'white' }}
                  />
                  <TextField
                    select
                    label="Select Time Slot *"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    fullWidth
                    sx={{ backgroundColor: 'white' }}
                  >
                    <MenuItem value="">Select Time Slot</MenuItem>
                    <MenuItem value="9AM-10AM">9:00 AM - 10:00 AM</MenuItem>
                    <MenuItem value="10AM-11AM">10:00 AM - 11:00 AM</MenuItem>
                    <MenuItem value="11AM-12PM">11:00 AM - 12:00 PM</MenuItem>
                  </TextField>

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={fillDetails}
                        onChange={(e) => setFillDetails(e.target.checked)}
                      />
                    }
                    label="Fill my details (Name & Mobile)"
                  />

                  <TextField
                    label="Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    sx={{ backgroundColor: 'white' }}
                  />
                         <TextField
                   label="Mobile Number *"
                   value={mobile}
                   onChange={(e) => {
                     const val = e.target.value;
                     if (/^\d{0,10}$/.test(val)) { // ✅ Allow only up to 10 digits
                       setMobile(val);
                     }
                   }}
                   fullWidth
                   sx={{ backgroundColor: 'white' }}
                 />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: '#4b0082' }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                          <Button variant="outlined" onClick={() => navigate(-1)}>Cancel</Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GymLogin;
