import { motion } from 'framer-motion';
import { useCalendar } from './hooks/useCalendar';
import { WeatherTimeCard } from './components/Modern/WeatherTimeCard';
import { CalendarHeader } from './components/Modern/CalendarHeader';
import { CalendarGrid } from './components/Modern/CalendarGrid';
import { MotivationCard } from './components/Modern/MotivationCard';
import { NotesCard } from './components/Modern/NotesCard';
import { GoalsCard } from './components/Modern/GoalsCard';
import { AchievementsCard } from './components/Modern/AchievementsCard';

function App() {
  const {
    // Navigation
    navigateToNextMonth,
    navigateToPreviousMonth,
    navigateToToday,
    selectDate,
    
    // Data
    currentMonth,
    currentDate,
    monthDays,
    selectedDate,
    getDailyQuote,
    isSelectedDate,
    isTodayDate,
    
    // Achievements
    addAchievement,
    getAchievements,
    removeAchievement,
    
    // Notes
    addNote,
    getNotes,
    updateNote,
    removeNote,
    
    // Goals
    addGoal,
    goals,
    toggleGoal,
    removeGoal,
    
    // Statistics
    monthlyStats
  } = useCalendar();

  const selectedDateAchievements = getAchievements(selectedDate);
  const selectedDateNotes = getNotes(selectedDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-blue-800">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        
        {/* Top Row - Weather/Time and Calendar Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <WeatherTimeCard />
          </div>
          <div className="lg:col-span-2">
            <CalendarHeader
              currentMonth={currentMonth}
              onPreviousMonth={navigateToPreviousMonth}
              onNextMonth={navigateToNextMonth}
              onToday={navigateToToday}
            />
               <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8"
        >
          <div className="card p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {monthlyStats.daysWithContent}
                </div>
                <p className="text-sm text-gray-500">Active Days</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {monthlyStats.contentRate}%
                </div>
                <p className="text-sm text-gray-500">Engagement</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {monthlyStats.completedGoals}
                </div>
                <p className="text-sm text-gray-500">Goals Done</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {monthlyStats.goalCompletionRate}%
                </div>
                <p className="text-sm text-gray-500">Success Rate</p>
              </div>
            </div>
          </div>
        </motion.div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <MotivationCard selectedDate={selectedDate} />
            <GoalsCard
              goals={goals}
              onAddGoal={addGoal}
              onToggleGoal={toggleGoal}
              onRemoveGoal={removeGoal}
            />
          </div>

          {/* Calendar - Center */}
          <div className="lg:col-span-6">
            <CalendarGrid
              monthDays={monthDays}
              currentDate={currentDate}
              selectedDate={selectedDate}
              onDateSelect={selectDate}
              isSelectedDate={isSelectedDate}
              isTodayDate={isTodayDate}
              getAchievements={getAchievements}
              getNotes={getNotes}
            />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <NotesCard
              selectedDate={selectedDate}
              notes={selectedDateNotes}
              onAddNote={addNote}
              onUpdateNote={updateNote}
              onRemoveNote={removeNote}
            />
            <AchievementsCard
              selectedDate={selectedDate}
              achievements={selectedDateAchievements}
              onAddAchievement={addAchievement}
              onRemoveAchievement={removeAchievement}
            />
          </div>
        </div>

        {/* Bottom Stats */}
     
      </div>
    </div>
  );
}

export default App;