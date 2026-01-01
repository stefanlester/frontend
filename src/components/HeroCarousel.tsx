import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    title: 'Welcome to Chi\'s Luxe Beauties',
    subtitle: 'Universal Hair Studio',
    description: 'Hair services',
    image: '/Hair Services.jpeg',
    cta: null,
    bgGradient: 'from-brand-primary to-brand-accent',
  },
  {
    title: 'Nourish & Shine',
    subtitle: 'Professional Hair Care',
    description: 'Shop essentials',
    image: '/Shop essentials.jpeg',
    cta: null,
    bgGradient: 'from-brand-primary to-brand-secondary',
  },
  {
    title: 'Slay Every Look',
    subtitle: 'Premium Luxury Wigs for Every Style',
    description: null,
    image: '/Shop wigs.jpeg',
    cta: 'Shop Wigs',
    bgGradient: 'from-brand-secondary to-gold-500',
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[650px] overflow-hidden bg-gradient-to-br from-gray-100 to-brand-muted dark:bg-gray-900">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent flex items-center">
            <div className="max-w-7xl mx-auto px-8 w-full">
              <div className="max-w-3xl">
                <h1 className="text-6xl font-heading text-white mb-6 animate-fadeIn drop-shadow-2xl leading-tight">
                  {slide.title}
                </h1>
                <p className="text-3xl text-gold-200 mb-3 drop-shadow-lg animate-slideUp font-body font-semibold">
                  {slide.subtitle}
                </p>
                {slide.description && (
                  <p className="text-xl text-white/90 mb-8 animate-fadeIn font-body">
                    {slide.description}
                  </p>
                )}
                {slide.cta && (
                  <div className="flex gap-4 animate-scaleIn mt-6">
                    <Link 
                      to="/products" 
                      className="bg-gradient-gold text-white px-8 py-4 rounded-full font-bold text-lg shadow-gold hover:shadow-gold transition-all transform hover:scale-110 inline-flex items-center gap-2 group"
                    >
                      <span>{slide.cta}</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-gold-400 w-12 shadow-gold'
                : 'bg-white/50 hover:bg-white/75 w-3'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-gold-400 hover:scale-110 text-white p-4 rounded-full backdrop-blur-md transition-all z-20 shadow-lg text-2xl"
        aria-label="Previous slide"
      >
        ←
      </button>
      <button
        onClick={() => goToSlide((currentSlide + 1) % slides.length)}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-gold-400 hover:scale-110 text-white p-4 rounded-full backdrop-blur-md transition-all z-20 shadow-lg text-2xl"
        aria-label="Next slide"
      >
        →
      </button>
    </div>
  );
};

export default HeroCarousel;
