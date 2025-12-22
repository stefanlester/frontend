import React from 'react';

const categories = [
  {
    name: 'Wigs & Extensions',
    link: '/category/wigs-extensions',
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><ellipse cx="18" cy="18" rx="16" ry="14" fill="#b983ff" opacity="0.18"/><path d="M12 24c0-4 2-8 6-8s6 4 6 8" stroke="#b983ff" strokeWidth="2" strokeLinecap="round"/><ellipse cx="18" cy="14" rx="4" ry="6" fill="#b983ff"/></svg>
    ),
  },
  {
    name: 'Hair Care',
    link: '/category/hair-care',
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><ellipse cx="18" cy="18" rx="16" ry="14" fill="#10b981" opacity="0.18"/><path d="M18 10c-2 2-6 8-6 12a6 6 0 0012 0c0-4-4-10-6-12z" fill="#10b981"/></svg>
    ),
  },
  {
    name: 'Styling Tools',
    link: '/category/styling-tools',
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><ellipse cx="18" cy="18" rx="16" ry="14" fill="#2563eb" opacity="0.18"/><rect x="15" y="10" width="6" height="16" rx="3" fill="#2563eb"/><rect x="17" y="6" width="2" height="6" rx="1" fill="#b983ff"/></svg>
    ),
  },
  {
    name: 'Hair Accessories',
    link: '/category/hair-accessories',
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><ellipse cx="18" cy="18" rx="16" ry="14" fill="#fde68a" opacity="0.18"/><circle cx="18" cy="18" r="5" fill="#fde68a"/><rect x="10" y="17" width="16" height="2" rx="1" fill="#b983ff"/></svg>
    ),
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto relative z-10">
      {categories.map((cat, idx) => (
        <a
          key={idx}
          href={cat.link}
          className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border border-brand-muted rounded-2xl shadow-xl p-10 flex flex-col items-center transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:border-brand-accent hover:-translate-y-2 relative overflow-hidden"
          style={{boxShadow:'0 8px 32px 0 rgba(31, 38, 135, 0.12)'}}
        >
          <div className="mb-5">{cat.icon}</div>
          <h4 className="text-lg font-heading font-semibold text-brand-primary dark:text-brand-accent text-center mb-2 drop-shadow-sm">{cat.name}</h4>
        </a>
      ))}
    </div>
  </section>
);

export default CategoryCards;
