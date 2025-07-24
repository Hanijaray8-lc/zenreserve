import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ResourcesIcon from '@mui/icons-material/MenuBook';
import { useNavigate } from 'react-router-dom';

import BusinessForm from './BussinessForm';
import PopupForm from './popupForm';
import LoginPopup from './LoginPopup';

const Navbar = ({ onLoginClick }) => {
  const navigate = useNavigate();
  const [signupOpen, setSignupOpen] = useState(false);
  const [businessOpen, setBusinessOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [requireLoginOpen, setRequireLoginOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false); // ✅ New state

  useEffect(() => {
    const loadUser = () => {
      const stored = localStorage.getItem('user');
      if (stored) {
        const parsedUser = JSON.parse(stored);
        setUser(parsedUser);
      } else {
        setUser(null);
      }
    };

    loadUser();
    window.addEventListener('userLoggedIn', loadUser);
    return () => {
      window.removeEventListener('userLoggedIn', loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <>
      <AppBar position="static" color="white" elevation={0} sx={{ p: 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 0, cursor: 'pointer' }}
              onClick={() => navigate('/admin-login')}
            >
              <img src="/ZenReserve.png" alt="Bookify Logo" style={{ width: 70, height: 55 }} />
              <span
                style={{
                  fontWeight: 'bold',
                  marginLeft: 8,
                  color: '#ce99ca',
                  fontSize: '30px',
                  fontFamily: 'Michroma, sans-serif',
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
              onClick={() => {
                if (user) {
                  setBusinessOpen(true);
                } else {
                  setRequireLoginOpen(true);
                }
              }}
            >
              For Business
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <IconButton>
              <SearchIcon />
            </IconButton>

            {user ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar
                  src={
                    user.profileImage
                      ? `https://zenreserve-lc.onrender.com/uploads/${user.profileImage}`
                      : undefined
                  }
                  alt={user.name}
                >
                  {!user.profileImage && user.name?.charAt(0).toUpperCase()}
                </Avatar>
                <Typography
                  onClick={() => navigate('/profile')}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' },
                    fontWeight: 500,
                    color: '#4b0082',
                  }}
                >
                  {user.name}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setLogoutConfirmOpen(true)} // ✅ Trigger confirmation
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
                  Logout
                </Button>
              </Box>
            ) : (
              <Button
                variant="contained"
                onClick={onLoginClick}
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
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Custom Login Required Dialog */}
      <Dialog open={requireLoginOpen} onClose={() => setRequireLoginOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', mt: 2, position: 'relative' }}>
          Login Required
          <IconButton
            onClick={() => setRequireLoginOpen(false)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: '#333',
              '&:hover': {
                color: '#999',
                backgroundColor: 'transparent',
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pb: 3 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Please login to access Business features.
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setRequireLoginOpen(false);
              setLoginOpen(true);
            }}
            sx={{
              backgroundColor: '#4b0082',
              '&:hover': {
                backgroundColor: '#3a006a',
              },
              borderRadius: '30px',
              px: 4,
              py: 1,
              fontSize: '14px',
              textTransform: 'none',
            }}
          >
            Login Now
          </Button>
        </DialogContent>
      </Dialog>

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutConfirmOpen} onClose={() => setLogoutConfirmOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', mt: 2, position: 'relative' }}>
          Are you sure?
          <IconButton
            onClick={() => setLogoutConfirmOpen(false)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: '#333',
              '&:hover': {
                color: '#999',
                backgroundColor: 'transparent',
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pb: 3 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Do you really want to logout?
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setLogoutConfirmOpen(false);
              handleLogout();
            }}
            sx={{
              backgroundColor: '#4b0082',
              '&:hover': {
                backgroundColor: '#3a006a',
              },
              borderRadius: '30px',
              px: 4,
              py: 1,
              fontSize: '14px',
              textTransform: 'none',
            }}
          >
            Yes
          </Button>
        </DialogContent>
      </Dialog>

      {/* Signup Dialog */}
      <Dialog open={signupOpen} onClose={() => setSignupOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#ce99ca', color: 'white' }}>Sign Up</DialogTitle>
        <DialogContent sx={{ bgcolor: '#ce99ca' }}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField fullWidth label="Username" variant="outlined" required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Email ID" type="email" variant="outlined" required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Password" type="password" variant="outlined" required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Phone Number" type="tel" variant="outlined" required />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" onClick={() => setSignupOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" sx={{ backgroundColor: '#4b0082' }}>
                Sign Up
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>

      <PopupForm open={popupOpen} onClose={() => setPopupOpen(false)} />
      <BusinessForm open={businessOpen} onClose={() => setBusinessOpen(false)} />
      <Dialog open={loginOpen} onClose={() => setLoginOpen(false)} maxWidth="xs" fullWidth>
        <LoginPopup onClose={() => setLoginOpen(false)} />
      </Dialog>
    </>
  );
};

export default Navbar;