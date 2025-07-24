import React, { useState, useEffect } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent,
  TextField, Box
} from '@mui/material';
import OTPPopup from './OTPPopup';

function PopupForm({ open, onClose, onSignup, phone }) {
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [generatedOtp, setGeneratedOtp] = useState('');

  useEffect(() => {
    if (phone) setMobile(phone);
  }, [phone]);

  const handleSendOtp = () => {
    const otp = Math.floor(10000 + Math.random() * 90000).toString(); // 5-digit OTP
    setGeneratedOtp(otp);
    setShowOtp(true);
  };

  const handleOtpVerified = async (otp) => {
    const formData = new FormData();
    formData.append('phoneNumber', mobile);
    formData.append('code', otp);
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
        alert('Registered successfully!');
        setShowOtp(false);
        onSignup();
      } else {
        alert(data.message || 'Failed to verify OTP');
      }
    } catch (error) {
      console.error('OTP Verification error:', error);
      alert('Verification failed. Try again.');
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle
          sx={{
            bgcolor: '#4b0082',
            color: 'white',
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            mb: 2,
          }}
        >
          ZenReserve - Sign Up
        </DialogTitle>

        <DialogContent
          sx={{
            bgcolor: '#fdfdfd', // off-white background
            p: 3,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              fullWidth
              type="file"
              onChange={(e) => setProfileImage(e.target.files[0])}
              sx={{ mb: 2 }}
              inputProps={{ accept: 'image/*' }}
            />
            <TextField
              fullWidth
              label="Mobile No *"
              placeholder="Enter your mobile number"
              variant="outlined"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              sx={{ mb: 2 }}
              InputLabelProps={{ style: { fontSize: '16px' } }}
              inputProps={{ style: { fontSize: '16px' } }}
            />
            <TextField
              fullWidth
              label="Name *"
              placeholder="Enter your name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
              InputLabelProps={{ style: { fontSize: '16px' } }}
              inputProps={{ style: { fontSize: '16px' } }}
            />
            <TextField
              fullWidth
              label="Set 4 Digit Password *"
              placeholder="Set 4 digit password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
              InputLabelProps={{ style: { fontSize: '16px' } }}
              inputProps={{ style: { fontSize: '16px' } }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={onClose}
                sx={{ fontSize: '15px', px: 3 }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                onClick={handleSendOtp}
                sx={{
                  backgroundColor: '#4b0082',
                  color: 'white',
                  fontSize: '15px',
                  px: 4,
                  '&:hover': {
                    backgroundColor: '#360062'
                  }
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <OTPPopup
        open={showOtp}
        phoneNumber={mobile}
        name={name}
        password={password}
        profileImage={profileImage}
        generatedOtp={generatedOtp}
        onVerified={handleOtpVerified}
        onClose={() => setShowOtp(false)}
      />
    </>
  );
}

export default PopupForm;