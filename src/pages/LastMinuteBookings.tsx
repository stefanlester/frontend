import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface QuickService {
  id: number;
  name: string;
  duration: number; // in minutes
  regularPrice: number;
  quickPrice: number;
  savings: number;
  image: string;
  availableToday: string[]; // time slots
  availableTomorrow: string[];
}

const quickServices: QuickService[] = [
  {
    id: 1,
    name: 'Natural Hair Styling',
    duration: 90,
    regularPrice: 80,
    quickPrice: 68, // 15% discount
    savings: 12,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
    availableToday: ['14:00', '16:30'],
    availableTomorrow: ['10:00', '12:00', '14:30', '17:00'],
  },
  {
    id: 2,
    name: 'Silk Press',
    duration: 120,
    regularPrice: 100,
    quickPrice: 85,
    savings: 15,
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400',
    availableToday: ['15:00'],
    availableTomorrow: ['09:30', '13:00', '16:00'],
  },
  {
    id: 3,
    name: 'Hair Treatment',
    duration: 60,
    regularPrice: 60,
    quickPrice: 51,
    savings: 9,
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400',
    availableToday: ['13:00', '15:00', '17:00'],
    availableTomorrow: ['09:30', '11:00', '14:00', '16:30', '18:00'],
  },
  {
    id: 4,
    name: 'Wig Installation',
    duration: 90,
    regularPrice: 120,
    quickPrice: 102,
    savings: 18,
    image: 'https://images.unsplash.com/photo-1583834666451-f15d8d922ff1?w=400',
    availableToday: ['16:00'],
    availableTomorrow: ['10:30', '13:30', '16:00'],
  },
];

const LastMinuteBookings: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedDay, setSelectedDay] = useState<'today' | 'tomorrow'>('today');
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // Get today and tomorrow dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const todayStr = today.toISOString().split('T')[0];
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  // Countdown timer - deals expire at midnight
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      
      const diff = midnight.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleQuickBook = (service: QuickService, time: string) => {
    const date = selectedDay === 'today' ? todayStr : tomorrowStr;
    
    addToCart({
      id: service.id,
      name: service.name,
      price: service.quickPrice,
      image: service.image,
      duration: service.duration,
    });

    // Navigate to cart with pre-filled details
    navigate('/cart');
    
    // Show success message
    setTimeout(() => {
      alert(`✅ ${service.name} added to cart!\n📅 Date: ${date}\n🕐 Time: ${time}\n\nPlease complete the booking details in your cart.`);
    }, 100);
  };

  const currentServices = quickServices.filter(service => 
    selectedDay === 'today' 
      ? service.availableToday.length > 0 
      : service.availableTomorrow.length > 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold mb-4 animate-pulse">
            ⚡ FLASH DEALS - 15% OFF
          </div>
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 mb-4">
            Last-Minute Bookings
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Grab last-minute slots at discounted rates! Quick services available today & tomorrow
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl p-6 shadow-2xl">
            <div className="text-center">
              <p className="text-sm font-bold mb-3">⏰ DEALS EXPIRE IN:</p>
              <div className="flex justify-center gap-4 text-4xl font-extrabold">
                <div className="bg-white/20 rounded-xl px-6 py-4 backdrop-blur-sm">
                  <div>{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="text-xs font-normal mt-1">Hours</div>
                </div>
                <div className="flex items-center text-5xl">:</div>
                <div className="bg-white/20 rounded-xl px-6 py-4 backdrop-blur-sm">
                  <div>{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="text-xs font-normal mt-1">Minutes</div>
                </div>
                <div className="flex items-center text-5xl">:</div>
                <div className="bg-white/20 rounded-xl px-6 py-4 backdrop-blur-sm">
                  <div>{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="text-xs font-normal mt-1">Seconds</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Day Selector */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedDay('today')}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
              selectedDay === 'today'
                ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-xl scale-105'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-orange-400'
            }`}
          >
            Today ({formatDate(today)})
          </button>
          <button
            onClick={() => setSelectedDay('tomorrow')}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
              selectedDay === 'tomorrow'
                ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-xl scale-105'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-orange-400'
            }`}
          >
            Tomorrow ({formatDate(tomorrow)})
          </button>
        </div>

        {/* Services Grid */}
        {currentServices.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl shadow-xl">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Slots Available</h3>
            <p className="text-gray-600">
              All last-minute slots for {selectedDay} are booked. Try {selectedDay === 'today' ? 'tomorrow' : 'today'}!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentServices.map((service) => {
              const slots = selectedDay === 'today' ? service.availableToday : service.availableTomorrow;
              
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-orange-200 hover:shadow-2xl transition-all"
                >
                  <div className="relative h-48">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                      Save £{service.savings}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold drop-shadow-lg">{service.name}</h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4 p-3 bg-orange-50 rounded-xl">
                      <div>
                        <p className="text-xs text-gray-500 line-through">
                          £{service.regularPrice}
                        </p>
                        <p className="text-3xl font-bold text-orange-600">
                          £{service.quickPrice}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          15% OFF
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          ⏱️ {Math.floor(service.duration / 60)}h {service.duration % 60 > 0 ? `${service.duration % 60}m` : ''}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        ⚡ Available Time Slots:
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {slots.map((time) => (
                          <button
                            key={time}
                            onClick={() => handleQuickBook(service, time)}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-2 px-3 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg text-sm"
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 text-center">
                        💳 20% deposit required • 📅 Book now to secure your spot!
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-8 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-6 border-2 border-orange-300">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🔥</div>
            <div>
              <h4 className="text-lg font-bold text-orange-900 mb-2">Why Book Last-Minute?</h4>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• <strong>Save 15%</strong> on quick services</li>
                <li>• <strong>Same-day & next-day</strong> availability</li>
                <li>• <strong>No waiting</strong> - instant confirmation</li>
                <li>• Perfect for <strong>urgent events</strong> or spontaneous pampering</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastMinuteBookings;
