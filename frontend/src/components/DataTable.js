import React from 'react';
import {
  Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  Paper, Typography
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const DataTable = ({ rows = [] }) => (
  <TableContainer
    component={Paper}
    sx={{
      mt: 4,
      borderRadius: 3,
      boxShadow: 4,
      overflow: 'hidden',
      backgroundColor: '#fdf6fd',
      fontFamily: 'Michroma, sans-serif', // ✅ Apply globally inside table container
    }}
  >
  

    <Table sx={{ fontFamily: 'Michroma, sans-serif' }}>
      <TableHead>
        <TableRow sx={{ backgroundColor: '#f1d4ee' }}>
          <TableCell sx={{ fontWeight: 'bold', color: '#4b004b', fontFamily: 'Michroma, sans-serif' }}>Username</TableCell>
          <TableCell sx={{ fontWeight: 'bold', color: '#4b004b', fontFamily: 'Michroma, sans-serif' }}>Email</TableCell>
          <TableCell sx={{ fontWeight: 'bold', color: '#4b004b', fontFamily: 'Michroma, sans-serif' }}>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((user) => (
          <TableRow
            key={user._id}
            hover
            sx={{
              transition: 'background 0.3s ease',
              '&:hover': {
                backgroundColor: '#fbe3fa',
              },
            }}
          >
            <TableCell sx={{ fontFamily: 'Michroma, sans-serif' }}>{user.username}</TableCell>
            <TableCell sx={{ fontFamily: 'Michroma, sans-serif' }}>{user.email}</TableCell>
            <TableCell>
              <CheckCircleIcon sx={{ color: '#4b0082', fontSize: 24 }} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default DataTable;
