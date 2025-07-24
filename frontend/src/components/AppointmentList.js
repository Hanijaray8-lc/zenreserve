import React, { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, MenuItem, Grid,
  InputAdornment, Chip, Avatar, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { lightBlue, teal, orange, purple, pink } from '@mui/material/colors';
import axios from 'axios';

const serviceTypeColors = {
  'Consultation': lightBlue[500],
  'Checkup': teal[500],
  'Treatment': orange[500],
  'Follow-up': purple[500],
  'Emergency': pink[500],
};

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [serviceTypeFilter, setServiceTypeFilter] = useState('');
  const [uniqueServiceTypes, setUniqueServiceTypes] = useState([]);
  const [localData, setLocalData] = useState([]);

  // Load data from localStorage or API
  const loadData = async () => {
    const savedData = localStorage.getItem('appointmentsData');
    if (savedData) {
      setLocalData(JSON.parse(savedData));
      setAppointments(JSON.parse(savedData));

      const types = [...new Set(JSON.parse(savedData).map(a => a.serviceType))];
      setUniqueServiceTypes(types);
    }

    try {
      const res = await axios.get('https://zenreserve-lc.onrender.com/api/appointments');
      setAppointments(res.data);
      localStorage.setItem('appointmentsData', JSON.stringify(res.data));
      setLocalData(res.data);

      const types = [...new Set(res.data.map(a => a.serviceType))];
      setUniqueServiceTypes(types);
    } catch (err) {
      console.error('Using local data as API failed', err);
      if (savedData) {
        setAppointments(JSON.parse(savedData));
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredAppointments = appointments.filter((appt) => {
    const matchesSearch = appt.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesServiceType = serviceTypeFilter ? appt.serviceType === serviceTypeFilter : true;
    return matchesSearch && matchesServiceType;
  });

  const getRandomColor = (str) => {
    const colors = [lightBlue[500], teal[500], orange[500], purple[500], pink[500]];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
  <Box sx={{ p: 3, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>

      <Typography variant="h6" mb={3} sx={{ 
        fontWeight: 'bold', 
        color: '#2c3e50',
        textTransform: 'uppercase',
        letterSpacing: 1
      }}>
        Appointment Dashboard
      </Typography>

      <Grid container spacing={3} mb={4} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            label="Search Patients"
            variant="outlined"
            fullWidth
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
              sx: {
                backgroundColor: 'white',
                borderRadius: 1
              }
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Filter by Service Type"
            fullWidth
            value={serviceTypeFilter}
            onChange={(e) => setServiceTypeFilter(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
                minWidth: '240px',
              }
            }}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: {
                    minWidth: 240,
                  }
                }
              }
            }}
          >
            <MenuItem value="">All Services</MenuItem>
            {uniqueServiceTypes.map((type, index) => (
              <MenuItem key={index} value={type}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      backgroundColor: serviceTypeColors[type] || getRandomColor(type),
                      borderRadius: '50%',
                      mr: 1
                    }}
                  />
                  {type}
                </Box>
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      {filteredAppointments.length === 0 ? (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '300px',
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 1
        }}>
          <Typography variant="h6" color="textSecondary">
            No appointments found matching your criteria
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="textSecondary">
              Showing {filteredAppointments.length} appointments
            </Typography>
          </Box>

          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="appointments table">
              <TableHead sx={{ backgroundColor: '#b87fb1' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Patient</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Service Type</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Mobile</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Particular</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Organization</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAppointments.map((appt) => (
                  <TableRow
                    key={appt._id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { backgroundColor: '#f9f0f9' }
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{
                          bgcolor: getRandomColor(appt.name),
                          width: 36,
                          height: 36,
                          mr: 2,
                          fontSize: '1rem'
                        }}>
                          {appt.name.charAt(0)}
                        </Avatar>
                        {appt.name}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={appt.serviceType}
                        size="small"
                        sx={{
                          backgroundColor: serviceTypeColors[appt.serviceType] || getRandomColor(appt.serviceType),
                          color: 'white'
                        }}
                      />
                    </TableCell>
                    <TableCell>{appt.date}</TableCell>
                    <TableCell>{appt.mobile}</TableCell>
                    <TableCell>{appt.particularName || '-'}</TableCell>
                    <TableCell>{appt.department || '-'}</TableCell>
                    <TableCell>{appt.orgName || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default AppointmentList;
