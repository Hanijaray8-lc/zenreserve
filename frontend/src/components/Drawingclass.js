import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Button,
  InputAdornment,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import BrushIcon from "@mui/icons-material/Brush";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DrawingClasses = () => {
  const [drawingClasses, setDrawingClasses] = useState([]);
  const [search, setSearch] = useState('');
  const [area, setArea] = useState('All Areas');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get("https://zenreserve-lc.onrender.com/api/business/drawingclasses");
        setDrawingClasses(res.data);
      } catch (err) {
        console.error("Error fetching drawing classes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  const uniqueAreas = ['All Areas', ...new Set(drawingClasses.map(c => c.areaName))];

  const filteredClasses = drawingClasses.filter((c) =>
    (area === 'All Areas' || c.areaName === area) &&
    (c.orgName && c.orgName.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCardClick = (drawingClass) => {
    navigate("/drawinglogin", { state: { drawingClass } });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
   <Box sx={{
  background: 'linear-gradient(to bottom right, #faf3dd, #c8d5b9, #8fc0a9)', // 🎨 Elegant adult style
  minHeight: '100vh',
  pb: 6
}}>

      {/* Header */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 3,
        p: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        borderRadius: 2,
        boxShadow: 3
      }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{
            minWidth: { xs: '100%', sm: 'auto' },
            bgcolor: 'rgb(138, 204, 173)',
            '&:hover': { bgcolor: 'rgb(185, 211, 199)' },
          }}
        >
          Go Back
        </Button>
        <Typography variant="h4" fontWeight="bold" textAlign="center"
             sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'primary.dark', // Stronger color for the title
            flexGrow: 1, // Allow title to take available space
            mr: { xs: 0, sm: 2 },
          }}>
          {/* <BrushIcon sx={{ mr: 1, fontSize: '2.6rem' }} /> */}
          {`Drawing Classes in ${area}`}
        </Typography>
      </Box>

      {/* Filters */}
      <Grid container spacing={3} justifyContent="center" alignItems="flex-end"
        sx={{ mb: 5, p: 2, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 2, boxShadow: 2 }}>
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
              width: 250,
              backgroundColor: '#fff',
              borderRadius: 1,
              '& .MuiInputBase-root': { height: 45 },
              '& .MuiSelect-select': {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
            }}
          >
            {uniqueAreas.map((areaOption, i) => (
              <MenuItem key={i} value={areaOption}>
                {areaOption}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            placeholder="Search by Drawing Class Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'action.active' }} />
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>

      {/* Content */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress color="secondary" />
        </Box>
      ) : filteredClasses.length === 0 ? (
        <Box >
          <Typography variant="h6" sx={{ mt: 4, textAlign: 'center', color: 'gray' }}>
                      No Drawingclass found for selected filters.
                    </Typography>
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {filteredClasses.map((c) => (
            <Grid item key={c._id}>
              <Box onClick={() => handleCardClick(c)} sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: 2,
                p: 2,
                width: 380,
                height: 120,
                backgroundColor: '#fff',
                borderLeft: '8px solid rgb(138, 204, 173)',
                borderRadius: 2,
                boxShadow: 2,
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': {
                  boxShadow: 6,
                  backgroundColor: '#f0f0f0',
                  transform: 'scale(1.02)'
                }
              }}>
                <Box
                  component="img"
                  src={`https://zenreserve-lc.onrender.com/uploads/${c.profileImage}`}
                  alt={c.orgName}
                  sx={{
                    width: 100,
                    height: 100,
                    objectFit: 'cover',
                    borderRadius: 2
                  }}
                />
                <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                  <Typography variant="h6" fontWeight="bold" noWrap>
                    {c.orgName}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                    <AccessTimeIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {c.openingTime} - {c.closingTime}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                    <LocationOnIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {c.city}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                    <PaidOutlinedIcon fontSize="small" sx={{ color: '#4caf50' }} />
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

export default DrawingClasses;
