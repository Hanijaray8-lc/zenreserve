import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const loadUsers = async () => {
    try {
      const { data } = await axios.get('https://zenreserve-lc.onrender.com/api/phone/users');
      setUsers(data.users);
    } catch (err) {
      console.error('Failed to load users:', err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ bgcolor: '#f1f4f6', minHeight: '100vh', py: 5 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'Michroma, sans-serif',
          }}
        >
          Users
        </Typography>

        <Box display="flex" justifyContent="flex-end" mb={2}>
          <TextField
            variant="outlined"
            placeholder="Search by name or phone"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={{ width: 300, backgroundColor: 'white', borderRadius: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#e8b5e8' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Profile</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user, index) => (
                <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? '#f9eff9' : '#f6e6f6' }}>
                  <TableCell>
                    <Avatar
                      src={`https://zenreserve-lc.onrender.com/uploads/${user.profileImage}`}
                      alt={user.name}
                    />
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <CheckCircleIcon sx={{ color: '#5e0583' }} />
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default UsersPage;
