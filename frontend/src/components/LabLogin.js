import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, TextField, Button,
  Checkbox, FormControlLabel, Chip, Grid, Dialog, DialogTitle,
  DialogContent, DialogActions
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LabLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const lab = location.state?.lab;

  const [date, setDate] = useState('');
  const [particularName, setParticularName] = useState('');
  const [department, setDepartment] = useState('');
  const [fillDetails, setFillDetails] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(null); // ✅ For autofill

  // ✅ Set today's date on mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);

    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  // ✅ Autofill logic
  const handleFillDetailsChange = (e) => {
    const checked = e.target.checked;
    setFillDetails(checked);
    if (checked && user) {
      setName(user.name || '');
      setMobile(user.mobile || user.phone || '');
    } else {
      setName('');
      setMobile('');
    }
  };

  const handleSubmit = async () => {
    if (!date || !particularName || !department || !name || !mobile) {
      alert("Please fill in all required fields.");
      return;
    }

    const appointmentData = {
      date,
      particularName,
      department,
      name,
      mobile,
      hospitalId: lab._id,
      orgName: lab?.orgName,
      serviceType: "lab"
    };

    try {
      await axios.post('https://zenreserve-lc.onrender.com/api/appointments', appointmentData);
      setOpenDialog(true);
    } catch (error) {
      console.error('Error saving appointment:', error);
      alert('Failed to save appointment. Try again.');
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      {/* ✅ Success Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="xs" fullWidth>
        <Box sx={{ backgroundColor: '#e3f2fd', textAlign: 'center', pt: 3 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ color: '#1976d2', mb: 1 }}>
         ZenReserve
          </Typography>
        </Box>
        <DialogTitle sx={{ textAlign: 'center' }}>
          <CheckCircleIcon sx={{ fontSize: 60, color: '#1976d2' }} />
          <Typography variant="h6" fontWeight="bold" mt={2}>
            Appointment Booked!
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <Typography variant="body1">
            Your appointment has been booked successfully. Our admin will contact you shortly.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            onClick={() => {
              setOpenDialog(false);
              navigate('/');
            }}
            variant="contained"
            sx={{ px: 4 }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* 💉 Booking Form */}
      <Grid container spacing={3} sx={{
        maxWidth: 750, mx: 'auto', backgroundColor: 'rgb(98, 123, 159)',
        borderRadius: 3, p: 2, boxShadow: 3
      }}>
        {/* Left Panel */}
        <Grid item xs={12} sm={6}>
          <motion.div initial={{ x: -80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
            <Card sx={{ backgroundColor: '#f0f0f0', borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
                  <img
                    src="./lab2.jpg"
                    alt="Lab"
                    style={{ border: '2px solid black', padding: 16, borderRadius: 12, backgroundColor: 'white', height: 160 }}
                  />
                </Box>

                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Service Details
                </Typography>

                <Chip label="Pay Offline" size="small" sx={{ backgroundColor: '#90ee90', fontWeight: 'bold', mb: 2 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <img
                    src={`https://zenreserve-lc.onrender.com/uploads/${lab?.profileImage || 'lab2.jpg'}`}
                    alt="Lab Logo"
                    style={{ width: 70, height: 70, borderRadius: 8 }}
                  />
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">{lab?.orgName}</Typography>
                    <Typography variant="body2" color="text.secondary">{lab?.areaName}, {lab?.city}</Typography>
                  </Box>
                </Box>

                <Box sx={{ backgroundColor: '#d0f0c0', p: 1.5, borderRadius: 2 }}>
                  <Typography variant="body2" fontWeight="bold">
                    🛎️ Special announcement! Slots open from
                  </Typography>
                  <Typography variant="body2">
                    {lab?.openingTime} - {lab?.closingTime}
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

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={fillDetails}
                        onChange={handleFillDetailsChange}
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
                      if (/^\d{0,10}$/.test(val)) setMobile(val);
                    }}
                    fullWidth
                    sx={{ backgroundColor: 'white' }}
                  />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button variant="contained" sx={{ backgroundColor: '#4b0082' }} onClick={handleSubmit}>
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

export default LabLogin;
