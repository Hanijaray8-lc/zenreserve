import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Grid,
  InputAdornment,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const BeautyParloursPage = () => {
  const [parlours, setParlours] = useState([]);
  const [search, setSearch] = useState('');
  const [area, setArea] = useState('All Areas');
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [category, setCategory] = useState('');

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchParlours = async () => {
      try {
        const res = await axios.get('https://zenreserve-lc.onrender.com/api/business/beautyparlours');
        setParlours(res.data);
      } catch (err) {
        console.error('Error fetching parlours:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchParlours();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cityParam = params.get('city');
    const districtParam = params.get('district');
    const categoryParam = params.get('category');

    if (cityParam) setCity(cityParam);
    if (districtParam) setDistrict(districtParam);
    if (categoryParam) setCategory(categoryParam);
  }, [location.search]);

  const filteredParlours = parlours.filter((p) => {
    // Area filter
    const [selectedAreaName, selectedCity] = area.includes('|')
      ? area.split('|').map((s) => s.trim())
      : [null, null];

    const areaFilter = area === 'All Areas' || (
      selectedAreaName && selectedCity &&
      p.areaName === selectedAreaName &&
      p.city === selectedCity
    );

    // URL param filters
    const cityMatch = !city || p.city === city;
    const districtMatch = !district || p.district === district;
    const categoryMatch = !category || (p.department && p.department === category);

    // Search filter
    const searchMatch = p.orgName &&
      p.orgName.toLowerCase().includes(search.toLowerCase());

    return areaFilter && cityMatch && districtMatch && categoryMatch && searchMatch;
  });

  const handleCardClick = (parlour) => {
    navigate('/pourlarLogin', { state: { parlour } });
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom right, #f8bbd0, #ffffff)',
        minHeight: '100vh',
        pb: 6,
      }}
    >
      {/* Header and Back Button */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
          p: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
            bgcolor: 'rgb(214, 167, 184)',
            '&:hover': { bgcolor: '#f8bbd0' },
          }}
        >
          Go Back
        </Button>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgb(191, 41, 93)',
            flexGrow: 1,
            mr: { xs: 0, sm: 2 },
          }}
        >
          {`Parlours in ${area}`}
        </Typography>
      </Box>

      {/* Filters */}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{
          mb: 5,
          px: 2,
          py: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        }}
      >
        {/* Area Filter */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            label="Area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{
              width: 250,
              backgroundColor: '#fff',
              borderRadius: 1,
              '& .MuiInputBase-root': { height: 45 },
              '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
            }}
          >
            <MenuItem value="All Areas">All Areas</MenuItem>
            {[...new Set(parlours
              .filter((p) => p.areaName && p.city)
              .map((p) => `${p.areaName} | ${p.city}`))]
              .map((val, index) => (
                <MenuItem key={index} value={val}>
                  {val}
                </MenuItem>
              ))}
          </TextField>
        </Grid>

        {/* Search Input */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            placeholder="Search by Parlours Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'action.active' }} />
                </InputAdornment>
              ),
              style: { height: 45 },
            }}
            sx={{ backgroundColor: '#fff', borderRadius: 1 }}
          />
        </Grid>
      </Grid>

      {/* Cards */}
      <Grid container spacing={3} justifyContent="center">
        {/* Parlour Cards */}
{filteredParlours.length === 0 ? (
  <Typography variant="h6" sx={{ mt: 4, textAlign: 'center', color: 'gray' }}>
    No parlours found for selected filters.
  </Typography>
) : (
  <Grid container spacing={3} justifyContent="center">
    {filteredParlours.map((p) => (
      <Grid item key={p._id}>
        <Box
          onClick={() => handleCardClick(p)}
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
            borderLeft: '8px solid rgb(214, 167, 184)',
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
          {/* Parlour Image */}
          <Box
            component="img"
            src={`https://zenreserve-lc.onrender.com/uploads/${p.profileImage}`}
            alt={p.orgName}
            sx={{
              width: 100,
              height: 100,
              objectFit: 'cover',
              borderRadius: 2,
              flexShrink: 0,
            }}
          />

          {/* Parlour Info */}
          <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
            <Typography variant="h6" fontWeight="bold" noWrap gutterBottom>
              {p.orgName}
            </Typography>

            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
              <AccessTimeIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary" noWrap>
                {p.openingTime} - {p.closingTime}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
              <LocationOnIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary" noWrap>
                {p.areaName}, {p.city}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <CheckCircleIcon fontSize="small" sx={{ color: '#4caf50' }} />
              <Typography
                variant="caption"
                sx={{ color: '#4caf50', fontWeight: 500 }}
                noWrap
              >
                Pay Offline Available
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    ))}
  </Grid>
)}

      </Grid>
    </Box>
  );
};

export default BeautyParloursPage;