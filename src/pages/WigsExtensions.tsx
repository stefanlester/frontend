import React from 'react';

const WigsExtensions: React.FC = () => (
  <div className="min-h-screen bg-white p-8">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold text-pink-700 mb-6 text-center font-montserrat">Wigs & Extensions</h1>
      <p className="max-w-3xl text-lg text-gray-700 mb-10 text-center mx-auto">
        Discover our premium collection of wigs and hair extensions. From natural-looking styles to bold fashion statements, find your perfect look.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
          <div className="text-5xl mb-4 text-center">👱‍♀️</div>
          <h3 className="text-2xl font-bold text-pink-600 mb-3 text-center">Human Hair Wigs</h3>
          <p className="text-gray-600 text-center">100% natural human hair wigs for the most authentic look and feel.</p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
          <div className="text-5xl mb-4 text-center">✨</div>
          <h3 className="text-2xl font-bold text-pink-600 mb-3 text-center">Synthetic Wigs</h3>
          <p className="text-gray-600 text-center">High-quality synthetic wigs that are easy to maintain and style.</p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
          <div className="text-5xl mb-4 text-center">💫</div>
          <h3 className="text-2xl font-bold text-pink-600 mb-3 text-center">Hair Extensions</h3>
          <p className="text-gray-600 text-center">Add length and volume with our premium hair extension collection.</p>
        </div>
      </div>
      
      <div className="text-center mt-12">
        <a href="/products" className="inline-block bg-gradient-to-r from-pink-500 to-rose-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all">
          Shop All Wigs & Extensions →
        </a>
      </div>
    </div>
  </div>
);

export default WigsExtensions;
