import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  Modal,
  IconButton,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { Html5Qrcode } from 'html5-qrcode';

const MyOffers = () => {
  const navigate = useNavigate();
  const [openScanner, setOpenScanner] = useState(false);
  const [mode, setMode] = useState(null); // 'camera' or 'file'
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const qrRegionId = 'qr-region';
  const scannerRef = useRef(null);

  const handleApplyOffer = () => {
    navigate('/');
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.stop().then(() => {
        scannerRef.current.clear();
        scannerRef.current = null;
      });
    }
  };

  const startCameraScan = () => {
    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode(qrRegionId);
    }

    scannerRef.current
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          alert(`QR Code: ${decodedText}`);
          setOpenScanner(false);
          stopScanner();
        },
        () => {}
      )
      .catch((err) => console.error('Camera start failed', err));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode(qrRegionId);
    }

    scannerRef.current
      .scanFile(file, true)
      .then((decodedText) => {
        alert(`QR Code: ${decodedText}`);
        setOpenScanner(false);
        setFileInputKey(Date.now()); // reset input
      })
      .catch((err) => {
        alert('QR code not found in the image.');
        console.error(err);
        setFileInputKey(Date.now());
      });
  };

 useEffect(() => {
  if (openScanner && mode === 'camera') {
    const delayStart = setTimeout(() => {
      const qrEl = document.getElementById(qrRegionId);
      if (qrEl) {
        startCameraScan(); // ✅ Only call when element is available
      }
    }, 300); // wait for modal + div to render

    return () => clearTimeout(delayStart);
  }

  return () => stopScanner();
}, [openScanner, mode]);

  return (
    <Box sx={{ p: 3, position: 'relative' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        My Offers
      </Typography>

      <Button
        variant="outlined"
        onClick={() => setOpenScanner(true)}
        sx={{
          position: 'absolute',
          right: 24,
          top: 24,
          borderRadius: 5,
          textTransform: 'none',
          borderColor: '#5c7a33',
          color: '#5c7a33',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#e6f2dc',
          },
        }}
      >
        Scan Offer Code
      </Button>

      <Card
        sx={{
          width: '100%',
          maxWidth: 400,
          mx: 'auto',
          p: 2,
          borderRadius: 3,
          background: 'linear-gradient(to bottom right, #a8dfb9, #96d4eb)',
          boxShadow: 3,
        }}
      >
        <Typography
          sx={{
            bgcolor: '#ffffff80',
            color: '#000',
            display: 'inline-block',
            fontWeight: 'bold',
            borderRadius: 1,
            px: 1.5,
            py: 0.5,
            fontSize: 12,
          }}
        >
          50% OFFER
        </Typography>

        <Box
          sx={{
            mt: 2,
            mb: 1,
            bgcolor: '#fff',
            color: '#1976d2',
            fontWeight: 'bold',
            borderRadius: 1,
            textAlign: 'center',
            py: 1,
            fontSize: 18,
          }}
        >
          GOZLOT50
        </Box>

        <Typography variant="body2" color="white">
          50% Offer
        </Typography>
        <Typography variant="body2" color="white">
          Valid for All Type of Bookings.
        </Typography>
        <Typography variant="body2" color="white" gutterBottom>
          Valid for All Customers.
        </Typography>

        <Box sx={{ mt: 2, textAlign: 'right' }}>
          <Button
            variant="contained"
            onClick={handleApplyOffer}
            sx={{
              borderRadius: 10,
              textTransform: 'none',
              px: 3,
              py: 0.5,
              fontWeight: 'bold',
              backgroundColor: '#2196f3',
              '&:hover': {
                backgroundColor: '#1976d2',
              },
            }}
          >
            Apply Offer
          </Button>
        </Box>
      </Card>

      {/* QR Scanner Modal */}
      <Modal open={openScanner} onClose={() => setOpenScanner(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            borderRadius: 2,
            p: 2,
            boxShadow: 24,
            textAlign: 'center',
            width: 360,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              SCAN QR CODE
            </Typography>
            <IconButton onClick={() => setOpenScanner(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {mode === null && (
            <Stack spacing={1}>
              <Button
                variant="outlined"
                onClick={() => setMode('camera')}
              >
                Start Scanning
              </Button>
              <Button
                variant="text"
                onClick={() => setMode('file')}
              >
                Scan an Image File
              </Button>
            </Stack>
          )}

          {mode === 'camera' && <div id={qrRegionId} style={{ width: '100%', minHeight: 300, marginBottom: 12 }} />}

          {mode === 'file' && (
            <>
              <input
                key={fileInputKey}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ margin: '16px 0' }}
              />
              <Button variant="text" onClick={() => setMode('camera')}>
                Scan using camera directly
              </Button>
            </>
          )}

          <Button onClick={() => setOpenScanner(false)} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default MyOffers;
