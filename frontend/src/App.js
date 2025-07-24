import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventSection from './components/EventSection';
import Hospitals from './components/Hospitals';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Laboratories from './components/Laboratories';
import Pourlars from './components/Pourlars';
import Salons from './components/Salons';
import HospitalLogin from "./components/HospitalLogin";
import PourlarLogin from "./components/PourlarLogin";
import Gym from "./components/Gym";
import Drawingclass from "./components/Drawingclass";

import GymLogin from "./components/GymLogin";
import LabLogin from "./components/LabLogin";
import SalonLogin from "./components/SalonLogin";
import DrawingLogin from "./components/DrawingLogin";
import AppointmentList from './components/AppointmentList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BusinessList from './components/BusinessList';
import AdminPage from './components/AdminRegister';
import CarShowrooms from './components/CarShowrooms';
import CarLogin from './components/CarLogin';
import Electronic from './components/Electronic';
import ElectronicLogin from './components/ElectronicLogin';
import Mechanic from './components/Mechanic';
import MechanicLogin from './components/MechanicLogin';
import HomePage from './pages/HomePage';
import Profile from './components/Profile';
import MyOffers from './components/MyOffers';
import MyBookings from './components/MyBookings';
import PhoneAuth from './components/PhoneAuth';
import AdminSidebar from './components/AdminSidebar';
import LoginPage from './components/LoginPopup';
import Footer from './components/Footer'; // Ensure this path is correct
import PopupForm from './components/popupForm'; // Ensure this path is correct
import AdminLoginPage from './components/AdminLoginPage';
import User from './components/User'; // Ensure this path is correct
// const theme = createTheme({
//   typography: {
//     fontFamily: 'Michroma, sans-serif',
//   },
// });
const theme = createTheme({
  typography: {
    fontFamily: 'Nunito Sans, sans-serif',
  },
});



function App() {
  return (
        <ThemeProvider theme={theme}>
    <Router> {/* ✅ Wrap everything inside Router */}
      <Routes>
                <Route path="/" element={<HomePage />} />
       
      <Route path="/navbar" element={<Navbar/>}/>
        <Route path="/hero" element={<Hero/>}/>
        <Route path="/main" element={<EventSection />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/laboratories" element={<Laboratories />} />
        <Route path="/pourlars" element={<Pourlars />} />
        <Route path="/Salons" element={<Salons />} />
                <Route path="/Drawingclass" element={<Drawingclass />} />
                          <Route path="/my-bookings" element={<MyBookings />} />

          <Route path="/hospital-login" element={<HospitalLogin />} />
          <Route path="/pourlarlogin" element={<PourlarLogin/>}/>
           <Route path="/gyms" element={<Gym/>}/>
          <Route path="/gymlogin" element={<GymLogin/>}/>
           <Route path="/lablogin" element={<LabLogin/>}/>
           <Route path="/salonlogin" element={<SalonLogin/>}/>
          <Route path="/drawinglogin" element={<DrawingLogin/>}/>
                           <Route path="/admin-register" element={<AdminPage />} />
                                <Route path="/carshowroom" element={<CarShowrooms />} />
                                <Route path="/car-login" element={<CarLogin />} />
                                <Route path="/electronic" element={<Electronic />} />
                                <Route path="/electronic-login" element={<ElectronicLogin />} />
               <Route path="/mechanic" element={<Mechanic />} />
          <Route path="/mechanic-login" element={<MechanicLogin />} />
                <Route path="/my-offers" element={<MyOffers />} />
                <Route path="/otp" element={<PhoneAuth />} />
                <Route path="/admin" element={<AdminSidebar />} />
                          <Route path="/appointments" element={<AppointmentList/>}/>
                 <Route path="/businesslist" element={<BusinessList />} />
                             <Route path="/profile" element={<Profile />} />

<Route path="/login" element={<LoginPage />} />
<Route path='/popup' element={<PopupForm />} />
<Route path='/admin-login' element={<AdminLoginPage />} />

<Route path="/user" element={<User />} />




      </Routes>
      
    </Router>
        </ThemeProvider>
  );
}

export default App;
