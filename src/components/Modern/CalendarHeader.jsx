import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

export const CalendarHeader = ({ 
  currentMonth, 
  onPreviousMonth, 
  onNextMonth, 
  onToday 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-xl">
            <Calendar size={20} className="text-purple-600" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">DailySpark - Motivated Calendar</h1>
             
                 
                  
                   
               
            <p className="text-sm text-gray-500">Track your daily progress</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onToday}
            className="btn btn-secondary text-sm px-4 py-2"
          >
            Today
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onPreviousMonth}
              className="btn btn-ghost p-2"
            >
              <ChevronLeft size={18} />
            </button>
            
            <div className="min-w-[140px] text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                {currentMonth}
              </h2>
            </div>
            
            <button
              onClick={onNextMonth}
              className="btn btn-ghost p-2"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};