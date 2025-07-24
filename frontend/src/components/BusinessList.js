import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton, 
   Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
  import CloseIcon from '@mui/icons-material/Close';
   import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';



const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState(null);
const [open, setOpen] = useState(false);

const handleViewClick = (business) => {
  setSelectedBusiness(business);
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
  setSelectedBusiness(null);
};


  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await axios.get('https://zenreserve-lc.onrender.com/api/business');
        setBusinesses(res.data);
      } catch (err) {
        console.error('Error fetching businesses:', err);
      }
    };
    fetchBusinesses();
  }, []);

  const filteredBusinesses = businesses.filter(b =>
    Object.values(b).some(value =>
      value &&
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <Box
      sx={{
        p: 4,
        minHeight: '100vh',
        backgroundColor: '#f1f4f6',  // light pink page background
      }}
    >


<Box
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3,
    gap: 2,
    flexWrap: 'wrap',
  }}
>
  <Typography variant="h5" fontWeight="bold">
    Business List Report
  </Typography>

  <TextField
    placeholder="Search businesses..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    sx={{
      backgroundColor: 'white',
      borderRadius: 1,
      width: { xs: '100%', sm: '300px' },
    }}
    size="small"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon sx={{ color: '#880e4f' }} />
        </InputAdornment>
      ),
    }}
  />
</Box>



      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 600,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#fce4ec',
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e8b5e8' }}>Organization Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e8b5e8' }}>Listing Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e8b5e8' }}>Organization Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e8b5e8' }}>Owner Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e8b5e8' }}>Mobile Number</TableCell>
              {/*<TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e8b5e8' }}>Alternate Mobile</TableCell>*/}
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e8b5e8' }}>Email</TableCell>
             {/* <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e8b5e8' }}>GST Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e8b5e8' }}>City/District</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e8b5e8' }}>Area Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e8b5e8' }}>Landmark</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e8b5e8' }}>Door No & Street</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e8b5e8' }}>Vendor Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e8b5e8' }}>Pincode</TableCell>*/}
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e8b5e8' }}>Opening Time</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e8b5e8' }}>Closing Time</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e8b5e8' }}>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBusinesses.map((b, i) => (
              <TableRow
                key={i}
                hover
                sx={{
                  backgroundColor: i % 2 === 0 ? '#f9eff9' : '#f6e6f6' 
                }}
              >
                <TableCell>{b.orgType || '-'}</TableCell>
                <TableCell>{b.listingType || '-'}</TableCell>
                <TableCell>{b.orgName || '-'}</TableCell>
                <TableCell>{b.ownerName || '-'}</TableCell>
                <TableCell>{b.mobileNumber || '-'}</TableCell>
                {/*<TableCell>{b.altMobileNumber || '-'}</TableCell>*/}
                <TableCell>{b.email || '-'}</TableCell>
               {/* <TableCell>{b.gstNumber || '-'}</TableCell>
                <TableCell>{b.city || '-'}</TableCell>
                <TableCell>{b.areaName || '-'}</TableCell>
                <TableCell>{b.landmark || '-'}</TableCell>
                <TableCell>{b.doorStreet || '-'}</TableCell>
                <TableCell>{b.vendorType || '-'}</TableCell>
                <TableCell>{b.pincode || '-'}</TableCell>*/}
                <TableCell>{b.openingTime || '-'}</TableCell>
                <TableCell>{b.closingTime || '-'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleViewClick(b)}>
  <VisibilityIcon sx={{ color: '#d81b60' }} />
</IconButton>

 
 </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
     

  <Dialog
  open={open}
  onClose={handleClose}
  maxWidth="md"
  fullWidth
  BackdropProps={{
    sx: {
      backgroundColor: 'rgba(236, 226, 226, 0)',
      backdropFilter: 'blur(6px)',
    },
  }}
  PaperProps={{
    sx: {
      boxShadow: 'none',
      borderRadius: 2,
    },
  }}
>


<DialogTitle
  sx={{
    backgroundColor: '#ce99ca',
    color: '#4a004e',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}
>
  Business Details
  <IconButton onClick={handleClose}>
    <CloseIcon sx={{ color: '#4a004e' }} />
  </IconButton>
</DialogTitle>

<DialogContent sx={{ backgroundColor: '#fce4ec' }}>
  {selectedBusiness && (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
      
{/* ID Proof Image & Profile Image side by side */}
<Box
  sx={{
    gridColumn: '1 / span 2',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 2,
  }}
>
  {/* ID Proof Image */}
  {selectedBusiness.idProof && (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f8bbd0',
        p: 1,
        borderRadius: 1,
      }}
    >
      <Typography fontWeight="bold" sx={{ color: '#880e4f' }}>
        ID Proof Image
      </Typography>
      <Box
        component="img"
        src={`https://zenreserve-lc.onrender.com/uploads/${selectedBusiness.idProof}`}
        alt="ID Proof"
        sx={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 1 }}
      />
    </Box>
  )}

  {/* Profile Image */}
  {selectedBusiness.profileImage && (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f8bbd0',
        p: 1,
        borderRadius: 1,
      }}
    >
      <Typography fontWeight="bold" sx={{ color: '#880e4f' }}>
        Profile Image
      </Typography>
      <Box
        component="img"
        src={`https://zenreserve-lc.onrender.com/uploads/${selectedBusiness.profileImage}`}
        alt="Profile"
        sx={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 1 }}
      />
    </Box>
  )}
</Box>



      {/* 2. Organisation Type - Listing Type */}
      {['orgType', 'listingType'].map((key, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f8bbd0',
            p: 1,
            borderRadius: 1,
          }}
        >
          <Typography fontWeight="bold" sx={{ color: '#880e4f' }}>
            {key === 'orgType' ? 'Organisation Type' : 'Listing Type'}
          </Typography>
          <Typography>{selectedBusiness[key] || '-'}</Typography>
        </Box>
      ))}

      {/* 3. Organisation Name - Owner Name */}
      {['orgName', 'ownerName'].map((key, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f8bbd0',
            p: 1,
            borderRadius: 1,
          }}
        >
          <Typography fontWeight="bold" sx={{ color: '#880e4f' }}>
            {key === 'orgName' ? 'Organisation Name' : 'Owner Name'}
          </Typography>
          <Typography>{selectedBusiness[key] || '-'}</Typography>
        </Box>
      ))}

      {/* 4. Mobile Number - Alternate Mobile */}
      {['mobileNumber', 'altMobileNumber'].map((key, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f8bbd0',
            p: 1,
            borderRadius: 1,
          }}
        >
          <Typography fontWeight="bold" sx={{ color: '#880e4f' }}>
            {key === 'mobileNumber' ? 'Mobile Number' : 'Alternate Mobile'}
          </Typography>
          <Typography>{selectedBusiness[key] || '-'}</Typography>
        </Box>
      ))}

      {/* 5. Email - GST Number */}
      {['email', 'gstNumber'].map((key, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f8bbd0',
            p: 1,
            borderRadius: 1,
          }}
        >
          <Typography fontWeight="bold" sx={{ color: '#880e4f' }}>
            {key === 'email' ? 'Email' : 'GST Number'}
          </Typography>
          <Typography>{selectedBusiness[key] || '-'}</Typography>
        </Box>
      ))}

      {/* 6. City/District - Area Name */}
      {['city', 'areaName'].map((key, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f8bbd0',
            p: 1,
            borderRadius: 1,
          }}
        >
          <Typography fontWeight="bold" sx={{ color: '#880e4f' }}>
            {key === 'city' ? 'City/District' : 'Area Name'}
          </Typography>
          <Typography>{selectedBusiness[key] || '-'}</Typography>
        </Box>
      ))}

      {/* 7. Landmark - Door No & Street */}
      {['landmark', 'doorStreet'].map((key, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f8bbd0',
            p: 1,
            borderRadius: 1,
          }}
        >
          <Typography fontWeight="bold" sx={{ color: '#880e4f' }}>
            {key === 'landmark' ? 'Landmark' : 'Door No & Street'}
          </Typography>
          <Typography>{selectedBusiness[key] || '-'}</Typography>
        </Box>
      ))}

      {/* 8. Vendor Type - Pincode */}
      {['vendorType', 'pincode'].map((key, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f8bbd0',
            p: 1,
            borderRadius: 1,
          }}
        >
          <Typography fontWeight="bold" sx={{ color: '#880e4f' }}>
            {key === 'vendorType' ? 'Vendor Type' : 'Pincode'}
          </Typography>
          <Typography>{selectedBusiness[key] || '-'}</Typography>
        </Box>
      ))}

      {/* 9. Opening Time - Closing Time */}
      {['openingTime', 'closingTime'].map((key, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f8bbd0',
            p: 1,
            borderRadius: 1,
          }}
        >
          <Typography fontWeight="bold" sx={{ color: '#880e4f' }}>
            {key === 'openingTime' ? 'Opening Time' : 'Closing Time'}
          </Typography>
          <Typography>{selectedBusiness[key] || '-'}</Typography>
        </Box>
      ))}
    </Box>
  )}
</DialogContent>


</Dialog>
    </Box>
  );
};

export default BusinessList;
