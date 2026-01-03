import React, { useState, useEffect } from 'react';
import { realProducts, Product } from '../realProducts';
import { useNavigate } from 'react-router-dom';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  // Quick View modal state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelectedProduct(null);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (!selectedProduct) return;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    // prevent scroll
    document.body.style.overflow = 'hidden';
    // prevent layout shift by adding padding equal to scrollbar width
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
    return () => {
      document.body.style.overflow = previousOverflow || '';
      document.body.style.paddingRight = previousPaddingRight || '';
    };
  }, [selectedProduct]);

  useEffect(() => {
    // Display first 9 products (3 rows x 3 columns)
    setProducts(realProducts.slice(0, 9));
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-brown-200 to-gold-200 rounded-full opacity-20 blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-brand-lighter to-brown-300 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h3 className="text-5xl font-extrabold text-center mb-4 font-heading">
          <span className="gradient-text animate-fadeIn">
            Featured Services
          </span>
        </h3>
        <p className="text-center text-brand-primary mb-16 text-xl font-body">Discover our most popular beauty services</p>

        {/* Grid Layout - 3 columns x 3 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative rounded-3xl overflow-hidden shadow-brown-lg border-2 border-brown-200 group hover:border-gold-400 transition-all duration-300 animate-fadeIn"
              style={{ aspectRatio: '1 / 1' }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-brown opacity-0 group-hover:opacity-30 transition-opacity"></div>

              <div className="absolute inset-0 flex flex-col justify-end items-start p-8 text-white">
                <h4 className="text-2xl font-bold text-white mb-2 font-heading group-hover:scale-105 transition-transform">{product.name}</h4>
                <p className="text-sm text-white/90 mb-4 line-clamp-2">{product.description}</p>
                <div className="w-full flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-extrabold gradient-text-gold bg-white bg-clip-text px-2 py-1 rounded">
                      {product.priceMin && product.priceMax ? `£${product.priceMin}-£${product.priceMax}` : `£${product.price}`}
                    </span>
                    <span className="px-3 py-1 bg-brown-100 text-brand-primary rounded-full text-sm font-semibold flex items-center gap-1">
                      <span>⏱️</span> {Math.floor(product.duration / 60)}h{product.duration % 60 > 0 ? ` ${product.duration % 60}m` : ''}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="bg-white/90 backdrop-blur-sm text-brand-primary py-2.5 px-5 rounded-full font-bold shadow-lg hover:bg-white hover:scale-105 transition-all"
                      onClick={() => setSelectedProduct(product)}
                    >
                      Quick View
                    </button>
                    <button
                      className="btn-gold py-2.5 px-5 shadow-lg group/btn"
                      onClick={() => navigate('/booking', { state: { selectedService: product.name } })}
                    >
                      <span className="flex items-center gap-2">
                        <span>📅</span>
                        <span>Book Now</span>
                        <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Quick View Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />
            <div className="relative card-elevated max-w-4xl w-full mx-4 p-8 z-10 animate-scaleIn">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 rounded-2xl overflow-hidden bg-brown-50 flex items-center justify-center shadow-brown" style={{minHeight:300}}>
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                </div>
                <div className="md:w-1/2 flex flex-col justify-between">
                  <div>
                    <h4 className="text-3xl font-bold mb-3 gradient-text font-heading">{selectedProduct.name}</h4>
                    <p className="text-gray-600 mb-5 text-lg leading-relaxed">{selectedProduct.description}</p>
                    <div className="flex items-center gap-4 mb-6">
                      <p className="text-4xl font-extrabold gradient-text-gold">
                        {selectedProduct.priceMin && selectedProduct.priceMax ? `£${selectedProduct.priceMin}-£${selectedProduct.priceMax}` : `£${selectedProduct.price}`}
                      </p>
                      <span className="px-4 py-2 bg-brown-100 text-brand-primary rounded-full text-base font-semibold flex items-center gap-2">
                        <span>⏱️</span> {Math.floor(selectedProduct.duration / 60)}h{selectedProduct.duration % 60 > 0 ? ` ${selectedProduct.duration % 60}m` : ''}
                      </span>
                    </div>
                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-xl">✨</span>
                        <span>Professional Service</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-xl">💝</span>
                        <span>Premium Quality</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-xl">🎯</span>
                        <span>Satisfaction Guaranteed</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="flex-1 btn-gold text-lg py-4 group/btn"
                      onClick={() => { navigate('/booking', { state: { selectedService: selectedProduct.name } }); setSelectedProduct(null); }}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>📅</span>
                        <span>Book Appointment</span>
                        <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                      </span>
                    </button>
                    <button
                      className="btn-secondary px-6"
                      onClick={() => setSelectedProduct(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
