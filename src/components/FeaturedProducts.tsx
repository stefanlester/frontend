import React, { useState, useEffect } from 'react';
import { realProducts } from '../realProducts';
import { useCart } from '../context/CartContext';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { addToCart } = useCart();

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
    setProducts(realProducts);
  }, []);

  // Responsive items per view: 1 on small, 2 on medium, 3 on large
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    function updateItemsPerView() {
      const w = window.innerWidth;
      if (w < 640) setItemsPerView(1);
      else if (w < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    }
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const visibleProducts = itemsPerView;
  const maxIndex = Math.max(0, products.length - visibleProducts);

  // Clamp activeIndex when itemsPerView or products change
  useEffect(() => {
    if (activeIndex > maxIndex) setActiveIndex(0);
  }, [activeIndex, maxIndex]);

  const next = () => {
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prev = () => {
    setActiveIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [maxIndex, itemsPerView]);

  if (products.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h3 className="text-4xl font-extrabold text-center mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
            Featured Products
          </span>
        </h3>
        <p className="text-center text-gray-600 mb-12 text-lg">Discover our most popular items</p>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * (100 / visibleProducts)}%)` }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 px-4"
                  style={{ minWidth: `${100 / visibleProducts}%` }}
                >
                  <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 transform hover:scale-105 transition-all duration-300 border-2 border-pink-100 group">
                      <div className="relative overflow-hidden rounded-2xl mb-4" style={{height: itemsPerView === 1 ? '380px' : itemsPerView === 2 ? '320px' : '256px'}}>
                      <img
                        src={product.image}
                        alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 bg-white"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 left-4 right-4">
                          <button
                            className="w-full bg-white text-pink-600 py-2 rounded-full font-bold shadow-lg hover:bg-pink-50 transition-colors"
                            onClick={() => setSelectedProduct(product)}
                          >
                            Quick View
                          </button>
                        </div>
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h4>
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3">
                      <span className="text-2xl font-bold text-pink-600">${product.price}</span>
                      <button className="flex-1 sm:flex-none w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:shadow-lg transition-all text-center"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white text-pink-600 p-4 rounded-full shadow-xl hover:bg-pink-50 transition-all z-10"
            aria-label="Previous products"
          >
            ←
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white text-pink-600 p-4 rounded-full shadow-xl hover:bg-pink-50 transition-all z-10"
            aria-label="Next products"
          >
            →
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === activeIndex ? 'bg-pink-600 w-8' : 'bg-pink-300 w-2'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        {/* Quick View Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedProduct(null)} />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 p-6 z-10">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center" style={{minHeight:200}}>
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-contain" />
                </div>
                <div className="md:w-1/2 flex flex-col justify-between">
                  <div>
                    <h4 className="text-2xl font-bold mb-2">{selectedProduct.name}</h4>
                    <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                    <p className="text-3xl font-extrabold text-pink-600 mb-6">${selectedProduct.price}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:shadow-lg transition-all"
                      onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="flex-0 px-6 py-3 rounded-full border-2 border-gray-200 hover:bg-gray-50 transition"
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
