import React, { useState } from 'react';
import {
  Container, Paper, Typography, Grid,
  TextField, Button, Box, IconButton, InputAdornment, Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const emptyForm = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const registerUser = (form) => {
  return axios.post('https://zenreserve-lc.onrender.com/api/auth/register', form);
};

export default function AdminPage() {
  const [form, setForm] = useState(emptyForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser(form);
      alert(data.message || 'Registration successful');
      setForm(emptyForm);
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
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
          ZenReserve Admin 
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
       <Grid container spacing={2}>
  {/* Username */}
  <Grid item xs={12} sm={6}>
    <TextField
      label="Username"
      name="username"
      value={form.username}
      onChange={handleChange}
      fullWidth
      size="small"
      required
      sx={inputStyle}
    />
  </Grid>

  {/* Email */}
  <Grid item xs={12} sm={6}>
    <TextField
      label="Email"
      name="email"
      type="email"
      value={form.email}
      onChange={handleChange}
      fullWidth
      size="small"
      required
      sx={inputStyle}
    />
  </Grid>

  {/* Password */}
{/* Password */}
<Grid item xs={12} sm={6}>
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
        <InputAdornment position="end" sx={{ ml: -3.5 }}>
          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      )
    }}
    sx={{ ...inputStyle, width: '100%' }}
  />
</Grid>

{/* Confirm Password */}
<Grid item xs={12} sm={6}>
  <TextField
    label="Confirm Password"
    name="confirmPassword"
    type={showConfirmPassword ? 'text' : 'password'}
    value={form.confirmPassword}
    onChange={handleChange}
    fullWidth
    size="small"
    required
    InputProps={{
      endAdornment: (
        <InputAdornment position="end" sx={{ ml: -3.5 }}>
          <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      )
    }}
    sx={{ ...inputStyle, width: '100%' }}
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
              Register
            </Button>
          </Box>

          {/* <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Michroma, sans-serif' }}>
            Already registered?{' '}
            <Link
              onClick={() => navigate('/admin-login')}
              sx={{ cursor: 'pointer', color: '#ce99ca', textDecoration: 'underline' }}
            >
              Login here
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
