
import React from 'react';
import { Link } from 'react-router-dom';
import hairLogo from '../hairlogo.png';

const Footer = () => (
  <footer className="bg-white dark:bg-gray-950 text-brand-primary dark:text-brand-accent py-12 mt-12 relative overflow-hidden border-t border-brand-muted">
    {/* Decorative shapes */}
    {/* Decorative shapes removed for a cleaner look */}
    
    <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center relative z-10">
      <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
        <div className="flex items-center gap-2 mb-2">
          <img src={hairLogo} alt="Chi's Luxe Beauties Logo" className="w-12 h-12 rounded-full shadow-lg bg-white" />
          <span className="font-heading text-2xl font-bold">Chi's Luxe Beauties</span>
        </div>
        <span className="text-brand-accent">&copy; {new Date().getFullYear()} All rights reserved</span>
      </div>
      <div className="flex flex-col md:flex-row gap-6 mb-6 md:mb-0">
        <div className="text-center md:text-left">
          <h5 className="font-bold mb-2">Shop</h5>
          <Link to="/products" className="block text-pink-200 hover:text-white transition-colors">Products</Link>
          <Link to="/cart" className="block text-pink-200 hover:text-white transition-colors">Cart</Link>
        </div>
        <div className="text-center md:text-left">
          <h5 className="font-bold mb-2">Company</h5>
          <Link to="/admin" className="block text-pink-200 hover:text-white transition-colors">Admin</Link>
          <Link to="/about-us" className="block text-pink-200 hover:text-white transition-colors" aria-label="About Us page">About Us</Link>
        </div>
      </div>
      <div className="text-center md:text-right">
        <div className="text-sm text-brand-accent mb-2">Made with ❤️ for beautiful hair</div>
        <div className="flex gap-3 justify-center md:justify-end">
          <span className="text-2xl hover:scale-110 transition-transform cursor-pointer">📱</span>
          <span className="text-2xl hover:scale-110 transition-transform cursor-pointer">💌</span>
          <span className="text-2xl hover:scale-110 transition-transform cursor-pointer">🌐</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
