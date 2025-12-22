import React from 'react';
import { Link } from 'react-router-dom';

const HairCare: React.FC = () => (
  <div className="min-h-screen bg-white p-8">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold text-purple-700 mb-6 text-center font-montserrat">Hair Care</h1>
      <p className="max-w-3xl text-lg text-gray-700 mb-10 text-center mx-auto">
        Nourish, protect, and revitalize your hair with our professional-grade hair care products. Everything you need for healthy, beautiful hair.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
          <div className="text-5xl mb-4 text-center">🧴</div>
          <h3 className="text-2xl font-bold text-purple-600 mb-3 text-center">Shampoos</h3>
          <p className="text-gray-600 text-center">Gentle, nourishing shampoos for all hair types and concerns.</p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
          <div className="text-5xl mb-4 text-center">💧</div>
          <h3 className="text-2xl font-bold text-purple-600 mb-3 text-center">Conditioners</h3>
          <p className="text-gray-600 text-center">Deep conditioning treatments for silky, manageable hair.</p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
          <div className="text-5xl mb-4 text-center">✨</div>
          <h3 className="text-2xl font-bold text-purple-600 mb-3 text-center">Hair Oils</h3>
          <p className="text-gray-600 text-center">Nourishing oils for shine, strength, and hair growth.</p>
        </div>
      </div>
      
      <div className="text-center mt-12">
        <Link to="/products" className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all">
          Shop All Hair Care Products →
        </Link>
      </div>
    </div>
  </div>
);

export default HairCare;
