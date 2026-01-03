import React, { useState, useContext } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import BookingCalendar from '../components/BookingCalendar';
import TimeSlotGrid from '../components/TimeSlotGrid';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, updateAppointmentDetails, total, itemCount } = useCart();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  if (items.length === 0) {
    return (
      <div className="py-16 px-4 min-h-[70vh] relative overflow-hidden">
        <div className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-br from-brown-200 to-gold-200 rounded-full opacity-20 blur-3xl animate-float"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-br from-brand-lighter to-brown-300 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl font-extrabold gradient-text mb-8 text-center drop-shadow-lg font-heading">Your Shopping Cart</h2>
          <div className="card-elevated p-16 text-center animate-scaleIn">
            <div className="text-8xl mb-8 animate-float">🛒</div>
            <p className="text-gray-600 text-2xl mb-10 font-body">Your cart is empty. Start your beauty journey!</p>
            <button
              onClick={() => navigate('/products')}
              className="btn-gold text-lg px-10 py-4"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 min-h-[70vh] relative overflow-hidden">
      <div className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-br from-brown-200 to-gold-200 rounded-full opacity-20 blur-3xl animate-float"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-br from-brand-lighter to-brown-300 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-5xl font-extrabold gradient-text mb-3 text-center drop-shadow-lg font-heading animate-fadeIn">
          Your Shopping Cart
        </h2>
        <p className="text-center text-brown-600 mb-12 text-lg font-body">
          {itemCount} {itemCount === 1 ? 'appointment' : 'appointments'} ready to book
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="card-premium p-6 hover:shadow-brown-lg transition-all duration-300 animate-slideUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="relative group">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full sm:w-36 h-36 object-cover rounded-2xl shadow-brown group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-brown opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity"></div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-brand-primary mb-2 font-heading">{item.name}</h3>
                      <div className="flex items-center gap-3 mb-4">
                        <p className="gradient-text-gold font-bold text-xl">£{item.price}</p>
                        {item.duration && (
                          <span className="text-brown-600 text-sm font-medium px-3 py-1 bg-brown-100 rounded-full">
                            ⏱️ {Math.floor(item.duration / 60)}h {item.duration % 60 > 0 ? `${item.duration % 60}m` : ''}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                        className="btn-gold px-6 py-2.5 text-sm"
                      >
                        📅 {expandedItem === item.id ? 'Hide' : 'Add'} Booking Details
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2 px-4 py-2 rounded-full hover:bg-red-50 transition-all"
                      >
                        <span className="text-xl">🗑️</span> Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1 uppercase tracking-wide">Price</p>
                      <p className="text-3xl font-bold gradient-text-gold">£{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Expandable Appointment Details Form */}
                {expandedItem === item.id && (
                  <div className="mt-6 pt-6 border-t-2 border-brown-200 animate-slideDown">
                    <h4 className="font-bold text-gray-900 text-lg mb-6">📝 Appointment Details</h4>
                    
                    {/* Interactive Calendar */}
                    <div className="mb-6">
                      <label className="block text-md font-bold text-gray-700 mb-3">
                        📅 Select Your Date
                      </label>
                      <BookingCalendar
                        selectedDate={item.date || ''}
                        onDateSelect={(date) => updateAppointmentDetails(item.id, { date, time: '' })}
                        unavailableDates={[]}
                      />
                    </div>

                    {/* Time Slot Grid */}
                    {item.date && (
                      <div className="mb-6">
                        <label className="block text-md font-bold text-gray-700 mb-3">
                          🕐 Choose Your Time
                        </label>
                        <TimeSlotGrid
                          selectedDate={item.date}
                          selectedTime={item.time || ''}
                          onTimeSelect={(time) => updateAppointmentDetails(item.id, { time })}
                          serviceDuration={item.duration || 120}
                        />
                      </div>
                    )}

                    {/* Customer Information */}
                    {item.date && item.time && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            👤 Your Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={item.customerName || ''}
                            onChange={(e) => updateAppointmentDetails(item.id, { customerName: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border-2 border-brown-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-all"
                            placeholder="Enter your name"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            📱 Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            value={item.customerPhone || ''}
                            onChange={(e) => updateAppointmentDetails(item.id, { customerPhone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border-2 border-brown-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-all"
                            placeholder="(555) 123-4567"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            📧 Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            value={item.customerEmail || auth?.email || ''}
                            onChange={(e) => updateAppointmentDetails(item.id, { customerEmail: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border-2 border-brown-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-all"
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            💬 Special Requests (Optional)
                          </label>
                          <textarea
                            value={item.notes || ''}
                            onChange={(e) => updateAppointmentDetails(item.id, { notes: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border-2 border-brown-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-all resize-none"
                            placeholder="Any specific requirements or preferences?"
                          />
                        </div>
                      </div>
                    )}
                    
                    {item.date && item.time && item.customerName && item.customerPhone && item.customerEmail && (
                      <div className="mt-4 p-4 bg-green-50 rounded-xl border-2 border-green-200">
                        <p className="text-green-700 font-semibold flex items-center gap-2">
                          <span className="text-xl">✅</span>
                          Booking details complete! Proceed to checkout when ready.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card-elevated p-8 sticky top-28 animate-scaleIn">
              <h3 className="text-3xl font-bold text-brand-primary mb-6 font-heading">Order Summary</h3>
              <div className="space-y-5 mb-8">
                <div className="flex justify-between text-gray-700 text-lg">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold text-brand-primary">£{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700 text-lg">
                  <span className="font-medium">Shipping</span>
                  <span className="font-bold text-green-600 flex items-center gap-1">
                    <span className="text-xl">✓</span> FREE
                  </span>
                </div>
                <div className="flex justify-between text-gray-700 text-lg">
                  <span className="font-medium">Tax</span>
                  <span className="font-bold text-brand-primary">£{(total * 0.15).toFixed(2)}</span>
                </div>
                <div className="border-t-2 border-brown-200 pt-5">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-brand-primary font-heading">Total</span>
                    <span className="text-3xl font-extrabold gradient-text-gold">£{(total * 1.15).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  // Check if all items have required booking details
                  const missingDetails = items.filter(item => !item.date || !item.time || !item.customerName || !item.customerPhone || !item.customerEmail);
                  if (missingDetails.length > 0) {
                    alert('Please add booking details for all appointments before checkout');
                    return;
                  }
                  navigate('/checkout');
                }}
                className="btn-gold w-full text-lg py-4 mb-4 group relative overflow-hidden"
              >
                <span className="relative z-10">Proceed to Checkout</span>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button
                onClick={() => navigate('/products')}
                className="btn-secondary w-full py-3.5"
              >
                Continue Shopping
              </button>
              
              {/* Trust Badges */}
              <div className="mt-8 pt-8 border-t border-brown-200">
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🔒</span>
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✨</span>
                    <span>Premium Quality Guaranteed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💝</span>
                    <span>Free Returns Within 30 Days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
