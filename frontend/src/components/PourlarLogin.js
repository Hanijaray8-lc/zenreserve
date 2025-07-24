import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, TextField, Button,
  Checkbox, FormControlLabel, Chip, Grid, Dialog,
  DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PourlarLogin = () => {
  const { state } = useLocation();
  const parlour = state?.parlour;
  const navigate = useNavigate();

  const [date, setDate] = useState('2025-06-28');
  const [particularName, setParticularName] = useState('');
  const [department, setDepartment] = useState('');
  const [fillDetails, setFillDetails] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle checkbox change for autofill
  const handleCheckboxChange = (e) => {
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
      alert('Please fill all required fields');
      return;
    }

    try {
      const payload = {
        date,
        particularName,
        department,
        name,
        mobile,
        hospitalId: parlour?._id,
        orgName: parlour?.orgName,
        serviceType: "parlour"
      };

      await axios.post('https://zenreserve-lc.onrender.com/api/appointments', payload);
      setOpenDialog(true);
    } catch (err) {
      console.error('Error submitting appointment:', err);
      alert('Failed to submit appointment');
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#f8bbd0', minHeight: '100vh' }}>
      {/* Success Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="xs" fullWidth>
        <Box sx={{ backgroundColor: '#f8bbd0', textAlign: 'center', pt: 3 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ color: '#ad1457', mb: 1 }}>BOOKIFY</Typography>
        </Box>
        <DialogTitle sx={{ textAlign: 'center' }}>
          <CheckCircleIcon sx={{ fontSize: 60, color: '#ad1457' }} />
          <Typography variant="h6" fontWeight="bold" mt={2}>Appointment Booked!</Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <Typography variant="body1">Your appointment has been booked successfully. Our admin will contact you shortly.</Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            onClick={() => {
              setOpenDialog(false);
              navigate(-1);
            }}
            variant="contained"
            sx={{ px: 4, backgroundColor: '#ad1457', '&:hover': { backgroundColor: '#880e4f' } }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Form Section */}
      <Grid container spacing={4} sx={{ maxWidth: 750, mx: 'auto', backgroundColor: '#ce99ca', borderRadius: 3, p: 2, boxShadow: 4 }}>
        {/* Left: Info */}
        <Grid item xs={12} md={6}>
          <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <Card sx={{ backgroundColor: '#f0f0f0', borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 10 }}>
                  <img src="./pourlarservice.webp" alt="announce" height={200} width={300}
                    style={{ border: '2px solid black', padding: '20px', borderRadius: '10px', backgroundColor: 'white' }} />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">Service Details</Typography>
                  <Chip label="Pay Offline" size="small" sx={{ backgroundColor: 'lightgreen', fontWeight: 'bold', height: 24 }} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <img src={`https://zenreserve-lc.onrender.com/uploads/${parlour?.profileImage || 'lab2.jpg'}`} alt="Parlour Logo"
                    style={{ width: 80, height: 80, borderRadius: 8 }} />
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">{parlour?.orgName || 'The Bella Spot'}</Typography>
                    <Typography variant="body2" color="text.secondary">{parlour?.areaName}, {parlour?.city}</Typography>
                  </Box>
                </Box>

                <Box sx={{ bgcolor: '#d0f0c0', p: 1, borderRadius: 1 }}>
                  <Typography variant="body2" fontWeight="bold">🛎️ Special announcement! Slots open from</Typography>
                  <Typography variant="body2">Jun 28, 2025 (9:00 AM - 7:00 PM)</Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Right: Form */}
        <Grid item xs={12} md={6}>
          <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField label="Choose Date" type="date" value={date} onChange={(e) => setDate(e.target.value)}
                    fullWidth InputLabelProps={{ shrink: true }} sx={{ backgroundColor: 'white' }} />

                  <TextField label="Particular Name *" value={particularName} onChange={(e) => setParticularName(e.target.value)}
                    fullWidth sx={{ backgroundColor: 'white' }} />

                  <TextField label="Departments *" value={department} onChange={(e) => setDepartment(e.target.value)}
                    fullWidth sx={{ backgroundColor: 'white' }} />

                  <FormControlLabel
                    control={<Checkbox checked={fillDetails} onChange={handleCheckboxChange} />}
                    label="Fill my details (Name & Mobile)"
                  />

                  <TextField label="Name *" value={name} onChange={(e) => setName(e.target.value)}
                    fullWidth sx={{ backgroundColor: 'white' }} />

                  <TextField
                    label="Mobile Number *"
                    value={mobile}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d{0,10}$/.test(val)) setMobile(val);
                    }}
                    fullWidth sx={{ backgroundColor: 'white' }}
                  />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button variant="contained" sx={{ backgroundColor: '#4b0082' }} onClick={handleSubmit}>Submit</Button>
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

export default PourlarLogin;
