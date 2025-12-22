import React from 'react';
import { Link } from 'react-router-dom';

const HairPackages: React.FC = () => {
  // Use real product images for the packages
  const packages = [
    {
      name: 'Barrel Twist Style 1',
      description: 'Classic barrel twist for a bold look.',
      price: '$120',
      image: '/HAIR PICS/BARREL TWIST/PHOTO-2025-12-18-18-33-23.jpg',
    },
    {
      name: 'Frontal Lace Install 1',
      description: 'Natural frontal lace installation.',
      price: '$200',
      image: '/HAIR PICS/FRONTAL LACE INSTALL/WhatsApp Image 2025-12-21 at 12.22.45 (1).jpeg',
    },
    {
      name: 'Glam Makeover 1',
      description: 'Professional makeover and glam beat.',
      price: '$80',
      image: '/HAIR PICS/MAKEOVERS AND GLAM BEATS/WhatsApp Image 2025-12-21 at 12.26.25 (1).jpeg',
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-center text-brand-primary dark:text-brand-accent mb-8">Hair Packages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className="relative group rounded-2xl overflow-hidden shadow-lg border border-brand-muted bg-white dark:bg-gray-900 min-h-[420px] flex items-end justify-center transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{minHeight:'420px'}}>
              <img
                src={pkg.image}
                alt={pkg.name}
                className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-500 z-0"
              />
              <div className="relative z-10 w-full flex flex-col items-center p-8 bg-black/60 group-hover:bg-black/40 transition-colors duration-300">
                <h3 className="text-2xl font-heading font-extrabold text-white mb-2 text-center" style={{textShadow:'0 4px 24px rgba(0,0,0,0.55), 0 1.5px 0 #a78bfa'}}>
                  {pkg.name}
                </h3>
                <p className="text-lg text-white/80 mb-4 text-center font-medium" style={{textShadow:'0 2px 8px rgba(0,0,0,0.25)'}}>{pkg.description}</p>
                <span className="text-xl font-bold text-brand-accent mb-2 drop-shadow">{pkg.price}</span>
                <Link
                  to="/cart"
                  state={{ package: pkg }}
                  className="mt-2 bg-brand-accent text-white px-6 py-2 rounded-lg font-semibold hover:bg-brand-primary hover:text-brand-accent transition text-center"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HairPackages;
