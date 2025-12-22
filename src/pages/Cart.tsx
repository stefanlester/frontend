import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, total, itemCount } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="py-12 px-4 min-h-[70vh] bg-white relative overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-pink-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-8 text-center drop-shadow">Your Shopping Cart</h2>
          <div className="bg-white rounded-3xl shadow-2xl p-12 border-2 border-pink-100 text-center">
            <div className="text-6xl mb-6">🛒</div>
            <p className="text-gray-600 text-xl mb-8">Your cart is empty. Start shopping!</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 min-h-[70vh] bg-white relative overflow-hidden">
      <div className="absolute top-10 right-10 w-72 h-72 bg-pink-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-8 text-center drop-shadow">
          Your Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg p-6 flex gap-6 border-2 border-pink-100 hover:shadow-xl transition-shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-xl shadow"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-pink-600 font-bold text-lg mb-4">${item.price}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-pink-600 font-bold text-xl hover:text-pink-800 w-8 h-8 flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-pink-600 font-bold text-xl hover:text-pink-800 w-8 h-8 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 font-semibold transition-colors"
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                  <p className="text-2xl font-bold text-pink-600">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-pink-100 sticky top-24">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span className="font-semibold">${(total * 0.15).toFixed(2)}</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-pink-600">${(total * 1.15).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-full font-bold text-lg shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 mb-4"
              >
                Proceed to Checkout →
              </button>
              <button
                onClick={() => navigate('/products')}
                className="w-full border-2 border-pink-300 text-pink-600 py-3 rounded-full font-semibold hover:bg-pink-50 transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
