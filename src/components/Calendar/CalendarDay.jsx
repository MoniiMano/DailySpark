import { format } from 'date-fns';
import { Zap, Circle } from 'lucide-react';

export const CalendarDay = ({ 
  date, 
  isSelected, 
  isToday, 
  achievements, 
  onClick 
}) => {
  const dayNumber = format(date, 'd');
  const hasAchievements = achievements.length > 0;

  const getDateClasses = () => {
    let classes = "relative h-14 w-full rounded-2xl transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-sm font-medium group hover:scale-105 ";
    
    if (isSelected) {
      classes += "bg-accent-blue text-white shadow-colored border-2 border-accent-blue transform scale-105 ";
    } else if (isToday) {
      classes += "bg-accent-orange text-white shadow-medium border-2 border-accent-orange animate-pulse-soft ";
    } else if (hasAchievements) {
      classes += "bg-accent-green/10 text-accent-green border-2 border-accent-green/30 hover:bg-accent-green/20 ";
    } else {
      classes += "bg-neutral-50 text-neutral-700 border-2 border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300 ";
    }
    
    return classes;
  };

  return (
    <button
      onClick={onClick}
      className={getDateClasses()}
      aria-label={`${format(date, 'MMMM d, yyyy')}${hasAchievements ? ' - Has achievements' : ''}`}
    >
      {/* Day number */}
      <span className="text-base font-semibold mb-1">{dayNumber}</span>
      
      {/* Achievement indicators */}
      <div className="flex items-center space-x-1">
        {hasAchievements && (
          <>
            {achievements.length === 1 ? (
              <Zap size={8} className="fill-current" />
            ) : (
              <div className="flex items-center space-x-0.5">
                <Circle size={4} className="fill-current" />
                <Circle size={4} className="fill-current" />
                {achievements.length > 2 && (
                  <Circle size={4} className="fill-current" />
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
    </button>
  );
};