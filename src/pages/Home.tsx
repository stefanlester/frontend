import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import FeaturedProducts from '../components/FeaturedProducts';
import HairPackages from '../components/HairPackages';
import ProductCollections from '../components/ProductCollections';
import PromoBanner from '../components/PromoBanner';
import FeaturesSection from '../components/FeaturesSection';
import CategoryCards from '../components/CategoryCards';
import TestimonialSection from '../components/TestimonialSection';


const Home = () => (
  <div className="relative">
    {/* Decorative SVG background pattern */}
    <svg className="absolute top-0 left-0 w-full h-64 opacity-10 z-0" viewBox="0 0 1440 320"><path fill="#ec4899" fillOpacity="0.3" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
    <HeroCarousel />
    <HairPackages />
    <FeaturedProducts />
    <CategoryCards />
    <PromoBanner />
    <ProductCollections />
    <FeaturesSection />
    <TestimonialSection />
    {/* Decorative SVG bottom pattern */}
    <svg className="absolute bottom-0 left-0 w-full h-40 opacity-10 z-0" viewBox="0 0 1440 320"><path fill="#a21caf" fillOpacity="0.3" d="M0,288L60,272C120,256,240,224,360,197.3C480,171,600,149,720,154.7C840,160,960,192,1080,197.3C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
  </div>
);

export default Home;
