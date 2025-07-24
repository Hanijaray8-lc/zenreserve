import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const MyBookings = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`https://zenreserve-lc.onrender.com/api/appointments/${user.phone}`);
        const data = await res.json();
        setAppointments(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setLoading(false);
      }
    };

    if (user?.phone) {
      fetchAppointments();
    }
  }, [user]);

  return (
    <Box sx={{ p: 0 }}>
      {/* Header with Go Back */}
      <Paper
        elevation={3}
        sx={{
          mb: 3,
          px: 2,
          py: 1.5,
          backgroundColor: '#f3d1f4',
          display: 'flex',
          width: '100%',
        }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
          My Bookings
        </Typography>
      </Paper>

      {/* Appointments Table */}
      <Paper elevation={3} sx={{ borderRadius: 3, maxWidth: 1200, mx: 'auto', overflowX: 'auto' }}>
        {loading ? (
          <Typography sx={{ p: 3 }}>Loading...</Typography>
        ) : appointments.length === 0 ? (
          <Box sx={{ textAlign: 'center', p: 3 }}>
            <Typography variant="subtitle1" sx={{ color: 'gray', mb: 2 }}>
              No Bookings Found
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                fontWeight: 'bold',
                borderColor: '#8bc34a',
                color: '#689f38',
                '&:hover': {
                  backgroundColor: '#dcedc8',
                  borderColor: '#689f38',
                },
              }}
            >
              New Booking
            </Button>
          </Box>
        ) : (
          <Table>
            <TableHead sx={{ backgroundColor: '#f3d1f4' }}>
              <TableRow>
                <TableCell><strong>Username</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Department</strong></TableCell>
                <TableCell><strong>Service</strong></TableCell>
                <TableCell><strong>Organization</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appt, index) => (
                <TableRow key={index}>
                  <TableCell>{appt.name}</TableCell>
                  <TableCell>{appt.date}</TableCell>
                  <TableCell>{appt.department}</TableCell>
                  <TableCell>{appt.serviceType}</TableCell>
                  <TableCell>{appt.orgName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Box>
  );
};

export default MyBookings;
