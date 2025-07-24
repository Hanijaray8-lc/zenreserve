import React, { useState } from 'react';
import {
  Container, Paper, Typography, TextField, Button, Box,
  IconButton, InputAdornment, Grid, Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

export default function AdminLoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleLogin = async (e) => {
  e.preventDefault();

  const staticUsername = 'Tech';
  const staticPassword = 'Tech@123';

  // Static admin login
  if (form.username === staticUsername && form.password === staticPassword) {
    alert('Login successful (Admin)');
    localStorage.setItem('isAdmin', 'true'); // <-- Save admin login
    navigate('/admin');
    return;
  }

  // Backend user login
  try {
    const { data } = await axios.post('https://zenreserve-lc.onrender.com/api/auth/login', form);
    alert(data.message || 'Login successful');
    localStorage.setItem('isAdmin', 'true'); // <-- Save admin login
    navigate('/admin'); // or navigate('/dashboard') based on your setup
  } catch (err) {
    alert(err.response?.data?.message || 'Login failed');
  }
};


  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          bgcolor: '#fdf6fd',
          boxShadow: '0px 4px 20px rgba(206, 153, 202, 0.4)',
          fontFamily: 'Michroma, sans-serif',
          
        }}
      >
        <IconButton
  onClick={() => navigate('/main')}
  sx={{
    color: '#4b004b',
    position: 'absolute',
    top: 24,
    left: 24,
    backgroundColor: '#f4d3ec',
    '&:hover': { backgroundColor: '#e2b6d9' }
  }}
>
  <ArrowBackIcon />
</IconButton>

        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#4b004b',
            backgroundColor: '#ce99ca',
            py: 2,
            borderRadius: 2,
            mb: 3,
            fontFamily: 'Michroma, sans-serif'
          }}
        >
         ZenReserve Admin Login
        </Typography>

        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
   <Grid container spacing={2} direction="column">
  {/* Username Field */}
  <Grid item>
    <TextField
      label="Username"
      name="username"
      value={form.username}
      onChange={handleChange}
      fullWidth
      size="small"
      required
      sx={{ ...inputStyle, width: '100%' }} // Increase width as required
    />
  </Grid>

  {/* Password Field */}
  <Grid item>
    <TextField
      label="Password"
      name="password"
      type={showPassword ? 'text' : 'password'}
      value={form.password}
      onChange={handleChange}
      fullWidth
      size="small"
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" >
            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}
      sx={{ ...inputStyle, width: '100%' }} // Increase width as required
    />
  </Grid>
</Grid>


          <Box sx={{ mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#ce99ca',
                '&:hover': { backgroundColor: '#c078b4' },
                color: 'white',
                fontWeight: 'bold',
                px: 5,
                fontFamily: 'Michroma, sans-serif'
              }}
            >
              Login
            </Button>
          </Box>

          {/* <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Michroma, sans-serif' }}>
            Don’t have an account?{' '}
            <Link
              onClick={() => navigate('/admin-register')}
              sx={{ cursor: 'pointer', color: '#ce99ca', textDecoration: 'underline' }}
            >
              Register here
            </Link>
          </Typography> */}
        </Box>
      </Paper>
    </Container>
  );
}

const inputStyle = {
  fontFamily: 'Michroma, sans-serif',
  '& label': { fontFamily: 'Michroma, sans-serif' },
  '& input': { fontFamily: 'Michroma, sans-serif' },
  '& label.Mui-focused': { color: '#ce99ca' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: '#ce99ca' },
    '&:hover fieldset': { borderColor: '#c078b4' },
    '&.Mui-focused fieldset': { borderColor: '#ce99ca' },
  }
};
