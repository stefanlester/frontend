import React from 'react';

const HairAccessories: React.FC = () => (
  <div className="min-h-screen bg-white p-8">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold text-orange-700 mb-6 text-center font-montserrat">Hair Accessories</h1>
      <p className="max-w-3xl text-lg text-gray-700 mb-10 text-center mx-auto">
        Complete your look with our stunning collection of hair accessories. From elegant clips to trendy scrunchies, find the perfect finishing touch.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
          <div className="text-5xl mb-4 text-center">🎀</div>
          <h3 className="text-2xl font-bold text-orange-600 mb-3 text-center">Hair Clips & Pins</h3>
          <p className="text-gray-600 text-center">Stylish clips and pins to hold your hair in place beautifully.</p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
          <div className="text-5xl mb-4 text-center">🌸</div>
          <h3 className="text-2xl font-bold text-orange-600 mb-3 text-center">Scrunchies</h3>
          <p className="text-gray-600 text-center">Gentle, fashionable scrunchies in a variety of colors and fabrics.</p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
          <div className="text-5xl mb-4 text-center">👑</div>
          <h3 className="text-2xl font-bold text-orange-600 mb-3 text-center">Headbands & Tiaras</h3>
          <p className="text-gray-600 text-center">Elegant headbands and tiaras for special occasions or everyday wear.</p>
        </div>
      </div>
      
      <div className="text-center mt-12">
        <a href="/products" className="inline-block bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all">
          Shop All Hair Accessories →
        </a>
      </div>
    </div>
  </div>
);

export default HairAccessories;
