import { Calendar, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const CalendarHeader = ({ 
  currentMonth, 
  onPreviousMonth, 
  onNextMonth, 
  onToday 
}) => {
  return (
    <div className="mb-8">
      {/* Main Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-white rounded-2xl shadow-soft border border-neutral-200">
            <Calendar className="text-accent-blue" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">
              Motivated Calendar
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Track your daily wins and stay inspired
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onToday}
            className="px-4 py-2 text-sm font-medium text-accent-blue bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-all duration-200 shadow-soft"
          >
            Today
          </button>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-center space-x-6 p-4 bg-white rounded-2xl shadow-soft border border-neutral-200">
        <button
          onClick={onPreviousMonth}
          className="p-2 rounded-xl hover:bg-neutral-100 transition-all duration-200 text-neutral-600 hover:text-neutral-800"
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex items-center space-x-2">
          <Sparkles size={16} className="text-accent-purple" />
          <h2 className="text-xl font-semibold text-neutral-800 min-w-[200px] text-center">
            {currentMonth}
          </h2>
          <Sparkles size={16} className="text-accent-purple" />
        </div>
        
        <button
          onClick={onNextMonth}
          className="p-2 rounded-xl hover:bg-neutral-100 transition-all duration-200 text-neutral-600 hover:text-neutral-800"
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};