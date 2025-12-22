
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { createOrder, createPaymentIntent } from '../api';
import { useNavigate } from 'react-router-dom';

type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

interface CustomerFormData {
  email: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
}

const Checkout: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CustomerFormData>({
    email: '',
    name: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const token = localStorage.getItem('token');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStripeCheckout = async () => {
    setProcessing(true);
    setError('');
    try {
      if (!token) {
        setError('You must be logged in to checkout.');
        setProcessing(false);
        return;
      }
      // Create payment intent
      const { clientSecret } = await createPaymentIntent(token, total * 1.15);
      // Use Stripe.js to confirm payment (pseudo, you need to add Stripe.js integration)
      // For demo, simulate payment success:
      const paymentIntentId = 'demo_intent_id';
      // Create order in backend
      await createOrder({
        items,
        total: total * 1.15,
        customer: formData
      });
      setSuccess(true);
      clearCart();
      setTimeout(() => navigate('/'), 2000);
    } catch (err: any) {
      setError(err?.message || 'Order failed.');
    } finally {
      setProcessing(false);
    }
  };

  if (!token) {
    return (
      <div className="py-12 px-4 min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">You must be logged in to checkout.</h2>
          <button
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all"
          >
            Login / Sign Up
          </button>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="py-12 px-4 min-h-[70vh] bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 min-h-[70vh] bg-white relative overflow-hidden">
      <div className="absolute top-10 left-1/4 w-64 h-64 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-blue-200 opacity-20 blur-3xl rounded-tl-[5rem] rounded-br-[5rem]"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-8 text-center drop-shadow">
          Secure Checkout
        </h2>
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="text-3xl">🔒</span>
          <span className="text-gray-600 font-medium">Your payment is 100% secure</span>
          <span className="text-3xl">✅</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-green-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                📋 Shipping Information
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:outline-none transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:outline-none transition-colors"
                    placeholder="123 Main Street"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:outline-none transition-colors"
                      placeholder="Johannesburg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:outline-none transition-colors"
                      placeholder="2000"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:outline-none transition-colors"
                    placeholder="+27 12 345 6789"
                    required
                  />
                </div>
              </form>

              <div className="mt-8 pt-8 border-t-2 border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  💳 Payment Method
                </h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold mb-1">Credit/Debit Card (Stripe)</div>
                        <div className="text-blue-100 text-sm">Fast, secure, and trusted worldwide</div>
                      </div>
                      <div className="text-5xl">💳</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-green-100 sticky top-24">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-4 border-b border-gray-200">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-pink-600">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (15%)</span>
                  <span className="font-semibold">${(total * 0.15).toFixed(2)}</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-4">
                  <div className="flex justify-between text-2xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-green-600">${(total * 1.15).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {error && <div className="text-red-500 text-center mb-2">{error}</div>}
              {success && <div className="text-green-600 text-center mb-2 font-bold">✅ Payment successful! Thank you for your order.</div>}
              <button
                onClick={handleStripeCheckout}
                disabled={processing}
                className={`w-full py-4 rounded-full font-bold text-lg shadow-lg transition-all transform ${
                  processing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 hover:scale-105 text-white'
                }`}
              >
                {processing ? '⏳ Processing...' : '💳 Pay with Card'}
              </button>
              <p className="text-xs text-gray-500 text-center mt-4">
                By completing this purchase you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
