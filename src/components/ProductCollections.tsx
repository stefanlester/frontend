import React from 'react';
import { Link } from 'react-router-dom';

const collections = [
  {
    title: 'Natural Collection',
    image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=600&q=80',
    products: '50+ Products',
    bgColor: 'from-green-400 to-emerald-600',
    link: '/products',
  },
  {
    title: 'Luxury Wigs',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    products: '30+ Styles',
    bgColor: 'from-pink-400 to-rose-600',
    link: '/products',
  },
  {
    title: 'Hair Care Essentials',
    image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&w=600&q=80',
    products: '25+ Items',
    bgColor: 'from-blue-400 to-indigo-600',
    link: '/products',
  },
];

const ProductCollections = () => (
  <section className="py-16 px-4 bg-white relative overflow-hidden">
    <div className="absolute top-1/2 left-0 w-72 h-72 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full opacity-30 blur-3xl"></div>
    <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-yellow-100 to-pink-100 rounded-full opacity-30 blur-3xl"></div>
    
    <div className="max-w-7xl mx-auto relative z-10">
      <h3 className="text-4xl font-extrabold text-center mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
          Explore Our Collections
        </span>
      </h3>
      <p className="text-center text-gray-600 mb-12 text-lg">Curated selections for every style</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {collections.map((collection, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-3xl shadow-2xl cursor-pointer transform hover:scale-105 transition-all duration-500"
          >
            <div className="h-96 relative">
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${collection.bgColor} opacity-60 group-hover:opacity-50 transition-opacity`}></div>
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 text-white">
                <h4 className="text-3xl font-extrabold mb-2 drop-shadow-lg">{collection.title}</h4>
                <p className="text-lg mb-4 drop-shadow">{collection.products}</p>
                <Link
                  to={collection.link}
                  className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold shadow-xl hover:bg-gray-100 transition-all transform group-hover:scale-110"
                >
                  Explore →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductCollections;
