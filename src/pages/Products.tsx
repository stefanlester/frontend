import React, { useEffect, useState } from 'react';
import { realProducts } from '../realProducts';
import { useCart } from '../context/CartContext';

type Product = {
  id: number;
  name: string;
  price: number;
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
    <div className="py-12 px-4 bg-white min-h-[80vh] relative overflow-hidden">
      {/* Decorative polymorphic shapes */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-pink-300 to-purple-400 opacity-20 blur-3xl rounded-tl-[5rem] rounded-br-[5rem]"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-br from-yellow-300 to-pink-400 opacity-20 blur-3xl rounded-tr-[6rem] rounded-bl-[6rem]"></div>
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-blue-300 to-cyan-400 opacity-15 blur-3xl rounded-full"></div>
      
      <h2 className="text-4xl font-extrabold text-pink-700 mb-4 text-center drop-shadow relative z-10">Our Featured Products</h2>
      <p className="text-center text-gray-600 mb-10 text-lg relative z-10">Premium quality hair products for every style</p>
      
      
      {/* Filters */}
      <div className="max-w-6xl mx-auto mb-10 flex flex-wrap gap-4 justify-center relative z-10">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            filter === 'all'
              ? 'bg-pink-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-pink-50'
          }`}
        >
          All Products
        </button>
        <button
          onClick={() => setFilter('wigs')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            filter === 'wigs'
              ? 'bg-pink-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-pink-50'
          }`}
        >
          Wigs & Extensions
        </button>
        <button
          onClick={() => setFilter('care')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            filter === 'care'
              ? 'bg-pink-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-pink-50'
          }`}
        >
          Hair Care
        </button>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-6 py-2 rounded-full border-2 border-pink-200 font-semibold focus:outline-none focus:ring-2 focus:ring-pink-400"
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
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                filter === cat
                  ? 'bg-pink-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-pink-50'
              }`}
            >
              {cat === 'all' ? 'All Products' : cat}
            </button>
          ))}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-6 py-2 rounded-full border-2 border-pink-200 font-semibold focus:outline-none focus:ring-2 focus:ring-pink-400"
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
              <h3 className="text-2xl font-bold mb-4">{cat}</h3>
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
    'border-pink-200 shadow-pink-200/50',
    'border-purple-200 shadow-purple-200/50',
    'border-blue-200 shadow-blue-200/50',
  ];

  return (
    <div
      className={
        `bg-white ${shapes[idx % shapes.length]} shadow-xl p-6 flex flex-col items-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl group border-2 ${borderColors[idx % borderColors.length]} relative overflow-hidden ` +
        (idx === 0 ? 'animate-pulse-slow' : '')
      }
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 opacity-0 group-hover:opacity-30 transition-opacity"></div>
      {idx === 0 && (
        <span className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce z-10">Best Seller</span>
      )}
      <div className="w-44 h-44 mb-4 overflow-hidden rounded-2xl shadow group-hover:scale-105 transition-transform relative z-10">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-1 text-center relative z-10">{product.name}</h3>
      <p className="text-pink-600 font-bold text-lg mb-1 relative z-10">${product.price}</p>
      <p className="text-gray-600 text-sm mb-4 text-center relative z-10">{product.description}</p>
      <button
        onClick={() => onAdd(product)}
        className="mt-auto bg-gradient-to-r from-pink-500 to-pink-700 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-pink-600 hover:to-pink-800 hover:scale-105 transition-all relative z-10 w-full"
      >
        🛒 Add to Cart
      </button>
    </div>
  );
}
