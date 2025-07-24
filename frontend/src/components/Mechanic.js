import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, MenuItem, Grid, Button, InputAdornment
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import CategoryIcon from '@mui/icons-material/Category';
import BuildIcon from '@mui/icons-material/Build';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Mechanic = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [area, setArea] = useState('All Areas');
  const [loading, setLoading] = useState(true);

  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [category, setCategory] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://zenreserve-lc.onrender.com/api/business/mechanicshops');
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cityParam = params.get('city');
    const districtParam = params.get('district');
    const categoryParam = params.get('category');

    if (cityParam) setCity(cityParam);
    if (districtParam) setDistrict(districtParam);
    if (categoryParam) setCategory(categoryParam);
    if (cityParam) setArea(cityParam);
  }, [location.search]);

  const uniqueAreas = ['All Areas', ...new Set(data.map(d => d.areaName))];

  const filteredData = data.filter(d =>
    (area === 'All Areas' || d.areaName === area || d.city === area) &&
    (!city || d.city === city) &&
    (!district || d.district === district) &&
    (!category || d.category === category || d.listingType === 'Mechanic Shop') &&
    d.orgName?.toLowerCase().includes(search.toLowerCase())
  );

  const handleCardClick = (item) => {
    navigate('/mechanic-login', { state: { mechanic: item } });
  };

  const handleGoBack = () => navigate(-1);

  return (
    <Box sx={{ background: 'linear-gradient(135deg, #fff3e0, #ffffff)', minHeight: '100vh', pb: 6 }}>
      {/* Header */}
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        mb: 3, p: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)',
        flexDirection: { xs: 'column', sm: 'row' }, gap: 2
      }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{
            minWidth: { xs: '100%', sm: 'auto' },
            bgcolor: '#ef6c00',
            '&:hover': { bgcolor: '#ff9800' }
          }}
        >
          Go Back
        </Button>
        <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#ef6c00', flexGrow: 1, mr: { xs: 0, sm: 2 }
        }}>
          {/* <BuildIcon sx={{ mr: 1 }} /> */}
          {`Mechanic Shops in ${area}`}
        </Typography>
      </Box>

      {/* Filters */}
      <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{
        mb: 5, px: 2, py: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)'
      }}>
        <Grid item>
          <TextField
            select
            label="Area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            variant="outlined"
            size="small"
            sx={{
              width: 250, backgroundColor: '#fff', borderRadius: 1,
              '& .MuiInputBase-root': { height: 45 }
            }}
          >
            {uniqueAreas.map((areaOption, i) => (
              <MenuItem key={i} value={areaOption}>{areaOption}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <TextField
            placeholder="Search by Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'action.active' }} />
                </InputAdornment>
              ),
              style: { height: 45 }
            }}
            sx={{ width: 250, backgroundColor: '#fff', borderRadius: 1 }}
          />
        </Grid>
      </Grid>

      {/* Cards */}
     <Box sx={{ px: 2, pb: 4 }}>
  {filteredData.length === 0 ? (
    <Typography variant="h6" sx={{ mt: 4, textAlign: 'center', color: 'gray' }}>
      No results found for selected filters.
    </Typography>
  ) : (
    <Grid container spacing={3} justifyContent="center">
      {filteredData.map((d) => (
        <Grid item key={d._id}>
          <Box
            onClick={() => handleCardClick(d)}
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
              borderLeft: '8px solid #ef6c00',
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
            <Box
              component="img"
              src={`https://zenreserve-lc.onrender.com/uploads/${d.profileImage}`}
              alt={d.orgName}
              sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 2 }}
            />
            <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
              <Typography variant="h6" fontWeight="bold" noWrap>
                {d.orgName}
              </Typography>
              <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                <AccessTimeIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary" noWrap>
                  {d.openingTime} - {d.closingTime}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                <LocationOnIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary" noWrap>
                  {d.city} ({d.areaName})
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <PaidOutlinedIcon fontSize="small" color="success" />
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

    </Box>
  );
};

export default Mechanic;
