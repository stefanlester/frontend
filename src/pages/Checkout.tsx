import React, { useState, useContext } from 'react';
import { useCart } from '../context/CartContext';
import { createPaymentIntent, createAppointment } from '../api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const Checkout: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const token = auth?.token || localStorage.getItem('token');

  // Flat £20 deposit per appointment
  const depositAmount = items.length * 20;
  const remainingBalance = total - depositAmount;

  const handleCheckout = async () => {
    setProcessing(true);
    setError('');
    try {
      if (!token) {
        setError('You must be logged in to checkout.');
        setProcessing(false);
        return;
      }

      // Create appointments for each cart item
      const appointmentPromises = items.map(async (item) => {
        const appointmentData = {
          service: item.name,
          date: item.date!,
          time: item.time!,
          customerName: item.customerName!,
          customerEmail: item.customerEmail!,
          customerPhone: item.customerPhone!,
          notes: item.notes || '',
          price: item.price,
        };
        
        return await createAppointment(token, appointmentData);
      });

      const createdAppointments = await Promise.all(appointmentPromises);

      // Process payment for 20% deposit
      const { clientSecret } = await createPaymentIntent(token, depositAmount);
      const paymentIntentId = 'demo_appointment_' + Date.now();

      // Confirm payment for all appointments
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await Promise.all(
        createdAppointments.map(appointment =>
          fetch(`${apiUrl}/api/appointments/${appointment.id}/confirm-payment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              paymentIntentId,
              depositAmount: 20, // Flat £20 deposit
            }),
          })
        )
      );

      clearCart();
      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (err: any) {
      setError(err.message || 'Payment failed');
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
            className="btn-gold px-8 py-3"
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
          <div className="text-6xl mb-4">📅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate('/products')}
            className="btn-gold px-8 py-3"
          >
            Browse Services
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="py-12 px-4 min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center animate-scaleIn">
          <div className="text-8xl mb-6 animate-bounce">✅</div>
          <h2 className="text-4xl font-extrabold gradient-text mb-4">Appointments Booked Successfully!</h2>
          <p className="text-gray-600 text-xl mb-2">Thank you for your deposit payment</p>
          <p className="text-gray-500 mb-8">You will receive a confirmation email shortly</p>
          <div className="inline-block animate-pulse">
            <p className="text-sm text-gray-500">Redirecting to home page...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 min-h-[70vh] bg-white relative overflow-hidden">
      <div className="absolute top-10 left-1/4 w-64 h-64 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-blue-200 opacity-20 blur-3xl rounded-tl-[5rem] rounded-br-[5rem]"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-extrabold gradient-text mb-8 text-center drop-shadow">
          Appointment Booking Checkout
        </h2>
        <div className="bg-purple-100 border-2 border-purple-300 rounded-2xl p-6 mb-8 text-center">
          <p className="text-lg font-semibold text-purple-800">
            💰 Deposit Required: £{depositAmount.toFixed(2)}
          </p>
          <p className="text-sm text-purple-600 mt-2">
            £20 deposit per appointment. Remaining balance of £{remainingBalance.toFixed(2)} will be collected at your appointment
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="text-3xl">🔒</span>
          <span className="text-gray-600 font-medium">Your payment is 100% secure</span>
          <span className="text-3xl">✅</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Appointment Summary */}
          <div>
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-green-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                📅 Your Appointments
              </h3>
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="border-2 border-brown-200 rounded-2xl p-6 bg-brown-50">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl shadow-md"
                      />
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-brand-primary mb-2">{item.name}</h4>
                        <div className="space-y-1 text-sm text-gray-700">
                          <p className="flex items-center gap-2">
                            <span className="font-semibold">📅 Date:</span> {item.date}
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="font-semibold">🕐 Time:</span> {item.time}
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="font-semibold">👤 Name:</span> {item.customerName}
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="font-semibold">📧 Email:</span> {item.customerEmail}
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="font-semibold">📱 Phone:</span> {item.customerPhone}
                          </p>
                          {item.notes && (
                            <p className="flex items-start gap-2 mt-2 p-2 bg-white rounded-lg">
                              <span className="font-semibold">💬 Notes:</span>
                              <span className="flex-1">{item.notes}</span>
                            </p>
                          )}
                        </div>
                        <div className="mt-4 pt-4 border-t-2 border-brown-300">
                          <p className="text-2xl font-bold gradient-text-gold">£{item.price.toFixed(2)}</p>
                          <p className="text-sm text-gray-600">Deposit: £20.00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div>
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-blue-100 sticky top-28">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Payment Summary</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-700">
                  <span>Total Service Cost:</span>
                  <span className="font-bold">£{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Deposit ({items.length} appointment{items.length > 1 ? 's' : ''}):</span>
                  <span className="font-bold text-purple-600">£{depositAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Pay at Appointment:</span>
                  <span className="font-bold text-green-600">£{remainingBalance.toFixed(2)}</span>
                </div>
                <div className="border-t-2 border-gray-300 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">Due Today:</span>
                    <span className="text-3xl font-extrabold gradient-text-gold">£{depositAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-100 border-2 border-red-300 rounded-xl">
                  <p className="text-red-700 font-semibold">⚠️ {error}</p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={processing}
                className="btn-gold w-full text-lg py-4 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span> Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    💳 Pay Deposit £{depositAmount.toFixed(2)}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigate('/cart')}
                className="btn-secondary w-full py-3.5"
              >
                ← Back to Cart
              </button>

              {/* Trust Badges */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🔒</span>
                    <span>Secure Payment Processing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✨</span>
                    <span>Professional Service Guarantee</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📧</span>
                    <span>Instant Email Confirmation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📞</span>
                    <span>24/7 Customer Support</span>
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

export default Checkout;
