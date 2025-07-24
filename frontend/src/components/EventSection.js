import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  Grid,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Hero from './Hero';
import Footer from './Footer';
import LoginPopup from './LoginPopup';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const EventSection = () => {
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);

  const [cities, setCities] = useState([]);
  const [listingTypes, setListingTypes] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { src: 'hospitall.jpg', name: 'Hospital', path: '/hospitals' },
    { src: 'parlar.jpg', name: 'Parlours', path: '/pourlars' },
    { src: 'lab.png', name: 'Laboratories', path: '/laboratories' },
    { src: 'saloon.jpg', name: 'Salons', path: '/salons' },
    // { src: 'drawing.jpg', name: 'Drawingclass', path: '/drawingclass' },
    { src: 'showroom.jpg', name: 'Car showroom', path: '/carshowroom' },
    { src: 'Electranics.jpg', name: 'Electronic Service', path: '/electronic' },
    { src: 'mechanicshop.png', name: 'Mechanic Shop', path: '/mechanic' },
  ];

  const isUserLoggedIn = () => {
    return localStorage.getItem('user') !== null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const citiesRes = await axios.get('https://zenreserve-lc.onrender.com/api/business/cities');
        setCities(citiesRes.data);

        const typesRes = await axios.get('https://zenreserve-lc.onrender.com/api/business/listingTypes');
        setListingTypes(typesRes.data);
      } catch (err) {
        console.error('Error fetching cities or listingTypes:', err);
      }
    };

    fetchData();
  }, []);

  const handleCityChange = (e) => {
    if (!isUserLoggedIn()) {
      setLoginPromptOpen(true);
      return;
    }
    setSelectedCity(e.target.value);
  };

  const handleCategorySelect = (category) => {
    if (!isUserLoggedIn()) {
      setLoginPromptOpen(true);
      return;
    }

    setSelectedCategory(category);
    const selected = categories.find((c) => c.name.toLowerCase() === category.toLowerCase());
    if (selected) {
      const cityParam = selectedCity ? `?city=${encodeURIComponent(selectedCity)}` : '';
      navigate(`${selected.path}${cityParam}`);
    } else {
      console.warn("Category path not found for:", category);
    }
  };

  return (
    <>
      <Navbar onLoginClick={() => setShowLoginPopup(true)} />
      <Hero onLoginRequest={() => setShowLoginPopup(true)} />

      <Box sx={{ p: 5 }}>
        {/* Filter and Hero Section */}
        <Box sx={{ display: 'flex', gap: 4, mb: 4, flexWrap: 'wrap' }}>
          {/* Filter Panel */}
          <Card
            sx={{
              width: '100%',
              maxWidth: 450,
              backgroundColor: '#ce99ca',
              borderRadius: 3,
              boxShadow: 4,
              p: 3,
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ color: 'white', mb: 2 }}>
                Filter Departments
              </Typography>

              <Select
                fullWidth
                variant="outlined"
                value={selectedCity}
                onChange={handleCityChange}
                displayEmpty
                sx={{ mb: 3, backgroundColor: 'white', borderRadius: 1 }}
                startAdornment={
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="">Select City/District</MenuItem>
                {cities.map((city, index) => (
                  <MenuItem key={index} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>

              <Select
                fullWidth
                variant="outlined"
                value={selectedCategory}
                onChange={(e) => handleCategorySelect(e.target.value)}
                displayEmpty
                sx={{ backgroundColor: 'white', borderRadius: 1 }}
                startAdornment={
                  <InputAdornment position="start">
                    <ListAltIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="">Select Department</MenuItem>
                {listingTypes.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </CardContent>
          </Card>

          {/* Hero Message */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: '#ce99ca',
              borderRadius: 3,
              boxShadow: 4,
              p: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 250,
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ color: 'white', textAlign: 'center' }}>
              Discover & Book Local Services Instantly! <br />
              <span style={{ fontWeight: 400, fontSize: '1rem' }}>
                From <strong>Gyms</strong> to <strong>Salons</strong>, <strong>Hospitals</strong> to{' '}
                <strong>Drawing Classes</strong> — we've got your city covered!
              </span>
            </Typography>
          </Box>
        </Box>

        {/* Available Departments */}
        <Box>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Available Departments
          </Typography>

          <Card
            sx={{
              width: '100%',
              backgroundColor: '#fff',
              boxShadow: 3,
              p: 2,
              borderRadius: 2,
            }}
          >
            <Grid container spacing={2} justifyContent="center">
  {categories.map((category, index) => (
    <Grid
      item
      key={index}
      xs={12}
      sm={6}
      md={3} // changed from md={4} to md={3} to fit 4 cards per row
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
          width: '100%',
          maxWidth: 280,
          minHeight: 260,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          padding: 3,
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(213, 28, 28, 0.1)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 25px rgba(180, 7, 7, 0.2)',
          },
        }}
        onClick={() => {
          if (!isUserLoggedIn()) {
            setLoginPromptOpen(true);
            return;
          }
          navigate(category.path);
        }}
      >
        <img
          src={`/${category.src}`}
          alt={category.name}
          style={{
            width: 220,
            height: 140,
            objectFit: 'cover',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        />
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ mt: 2, textAlign: 'center', color: '#333' }}
        >
          {category.name}
        </Typography>
      </Box>
    </Grid>
  ))}
</Grid>

          </Card>
        </Box>
      </Box>

      <Dialog open={loginPromptOpen} onClose={() => setLoginPromptOpen(false)} maxWidth="xs" fullWidth>
  <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', mt: 2 }}>
    Login Required
    <IconButton
      aria-label="close"
      onClick={() => setLoginPromptOpen(false)}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
        '&:hover': {
          backgroundColor: 'transparent',
          color: '#000',
        },
      }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>
  <DialogContent sx={{ textAlign: 'center', pb: 3 }}>
    <Typography variant="body1" sx={{ mb: 2 }}>
      Please login to continue.
    </Typography>
    <Button
      variant="contained"
      onClick={() => {
        setLoginPromptOpen(false);
        setShowLoginPopup(true);
      }}
      sx={{
        backgroundColor: '#4b0082',
        '&:hover': { backgroundColor: '#3a006a' },
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


      {/* Login Popup */}
      <Dialog open={showLoginPopup} onClose={() => setShowLoginPopup(false)} maxWidth="xs" fullWidth>
        <LoginPopup onClose={() => setShowLoginPopup(false)} />
      </Dialog>

      <Footer />
    </>
  );
};

export default EventSection;