import { motion, AnimatePresence } from 'framer-motion';
import { format, getDay, isSameMonth } from 'date-fns';
import { Star, Sparkles, Zap } from 'lucide-react';

export const SparkCalendarGrid = ({ 
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

  const getDayIcon = (date) => {
    const status = getDayStatus(date);
    const achievements = getAchievements(date);
    const notes = getNotes ? getNotes(date) : [];
    
    if (status === 'today') return <Zap size={12} className="text-white" />;
    if (achievements.length > 0) return <Star size={10} className="text-white fill-current" />;
    if (notes.length > 0) return <Sparkles size={10} className="text-white" />;
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="neon-card p-8 relative overflow-hidden"
    >
      {/* Cosmic background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30"
            animate={{
              x: [0, Math.random() * 400],
              y: [0, Math.random() * 300],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-3 mb-6 relative z-10">
        {weekDays.map((day, index) => (
          <motion.div
            key={day}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center py-3"
          >
            <div className="text-sm font-bold text-white/90 bg-white/10 backdrop-blur-xl rounded-2xl py-3 border border-white/20 neon-text">
              {day}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-3 relative z-10">
        {/* Empty cells */}
        {emptyCells.map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}
        
        {/* Month days */}
        <AnimatePresence>
          {monthDays.map((date, index) => {
            const dayNumber = format(date, 'd');
            const status = getDayStatus(date);
            const isCurrentMonth = isSameMonth(date, currentDate);
            const achievements = getAchievements(date);
            const notes = getNotes ? getNotes(date) : [];
            const totalContent = achievements.length + notes.length;
            
            return (
              <motion.button
                key={format(date, 'yyyy-MM-dd')}
                initial={{ opacity: 0, scale: 0, rotateY: 180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0, rotateY: -180 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.02,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 10,
                  z: 50
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDateSelect(date)}
                className={`
                  calendar-day aspect-square flex flex-col items-center justify-center text-sm font-bold relative
                  ${!isCurrentMonth ? 'opacity-40' : ''}
                  ${status === 'today' ? 'today' : ''}
                  ${status === 'selected' ? 'selected' : ''}
                  ${status === 'has-content' ? 'has-content' : ''}
                `}
              >
                {/* Day number */}
                <motion.span 
                  className="text-white relative z-10 mb-1"
                  animate={status === 'today' ? { 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {dayNumber}
                </motion.span>

                {/* Content indicators */}
                <div className="flex items-center gap-1 relative z-10">
                  {getDayIcon(date)}
                  {totalContent > 1 && (
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-xs text-white font-bold"
                    >
                      {totalContent}
                    </motion.span>
                  )}
                </div>

                {/* Floating particles for content days */}
                {totalContent > 0 && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(Math.min(totalContent, 3))].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        animate={{
                          y: [0, -20, 0],
                          x: [0, Math.random() * 10 - 5, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                        style={{
                          left: `${20 + i * 20}%`,
                          top: '80%',
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Selection glow effect */}
                {status === 'selected' && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(128, 0, 255, 0.5)',
                        '0 0 40px rgba(128, 0, 255, 0.8)',
                        '0 0 20px rgba(128, 0, 255, 0.5)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* Today pulse effect */}
                {status === 'today' && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(255, 0, 128, 0.5)',
                        '0 0 40px rgba(255, 128, 0, 0.8)',
                        '0 0 20px rgba(255, 0, 128, 0.5)',
                      ],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Legend with animations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex items-center justify-center gap-8 mt-8 text-xs text-white/80 relative z-10"
      >
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-neon-pink to-neon-orange animate-pulse-glow"></div>
          <span>Today</span>
        </motion.div>
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-neon-green to-neon-blue animate-pulse-glow"></div>
          <span>Has Content</span>
        </motion.div>
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue animate-pulse-glow"></div>
          <span>Selected</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};