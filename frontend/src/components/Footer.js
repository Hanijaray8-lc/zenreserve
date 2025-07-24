import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Link,
  IconButton,
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1c1c1e',
        borderTop: '3px solid #ce93d8',
        pt: 2,
        pb: 2,
        mt: 8,
        color: '#e0e0e0',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5} justifyContent="center" alignItems="center">
          {/* Logo */}
          <Grid item xs={12} md={4} textAlign="center">
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'Michroma, sans-serif',
                fontWeight: 'bold',
                letterSpacing: 1,
                color: '#ce93d8',
              }}
            >
           ZenReserve
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: '#bbbbbb', fontSize: '11px' }}
            >
              Your Smart Booking Partner
            </Typography>
          </Grid>

          {/* Social Links */}
          <Grid item xs={12} md={4} textAlign="center">
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600,color: '#ce93d8' }}
            >
              Connect with us
            </Typography>
            <Box>
              <IconButton
                href="https://www.instagram.com/lifechangersind/"
                target="_blank"
                sx={{ color: '#e0e0e0', '&:hover': { color: '#ce93d8' }, p: 0.5 }}
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton
                href="https://www.facebook.com/lifechangersind"
                target="_blank"
                sx={{ color: '#e0e0e0', '&:hover': { color: '#ce93d8' }, p: 0.5 }}
              >
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton
                href="https://in.linkedin.com/company/life-changers-ind"
                target="_blank"
                sx={{ color: '#e0e0e0', '&:hover': { color: '#ce93d8' }, p: 0.5 }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          {/* Copyright */}
          <Grid item xs={12} md={4} textAlign="center">
            <Typography
              variant="caption"
              sx={{ fontSize: '11px', color: '#999' }}
            >
              Â© {new Date().getFullYear()} Zen Reserve. All rights reserved. <br />
              Developed by{' '}
              <Link
                href="https://lifechangersind.com"
                target="_blank"
                underline="hover"
                sx={{
                  color: '#ce93d8',
                  fontWeight: 'bold',
                  '&:hover': { color: '#ffffff' },
                }}
              >
                LifechangersInd
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;