
import React from 'react';
import { DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const LoginAlertPopup = ({ onClose }) => {
  return (
    <>
      <DialogTitle sx={{ bgcolor: '#ce99ca', color: 'white' }}>
        Login Required
      </DialogTitle>
      <DialogContent>
                <Typography>You need to be logged in to access this section.</Typography>

      </DialogContent>
      <DialogActions>
 <Button variant="contained" onClick={onClose} sx={{ backgroundColor: '#4b0082' }}>
          Close
        </Button>      </DialogActions>
    </>
  );
};

export default LoginAlertPopup;