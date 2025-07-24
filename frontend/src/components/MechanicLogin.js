import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, TextField, Button,
  Checkbox, FormControlLabel, Chip, Grid, Dialog, DialogTitle,
  DialogContent, DialogActions
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const MechanicLogin = () => {
  const location = useLocation();
  const mechanic = location.state?.mechanic;
  const navigate = useNavigate();

  const [date, setDate] = useState('2025-06-28');
  const [particularName, setParticularName] = useState('');
  const [department, setDepartment] = useState('');
  const [fillDetails, setFillDetails] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const [user, setUser] = useState(null); // 🧠 user info from localStorage

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

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
      alert("Please fill all required fields.");
      return;
    }

    const data = {
      date,
      particularName,
      department,
      name,
      mobile,
      hospitalId: mechanic?._id,
      orgName: mechanic?.orgName,
      serviceType: "mechanicshop"
    };

    try {
      await axios.post('https://zenreserve-lc.onrender.com/api/appointments', data);
      setPopupOpen(true);
    } catch (err) {
      console.error(err);
      alert("Failed to book.");
    }
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    navigate('/');
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#fff3e0', minHeight: '100vh' }}>
      <Grid container spacing={3} sx={{
        maxWidth: 730, mx: 'auto', backgroundColor: '#ffe0b2',
        borderRadius: 3, p: 2, boxShadow: 3
      }}>
        {/* Left Info */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ backgroundColor: '#fbe9e7', borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
                <img
                  src="./mech.webp"
                  alt="announcement"
                  style={{
                    border: '2px solid #888', padding: 16, borderRadius: 12,
                    backgroundColor: '#fff', maxWidth: '100%', height: 160
                  }}
                />
              </Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Mechanic Service Info
              </Typography>
              <Chip label="Pay Offline" size="small" sx={{
                backgroundColor: '#90ee90', fontWeight: 'bold', mb: 2
              }} />
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <img
                  src={`https://zenreserve-lc.onrender.com/uploads/${mechanic?.profileImage}`}
                  alt="Mechanic Logo"
                  style={{ width: 70, height: 70, borderRadius: 8 }}
                />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {mechanic?.orgName || 'Mechanic Name'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {mechanic?.areaName}, {mechanic?.city}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ backgroundColor: '#ffe0b2', p: 1.5, borderRadius: 2 }}>
                <Typography variant="body2" fontWeight="bold">
                  🛠️ Book your vehicle repair or service now!
                </Typography>
                <Typography variant="body2">
                  {mechanic?.openingTime} - {mechanic?.closingTime}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Form */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ width: '100%', borderRadius: 2, px: 2 }}>
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
                  label="Vehicle / Issue *"
                  value={particularName}
                  onChange={(e) => setParticularName(e.target.value)}
                  fullWidth
                  sx={{ backgroundColor: 'white' }}
                />
                <TextField
                  label="Service Type (Repair/Oil/Checkup)"
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
                  label="Fill my details"
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
                  <Button variant="contained" sx={{ backgroundColor: '#ff7043' }} onClick={handleSubmit}>
                    Submit
                  </Button>
                  <Button variant="outlined" onClick={() => navigate(-1)}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 🧡 Orange Confirmation Popup */}
      <Dialog open={popupOpen} onClose={handleClosePopup}>
        <DialogTitle sx={{
          backgroundColor: '#ff7043',
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
       ZenReserve
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pt: 3 }}>
          <CheckCircleIcon sx={{ fontSize: 60, color: '#ff7043' }} />
          <Typography variant="h6" sx={{ mt: 2 }}>Appointment Booked!</Typography>
          <Typography sx={{ mt: 1, mb: 2 }}>
            Your appointment has been booked successfully. Our admin will contact you shortly.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button variant="contained" sx={{ backgroundColor: '#ff7043' }} onClick={handleClosePopup}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MechanicLogin;
