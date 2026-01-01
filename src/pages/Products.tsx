import React, { useEffect, useState } from 'react';
import { realProducts } from '../realProducts';
import { useCart } from '../context/CartContext';

type Product = {
  id: number;
  name: string;
  price: number;
  duration: number; // in minutes
  image: string;
  description: string;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const { addToCart } = useCart();

  useEffect(() => {
    setProducts(realProducts);
    setLoading(false);
  }, []);

  // derive categories from products
  const categories = React.useMemo(() => {
    const setCat = new Set<string>();
    realProducts.forEach((p: any) => setCat.add(p.category || 'Uncategorized'));
    return ['all', ...Array.from(setCat)];
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  if (loading) return (
    <div className="py-20 px-4 min-h-[70vh] flex items-center justify-center">
      <div className="text-2xl text-pink-600 font-bold animate-pulse">Loading amazing products...</div>
    </div>
  );
  if (error) return (
    <div className="py-20 px-4 min-h-[70vh] flex items-center justify-center">
      <div className="text-xl text-red-500">{error}</div>
    </div>
  );

  return (
    <div className="py-16 px-4 min-h-[80vh] relative overflow-hidden">
      {/* Decorative polymorphic shapes */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-brown-300 to-gold-300 opacity-20 blur-3xl rounded-tl-[5rem] rounded-br-[5rem] animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-brand-lighter to-brown-400 opacity-20 blur-3xl rounded-tr-[6rem] rounded-bl-[6rem]"></div>
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-gold-200 to-brown-200 opacity-15 blur-3xl rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      
      <h2 className="text-5xl font-extrabold gradient-text mb-4 text-center drop-shadow-lg relative z-10 font-heading animate-fadeIn">Our Featured Services</h2>
      <p className="text-center text-brand-primary mb-12 text-xl relative z-10 font-body">Premium quality hair services for every style</p>
      
      
      {/* Filters */}
      <div className="max-w-6xl mx-auto mb-10 flex flex-wrap gap-4 justify-center relative z-10">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
            filter === 'all'
              ? 'bg-gradient-brown text-white shadow-brown'
              : 'bg-white text-brand-primary hover:bg-brown-50 border border-brown-200'
          }`}
        >
          All Products
        </button>
        <button
          onClick={() => setFilter('wigs')}
          className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
            filter === 'wigs'
              ? 'bg-gradient-brown text-white shadow-brown'
              : 'bg-white text-brand-primary hover:bg-brown-50 border border-brown-200'
          }`}
        >
          Wigs & Extensions
        </button>
        <button
          onClick={() => setFilter('care')}
          className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
            filter === 'care'
              ? 'bg-gradient-brown text-white shadow-brown'
              : 'bg-white text-brand-primary hover:bg-brown-50 border border-brown-200'
          }`}
        >
          Hair Care
        </button>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-6 py-3 rounded-full border-2 border-brown-300 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-accent bg-white text-brand-primary transition-all"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>
        {/* Filters (dynamic) */}
        <div className="max-w-6xl mx-auto mb-10 flex flex-wrap gap-4 justify-center relative z-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                filter === cat
                  ? 'bg-gradient-brown text-white shadow-brown'
                  : 'bg-white text-brand-primary hover:bg-brown-50 border border-brown-200'
              }`}
            >
              {cat === 'all' ? 'All Services' : cat}
            </button>
          ))}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-6 py-3 rounded-full border-2 border-brown-300 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-accent bg-white text-brand-primary transition-all"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        {filter === 'all' ? (
          // grouped by category
          Array.from(new Set(products.map((p) => (p as any).category || 'Uncategorized'))).map((cat) => (
            <div key={cat}>
              <h3 className="text-3xl font-bold mb-6 gradient-text font-heading">{cat}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.filter((p) => (p as any).category === cat).map((product: any, idx) => (
                  <ProductCard key={product.id} product={product} idx={idx} onAdd={handleAddToCart} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.filter((p) => (filter === 'all' ? true : (p as any).category === filter)).map((product, idx) => (
              <ProductCard key={product.id} product={product as any} idx={idx} onAdd={handleAddToCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

// small presentational ProductCard component local to this file
function ProductCard({ product, idx, onAdd }: { product: any; idx: number; onAdd: (p: any) => void }) {
  const shapes = [
    'rounded-3xl',
    'rounded-tl-[3rem] rounded-br-[3rem]',
    'rounded-tr-[3rem] rounded-bl-[3rem]',
  ];
  const borderColors = [
    'border-brown-200 shadow-brown',
    'border-gold-200 shadow-gold',
    'border-brand-lighter shadow-brown',
  ];

  return (
    <div
      className={
        `bg-white ${shapes[idx % shapes.length]} shadow-lg p-6 flex flex-col items-center transition-all duration-300 transform hover:-translate-y-3 hover:shadow-brown-lg group border-2 ${borderColors[idx % borderColors.length]} relative overflow-hidden` +
        (idx === 0 ? ' animate-pulse-slow' : '')
      }
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brown-50 to-gold-50 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
      {idx === 0 && (
        <span className="badge-gold absolute top-4 left-4 shadow-lg animate-bounce z-10">✨ Best Seller</span>
      )}
      <div className="relative w-44 h-44 mb-5 overflow-hidden rounded-2xl shadow-brown group-hover:shadow-brown-lg transition-all duration-300 z-10">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-brown opacity-0 group-hover:opacity-20 transition-opacity"></div>
      </div>
      <h3 className="text-xl font-bold text-brand-primary mb-2 text-center relative z-10 font-heading group-hover:text-brand-accent transition-colors">{product.name}</h3>
      <div className="flex items-center gap-3 mb-2 relative z-10">
        <p className="gradient-text-gold font-extrabold text-2xl">${product.price}</p>
        <span className="text-brown-600 text-sm font-medium px-3 py-1 bg-brown-100 rounded-full">⏱️ {product.duration} min</span>
      </div>
      <p className="text-gray-600 text-sm mb-6 text-center relative z-10 line-clamp-2">{product.description}</p>
      <button
        onClick={() => onAdd(product)}
        className="mt-auto w-full relative overflow-hidden group/btn">
        <div className="btn-gold w-full py-3 text-base font-bold flex items-center justify-center gap-2">
          <span className="text-xl">📅</span>
          <span>Book Appointment</span>
          <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
        </div>
      </button>
    </div>
  );
}
