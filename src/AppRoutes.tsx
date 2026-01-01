import Auth from './pages/Auth';
import Logout from './pages/Logout';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import Booking from './pages/Booking';
import LastMinuteBookings from './pages/LastMinuteBookings';

import AboutUs from './pages/AboutUs';
import NaturalCollection from './pages/NaturalCollection';
import LuxuryWigs from './pages/LuxuryWigs';
import HairCareEssentials from './pages/HairCareEssentials';
import WigsExtensions from './pages/WigsExtensions';
import HairCare from './pages/HairCare';
import StylingTools from './pages/StylingTools';
import HairAccessories from './pages/HairAccessories';

const AppRoutes = ({ onAuth }: { onAuth: (token: string, email: string) => void }) => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Products />} />
    <Route path="/auth" element={<Auth onAuth={onAuth} />} />
    <Route path="/logout" element={<Logout />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/booking" element={<Booking />} />
    <Route path="/last-minute" element={<LastMinuteBookings />} />
    <Route path="/about-us" element={<AboutUs />} />
    <Route path="/collections/natural" element={<NaturalCollection />} />
    <Route path="/collections/luxury-wigs" element={<LuxuryWigs />} />
    <Route path="/collections/hair-care-essentials" element={<HairCareEssentials />} />
    <Route path="/category/wigs-extensions" element={<WigsExtensions />} />
    <Route path="/category/hair-care" element={<HairCare />} />
    <Route path="/category/styling-tools" element={<StylingTools />} />
    <Route path="/category/hair-accessories" element={<HairAccessories />} />
  </Routes>
);

export default AppRoutes;
