import React from 'react';

interface TimeSlot {
  time: string;
  displayTime: string;
  available: boolean;
  bookedCount?: number;
}

interface TimeSlotGridProps {
  selectedDate: string;
  selectedTime: string;
  onTimeSelect: (time: string) => void;
  serviceDuration: number; // in minutes
}

const TimeSlotGrid: React.FC<TimeSlotGridProps> = ({
  selectedDate,
  selectedTime,
  onTimeSelect,
  serviceDuration,
}) => {
  // Generate time slots based on business hours
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay();
    
    // Business hours: Mon-Thu: 9:30-18:00, Fri-Sat: 9:00-19:00, Sun: Closed
    let startHour = 9;
    let startMinute = 30;
    let endHour = 18;
    
    if (dayOfWeek === 5 || dayOfWeek === 6) { // Friday or Saturday
      startHour = 9;
      startMinute = 0;
      endHour = 19;
    }
    
    if (dayOfWeek === 0) { // Sunday - closed
      return [];
    }

    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    // Generate slots every 30 minutes
    let currentHour = startHour;
    let currentMinute = startMinute;
    
    while (currentHour < endHour || (currentHour === endHour && currentMinute === 0)) {
      const timeStr = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
      
      // Check if slot is in the past for today
      let isPast = false;
      if (isToday) {
        const slotTime = new Date(date);
        slotTime.setHours(currentHour, currentMinute, 0, 0);
        isPast = slotTime <= now;
      }
      
      // Simulate availability (in real app, this would come from backend)
      const random = Math.random();
      const available = !isPast && random > 0.3; // 70% availability
      const bookedCount = available ? Math.floor(random * 3) : 3;
      
      slots.push({
        time: timeStr,
        displayTime: formatTime(currentHour, currentMinute),
        available: available && !isPast,
        bookedCount,
      });
      
      // Increment by 30 minutes
      currentMinute += 30;
      if (currentMinute >= 60) {
        currentHour += 1;
        currentMinute = 0;
      }
    }
    
    return slots;
  };

  const formatTime = (hour: number, minute: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  const timeSlots = generateTimeSlots();
  
  if (!selectedDate) {
    return (
      <div className="bg-purple-50 rounded-2xl p-12 text-center border-2 border-purple-100">
        <div className="text-6xl mb-4">📅</div>
        <p className="text-gray-600 text-lg font-semibold">Please select a date first</p>
      </div>
    );
  }

  if (timeSlots.length === 0) {
    return (
      <div className="bg-red-50 rounded-2xl p-12 text-center border-2 border-red-100">
        <div className="text-6xl mb-4">🚫</div>
        <p className="text-gray-700 text-lg font-semibold">Sorry, we're closed on Sundays</p>
      </div>
    );
  }

  const getSlotClasses = (slot: TimeSlot) => {
    const isSelected = slot.time === selectedTime;
    
    if (isSelected) {
      return 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg scale-105 ring-4 ring-purple-200';
    }
    
    if (!slot.available) {
      return 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60';
    }
    
    // Color code by availability
    if (slot.bookedCount && slot.bookedCount >= 2) {
      return 'bg-yellow-50 border-2 border-yellow-300 text-yellow-800 hover:bg-yellow-100 hover:scale-105 cursor-pointer';
    }
    
    return 'bg-green-50 border-2 border-green-300 text-green-800 hover:bg-green-100 hover:scale-105 cursor-pointer';
  };

  const getAvailabilityBadge = (slot: TimeSlot) => {
    if (!slot.available) {
      return <span className="text-xs text-red-500 font-semibold">Booked</span>;
    }
    
    if (slot.bookedCount && slot.bookedCount >= 2) {
      return <span className="text-xs text-yellow-600 font-semibold">Limited</span>;
    }
    
    return <span className="text-xs text-green-600 font-semibold">Available</span>;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-100">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Select Your Time</h3>
        <p className="text-gray-600">
          Selected: <span className="font-semibold text-purple-600">
            {new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </p>
        {serviceDuration > 0 && (
          <p className="text-sm text-gray-500 mt-1">
            ⏱️ Estimated duration: {serviceDuration} minutes
          </p>
        )}
      </div>

      {/* Time Slots Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {timeSlots.map((slot) => (
          <button
            key={slot.time}
            onClick={() => slot.available && onTimeSelect(slot.time)}
            disabled={!slot.available}
            className={`p-4 rounded-xl font-semibold transition-all duration-200 ${getSlotClasses(slot)}`}
            title={slot.available ? 'Click to select' : 'This slot is fully booked'}
          >
            <div className="text-lg mb-1">{slot.displayTime}</div>
            {getAvailabilityBadge(slot)}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t-2 border-gray-100 flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-50 border-2 border-green-300"></div>
          <span className="text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-50 border-2 border-yellow-300"></div>
          <span className="text-gray-600">Limited Spots</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-100"></div>
          <span className="text-gray-600">Fully Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-purple-600 to-pink-600"></div>
          <span className="text-gray-600">Your Selection</span>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotGrid;
