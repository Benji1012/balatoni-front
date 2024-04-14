
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './layout/navbar';
import Home from './pages/Home';
import ViewUser from './users/ViewUser';
import Reservations from './reservations/Reservations';
import ApartmanReservations from './reservations/ApartmanReservations';
import Apartmants from './apartmans/Apartmans';
import AddApartman from './apartmans/AddApartman';
import ViewApartman from './apartmans/ViewApartman';
import AdViewApartman from './apartmans/AdViewApartman';
import AdViewApartman2 from './apartmans/AdViewApartman2';
import AddReview from './reviews/AddReview';
import RegistrationLogin from './pages/RegistrationLogin';
import { UserProvider } from './contexts/UserContext';



function App() {
  const LayoutWithNavbar = () => {
    const location = useLocation();

    return (
      <>
        {location.pathname !== "/registration-login" && <Navbar />}
        <Routes>
          <Route path="/registration-login" element={<RegistrationLogin />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile/:userId" element={<ViewUser />} />
          <Route path="/apartmants/:userId" element={<Apartmants />} />
          <Route path="/reservations/:userId" element={<Reservations />} />
          <Route path="/newapartmant" element={<AddApartman />} />
          <Route path="/viewApartman/:apartmentId" element={<ViewApartman />} />
          <Route path="/adWiewApartman/:apartmentId/:rentingFrom/:rentingTo" element={<AdViewApartman />} />
          <Route path="/adWiewApartman2/:reservationId/:apartmentId/:rentingFrom/:rentingTo" element={<AdViewApartman2 />} />
          <Route path="/addReview/:apartmentId/:userId" element={<AddReview />} />
          <Route path="/aprtmanReservations/:apartmentId" element={<ApartmanReservations />} />


        </Routes>
      </>
    );
  };

  return (
    <UserProvider>
      <Router>
        <LayoutWithNavbar />
      </Router>
    </UserProvider>
  );
}

export default App;