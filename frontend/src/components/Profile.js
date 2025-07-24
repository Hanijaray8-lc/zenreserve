import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  AppBar,
  Toolbar,
} from '@mui/material';

import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setLogoutOpen(false);
    navigate('/main');
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`https://zenreserve-lc.onrender.com/api/phone/delete-user/${user.phone}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem('user');
        setDeleteOpen(false);
        navigate('/main');
      } else {
        alert(data.message || 'Failed to delete user');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Server error while deleting account');
    }
  };

  const cardStyle = {
    width: 290,
    p: 4,
    textAlign: 'center',
    boxShadow: 5,
    bgcolor: '#c06bff',
    '&:hover': { backgroundColor: '#dca7e4' },
    cursor: 'pointer',
    borderRadius: 5,
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        px: 3,
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none',
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url("/icons.png")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.16,
          zIndex: 0,
        }}
      />

      {/* Header AppBar */}
      <AppBar
        position="absolute"
        elevation={0}
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          px: 2,
          pt: 1,
          zIndex: 5,
        }}
      >
        <Toolbar disableGutters>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              borderRadius: 5,
              backgroundColor: '#fff',
              color: '#1976d2',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }}
          >
            Go Back
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 1200,
          width: '100%',
          pt: 10,
          pb: 5,
        }}
      >
        {/* Profile Info */}
        <Box
          sx={{
            width: 300,
            height: 100,
            borderRadius: 3,
            backgroundColor: '#edb1f2',
            display: 'flex',
            alignItems: 'center',
            px: 2,
            boxShadow: 10,
            mb: 12,
          }}
        >
          <Box
            sx={{
              width: 55,
              height: 55,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid white',
              mr: 2,
            }}
          >
            <img
              src={
                user?.profileImage
                  ? `https://zenreserve-lc.onrender.com/uploads/${user.profileImage}`
                  : '/icons.png'
              }
              alt="Profile"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" fontWeight="bold" color="white">
              {user?.name}
            </Typography>
            <Typography variant="caption" color="white">
              {user?.phone}
            </Typography>
          </Box>
        </Box>

        {/* Action Cards */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 3,
            flexWrap: 'nowrap',
            overflowX: 'auto',
            width: '100%',
            maxWidth: 1100,
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
          }}
        >
          <Card onClick={() => navigate('/my-bookings')} sx={cardStyle}>
            <CalendarTodayIcon sx={{ fontSize: 32, color: '#1976d2' }} />
            <Typography sx={{ mt: 1 }}>My Bookings</Typography>
          </Card>
          {/* <Card onClick={() => navigate('/my-offers')} sx={cardStyle}>
            <LocalOfferIcon sx={{ fontSize: 32, color: '#9c27b0' }} />
            <Typography sx={{ mt: 1 }}>My Offers</Typography>
          </Card> */}
          <Card onClick={() => setLogoutOpen(true)} sx={cardStyle}>
            <LogoutIcon sx={{ fontSize: 32, color: '#0288d1' }} />
            <Typography sx={{ mt: 1 }}>Logout</Typography>
          </Card>
          <Card onClick={() => setDeleteOpen(true)} sx={cardStyle}>
            <DeleteIcon sx={{ fontSize: 32, color: '#d32f2f' }} />
            <Typography sx={{ mt: 1 }}>Delete Account</Typography>
          </Card>
        </Box>
      </Box>

      {/* Logout Dialog */}
      <Dialog open={logoutOpen} onClose={() => setLogoutOpen(false)}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <ExitToAppIcon sx={{ fontSize: 40, color: '#e53935' }} />
        </Box>
        <DialogTitle textAlign="center">Are you sure you want to logout?</DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          You will be returned to the login screen.
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button variant="outlined" onClick={handleLogout}>Logout</Button>
          <Button variant="outlined" onClick={() => setLogoutOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <WarningAmberIcon sx={{ fontSize: 40, color: 'red' }} />
        </Box>
        <DialogTitle textAlign="center">Are you sure you want to delete your account?</DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          This action is irreversible, and all your data will be lost.
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button variant="outlined" color="error" onClick={handleDeleteAccount}>Delete</Button>
          <Button variant="outlined" onClick={() => setDeleteOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
