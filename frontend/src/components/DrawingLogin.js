import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
  Chip,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DrawingLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const drawing = location.state?.drawingClass;

  const [date, setDate] = useState('');
  const [particularName, setParticularName] = useState('');
  const [department, setDepartment] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [fillDetails, setFillDetails] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [user, setUser] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);

  // Set today's date by default
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  // Load user from localStorage
  useEffect(() => {
    const loadUser = () => {
      const stored = localStorage.getItem('user');
      if (stored) {
        const parsedUser = JSON.parse(stored);
        setUser(parsedUser);
      }
    };

    loadUser();
    window.addEventListener('userLoggedIn', loadUser);
    return () => {
      window.removeEventListener('userLoggedIn', loadUser);
    };
  }, []);

  // Handle checkbox for auto-fill
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
      alert("Please fill all fields");
      return;
    }

    const appointmentData = {
      date,
      particularName,
      department,
      name,
      mobile,
      hospitalId: drawing?._id,
      orgName: drawing?.orgName,
      serviceType: "drawing",
    };

    try {
      await axios.post('https://zenreserve-lc.onrender.com/api/appointments', appointmentData);
      setOpenPopup(true);
    } catch (error) {
      console.error('Error saving appointment:', error);
      alert('Failed to save appointment');
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#faf3dd', minHeight: '100vh' }}>
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)} maxWidth="xs" fullWidth>
        <Box sx={{ backgroundColor: '#c8facc', textAlign: 'center', pt: 3 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ color: '#2e7d32', mb: 1 }}>
           ZenReserve
          </Typography>
        </Box>
        <DialogTitle sx={{ textAlign: 'center' }}>
          <CheckCircleIcon sx={{ fontSize: 60, color: '#2e7d32' }} />
          <Typography variant="h6" fontWeight="bold" mt={2}>Appointment Booked!</Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <Typography variant="body1">Your drawing class slot is confirmed!</Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            onClick={() => {
              setOpenPopup(false);
              navigate('/');
            }}
            variant="contained"
            sx={{ backgroundColor: '#2e7d32', px: 4 }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={4} sx={{
        maxWidth: 800,
        mx: 'auto',
        backgroundColor: 'rgb(138, 204, 173)',
        borderRadius: 3,
        p: 3,
        boxShadow: 4,
      }}>
        {/* Left Panel */}
        <Grid item xs={12} md={6}>
          <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <Card sx={{ backgroundColor: '#f0f0f0', borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                  <img src="./drawing1.jpg" alt="announcement" height={200} width={300} style={{ border: '2px solid black', padding: '20px', borderRadius: '10px', backgroundColor: 'white' }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">Service Details</Typography>
                  <Chip label="Pay Offline" size="small" sx={{ backgroundColor: 'lightgreen', fontWeight: 'bold', height: 24 }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <img src={`https://zenreserve-lc.onrender.com/uploads/${drawing?.profileImage || 'drawing1.jpg'}`} alt="Drawing Logo" style={{ width: 80, height: 80, borderRadius: 8 }} />
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">{drawing?.orgName}</Typography>
                    <Typography variant="body2" color="text.secondary">{drawing?.areaName}, {drawing?.city}</Typography>
                  </Box>
                </Box>
                <Box sx={{ bgcolor: '#d0f0c0', p: 1, borderRadius: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>🛎️ Slots Open</Typography>
                  <Typography variant="body2">{drawing?.openingTime} - {drawing?.closingTime}</Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Right Panel */}
        <Grid item xs={12} md={6}>
          <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField label="Choose Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} fullWidth InputLabelProps={{ shrink: true }} sx={{ backgroundColor: 'white' }} />
                  <TextField label="Particular Name *" value={particularName} onChange={(e) => setParticularName(e.target.value)} fullWidth sx={{ backgroundColor: 'white' }} />
                  <TextField label="Departments *" value={department} onChange={(e) => setDepartment(e.target.value)} fullWidth sx={{ backgroundColor: 'white' }} />

                  <FormControlLabel
                    control={<Checkbox checked={fillDetails} onChange={handleCheckboxChange} />}
                    label="Fill my details (Name & Mobile)"
                  />

                  <TextField label="Name *" value={name} onChange={(e) => setName(e.target.value)} fullWidth sx={{ backgroundColor: 'white' }} />
                  <TextField label="Mobile Number *" value={mobile} onChange={(e) => { const val = e.target.value; if (/^\d{0,10}$/.test(val)) setMobile(val); }} fullWidth sx={{ backgroundColor: 'white' }} />

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

export default DrawingLogin;
