import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, TextField, Button,
  Checkbox, FormControlLabel, Chip, Grid, Dialog,
  DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ElectronicLogin = () => {
  const location = useLocation();
  const electronic = location.state?.electronic;
  const navigate = useNavigate();

  const [date, setDate] = useState('2025-06-28');
  const [particularName, setParticularName] = useState('');
  const [department, setDepartment] = useState('');
  const [fillDetails, setFillDetails] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // ✅ Load user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsedUser = JSON.parse(stored);
      setUser(parsedUser);
    }
  }, []);

  // ✅ Handle checkbox change for autofill
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
      alert("Please fill out all required fields.");
      return;
    }

    const appointmentData = {
      date,
      particularName,
      department,
      name,
      mobile,
      hospitalId: electronic?._id,
      orgName: electronic?.orgName,
      serviceType: "electronicservice"
    };

    try {
      await axios.post('https://zenreserve-lc.onrender.com/api/appointments', appointmentData);
      setOpenDialog(true);
    } catch (err) {
      console.error(err);
      alert("Failed to book.");
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#e3f2fd', minHeight: '100vh' }}>
      {/* ✅ Success Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="xs" fullWidth>
        <Box sx={{ backgroundColor: '#e3f2fd', textAlign: 'center', pt: 3 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ color: '#1976d2', mb: 1 }}>
          ZenReserve
          </Typography>
        </Box>
        <DialogTitle sx={{ textAlign: 'center' }}>
          <CheckCircleIcon sx={{ fontSize: 60, color: '#1976d2' }} />
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
            sx={{ px: 4 }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ Main Form Layout */}
      <Grid container spacing={3} sx={{
        maxWidth: 770, mx: 'auto', backgroundColor: '#bbdefb',
        borderRadius: 3, p: 2, boxShadow: 3
      }}>
        {/* Left Info */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ backgroundColor: '#f0f0f0', borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
                <img
                  src="./electronicmedia.jpeg"
                  alt="announcement"
                  style={{
                    border: '2px solid #888', padding: 16, borderRadius: 12,
                    backgroundColor: '#fff', maxWidth: '100%', height: 160
                  }}
                />
              </Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Electronic Service Info
              </Typography>
              <Chip label="Pay Offline" size="small" sx={{
                backgroundColor: '#90ee90', fontWeight: 'bold', mb: 2
              }} />
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <img
                  src={`https://zenreserve-lc.onrender.com/uploads/${electronic?.profileImage}`}
                  alt="Electronic Logo"
                  style={{ width: 70, height: 70, borderRadius: 8 }}
                />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {electronic?.orgName || 'Service Name'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {electronic?.areaName}, {electronic?.city}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ backgroundColor: '#e1f5fe', p: 1.5, borderRadius: 2 }}>
                <Typography variant="body2" fontWeight="bold">
                  🛠️ Book now for any appliance repair (or) installation!
                </Typography>
                <Typography variant="body2">
                  {electronic?.openingTime} - {electronic?.closingTime}
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
                  label="Item / Issue *"
                  value={particularName}
                  onChange={(e) => setParticularName(e.target.value)}
                  fullWidth
                  sx={{ backgroundColor: 'white' }}
                />
                <TextField
                  label="Department (e.g. Repair, Install) *"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  fullWidth
                  sx={{ backgroundColor: 'white' }}
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={fillDetails} onChange={handleCheckboxChange} />
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
                  <Button variant="contained" sx={{ backgroundColor: '#1976d2' }} onClick={handleSubmit}>
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
    </Box>
  );
};

export default ElectronicLogin;
