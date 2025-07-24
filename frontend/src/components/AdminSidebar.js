// src/components/AdminSidebar.js
import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';

import AppointmentList from './AppointmentList';
import BusinessList from './BusinessList';
import Profile from './Profile';
import Admin from './Admin';
import User from './User';
import AddAdminPage from './AdminRegister'; // ✅ Import
import LogoutIcon from '@mui/icons-material/Logout';

const AdminSidebar = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState('appointments');

  const toggleSidebar = () => setOpen(!open);

  const menuItems = [
    { key: 'appointments', label: 'Appointments', icon: <CalendarTodayIcon /> },
    { key: 'businesslist', label: 'Business List', icon: <BusinessIcon /> },
    { key: 'admin', label: 'Admin', icon: <PersonIcon /> },
    { key: 'user', label: 'User', icon: <GroupIcon /> },
{
  key: 'logout',
  label: 'Logout',
  icon: <LogoutIcon style={{ color: '#fff' }} />,
}

  ];

  const renderComponent = () => {
    switch (selected) {
      case 'appointments':
        return <AppointmentList />;
      case 'businesslist':
        return <BusinessList />;
      case 'admin':
        return <Admin />;
      case 'user':
        return <User />;
      default:
        return <AppointmentList />;
    }
  };

const handleMenuClick = (key) => {
  if (key === 'logout') {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      localStorage.removeItem('isAdmin');
      window.location.href = '/main'; // Redirect to main page
    }
  } else {
    setSelected(key);
  }
};


  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (!isAdmin) {
    window.location.href = '/admin-login'; // Redirect if not logged in
    return (
      <Typography variant="h6" sx={{ mt: 8, textAlign: 'center', color: 'red' }}>
        You need login access!
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f0f2f5' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: open ? 220 : 64,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? 220 : 64,
            boxSizing: 'border-box',
            transition: 'width 0.3s ease',
            bgcolor: '#ce99ca',
            color: '#fff',
            borderRight: 'none',
          },
        }}
      >
        <List>
          <ListItem button onClick={toggleSidebar} sx={{ color: 'white' }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <MenuIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Menu" />}
          </ListItem>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', my: 1 }} />

          {menuItems.map((item) => (
            <ListItem
              button
              key={item.key}
              selected={selected === item.key}
              onClick={() => handleMenuClick(item.key)}
              sx={{
                color: 'white',
                '&.Mui-selected': {
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.3)',
                  },
                },
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <Tooltip title={!open ? item.label : ''} placement="right">
                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
              </Tooltip>
              {open && <ListItemText primary={item.label} />}
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 0, overflowY: 'auto' }}>
        <Typography
          variant="h5"
          sx={{
            p: 2,
            bgcolor: '#ce99ca',
            color: 'white',
            textAlign: 'center',
          }}
        >
          {menuItems.find((item) => item.key === selected)?.label}
        </Typography>
        {renderComponent()}
      </Box>
    </Box>
  );
};

export default AdminSidebar;
