import React, { useState } from 'react';

interface BookingCalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  unavailableDates?: string[];
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  selectedDate,
  onDateSelect,
  unavailableDates = [],
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const isDateUnavailable = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return unavailableDates.includes(dateStr);
  };

  const isDatePast = (date: Date) => {
    return date < today;
  };

  const isSunday = (date: Date) => {
    return date.getDay() === 0; // Sunday = 0
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    if (isDatePast(clickedDate) || isSunday(clickedDate) || isDateUnavailable(clickedDate)) {
      return;
    }

    const dateStr = clickedDate.toISOString().split('T')[0];
    onDateSelect(dateStr);
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Calendar days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dateStr = date.toISOString().split('T')[0];
      const isSelected = dateStr === selectedDate;
      const isPast = isDatePast(date);
      const isClosed = isSunday(date);
      const isFullyBooked = isDateUnavailable(date);
      const isDisabled = isPast || isClosed || isFullyBooked;

      let dayClasses = 'p-3 text-center rounded-xl font-semibold cursor-pointer transition-all duration-200 ';
      
      if (isSelected) {
        dayClasses += 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg scale-105 ring-4 ring-purple-200';
      } else if (isDisabled) {
        dayClasses += 'text-gray-300 cursor-not-allowed bg-gray-50';
        if (isClosed) dayClasses += ' line-through';
        if (isFullyBooked) dayClasses += ' bg-red-50 text-red-300';
      } else {
        dayClasses += 'text-gray-700 hover:bg-purple-100 hover:scale-110 hover:shadow-md bg-white border-2 border-purple-100';
      }

      days.push(
        <div
          key={day}
          className={dayClasses}
          onClick={() => handleDateClick(day)}
          title={
            isClosed ? 'Closed on Sundays' :
            isFullyBooked ? 'Fully Booked' :
            isPast ? 'Past Date' : 
            'Click to select'
          }
        >
          <div className="text-sm">{day}</div>
          {isFullyBooked && !isPast && !isClosed && (
            <div className="text-xs text-red-500 mt-1">Full</div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-100">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-full hover:bg-purple-100 transition-colors"
          aria-label="Previous month"
        >
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h3 className="text-2xl font-bold text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-full hover:bg-purple-100 transition-colors"
          aria-label="Next month"
        >
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-2 mb-3">
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm font-bold text-gray-500 uppercase">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {renderCalendarDays()}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t-2 border-gray-100 flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-purple-600 to-pink-600"></div>
          <span className="text-gray-600">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-white border-2 border-purple-100"></div>
          <span className="text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-50 text-red-300 flex items-center justify-center text-[8px]">F</div>
          <span className="text-gray-600">Fully Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-50 line-through"></div>
          <span className="text-gray-600">Closed</span>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
