import React, { useState, useEffect } from "react";
import {
  Box, Typography, TextField, MenuItem, Grid, Button,
  InputAdornment,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Gyms = () => {
  const [gymData, setGymData] = useState([]);
  const [search, setSearch] = useState('');
  const [area, setArea] = useState('All Areas');
  const [loading, setLoading] = useState(true);

  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [category, setCategory] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const res = await axios.get('https://zenreserve-lc.onrender.com/api/business/gyms');
        setGymData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGyms();
  }, []);

  // Read URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cityParam = params.get('city');
    const districtParam = params.get('district');
    const categoryParam = params.get('category');

    if (cityParam) setCity(cityParam);
    if (districtParam) setDistrict(districtParam);
    if (categoryParam) setCategory(categoryParam);

    if (cityParam) setArea(cityParam); // Default area to city if passed
  }, [location.search]);

  const uniqueAreas = ['All Areas', ...new Set(gymData.map(g => g.areaName))];

  const filteredGyms = gymData.filter(g =>
    (area === 'All Areas' || g.areaName === area || g.city === area) &&
    (!city || g.city === city) &&
    (!district || g.district === district) &&
    (!category || g.department === category) &&
    g.orgName?.toLowerCase().includes(search.toLowerCase())
  );

  const handleCardClick = (gym) => {
    navigate('/gymlogin', { state: { gym } });
  };

  const handleGoBack = () => navigate(-1);

  return (
    <Box sx={{ background: 'linear-gradient(135deg, #c9d6ff, #e2e2e2)', minHeight: '100vh', pb: 6 }}>
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
            bgcolor: '#283593',
            '&:hover': { bgcolor: '#3949ab' }
          }}
        >
          Go Back
        </Button>
        <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#283593', flexGrow: 1, mr: { xs: 0, sm: 2 }
        }}>
          <FitnessCenterIcon sx={{ mr: 1 }} />
          All Gyms in Tirunelveli
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
            InputLabelProps={{ shrink: true }}
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
            placeholder="Search by Gym Name..."
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

      {/* Gym Cards */}
      <Box sx={{ px: 2, pb: 4 }}>
        <Grid container spacing={3} justifyContent="center">
          {filteredGyms.map((g) => (
            <Grid item key={g._id}>
              <Box
                onClick={() => handleCardClick(g)}
                sx={{
                  position: 'relative', display: 'flex', flexDirection: 'row',
                  alignItems: 'flex-start', gap: 2, p: 2, width: 420, height: 120,
                  backgroundColor: '#fff', borderRadius: 3, boxShadow: 3,
                  cursor: 'pointer', transition: '0.3s',
                  '&:hover': {
                    boxShadow: 6, backgroundColor: '#f0f0f0', transform: 'scale(1.02)'
                  },
                  '&::before': {
                    content: '""', position: 'absolute', top: 0, left: 0,
                    borderTop: '35px solid #3949ab',
                    borderRight: '20px solid transparent', zIndex: 1
                  },
                  '&::after': {
                    content: '""', position: 'absolute', top: 35, left: 0,
                    width: '6px', height: 'calc(100% - 35px)',
                    backgroundColor: '#3949ab'
                  }
                }}
              >
                <Box
                  component="img"
                  src={`https://zenreserve-lc.onrender.com/uploads/${g.profileImage}`}
                  alt={g.orgName}
                  sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 2 }}
                />
                <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                  <Typography variant="h6" fontWeight="bold" noWrap>{g.orgName}</Typography>
                  <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                    <AccessTimeIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {g.openingTime} - {g.closingTime}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                    <LocationOnIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {g.city} ({g.areaName})
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                    <CategoryIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {g.department}
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
      </Box>
    </Box>
  );
};

export default Gyms;
