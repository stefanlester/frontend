import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';
import { createAppointment } from '../api';
import { useNavigate } from 'react-router-dom';

const services = [
  { name: 'Braids & Cornrows', duration: '2-4 hours', price: 150, depositPercent: 20 },
  { name: 'Weave Installation', duration: '2-3 hours', price: 200, depositPercent: 20 },
  { name: 'Wig Installation', duration: '1-2 hours', price: 120, depositPercent: 20 },
  { name: 'Dreadlocs/Sister Locs', duration: '3-5 hours', price: 250, depositPercent: 20 },
  { name: 'Natural Hair Styling', duration: '1-2 hours', price: 80, depositPercent: 20 },
  { name: 'Hair Coloring', duration: '2-3 hours', price: 180, depositPercent: 20 },
  { name: 'Silk Press', duration: '2 hours', price: 100, depositPercent: 20 },
  { name: 'Hair Treatment', duration: '1 hour', price: 60, depositPercent: 20 },
];

const Booking = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    customerName: '',
    customerPhone: '',
    customerEmail: authContext?.email || '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!authContext?.token) {
      alert('Please login to book an appointment');
      navigate('/auth');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Create appointment with pending_payment status
      const appointment = await createAppointment(authContext.token, formData);
      
      // Calculate deposit (20% of service price)
      const selectedService = services.find(s => s.name === formData.service);
      const depositAmount = selectedService ? (selectedService.price * selectedService.depositPercent) / 100 : 0;
      
      // Store appointment details in sessionStorage for checkout
      sessionStorage.setItem('pendingAppointment', JSON.stringify({
        appointmentId: appointment.id,
        service: formData.service,
        date: formData.date,
        time: formData.time,
        fullPrice: selectedService?.price || 0,
        depositAmount,
        customerName: formData.customerName,
      }));
      
      // Redirect to checkout for payment
      navigate('/checkout?type=appointment');
    } catch (err: any) {
      setError(err?.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Book Your Appointment
          </h1>
          <p className="text-gray-600 text-lg">
            Choose your service and select a convenient time
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-purple-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Selection */}
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-3">
                Select Service *
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none text-gray-700 bg-white"
              >
                <option value="">Choose a service...</option>
                {services.map((service) => (
                  <option key={service.name} value={service.name}>
                    {service.name} - ${service.price} ({service.duration})
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  required
                  className="w-full px-4 py-4 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  Preferred Time *
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none"
                >
                  <option value="">Select time...</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="18:00">6:00 PM</option>
                </select>
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 pt-4">Contact Information</h3>
              
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-4 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-4 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    required
                    placeholder="(123) 456-7890"
                    className="w-full px-4 py-4 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Any special requests or notes for your stylist..."
                  className="w-full px-4 py-4 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none resize-none"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-600">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-5 rounded-xl font-bold text-lg shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Processing...' : '💳 Proceed to Payment (20% Deposit)'}
            </button>
            <p className="text-center text-sm text-gray-500 mt-2">
              A 20% deposit is required to secure your appointment
            </p>
          </form>

          <div className="mt-8 p-6 bg-purple-50 rounded-2xl border-2 border-purple-100">
            <h4 className="font-bold text-gray-900 mb-2">📝 Booking Policy</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Please arrive 10 minutes before your scheduled time</li>
              <li>• Cancellations must be made 24 hours in advance</li>
              <li>• A 20% deposit is required to secure your appointment</li>
              <li>• We will contact you to confirm your appointment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
