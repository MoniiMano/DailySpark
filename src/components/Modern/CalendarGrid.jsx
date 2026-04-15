import { motion } from 'framer-motion';
import { format, getDay, isSameMonth } from 'date-fns';

export const CalendarGrid = ({ 
  monthDays, 
  currentDate,
  selectedDate, 
  onDateSelect, 
  isSelectedDate, 
  isTodayDate,
  getAchievements,
  getNotes
}) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const firstDayOfMonth = monthDays[0];
  const startingDayOfWeek = getDay(firstDayOfMonth);
  const emptyCells = Array(startingDayOfWeek).fill(null);

  const getDayStatus = (date) => {
    const achievements = getAchievements(date);
    const notes = getNotes ? getNotes(date) : [];
    const hasContent = achievements.length > 0 || notes.length > 0;
    
    if (isTodayDate(date)) return 'today';
    if (isSelectedDate(date)) return 'selected';
    if (hasContent) return 'has-content';
    return 'default';
  };

  const getDayClasses = (date) => {
    const status = getDayStatus(date);
    const isCurrentMonth = isSameMonth(date, currentDate);
    
    let classes = "w-full aspect-square rounded-2xl flex items-center justify-center text-sm font-medium transition-all duration-200 cursor-pointer ";
    
    if (!isCurrentMonth) {
      classes += "text-gray-300 hover:text-gray-400 hover:bg-gray-50 ";
    } else {
      switch (status) {
        case 'today':
          classes += "bg-orange-500 text-white shadow-lg hover:bg-orange-600 ";
          break;
        case 'selected':
          classes += "bg-purple-600 text-white shadow-lg ";
          break;
        case 'has-content':
          classes += "bg-blue-100 text-blue-700 hover:bg-blue-200 ";
          break;
        default:
          classes += "text-gray-700 hover:bg-gray-100 ";
      }
    }
    
    return classes;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="card p-6"
    >
      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center py-2 text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty cells */}
        {emptyCells.map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}
        
        {/* Month days */}
        {monthDays.map((date, index) => {
          const dayNumber = format(date, 'd');
          const achievements = getAchievements(date);
          const notes = getNotes ? getNotes(date) : [];
          const hasContent = achievements.length > 0 || notes.length > 0;
          
          return (
            <motion.button
              key={format(date, 'yyyy-MM-dd')}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.2, 
                delay: index * 0.01,
                type: "spring",
                stiffness: 300
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDateSelect(date)}
              className={getDayClasses(date)}
            >
              <div className="relative">
                {dayNumber}
                {hasContent && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded-full"></div>
          <span>Has Content</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
          <span>Selected</span>
        </div>
      </div>
    </motion.div>
  );
};