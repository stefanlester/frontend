import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../App';
import { createAppointment } from '../api';
import { useNavigate, useLocation } from 'react-router-dom';
import BookingCalendar from '../components/BookingCalendar';
import TimeSlotGrid from '../components/TimeSlotGrid';
import ServiceBundles from '../components/ServiceBundles';
import { realProducts, Product } from '../realProducts';

// Group services by category
const groupedServices = realProducts.reduce((acc, product) => {
  if (!acc[product.category]) {
    acc[product.category] = [];
  }
  acc[product.category].push({
    name: product.name,
    price: product.price,
    priceMin: product.priceMin,
    priceMax: product.priceMax,
    duration: product.duration,
    depositAmount: 20 // Flat £20 deposit
  });
  return acc;
}, {} as Record<string, Array<{ name: string; price: number; priceMin?: number; priceMax?: number; duration: number; depositAmount: number }>>);

// Flatten all services for easy lookup
const allServices = realProducts.map(product => ({
  name: product.name,
  price: product.price,
  priceMin: product.priceMin,
  priceMax: product.priceMax,
  duration: product.duration,
  depositAmount: 20 // Flat £20 deposit
}));

const Booking = () => { 
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingType, setBookingType] = useState<'single' | 'bundle'>('single');
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

  // Pre-fill service if passed from navigation
  useEffect(() => {
    const state = location.state as { selectedService?: string } | null;
    if (state?.selectedService) {
      setFormData(prev => ({ ...prev, service: state.selectedService! }));
      setBookingType('single');
    }
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.state]);

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
      
      // Flat £20 deposit upfront
      const selectedService = allServices.find(s => s.name === formData.service);
      const depositAmount = 20; // Flat £20 deposit
      
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
  
  // Get selected service duration
  const selectedService = allServices.find(s => s.name === formData.service);
  const serviceDuration = selectedService ? selectedService.duration : 120; // Default 120 min

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Book Your Appointment
          </h1>
          <p className="text-gray-600 text-lg">
            Choose your service, select a date, and pick your preferred time slot
          </p>
        </div>

        {/* Toggle between Single Service and Bundle */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            type="button"
            onClick={() => setBookingType('single')}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
              bookingType === 'single'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl scale-105'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-purple-400'
            }`}
          >
            Single Service
          </button>
          <button
            type="button"
            onClick={() => setBookingType('bundle')}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
              bookingType === 'bundle'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl scale-105'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-purple-400'
            }`}
          >
            🎁 Service Bundles (Save More!)
          </button>
        </div>

        {bookingType === 'bundle' ? (
          <ServiceBundles
            onSelectBundle={(bundle) => {
              // Add bundle services to cart and redirect
              alert(`Bundle selected: ${bundle.name}\nThis will add all services to your cart.`);
              // TODO: Implement cart integration for bundles
            }}
          />
        ) : (
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-purple-100">
          {location.state?.selectedService && (
            <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl animate-pulse">
              <div className="flex items-center gap-3">
                <span className="text-3xl">✨</span>
                <div>
                  <p className="text-green-800 font-bold text-lg">Service Pre-Selected!</p>
                  <p className="text-green-700 text-sm">You've chosen: <span className="font-bold">{formData.service}</span></p>
                </div>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Service Selection by Category */}
            <div>
              <label className="block text-2xl font-bold text-gray-900 mb-6">
                1️⃣ Select Service *
              </label>
              
              <div className="space-y-4">
                {Object.entries(groupedServices).map(([category, services]) => (
                  <div key={category} className="border-2 border-purple-100 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                    {/* Category Header */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b-2 border-purple-100">
                      <h3 className="text-lg font-bold text-purple-900">{category}</h3>
                    </div>
                    
                    {/* Services Grid */}
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                      {services.map((service) => {
                        const product = realProducts.find(p => p.name === service.name);
                        const priceDisplay = product?.priceMin && product?.priceMax 
                          ? `£${product.priceMin}-£${product.priceMax}` 
                          : `£${service.price}`;
                        const timeDisplay = `${Math.floor(service.duration / 60)}h${service.duration % 60 > 0 ? ` ${service.duration % 60}m` : ''}`;
                        const isSelected = formData.service === service.name;
                        
                        return (
                          <button
                            key={service.name}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, service: service.name });
                              handleChange({ target: { name: 'service', value: service.name } } as any);
                            }}
                            className={`text-left p-4 rounded-lg border-2 transition-all ${
                              isSelected
                                ? 'border-purple-500 bg-purple-50 shadow-md scale-[1.02]'
                                : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className={`font-semibold text-sm ${isSelected ? 'text-purple-900' : 'text-gray-900'}`}>
                                {service.name}
                              </h4>
                              {isSelected && <span className="text-purple-600 text-lg">✓</span>}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-600">
                              <span className="font-bold text-purple-600">{priceDisplay}</span>
                              <span>•</span>
                              <span>⏱️ {timeDisplay}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {selectedService && (()=> {
                const product = realProducts.find(p => p.name === selectedService.name);
                const priceDisplay = product?.priceMin && product?.priceMax 
                  ? `£${product.priceMin}-£${product.priceMax}` 
                  : `£${selectedService.price}`;
                return (
                <div className="mt-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-300 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">✨</span>
                    <h4 className="font-bold text-green-900 text-lg">Selected Service</h4>
                  </div>
                  <p className="text-sm text-gray-700 space-x-4">
                    <span><span className="font-semibold">Service:</span> {selectedService.name}</span>
                    <span><span className="font-semibold">💰 Price:</span> {priceDisplay}</span>
                    <span><span className="font-semibold">⏱️ Duration:</span> {Math.floor(selectedService.duration / 60)}h {selectedService.duration % 60 > 0 ? `${selectedService.duration % 60}m` : ''}</span>
                    <span><span className="font-semibold">💳 Deposit:</span> £20</span>
                  </p>
                </div>
                );
              })()}
            </div>

            {/* Calendar and Time Slot Selection */}
            {formData.service && (
              <div className="space-y-6">
                <div>
                  <label className="block text-2xl font-bold text-gray-900 mb-4">
                    2️⃣ Choose Your Date
                  </label>
                  <BookingCalendar
                    selectedDate={formData.date}
                    onDateSelect={(date) => setFormData({ ...formData, date, time: '' })}
                    unavailableDates={[]} // Will be populated from backend
                  />
                </div>

                {formData.date && (
                  <div>
                    <label className="block text-2xl font-bold text-gray-900 mb-4">
                      3️⃣ Pick Your Time Slot
                    </label>
                    <TimeSlotGrid
                      selectedDate={formData.date}
                      selectedTime={formData.time}
                      onTimeSelect={(time) => setFormData({ ...formData, time })}
                      serviceDuration={serviceDuration}
                    />
                  </div>
                )}

              </div>
            )}

            {/* Customer Information */}
            {formData.date && formData.time && (
              <div className="space-y-6 pt-6 border-t-2 border-purple-100">
                <h3 className="text-2xl font-bold text-gray-900">4️⃣ Contact Information</h3>
              
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
            )}

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-600">
                {error}
              </div>
            )}

            {/* Submit Button */}
            {formData.date && formData.time && (
              <>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-6 rounded-xl font-bold text-xl shadow-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '⏳ Processing...' : '💳 Proceed to Payment (£20 Deposit)'}
                </button>
                <p className="text-center text-sm text-gray-500 mt-2">
                  A £20 deposit is required to secure your appointment
                </p>
              </>
            )}
          </form>

          <div className="mt-8 p-6 bg-purple-50 rounded-2xl border-2 border-purple-100">
            <h4 className="font-bold text-gray-900 mb-2">📝 Booking Policy</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Please arrive 10 minutes before your scheduled time</li>
              <li>• Cancellations must be made 24 hours in advance</li>
              <li>• A £20 deposit is required to secure your appointment</li>
              <li>• We will contact you to confirm your appointment</li>
            </ul>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
