import React from 'react';
import { Link } from 'react-router-dom';

const PromoBanner = () => (
  <section className="relative overflow-hidden bg-blue-600 py-20 px-4">
    {/* Animated background shapes */}
    <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full opacity-10 blur-3xl animate-pulse"></div>
    <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
    <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-yellow-300 rounded-full opacity-20 blur-2xl animate-bounce"></div>
    
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="text-white">
          <span className="inline-block bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm mb-4 animate-bounce">
            🔥 LIMITED TIME OFFER
          </span>
          <h2 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
            Chi's Luxe Beauties
            <br />
            <span className="text-yellow-300">30% Off First Order!</span>
          </h2>
          <p className="text-xl text-pink-100 mb-8">
            Use code <span className="font-bold text-yellow-300">WELCOME30</span> at checkout
          </p>
          <div className="flex gap-4">
            <Link
              to="/cart"
              className="bg-white text-pink-600 px-8 py-4 rounded-full font-bold shadow-2xl hover:bg-yellow-300 hover:text-gray-900 transition-all transform hover:scale-110"
            >
              Shop Now
            </Link>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-pink-600 transition-all">
              Learn More
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
            <img
              src="https://images.unsplash.com/photo-1522337094846-8a818192de1f?auto=format&fit=crop&w=600&q=80"
              alt="Promo"
              className="rounded-3xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-gray-900 px-8 py-4 rounded-2xl font-bold text-2xl shadow-2xl transform rotate-6">
              30% OFF
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PromoBanner;
