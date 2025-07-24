import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Button,
  InputAdornment,
  CircularProgress,
  NoSsr,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import ScienceIcon from '@mui/icons-material/Science';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const LaboratoriesPage = () => {
  const [labs, setLabs] = useState([]);
  const [search, setSearch] = useState('');
  const [area, setArea] = useState('All Areas');
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cityParam = params.get('city');
    if (cityParam) setCity(cityParam);
  }, [location.search]);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const res = await axios.get('https://zenreserve-lc.onrender.com/api/business/labs');
        setLabs(res.data);
      } catch (err) {
        console.error('Error fetching labs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLabs();
  }, []);

  const filteredLabs = labs.filter((l) => {
    const cityMatch = !city || l.city === city;
    const areaMatch = area === 'All Areas' || (l.areaName && l.areaName === area);
    const searchMatch = l.orgName && l.orgName.toLowerCase().includes(search.toLowerCase());
    return cityMatch && areaMatch && searchMatch;
  });

  const uniqueAreas = ['All Areas', ...new Set(labs.map((l) => l.areaName).filter(Boolean))];

  const handleCardClick = (lab) => {
    navigate('/lablogin', { state: { lab } });
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom right, #f4f6f9, #dbe7f6)',
        minHeight: '100vh',
        pb: 6,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
          p: 2,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: 3,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{
            minWidth: { xs: '100%', sm: 'auto' },
            bgcolor: 'rgb(98, 123, 159)',
            '&:hover': {
              bgcolor: 'rgb(157, 169, 187)',
            },
          }}
        >
          Go Back
        </Button>
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
          textAlign="center"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'primary.dark',
            flexGrow: 1,
            mr: { xs: 0, sm: 2 },
          }}
        >
          {/* <ScienceIcon sx={{ mr: 1, fontSize: '2.8rem' }} /> */}
          {`Laboratories in ${area}`}
        </Typography>
      </Box>

      {/* Filters */}
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="flex-end"
        sx={{
          mb: 5,
          p: 2,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: 2,
        }}
      >
        {/* Area Filter */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth variant="outlined" size="small" sx={{ minWidth: 250 }}>
            <InputLabel>Area</InputLabel>
            <Select value={area} label="Area" onChange={(e) => setArea(e.target.value)}>
              {uniqueAreas.map((a, i) => (
                <MenuItem key={i} value={a}>
                  {a}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Search Input */}
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            fullWidth
            placeholder="Search by Laboratory Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <NoSsr>
                  <SearchIcon sx={{ mr: 1, color: 'action.active' }} />
                </NoSsr>
              ),
            }}
            variant="outlined"
            size="small"
          />
        </Grid>
      </Grid>

      {/* Cards */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress color="secondary" />
        </Box>
      ) : filteredLabs.length === 0 ? (
        <Box >
        <Typography variant="h6" sx={{ mt: 4, textAlign: 'center', color: 'gray' }}>
             No Laboratories found for selected filters.
           </Typography>
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {filteredLabs.map((lab) => (
            <Grid item key={lab._id}>
              <Box
                onClick={() => handleCardClick(lab)}
                sx={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: 2,
                  p: 2,
                  width: 380,
                  height: 120,
                  backgroundColor: '#fff',
                  borderLeft: '8px solid rgb(98, 123, 159)',
                  borderRadius: '8px',
                  boxShadow: 2,
                  cursor: 'pointer',
                  transition: '0.3s',
                  '&:hover': {
                    boxShadow: 6,
                    backgroundColor: '#f0f0f0',
                    transform: 'scale(1.02)',
                  },
                }}
              >
                {/* Lab Image */}
                <Box
                  component="img"
                  src={`https://zenreserve-lc.onrender.com/uploads/${lab.profileImage}`}
                  alt={lab.orgName}
                  sx={{
                    width: 100,
                    height: 100,
                    objectFit: 'cover',
                    borderRadius: 2,
                    flexShrink: 0,
                  }}
                />

                {/* Lab Info */}
                <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                  <Typography variant="h6" fontWeight="bold" noWrap gutterBottom>
                    {lab.orgName}
                  </Typography>

                  <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                    <AccessTimeIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {lab.openingTime} - {lab.closingTime}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                    <LocationOnIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {lab.areaName}, {lab.city}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <CheckCircleIcon fontSize="small" sx={{ color: '#4caf50' }} />
                    <Typography variant="caption" sx={{ color: '#4caf50', fontWeight: 500 }} noWrap>
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

export default LaboratoriesPage;
