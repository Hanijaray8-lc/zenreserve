// components/Hero.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Fade,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const services = [
  {
    name: 'Hospitals',
    bg: '/hospitalservice0.jpg',
    heading: 'Your Health, Our Priority',
    subheading: 'Book appointments at top hospitals near you easily and quickly.',
    path: '/hospitals',
    color: 'rgb(243, 100, 124)',
    buttonColor: 'rgb(243, 100, 124)',
    buttonHover: 'rgb(200, 50, 70)',
  },
  {
    name: 'Parlours',
    bg: '/parlourservice.jpg',
    heading: 'Beauty & Care',
    subheading: 'Book parlour services to pamper yourself anytime.',
    path: '/pourlars',
    color: '#9c27b0',
    buttonColor: '#9c27b0',
    buttonHover: '#7b1fa2',
  },
  {
    name: 'Laboratories',
    bg: '/labservice0.png',
    heading: 'Tests Made Easy',
    subheading: 'Schedule lab tests with reliable and quick results.',
    path: '/laboratories',
    color: 'rgb(252, 248, 250)',
    buttonColor: 'rgb(248, 242, 243)',
    buttonHover: 'rgb(244, 162, 173)',
  },
  {
    name: 'Salons',
    bg: '/salonservice0.jpg',
    heading: 'Style Redefined',
    subheading: 'Book salon services for a fresh and stylish look.',
    path: '/salons',
    color: 'rgb(210, 24, 160)',
    buttonColor: 'rgb(210, 24, 160)',
    buttonHover: 'rgb(180, 20, 130)',
  },
  // {
  //   name: 'Drawing Classes',
  //   bg: '/drawingservice0.png',
  //   heading: 'Unleash Creativity',
  //   subheading: 'Join drawing classes and explore your artistic side.',
  //   path: '/drawingclass',
  //   color: 'rgb(95, 17, 190)',
  //   buttonColor: 'rgb(95, 17, 190)',
  //   buttonHover: 'rgb(70, 10, 150)',
  // },
  {
    name: 'Car Showroom',
    bg: '/carshowroom.png',
    heading: 'Find Your Dream Car',
    subheading: 'Explore top car showrooms near you.',
    path: '/carshowroom',
    color: 'rgb(0, 123, 255)',
    buttonColor: 'rgb(0, 123, 255)',
    buttonHover: 'rgb(0, 100, 210)',
  },
  {
    name: 'Electronic Service',
    bg: '/electronicservice.png',
    heading: 'Electronic Repairs & Services',
    subheading: 'Get your gadgets serviced by experts.',
    path: '/electronic',
    color: 'rgb(255, 140, 0)',
    buttonColor: 'rgb(255, 140, 0)',
    buttonHover: 'rgb(220, 110, 0)',
  },
  {
    name: 'Mechanic Shops',
    bg: '/mechanicshops.png',
    heading: 'Reliable Mechanic Shops',
    subheading: 'Find trusted mechanics for your vehicle needs.',
    path: '/mechanic',
    color: 'rgb(182, 202, 30)',
    buttonColor: 'rgb(182, 202, 30)',
    buttonHover: 'rgb(20, 100, 20)',
  },
];

const Hero = ({ onLoginRequest }) => {
  const [index, setIndex] = useState(-1);
  const [animationType, setAnimationType] = useState('fade');
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationType(index % 2 === 0 ? 'slide' : 'fade');
      setIndex((prev) => (prev + 1) % (services.length + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [index]);

  const handleBookNow = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setLoginPromptOpen(true);
      return;
    }

    if (index >= 0) {
      const currentService = services[index % services.length];
      navigate(currentService.path);
    } else {
      navigate('/');
    }
  };

  if (index === -1) {
    return (
      <Box
        sx={{
          bgcolor: '#ce99ca',
          p: { xs: 2, md: 5 },
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          overflowX: { xs: 'auto', md: 'visible' },
          gap: { xs: 2, md: 0 },
          height: { xs: '400px', md: '500px', lg: '400px' },
        }}
      >
        <Box sx={{ minWidth: { xs: '60%', md: 'auto' } }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: 'white', fontSize: { xs: '1.5rem', md: '2.125rem' } }}
          >
            A more human way <br />
            to learn
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              width: { xs: '100%', md: '80%' },
              color: 'white',
              fontSize: { xs: '1rem', md: '1.125rem' },
            }}
          >
            We understand what it means to <b>teran</b> about human needs and <br />
            provide educational resources that can <b>Fue</b> that today.
          </Typography>
          {/* <Button
            variant="contained"
            endIcon={<ExpandMoreIcon />}
            onClick={handleBookNow}
            sx={{
              mt: 3,
              backgroundColor: '#ce99ca',
              '&:hover': { backgroundColor: '#ff9cb1' },
              px: 3,
            }}
          >
            Book NOW
          </Button> */}
        </Box>
        <Box
          component="img"
          src="/illustration_hd.png"
          alt="illustration"
          sx={{
            width: { xs: '40%', md: '40%' },
            maxWidth: 400,
          }}
        />
      </Box>
    );
  }

  const currentService = services[index % services.length];

  const Content = (
    <Box
      sx={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        px: { xs: 2, md: 10 },
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 1, color: currentService.color }}
      >
        {currentService.heading}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: currentService.color }}>
        {currentService.subheading}
      </Typography>

      <Button
        variant="contained"
        endIcon={<ExpandMoreIcon />}
        onClick={handleBookNow}
        sx={{
          backgroundColor: currentService.buttonColor,
          color: currentService.name === 'Laboratories' ? 'black' : 'white',
          minWidth: '120px',
          maxWidth: '180px',
          paddingX: '12px',
          '&:hover': {
            backgroundColor: currentService.buttonHover,
          },
        }}
      >
        Book NOW
      </Button>
    </Box>
  );

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '400px', md: '500px' },
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${currentService.bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 1s ease-in-out',
        }}
      />
      {animationType === 'fade' ? (
        <Fade in timeout={1000} key={currentService.name}>
          {Content}
        </Fade>
      ) : (
        <Slide direction="up" in timeout={1000} key={currentService.name}>
          {Content}
        </Slide>
      )}

      {/* Login Prompt Dialog */}
      <Dialog open={loginPromptOpen} onClose={() => setLoginPromptOpen(false)} maxWidth="xs" fullWidth>
  <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', mt: 2 }}>
    Login Required
    <IconButton
      onClick={() => setLoginPromptOpen(false)}
      sx={{
        position: 'absolute',
        top: 8,
        right: 8,
        color: '#333',
        '&:hover': {
          color: '#999',
          backgroundColor: 'transparent',
        },
      }}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  </DialogTitle>
  <DialogContent sx={{ textAlign: 'center', pb: 3 }}>
    <Typography variant="body1" sx={{ mb: 2 }}>
      Please login to continue booking.
    </Typography>
    <Button
      variant="contained"
      onClick={() => {
        setLoginPromptOpen(false);
        onLoginRequest && onLoginRequest();  // Trigger login popup from parent
      }}
      sx={{
        backgroundColor: '#4b0082',
        '&:hover': { backgroundColor: '#3a006a' },
        borderRadius: '30px',
        px: 4,
        py: 1,
        fontSize: '14px',
        textTransform: 'none',
      }}
    >
      Login Now
    </Button>
  </DialogContent>
</Dialog>

    </Box>
  );
};

export default Hero;