import React from 'react';
import {
  AppBar, Toolbar, Typography, Button, IconButton, Box, Grid, TextField, Dialog,
  DialogTitle, DialogContent
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ResourcesIcon from '@mui/icons-material/MenuBook';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';

import BusinessForm from './BussinessForm';
import PopupForm from './popupForm'; // Adjust if needed

const Navbar = () => {
  const navigate = useNavigate();
  const [signupOpen, setSignupOpen] = React.useState(false);
  const [businessOpen, setBusinessOpen] = React.useState(false);
  const [popupOpen, setPopupOpen] = React.useState(false);

  const handleSignupOpen = () => setSignupOpen(true);
  const handleSignupClose = () => setSignupOpen(false);
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setSignupOpen(false);
  };

  return (
    <>
      <AppBar position="static" color="white" elevation={0} sx={{ p: 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between', fontFamily: 'Michroma, sans-serif' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              <img
                src="/booklogo.png"
                alt="Bookify Logo"
                style={{ width: 70, height: 55 }}
              />
              <span
                style={{
                  fontWeight: 'bold',
                  marginLeft: 8,
                  color: '#ce99ca',
                  fontSize: '30px',
                  fontFamily: 'Michroma, sans-serif'
                }}
              >
              ZenReserve
              </span>
            </Box>
          </Typography>

          <Box sx={{ display: 'flex', gap: 3 }}>
            <Button
              startIcon={<ResourcesIcon />}
              color="inherit"
              onClick={() => setBusinessOpen(true)}
              sx={{ fontFamily: 'Michroma, sans-serif' }}
            >
              For Business
            </Button>
          </Box>

       <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
  <IconButton>
    <SearchIcon />
  </IconButton>

  <Button
    variant="contained"
    startIcon={
      <Box
        sx={{
          backgroundColor: '#ce99ca',
          borderRadius: '50%',
          p: 0.8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
  <LockIcon sx={{ fontSize: 16, color: 'white' }} /> {/* 🔒 White color here */}      </Box>
    }
    onClick={() => navigate('/login')}
    sx={{
      backgroundColor: '#4b0082',
      '&:hover': {
        backgroundColor: '#3a006a',
        boxShadow: '0px 3px 8px rgba(75, 0, 130, 0.4)',
      },
      fontFamily: 'Michroma, sans-serif',
      borderRadius: '30px',
      px: 4,
      py: 1,
      fontSize: '14px',
      textTransform: 'none',
      boxShadow: '0px 2px 5px rgba(75, 0, 130, 0.2)',
      transition: 'all 0.3s ease-in-out',
    }}
  >
    Login
  </Button>

  <Button
    variant="contained"
    onClick={handleSignupOpen}
    sx={{
      backgroundColor: '#4b0082',
      '&:hover': {
        backgroundColor: '#3a006a',
        boxShadow: '0px 3px 8px rgba(75, 0, 130, 0.4)',
      },
      fontFamily: 'Michroma, sans-serif',
      borderRadius: '30px',
      px: 4,
      py: 1,
      fontSize: '14px',
      textTransform: 'none',
      boxShadow: '0px 2px 5px rgba(75, 0, 130, 0.2)',
      transition: 'all 0.3s ease-in-out',
    }}
  >
    Sign Up
  </Button>
</Box>


        </Toolbar>
      </AppBar>

      {/* Signup Dialog */}
      <Dialog open={signupOpen} onClose={handleSignupClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#ce99ca', color: 'white', fontFamily: 'Michroma, sans-serif' }}>
          Sign Up
        </DialogTitle>
        <DialogContent sx={{ bgcolor: '#ce99ca' }}>
          <form onSubmit={handleSignupSubmit}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {['Username', 'Email ID', 'Password', 'Phone Number'].map((label, idx) => (
                <Grid item xs={12} key={idx}>
                  <TextField
                    fullWidth
                    label={label}
                    variant="outlined"
                    type={label === 'Password' ? 'password' : label === 'Email ID' ? 'email' : 'text'}
                    required
                    sx={{
                      '& label': { fontFamily: 'Michroma, sans-serif' },
                      '& input': { fontFamily: 'Michroma, sans-serif' }
                    }}
                  />
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleSignupClose}
                sx={{ fontFamily: 'Michroma, sans-serif' }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#4b0082',
                  '&:hover': { backgroundColor: '#4b0082' },
                  fontFamily: 'Michroma, sans-serif'
                }}
              >
                Sign Up
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>

      {/* Popup and Business Forms */}
      <PopupForm open={popupOpen} onClose={() => setPopupOpen(false)} />
      <BusinessForm open={businessOpen} onClose={() => setBusinessOpen(false)} />
    </>
  );
};

export default Navbar;
