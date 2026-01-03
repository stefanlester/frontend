import React from 'react';

const features = [
  {
    icon: '🌟',
    title: 'Premium Quality',
    description: 'Only the finest hair products from trusted brands.',
    bgColor: 'bg-gradient-to-br from-pink-400 to-purple-500',
    shape: 'rounded-tl-[3rem] rounded-br-[3rem]',
  },
  {
    icon: '🚚',
    title: 'Fast Delivery',
    description: 'Get your products delivered quickly to your doorstep.',
    bgColor: 'bg-gradient-to-br from-blue-400 to-cyan-500',
    shape: 'rounded-tr-[3rem] rounded-bl-[3rem]',
  },
  {
    icon: '💰',
    title: 'Best Prices',
    description: 'Competitive pricing with regular discounts and offers.',
    bgColor: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    shape: 'rounded-[2rem]',
  },
  {
    icon: '💝',
    title: 'Gift Wrapping',
    description: 'Beautiful gift wrapping available for all products.',
    bgColor: 'bg-gradient-to-br from-green-400 to-teal-500',
    shape: 'rounded-full',
  },
];

const FeaturesSection = () => (
  <section className="py-16 px-4 bg-white relative overflow-hidden">
    {/* Decorative floating shapes */}
    <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 rounded-full opacity-20 blur-2xl"></div>
    <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-200 rounded-full opacity-20 blur-2xl"></div>
    <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-200 rounded-full opacity-20 blur-2xl"></div>
    
    <h3 className="text-4xl font-extrabold text-center text-pink-700 mb-12 drop-shadow relative z-10">
      Why Choose Chi's Luxe Beauties?
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative z-10">
      {features.map((feature, idx) => (
        <div
          key={idx}
          className={`${feature.bgColor} ${feature.shape} p-8 flex flex-col items-center justify-center text-white shadow-2xl transform hover:scale-105 hover:rotate-2 transition-all duration-300 group`}
        >
          <div className="text-6xl mb-4 group-hover:scale-125 transition-transform">{feature.icon}</div>
          <h4 className="text-xl font-bold mb-2 text-center">{feature.title}</h4>
          <p className="text-sm text-center opacity-90">{feature.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturesSection;
