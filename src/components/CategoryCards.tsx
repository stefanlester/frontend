import React from 'react';

const categories = [
  {
    name: 'Braids & Knotless',
    link: '/products',
    count: '25+ styles',
    icon: '🌟',
    gradient: 'from-brown-400 to-brown-600'
  },
  {
    name: 'Locs & Twists',
    link: '/products',
    count: '15+ styles',
    icon: '✨',
    gradient: 'from-gold-400 to-gold-600'
  },
  {
    name: 'Weaves & Installs',
    link: '/products',
    count: '12+ styles',
    icon: '💫',
    gradient: 'from-brown-500 to-brand-primary'
  },
  {
    name: 'Color & Treatment',
    link: '/products',
    count: '8+ services',
    icon: '🎨',
    gradient: 'from-gold-500 to-brown-400'
  },
];

const CategoryCards = () => (
  <section className="py-20 px-4 bg-white relative overflow-hidden">
    {/* Advanced polymorphic glassmorphism shapes */}
    <div className="absolute -top-24 left-1/4 w-96 h-96 bg-white/40 dark:bg-gray-700/30 rounded-3xl blur-3xl shadow-2xl z-0" style={{filter:'blur(40px)'}}></div>
    <div className="absolute bottom-0 right-1/4 w-[32rem] h-60 bg-gradient-to-br from-brand-accent/30 to-brand-primary/10 rounded-full blur-3xl z-0" style={{filter:'blur(60px)'}}></div>
    <div className="absolute top-1/2 left-0 w-40 h-40 bg-brand-accent/10 rounded-full blur-2xl z-0" style={{filter:'blur(32px)'}}></div>
    <h3 className="text-4xl font-heading font-extrabold text-center bg-gradient-to-r from-brand-accent to-brand-primary bg-clip-text text-transparent drop-shadow-lg mb-14 relative z-10">
      Shop by Category
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto relative z-10">
      {categories.map((cat, idx) => (
        <a
          key={idx}
          href={cat.link}
          className="group relative bg-white rounded-2xl shadow-brown-lg border-2 border-brown-200 p-8 transition-all duration-300 hover:scale-105 hover:shadow-brown-lg hover:border-gold-400 hover:-translate-y-2 overflow-hidden"
        >
          {/* Gradient background on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
          
          <div className="relative z-10">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
            <h4 className="text-xl font-heading font-bold text-brand-primary mb-2 group-hover:text-gold-600 transition-colors">{cat.name}</h4>
            <p className="text-sm text-gray-500 font-semibold">{cat.count}</p>
            <div className="mt-4 flex items-center text-gold-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
              <span>Explore</span>
              <span className="ml-1">→</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  </section>
);

export default CategoryCards;
