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
  IconButton,
  Paper,
  Dialog,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import AdminRegister from './AdminRegister'; // adjust path if needed
import CloseIcon from '@mui/icons-material/Close'; // import at the top


const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openAdminDialog, setOpenAdminDialog] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const { data } = await axios.get('https://zenreserve-lc.onrender.com/api/auth/users');
        setUsers(data.users);
      } catch (err) {
        console.error('Failed to load users:', err);
      }
    };

    loadUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://zenreserve-lc.onrender.com/api/auth/users/${userId}`);
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (err) {
      alert('Failed to delete user');
      console.error(err);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography
          variant="h5"
          sx={{
            color: 'black',
            fontWeight: 'bold',
            fontFamily: 'Michroma, sans-serif',
          }}
        >
          Registered Users
        </Typography>

        <Button
          variant="contained"
          onClick={() => setOpenAdminDialog(true)}
          sx={{
            backgroundColor: '#ce99ca',
            '&:hover': { backgroundColor: '#c078b4' },
            fontFamily: 'Michroma, sans-serif',
          }}
        >
          Add Admin
        </Button>
      </Box>

      <Box mb={2} display="flex" justifyContent="flex-end">
        <TextField
          variant="outlined"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box>
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
         <TableHead sx={{ backgroundColor: '#f3e0f2' }}>
  <TableRow>
    <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Password</TableCell> {/* NEW */}
    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
  </TableRow>
</TableHead>

         <TableBody>
  {filteredUsers.map((user) => (
    <TableRow key={user._id}>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.password}</TableCell> {/* NEW */}
      <TableCell>
        <IconButton onClick={() => handleDeleteUser(user._id)} color="error">
          <DeleteIcon />
        </IconButton>
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
      </Box>

      {/* Admin Registration Dialog */}
     <Dialog open={openAdminDialog} onClose={() => setOpenAdminDialog(false)} maxWidth="md" fullWidth>
  <DialogTitle
    sx={{
      fontFamily: 'Michroma, sans-serif',
      backgroundColor: '#f3e0f2',
      color: '#4b004b',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      pr: 2
    }}
  >
    Register New Admin
    <IconButton
      onClick={() => setOpenAdminDialog(false)}
      sx={{ color: '#4b004b' }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>

  <DialogContent>
    <AdminRegister onClose={() => setOpenAdminDialog(false)} />
  </DialogContent>
</Dialog>

    </Container>
  );
};

export default UsersPage;
