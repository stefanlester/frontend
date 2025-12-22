import React from 'react';

const AboutUs: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8">
    <h1 className="text-4xl font-bold text-pink-700 mb-4">About Us</h1>
    <p className="max-w-2xl text-lg text-gray-700 mb-6 text-center">
      Welcome to our hair care store! We are passionate about providing the best products and experience for our customers. Our mission is to help you look and feel your best with high-quality, carefully curated hair products. Thank you for choosing us on your hair journey!
    </p>
    <div className="flex flex-col md:flex-row gap-8 mt-8">
      <div className="bg-white rounded-lg shadow-lg p-6 w-72">
        <h2 className="text-2xl font-semibold text-pink-600 mb-2">Our Story</h2>
        <p className="text-gray-600">Founded in 2025, we started with a simple goal: to make premium hair care accessible to everyone. Our team is dedicated to sourcing the best products and providing expert advice.</p>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 w-72">
        <h2 className="text-2xl font-semibold text-pink-600 mb-2">Our Values</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>Quality & Trust</li>
          <li>Customer Satisfaction</li>
          <li>Inclusivity</li>
          <li>Innovation</li>
        </ul>
      </div>
    </div>
  </div>
);

export default AboutUs;
