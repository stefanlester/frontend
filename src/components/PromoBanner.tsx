import React from 'react';
import { Link } from 'react-router-dom';

const PromoBanner = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-brand-primary via-brown-600 to-brown-700 py-20 px-4">
    {/* Animated background shapes */}
    <div className="absolute top-0 left-0 w-64 h-64 bg-gold-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
    <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold-300 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
    <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-brown-300 rounded-full opacity-30 blur-2xl animate-float"></div>
    
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="text-white">
          <span className="inline-block bg-gradient-gold text-white px-5 py-2 rounded-full font-bold text-sm mb-4 shadow-gold animate-shimmer">
            ⏰ NEW CLIENT SPECIAL
          </span>
          <h2 className="text-5xl font-heading font-extrabold mb-4 drop-shadow-lg leading-tight">
            First Appointment?
            <br />
            <span className="text-gold-300">Get 20% Off!</span>
          </h2>
          <p className="text-xl text-brown-100 mb-6 leading-relaxed">
            Book your first session and experience premium hair styling at an exclusive rate.
          </p>
          <div className="flex items-center gap-3 mb-8 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
            <div className="flex-1">
              <p className="text-sm text-brown-100 mb-1">Use promo code at booking:</p>
              <p className="text-2xl font-bold text-gold-300 tracking-wider">FIRST20</p>
            </div>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-semibold transition-all">
              Copy
            </button>
          </div>
          <div className="flex gap-4">
            <Link
              to="/booking"
              className="btn-gold px-8 py-4 text-lg font-bold shadow-2xl transform hover:scale-105 transition-all"
            >
              Book Now →
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-brand-primary transition-all"
            >
              Learn More
            </Link>
          </div>
          <div className="flex items-center gap-4 mt-8 text-brown-100">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span className="text-sm"><span className="font-bold text-white">4.9/5</span> Rating</span>
            </div>
            <div className="w-px h-6 bg-white/30"></div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">👥</span>
              <span className="text-sm"><span className="font-bold text-white">500+</span> Happy Clients</span>
            </div>
          </div>
        </div>
        <div className="relative hidden md:block">
          <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
            <img
              src="/HAIR PICS/MAKEOVERS AND GLAM BEATS/WhatsApp Image 2025-12-21 at 12.26.25 (2).jpeg"
              alt="Chi's Luxe Beauties Promo"
              className="rounded-3xl shadow-2xl border-4 border-white/20"
            />
            <div className="absolute -bottom-6 -right-6 bg-gradient-gold text-white px-8 py-5 rounded-2xl font-bold text-3xl shadow-2xl transform rotate-3">
              20% OFF
            </div>
            <div className="absolute -top-6 -left-6 bg-white text-brand-primary px-6 py-3 rounded-xl font-bold shadow-xl">
              ✨ New Client
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PromoBanner;
