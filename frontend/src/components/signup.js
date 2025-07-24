import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import PopupForm from '../PopupForm';

const SignupPage = () => {
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [isOtpOpen, setOtpOpen] = useState(false);

  const handleSignupClick = () => {
    setSignupOpen(true);
  };

  const handleSignup = (userData) => {
    console.log("Signup data:", userData);
    setSignupOpen(false);
    setOtpOpen(true);
  };

  const handleOtpClose = () => {
    setOtpOpen(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <button onClick={handleSignupClick}>Sign Up</button>
      </Box>

      <PopupForm
        open={isSignupOpen}
        onClose={() => setSignupOpen(false)}
        onSignup={handleSignup}
      />

      {isOtpOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 8,
              minWidth: 300,
            }}
          >
            <h2 style={{ textAlign: 'center' }}>Enter OTP</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              style={{
                width: '100%',
                padding: 10,
                fontSize: 16,
                marginBottom: 20,
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={handleOtpClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: '#4b0082',
                  color: 'white',
                }}
                onClick={handleOtpClose}
              >
                Verify
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignupPage;
