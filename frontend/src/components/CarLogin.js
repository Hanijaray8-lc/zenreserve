import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, TextField, Button,
  Checkbox, FormControlLabel, Chip, Grid, Dialog, DialogTitle,
  DialogContent, DialogActions
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const CarLogin = () => {
  const location = useLocation();
  const carShowroom = location.state?.carShowroom;
  const navigate = useNavigate();

  const [date, setDate] = useState('2025-06-28');
  const [particularName, setParticularName] = useState('');
  const [department, setDepartment] = useState('');
  const [fillDetails, setFillDetails] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const [user, setUser] = useState(null); // ✅ user state for autofill

  // ✅ Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Autofill function
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
      alert('Please fill all required fields.');
      return;
    }

    const appointmentData = {
      date,
      particularName,
      department,
      name,
      mobile,
      hospitalId: carShowroom?._id,
      orgName: carShowroom?.orgName,
      serviceType: "carshowroom",
    };

    try {
      await axios.post('https://zenreserve-lc.onrender.com/api/appointments', appointmentData);
      setPopupOpen(true);
    } catch (err) {
      console.error(err);
      alert('Submission failed!');
    }
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    navigate('/');
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#eef5ff', minHeight: '100vh' }}>
      <Grid container spacing={3} sx={{
        maxWidth: 720, mx: 'auto', backgroundColor: '#5c6bc0',
        borderRadius: 3, p: 2, boxShadow: 3
      }}>
        {/* Left Info */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ backgroundColor: '#f0f0f0', borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
                <img
                  src="./showroom.png"
                  alt="announcement"
                  style={{
                    border: '2px solid #888', padding: 16, borderRadius: 12,
                    backgroundColor: '#fff', maxWidth: '100%', height: 160
                  }}
                />
              </Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Showroom Info
              </Typography>
              <Chip label="Pay Offline" size="small" sx={{
                backgroundColor: '#90ee90', fontWeight: 'bold', mb: 2
              }} />
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <img
                  src={`https://zenreserve-lc.onrender.com/uploads/${carShowroom?.profileImage}`}
                  alt="Showroom Logo"
                  style={{ width: 70, height: 70, borderRadius: 8 }}
                />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {carShowroom?.orgName || 'Showroom Name'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {carShowroom?.areaName}, {carShowroom?.city}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ backgroundColor: '#d0e7ff', p: 1.5, borderRadius: 2 }}>
                <Typography variant="body2" fontWeight="bold">
                  🚗 New model test drives available from:
                </Typography>
                <Typography variant="body2">Jun 28, 2025 (9:00 AM - 7:00 PM)</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Form */}
        <Grid item xs={12} sm={6}>
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
                  label="Car Model / Interest *"
                  value={particularName}
                  onChange={(e) => setParticularName(e.target.value)}
                  fullWidth
                  sx={{ backgroundColor: 'white' }}
                />
                <TextField
                  label="Preferred Department (Sales/Service)"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  fullWidth
                  sx={{ backgroundColor: 'white' }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={fillDetails}
                      onChange={handleCheckboxChange}
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
                    if (/^\d{0,10}$/.test(val)) {
                      setMobile(val);
                    }
                  }}
                  fullWidth
                  sx={{ backgroundColor: 'white' }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button variant="contained" sx={{ backgroundColor: '#0d47a1' }} onClick={handleSubmit}>
                    Submit
                  </Button>
                  <Button variant="outlined" onClick={() => navigate(-1)}>Cancel</Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ✅ Success Popup */}
      <Dialog open={popupOpen} onClose={handleClosePopup}>
        <DialogTitle sx={{ backgroundColor: '#0d47a1', color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
         ZenReserve
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pt: 3 }}>
          <CheckCircleIcon sx={{ fontSize: 60, color: '#0d47a1' }} />
          <Typography variant="h6" sx={{ mt: 2 }}>Appointment Booked!</Typography>
          <Typography sx={{ mt: 1, mb: 2 }}>
            Your appointment has been booked successfully. Our admin will contact you shortly.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button variant="contained" sx={{ backgroundColor: '#0d47a1' }} onClick={handleClosePopup}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CarLogin;
