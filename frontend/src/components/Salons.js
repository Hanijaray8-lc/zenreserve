import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Grid,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  CircularProgress,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import SpaIcon from '@mui/icons-material/Spa';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const SalonsPage = () => {
  const [salons, setSalons] = useState([]);
  const [search, setSearch] = useState('');
  const [area, setArea] = useState('All Areas');
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => navigate(-1);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cityParam = params.get('city');
    if (cityParam) setCity(cityParam);
  }, [location.search]);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const res = await axios.get('https://zenreserve-lc.onrender.com/api/business/salons');
        setSalons(res.data);
      } catch (err) {
        console.error('Error fetching salons:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSalons();
  }, []);

  const filteredSalons = salons.filter((s) => {
    const cityMatch = !city || s.city === city;
    const areaMatch = area === 'All Areas' || (s.areaName && s.areaName === area);
    const searchMatch = s.orgName?.toLowerCase().includes(search.toLowerCase());
    return cityMatch && areaMatch && searchMatch;
  });

  const uniqueAreas = ['All Areas', ...new Set(salons.map((s) => s.areaName).filter(Boolean))];

  const handleCardClick = (salon) => {
    navigate('/salonlogin', { state: { salon } });
  };

  return (
    <Box sx={{
      background: 'linear-gradient(to bottom right, #fbe4f0, #e8d8f6)',
      minHeight: '100vh',
      pb: 6,
    }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 3,
        p: 2,
        borderRadius: 2,
        backgroundColor: 'rgba(255,255,255,0.9)',
        boxShadow: 3,
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
      }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{
            minWidth: { xs: '100%', sm: 'auto' },
            bgcolor: 'rgb(185, 128, 157)',
            '&:hover': { bgcolor: 'rgb(184, 153, 169)' },
          }}>
          Go Back
        </Button>
        <Typography variant="h4" component="h1" fontWeight="bold" textAlign="center"
          sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'primary.dark', flexGrow: 1, mr: { xs: 0, sm: 2 }
          }}>
          {/* <SpaIcon sx={{ mr: 1, fontSize: '2.8rem' }} /> */}
          {`Salons in ${area}`}
        </Typography>
      </Box>

      {/* Filters */}
      <Grid container spacing={3} justifyContent="center" alignItems="flex-end"
        sx={{
          mb: 5, p: 2, borderRadius: 2,
          backgroundColor: 'rgba(255,255,255,0.9)', boxShadow: 2
        }}>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth variant="outlined" size="small" sx={{ minWidth: 250 }}>
            <InputLabel>Area</InputLabel>
            <Select value={area} label="Area" onChange={(e) => setArea(e.target.value)}>
              {uniqueAreas.map((a, i) => (
                <MenuItem key={i} value={a}>{a}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            fullWidth
            placeholder="Search by Salon Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'action.active' }} />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            size="small"
          />
        </Grid>
      </Grid>

      {/* Content */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress color="secondary" />
        </Box>
      ) : filteredSalons.length === 0 ? (
        <Box > 
          <Typography variant="h6" sx={{ mt: 4, textAlign: 'center', color: 'gray' }}>
                       No Salons found for selected filters.
                     </Typography>
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {filteredSalons.map((s) => (
            <Grid item key={s._id}>
              <Box onClick={() => handleCardClick(s)} sx={{
                display: 'flex', flexDirection: 'row', alignItems: 'flex-start',
                gap: 2, p: 2, width: 380, height: 120, backgroundColor: '#fff',
                borderLeft: '8px solid rgb(185, 128, 157)', borderRadius: 2, boxShadow: 2,
                cursor: 'pointer', transition: '0.3s',
                '&:hover': { boxShadow: 6, backgroundColor: '#f0f0f0', transform: 'scale(1.02)' }
              }}>
                <Box component="img"
                  src={`https://zenreserve-lc.onrender.com/uploads/${s.profileImage}`}
                  alt={s.orgName}
                  sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 2 }} />
                <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                  <Typography variant="h6" fontWeight="bold" noWrap gutterBottom>
                    {s.orgName}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                    <AccessTimeIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {s.openingTime} - {s.closingTime}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                    <LocationOnIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {s.areaName}, {s.city}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CheckCircleIcon fontSize="small" sx={{ color: '#4caf50' }} />
                    <Typography variant="caption" color="success.main" noWrap>
                      Pay Offline Available
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SalonsPage;
