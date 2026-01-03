import React from 'react';

const AboutUs: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-8">
    <div className="max-w-5xl w-full">
      <h1 className="text-5xl font-extrabold text-pink-700 mb-8 text-center drop-shadow-lg">About Chi's Luxe Beauties</h1>
      
      <div className="bg-white rounded-2xl shadow-2xl p-10 mb-8">
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Chi's Luxe Beauties is a luxury beauty brand built on passion, consistency, and purpose. We believe beauty goes beyond appearance • it is about confidence, satisfaction, and elevation. Every experience is thoughtfully curated to enhance not only how you look, but how you feel.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Our work is rooted in love, intention, and attention to detail, ensuring every client leaves looking refined, empowered, and at their very best. We are committed to enhancing beauty, uplifting spirits, and creating timeless experiences that leave a lasting impact.
        </p>
        <p className="text-xl text-pink-600 font-semibold text-center italic">
          This is where luxury meets meaning.
        </p>
      </div>

      <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl shadow-2xl p-10">
        <h2 className="text-3xl font-bold text-pink-700 mb-6 text-center">Our Values</h2>
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="text-2xl text-pink-600 mr-4">•</span>
            <span className="text-lg text-gray-800 font-semibold">Excellence</span>
          </li>
          <li className="flex items-start">
            <span className="text-2xl text-pink-600 mr-4">•</span>
            <span className="text-lg text-gray-800 font-semibold">Intentional Luxury Beauty</span>
          </li>
          <li className="flex items-start">
            <span className="text-2xl text-pink-600 mr-4">•</span>
            <span className="text-lg text-gray-800 font-semibold">Confidence</span>
          </li>
          <li className="flex items-start">
            <span className="text-2xl text-pink-600 mr-4">•</span>
            <span className="text-lg text-gray-800 font-semibold">Authenticity and Care</span>
          </li>
          <li className="flex items-start">
            <span className="text-2xl text-pink-600 mr-4">•</span>
            <span className="text-lg text-gray-800 font-semibold">Consistency and Growth</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default AboutUs;
