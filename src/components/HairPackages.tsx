import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HairPackages: React.FC = () => {
  const navigate = useNavigate();
  const [activePackage, setActivePackage] = useState(0);

  const packages = [
    {
      id: 22,
      name: 'Fulani Braids',
      tagline: 'Authentic African Beauty',
      description: 'Authentic Fulani tribal braids with intricate patterns and beading.',
      price: 142,
      priceMin: 85,
      priceMax: 200,
      duration: 240,
      image: '/LEMONADES, FULANI BRAIDS/WhatsApp Image 2025-12-21 at 15.20.30 (2).jpeg',
      category: 'Lemonades & Fulani Braids',
      badge: '🔥 Most Popular'
    },
    {
      id: 7,
      name: 'Closure/Frontal Weaves',
      tagline: 'Seamless Perfection',
      description: 'Professional closure or frontal weave installation for natural look.',
      price: 80,
      duration: 180,
      image: '/HAIR PICS/FRONTAL LACE INSTALL/WhatsApp Image 2025-12-21 at 12.22.45 (1).jpeg',
      category: 'Weaves & Sew-ins',
      badge: '✨ Best Value'
    },
    {
      id: 19,
      name: 'Diva Braids',
      tagline: 'Glamorous Statement',
      description: 'Glamorous diva knotless braids that command attention.',
      price: 170,
      priceMin: 90,
      priceMax: 250,
      duration: 240,
      image: '/New folder (3)/Diva braids/Diva braids.jpeg',
      category: 'Goddess Braided Knotless',
      badge: '💫 Signature'
    },
  ];

  const pkg = packages[activePackage];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-brown-50 via-background to-gold-50 relative overflow-hidden">
      {/* Animated decorative elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-gold-200 to-brown-200 rounded-full opacity-30 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-brown-300 to-gold-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <span className="inline-block px-4 py-2 bg-gradient-gold text-white rounded-full text-sm font-bold mb-4 shadow-gold animate-shimmer">✨ SIGNATURE STYLES</span>
          <h2 className="text-6xl font-heading font-extrabold gradient-text mb-4">Transform Your Look</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Experience our most sought-after hairstyles crafted by expert stylists</p>
        </div>

        {/* Split Screen Design */}
        <div className="relative bg-white rounded-3xl shadow-brown-lg overflow-hidden border-2 border-brown-200 animate-scaleIn">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left: Image Showcase */}
            <div className="relative h-[600px] lg:h-auto group overflow-hidden">
              <img
                src={pkg.image}
                alt={pkg.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Badge Overlay */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-brand-primary shadow-lg animate-bounce">
                {pkg.badge}
              </div>
              
              {/* Navigation Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                {packages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePackage(idx)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      idx === activePackage ? 'bg-gold-400 w-12' : 'bg-white/60 w-3 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right: Content */}
            <div className="p-12 flex flex-col justify-center bg-gradient-to-br from-white to-brown-50">
              <div className="space-y-6">
                <div>
                  <p className="text-gold-600 font-semibold text-lg mb-2 tracking-wide">{pkg.tagline}</p>
                  <h3 className="text-5xl font-heading font-extrabold text-brand-primary mb-4 leading-tight">{pkg.name}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{pkg.description}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 py-6">
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-brown-100">
                    <div className="text-3xl font-extrabold gradient-text-gold">
                      {pkg.priceMin && pkg.priceMax ? `£${pkg.priceMin}-£${pkg.priceMax}` : `£${pkg.price}`}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Investment</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-brown-100">
                    <div className="text-3xl font-extrabold text-brand-primary">{Math.floor(pkg.duration / 60)}h{pkg.duration % 60 > 0 ? ` ${pkg.duration % 60}m` : ''}</div>
                    <div className="text-sm text-gray-500 mt-1">Duration</div>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <span className="text-2xl">✓</span>
                    <span className="font-medium">Expert Stylist Included</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <span className="text-2xl">✓</span>
                    <span className="font-medium">Premium Quality Products</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <span className="text-2xl">✓</span>
                    <span className="font-medium">Complimentary Consultation</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => navigate('/booking', { state: { selectedService: pkg.name } })}
                    className="flex-1 btn-gold py-4 text-lg group/btn"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>📅</span>
                      <span>Book Now</span>
                      <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </span>
                  </button>
                  <button className="px-8 py-4 border-2 border-brown-300 text-brand-primary rounded-2xl font-bold hover:bg-brown-50 transition-all">
                    View Details
                  </button>
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-2 pt-4 border-t border-brown-200">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-brown-300 to-gold-300 border-2 border-white"></div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600"><span className="font-bold text-brand-primary">150+</span> happy clients this month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HairPackages;

