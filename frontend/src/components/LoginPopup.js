import React, { useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  Box,
  Button,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PopupForm from './popupForm';

const LoginPage = ({ onClose }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [existingUser, setExistingUser] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const isValidIndianPhone = (num) => /^[6-9]\d{9}$/.test(num);

  const handleNextClick = async () => {
    if (!isValidIndianPhone(phone.trim())) {
      return alert('Enter a valid 10-digit phone number');
    }

    const res = await fetch(`https://zenreserve-lc.onrender.com/api/phone/check-phone/${phone}`);
    const data = await res.json();
    if (data.exists) {
      setExistingUser(true);
    } else {
      setShowPopup(true);
    }
  };

  const handleLogin = async () => {
    const res = await fetch(`https://zenreserve-lc.onrender.com/api/phone/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } else {
      alert(data.message);
    }
  };

  return (
    <Box>
      <Paper elevation={4}>
        
        <DialogTitle
            sx={{
              bgcolor: '#4b0082',
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '28px',
              py: 2,
              mb: 2
            }}
          >
          ZenReserve
          </DialogTitle>
        

        <DialogContent>
          <Typography align="center" gutterBottom sx={{ mb: 2, fontWeight: 500 }}>
            {existingUser ? 'Welcome Back! Please Login' : 'Enter Phone Number to Continue'}
          </Typography>

          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            sx={{ mb: 2 }}
          />

          {existingUser && (
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
          )}

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button onClick={onClose} variant="outlined" color="secondary">
              Cancel
            </Button>
            {!existingUser ? (
              <Button
                variant="contained"
                onClick={handleNextClick}
                sx={{ backgroundColor: '#4b0082', color: 'white' }}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleLogin}
                sx={{ backgroundColor: '#4b0082', color: 'white' }}
              >
                Login
              </Button>
            )}
          </Box>
        </DialogContent>
      </Paper>

      {/* Popup for signup */}
      <PopupForm
        open={showPopup}
        onClose={() => setShowPopup(false)}
        onSignup={() => {
          setShowPopup(false);
          alert('Signup successful!');
          onClose();
        }}
        phone={phone}
      />
    </Box>
  );
};

export default LoginPage;