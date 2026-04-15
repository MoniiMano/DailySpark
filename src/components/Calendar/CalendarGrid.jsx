import { format, getDay } from 'date-fns';
import { CalendarDay } from './CalendarDay';

export const CalendarGrid = ({ 
  monthDays, 
  selectedDate, 
  onDateSelect, 
  isSelectedDate, 
  isTodayDate,
  getAchievements 
}) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Calculate empty cells for the first week
  const firstDayOfMonth = monthDays[0];
  const startingDayOfWeek = getDay(firstDayOfMonth);
  const emptyCells = Array(startingDayOfWeek).fill(null);

  return (
    <div className="bg-white rounded-3xl shadow-medium border border-neutral-200 p-8 animate-fade-in">
      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-4 mb-6">
        {weekDays.map(day => (
          <div 
            key={day} 
            className="text-center py-3"
          >
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-3">
        {/* Empty cells for days before month starts */}
        {emptyCells.map((_, index) => (
          <div key={`empty-${index}`} className="h-14" />
        ))}
        
        {/* Month days */}
        {monthDays.map(date => (
          <CalendarDay
            key={format(date, 'yyyy-MM-dd')}
            date={date}
            isSelected={isSelectedDate(date)}
            isToday={isTodayDate(date)}
            achievements={getAchievements(date)}
            onClick={() => onDateSelect(date)}
          />
        ))}
      </div>
    </div>
  );
};