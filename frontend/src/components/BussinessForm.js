import React, { useRef, useState } from 'react';
import axios from 'axios';
import {
  Dialog, DialogTitle, DialogContent,
  Grid, TextField, Button, Box,
  Typography, MenuItem
} from '@mui/material';

const BusinessForm = ({ open, onClose }) => {
  const listingTypes = ['Hospital', 'Parlours', 'Laboratories',  'Salons','Electronic Service','Mechanic Shop','Car Showroom'];
  const orgTypes = ['Private', 'Public'];
  const vendorTypes = ['Retailer', 'Distributor'];

  const [loading, setLoading] = useState(false);

  const [orgType, setOrgType] = useState('');
  const [orgName, setOrgName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [landmark, setLandmark] = useState('');
  const [vendorType, setVendorType] = useState('');
  const [openingTime, setOpeningTime] = useState('');
  const [listingType, setListingType] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [altMobile, setAltMobile] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [areaName, setAreaName] = useState('');
  const [doorStreet, setDoorStreet] = useState('');
  const [pincode, setPincode] = useState('');
  const [closingTime, setClosingTime] = useState('');

  const idProofRef = useRef(null);
  const profileImgRef = useRef(null);

  const handleIdProofClick = () => idProofRef.current?.click();
  const handleProfileImgClick = () => profileImgRef.current?.click();

  const LavenderBtn = (props) => (
    <Button
      {...props}
      sx={{
        bgcolor: '#ce99ca',
        color: 'white',
        textTransform: 'none',
        fontFamily: 'Michroma, sans-serif',
        '&:hover': { bgcolor: '#ba7fb3' },
        ...(props.sx || {}),
      }}
    />
  );

  const handleSubmit = async () => {
    if (!orgName || !mobile || !listingType) {
      alert('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('orgType', orgType);
    formData.append('orgName', orgName);
    formData.append('mobile', mobile);
    formData.append('email', email);
    formData.append('city', city);
    formData.append('landmark', landmark);
    formData.append('vendorType', vendorType);
    formData.append('openingTime', openingTime);
    formData.append('listingType', listingType);
    formData.append('ownerName', ownerName);
    formData.append('altMobile', altMobile);
    formData.append('gstNumber', gstNumber);
    formData.append('areaName', areaName);
    formData.append('doorStreet', doorStreet);
    formData.append('pincode', pincode);
    formData.append('closingTime', closingTime);

    if (idProofRef.current?.files[0]) {
      formData.append('idProof', idProofRef.current.files[0]);
    }
    if (profileImgRef.current?.files[0]) {
      formData.append('profileImage', profileImgRef.current.files[0]);
    }

    try {
      const res = await axios.post('https://zenreserve-lc.onrender.com/api/business', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Business created successfully!');
      onClose();
    } catch (err) {
      console.error('❌ Error submitting:', err);
      alert('Failed to submit. Check console for error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs"    >
      <DialogTitle
        sx={{ bgcolor: '#ce99ca', color: 'white', fontWeight: 'bold', fontFamily: 'Michroma, sans-serif' }}
      >
     ZenReserve
      </DialogTitle>

      <DialogContent sx={{ bgcolor: '#fdfbfe', mt: 1 }}>
        <Grid container spacing={5}>
          <Grid container spacing={2}>
            {/* LEFT PANE */}
            <Box sx={{display:"flex",gap:5,}}>
              <Grid item xs={12} md={6} sx={{width:"140%"}}>
              <Box
                sx={{
                  border: '2px dashed #ce99ca',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: 'Michroma, sans-serif' }}>
                  ID Proof
                </Typography>
                <LavenderBtn variant="contained" onClick={handleIdProofClick}>
                  Choose File
                </LavenderBtn>
                <Typography variant="caption" display="block" mt={1} sx={{ fontFamily: 'Michroma, sans-serif' }}>
                  &lt; 1&nbsp;MB • pdf&nbsp;/&nbsp;jpg
                </Typography>
                <input ref={idProofRef} type="file" accept=".pdf,.jpg,.jpeg" style={{ display: 'none' }} />
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <TextField
                  select
                  label="Organization Type"
                  size="small"
                  value={orgType}
                  onChange={(e) => setOrgType(e.target.value)}
                  InputLabelProps={{ sx: { fontFamily: 'Michroma, sans-serif' } }}
                  sx={{ fontFamily: 'Michroma, sans-serif', width: '100%' }}
                >
                  <MenuItem value="" disabled sx={{ fontFamily: 'Michroma, sans-serif' }}>
                    -- Select Organization Type --
                  </MenuItem>
                  {orgTypes.map((t) => (
                    <MenuItem key={t} value={t} sx={{ fontFamily: 'Michroma, sans-serif' }}>
                      {t}
                    </MenuItem>
                  ))}
                </TextField>

                {[orgName, mobile, email, city, landmark].map((val, i) => (
                  <TextField
                    key={i}
                    fullWidth
                    label={['Organization Name', 'Mobile Number', 'Email ID', 'City/District', 'Landmark/Near by'][i]}
                    size="small"
                    value={val}
                    onChange={(e) => [
                      setOrgName,
                      setMobile,
                      setEmail,
                      setCity,
                      setLandmark,
                    ][i](e.target.value)}
                    sx={{ fontFamily: 'Michroma, sans-serif', width: '100%' }}
                    InputLabelProps={{ sx: { fontFamily: 'Michroma, sans-serif' } }}
                  />
                ))}

                <TextField
                  select
                  label="Vendor Type"
                  size="small"
                  value={vendorType}
                  onChange={(e) => setVendorType(e.target.value)}
                  InputLabelProps={{ sx: { fontFamily: 'Michroma, sans-serif' } }}
                  sx={{ fontFamily: 'Michroma, sans-serif', width: '100%' }}
                >
                  {vendorTypes.map((t) => (
                    <MenuItem key={t} value={t} sx={{ fontFamily: 'Michroma, sans-serif' }}>
                      {t}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  type="time"
                  fullWidth
                  label="Opening Time"
                  size="small"
                  value={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                  InputLabelProps={{ shrink: true, sx: { fontFamily: 'Michroma, sans-serif' } }}
                  sx={{ fontFamily: 'Michroma, sans-serif', width: '100%' }}
                />
              </Box>
            </Grid>

            {/* RIGHT PANE */}
            <Grid item xs={12} md={6}  sx={{width:"140%"}}>
              <Box
                sx={{
                  border: '2px dashed #ce99ca',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: 'Michroma, sans-serif' }}>
                  Profile Image
                </Typography>
              <LavenderBtn
  variant="contained"
  onClick={handleProfileImgClick}
  sx={{
    fontSize: '14px', // use fontSize (camelCase), not fontsize
    px: 1.6,          // adjust padding X if needed
    py: 0.6,          // adjust padding Y if needed
    minWidth: 'auto', // remove default min-width if you want button to shrink
  }}
>
  Choose Image
</LavenderBtn>

                <Typography variant="caption" display="block" mt={1} sx={{ fontFamily: 'Michroma, sans-serif' }}>
                  1:1 ratio • jpg / png
                </Typography>
                <input ref={profileImgRef} type="file" accept=".jpg,.jpeg,.png" style={{ display: 'none' }} />
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {[
                  { label: 'Listing Type', value: listingType, setter: setListingType, options: listingTypes, select: true },
                  { label: 'Owner Name', value: ownerName, setter: setOwnerName },
                  { label: 'Alternate Mobile Number', value: altMobile, setter: setAltMobile },
                  { label: 'GST Number', value: gstNumber, setter: setGstNumber },
                  { label: 'Area Name', value: areaName, setter: setAreaName },
                  { label: 'Door No & Street', value: doorStreet, setter: setDoorStreet },
                  { label: 'Pincode', value: pincode, setter: setPincode },
                ].map((field, i) =>
                  field.select ? (
                    <TextField
                      key={i}
                      select
                      required
                      label={field.label}
                      size="small"
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      InputLabelProps={{ sx: { fontFamily: 'Michroma, sans-serif' } }}
                      sx={{ fontFamily: 'Michroma, sans-serif', width: '100%' }}
                    >
                      {field.options.map((option) => (
                        <MenuItem key={option} value={option} sx={{ fontFamily: 'Michroma, sans-serif' }}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <TextField
                      key={i}
                      fullWidth
                      label={field.label}
                      size="small"
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      InputLabelProps={{ sx: { fontFamily: 'Michroma, sans-serif' } }}
                      sx={{ fontFamily: 'Michroma, sans-serif', width: '100%' }}
                    />
                  )
                )}

                <TextField
                  type="time"
                  fullWidth
                  label="Closing Time"
                  InputLabelProps={{ shrink: true, sx: { fontFamily: 'Michroma, sans-serif' } }}
                  size="small"
                  value={closingTime}
                  onChange={(e) => setClosingTime(e.target.value)}
                  sx={{ fontFamily: 'Michroma, sans-serif', width: '100%' }}
                />
              </Box>
            </Grid>
            </Box>

            <Grid item xs={12}>
              <Box sx={{ mt: 3, display: 'flex',  gap: 4, ml: '100px' }}>
                <LavenderBtn variant="contained" onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </LavenderBtn>
                <Button
                  variant="outlined"
                  onClick={onClose}
                  sx={{
                    color: '#ce99ca',
                    borderColor: '#ce99ca',
                    fontFamily: 'Michroma, sans-serif',
                    '&:hover': { bgcolor: '#f5e9f4', borderColor: '#ce99ca' },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessForm;
