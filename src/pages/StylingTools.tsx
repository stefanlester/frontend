import React from 'react';
import { Link } from 'react-router-dom';

const StylingTools: React.FC = () => (
  <div className="min-h-screen bg-white p-8">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold text-blue-700 mb-6 text-center font-montserrat">Styling Tools</h1>
      <p className="max-w-3xl text-lg text-gray-700 mb-10 text-center mx-auto">
        Professional-quality styling tools to help you create salon-perfect looks at home. From straighteners to curlers, we have it all.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
          <div className="text-5xl mb-4 text-center">💨</div>
          <h3 className="text-2xl font-bold text-blue-600 mb-3 text-center">Hair Dryers</h3>
          <p className="text-gray-600 text-center">Professional-grade dryers for quick, damage-free drying.</p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
          <div className="text-5xl mb-4 text-center">〰️</div>
          <h3 className="text-2xl font-bold text-blue-600 mb-3 text-center">Straighteners</h3>
          <p className="text-gray-600 text-center">Ceramic and titanium straighteners for sleek, smooth styles.</p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
          <div className="text-5xl mb-4 text-center">🌀</div>
          <h3 className="text-2xl font-bold text-blue-600 mb-3 text-center">Curling Irons</h3>
          <p className="text-gray-600 text-center">Create beautiful curls and waves with our styling tools.</p>
        </div>
      </div>
      
      <div className="text-center mt-12">
        <Link to="/products" className="inline-block bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all">
          Shop All Styling Tools →
        </Link>
      </div>
    </div>
  </div>
);

export default StylingTools;
