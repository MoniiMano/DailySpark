import { motion, AnimatePresence } from 'framer-motion';
import { format, getDay, isToday, isSameMonth } from 'date-fns';
import { Star, Plus, Calendar, Sparkles } from 'lucide-react';

export const CreativeCalendarGrid = ({ 
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
  
  // Calculate empty cells for the first week
  const firstDayOfMonth = monthDays[0];
  const startingDayOfWeek = getDay(firstDayOfMonth);
  const emptyCells = Array(startingDayOfWeek).fill(null);

  const getDayGradient = (date) => {
    const achievements = getAchievements(date);
    const notes = getNotes ? getNotes(date) : [];
    
    if (isTodayDate(date)) {
      return "from-yellow-400 via-orange-500 to-red-500";
    } else if (isSelectedDate(date)) {
      return "from-purple-400 via-pink-500 to-red-500";
    } else if (achievements.length > 0 || notes.length > 0) {
      return "from-green-400 via-blue-500 to-purple-600";
    } else if (isSameMonth(date, currentDate)) {
      return "from-blue-100 via-purple-50 to-pink-50";
    } else {
      return "from-gray-100 to-gray-200";
    }
  };

  const getDayContent = (date) => {
    const achievements = getAchievements(date);
    const notes = getNotes ? getNotes(date) : [];
    const hasContent = achievements.length > 0 || notes.length > 0;
    
    return {
      hasContent,
      totalItems: achievements.length + notes.length,
      achievements: achievements.length,
      notes: notes.length
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="glass rounded-3xl p-6 shadow-creative-lg"
    >
      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-3 mb-6">
        {weekDays.map((day, index) => (
          <motion.div
            key={day}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="text-center py-3"
          >
            <div className="text-sm font-semibold text-white/90 bg-white/10 rounded-xl py-2 backdrop-blur-sm">
              {day}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-3">
        {/* Empty cells for days before month starts */}
        {emptyCells.map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}
        
        {/* Month days */}
        <AnimatePresence>
          {monthDays.map((date, index) => {
            const dayContent = getDayContent(date);
            const dayNumber = format(date, 'd');
            const isCurrentMonth = isSameMonth(date, currentDate);
            
            return (
              <motion.button
                key={format(date, 'yyyy-MM-dd')}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.02,
                  type: "spring",
                  stiffness: 300
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDateSelect(date)}
                className={`
                  relative aspect-square rounded-2xl p-2 transition-all duration-300
                  bg-gradient-to-br ${getDayGradient(date)}
                  ${isCurrentMonth ? 'text-white shadow-lg' : 'text-gray-400'}
                  ${isTodayDate(date) ? 'animate-glow shadow-glow-blue' : ''}
                  ${isSelectedDate(date) ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent' : ''}
                  calendar-day-hover overflow-hidden
                `}
                aria-label={`${format(date, 'MMMM d, yyyy')}${dayContent.hasContent ? ` - ${dayContent.totalItems} items` : ''}`}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-white/30"></div>
                  <div className="absolute bottom-1 left-1 w-2 h-2 rounded-full bg-white/20"></div>
                </div>

                {/* Day number */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <motion.span 
                    className={`text-lg font-bold mb-1 ${
                      isTodayDate(date) ? 'animate-bounce-gentle' : ''
                    }`}
                    animate={isTodayDate(date) ? { 
                      scale: [1, 1.1, 1],
                      rotate: [0, 2, -2, 0]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {dayNumber}
                  </motion.span>

                  {/* Content indicators */}
                  {dayContent.hasContent && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-1"
                    >
                      {dayContent.achievements > 0 && (
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="flex items-center"
                        >
                          <Star size={8} className="text-yellow-300 fill-current" />
                          {dayContent.achievements > 1 && (
                            <span className="text-xs font-bold ml-1">{dayContent.achievements}</span>
                          )}
                        </motion.div>
                      )}
                      
                      {dayContent.notes > 0 && (
                        <motion.div
                          animate={{ y: [0, -2, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Calendar size={8} className="text-blue-200" />
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Today indicator */}
                  {isTodayDate(date) && (
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute -top-1 -right-1"
                    >
                      <Sparkles size={12} className="text-yellow-300" />
                    </motion.div>
                  )}
                </div>

                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-2xl opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Selection ring */}
                {isSelectedDate(date) && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 rounded-2xl border-2 border-white/50"
                  />
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Calendar footer with quick stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-6 flex items-center justify-center gap-4 text-white/80 text-sm"
      >
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500"></div>
          <span>Has Content</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-500"></div>
          <span>Selected</span>
        </div>
      </motion.div>
    </motion.div>
  );
};