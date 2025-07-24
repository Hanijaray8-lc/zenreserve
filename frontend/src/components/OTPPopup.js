import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  Box,
  Button,
  InputAdornment
} from '@mui/material';
import { Verified, ErrorOutline, Lock } from '@mui/icons-material';

const OTPPopup = ({
  open,
  onClose,
  phoneNumber,
  name,
  password,
  profileImage,
  generatedOtp,
  onVerified
}) => {
  const [enteredOtp, setEnteredOtp] = useState('');
  const [status, setStatus] = useState('');

  const handleVerify = async () => {
    if (enteredOtp !== generatedOtp) {
      alert('Invalid OTP, please enter correct OTP');
      setStatus('error');
      return;
    }

    const formData = new FormData();
    formData.append('phoneNumber', phoneNumber);
    formData.append('code', enteredOtp);
    formData.append('name', name);
    formData.append('password', password);
    if (profileImage) formData.append('profileImage', profileImage);

    try {
      const response = await fetch('https://zenreserve-lc.onrender.com/api/phone/verify-otp', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setStatus('success');
        onVerified(enteredOtp);
      } else {
        alert(data.message || 'Registration failed');
        setStatus('error');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Server error. Please try again.');
      setStatus('error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
  <DialogTitle
    sx={{
      bgcolor: '#4b0082',
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '1.25rem',
      py: 2
    }}
  >
    🔐 OTP Verification
  </DialogTitle>

  <DialogContent sx={{ bgcolor: '#f5f5f5', px: 4, py: 3 }}>
    <Typography sx={{ mb: 2, mt: 2,  fontSize: '5', color: '#333' }}>
      Please enter the OTP <b style={{ color: '#1976d2' }}>{generatedOtp}</b> to proceed.
      <br />
      <span style={{ fontSize: '0.85rem', color: '#777' }}>Valid for 5 minutes.</span>
    </Typography>

    <TextField
      fullWidth
      label="Enter OTP"
      variant="outlined"
      value={enteredOtp}
      onChange={(e) => setEnteredOtp(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Lock />
          </InputAdornment>
        ),
      }}
      sx={{
        mb: 2,
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#fff',
        }
      }}
    />

    {status === 'success' && (
      <Typography sx={{ color: 'green', display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Verified /> Number Verified
      </Typography>
    )}

    {status === 'error' && (
      <Typography sx={{ color: 'red', display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <ErrorOutline /> Invalid OTP
      </Typography>
    )}

    <Box mt={2}>
      <Button
        variant="contained"
        fullWidth
        onClick={handleVerify}
        sx={{
          backgroundColor: '#4b0082',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#6a1b9a',
          }
        }}
      >
        VERIFY OTP
      </Button>
    </Box>
  </DialogContent>
</Dialog>
  );
};

export default OTPPopup;
