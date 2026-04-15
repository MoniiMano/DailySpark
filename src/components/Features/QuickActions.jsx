import { useState } from 'react';
import { Zap, Target, Trophy, Calendar } from 'lucide-react';
import { Button } from '../UI/Button';

export const QuickActions = ({ 
  onAddAchievement, 
  onAddGoal, 
  selectedDate, 
  navigateToToday 
}) => {
  const [quickAchievement, setQuickAchievement] = useState('');
  const [quickGoal, setQuickGoal] = useState('');

  const quickAchievements = [
    "Completed morning workout 💪",
    "Drank 8 glasses of water 💧",
    "Read for 30 minutes 📚",
    "Meditated for 10 minutes 🧘",
    "Learned something new 🎓",
    "Helped someone today 🤝"
  ];

  const quickGoals = [
    "Exercise for 30 minutes",
    "Read 20 pages of a book",
    "Drink 8 glasses of water",
    "Complete work tasks on time",
    "Practice gratitude",
    "Connect with a friend"
  ];

  const addQuickAchievement = (achievement) => {
    onAddAchievement(selectedDate, achievement);
  };

  const addQuickGoal = (goal) => {
    onAddGoal(goal);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Zap size={20} className="text-motivation-orange" />
        <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
      </div>

      <div className="space-y-4">
        {/* Quick Achievement */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            <Trophy size={14} />
            Quick Achievement
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {quickAchievements.slice(0, 3).map((achievement, index) => (
              <button
                key={index}
                onClick={() => addQuickAchievement(achievement)}
                className="text-left p-2 text-xs bg-success-50 hover:bg-success-100 rounded-lg border border-success-200 transition-colors duration-200"
              >
                {achievement}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Goal */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            <Target size={14} />
            Quick Goal
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {quickGoals.slice(0, 3).map((goal, index) => (
              <button
                key={index}
                onClick={() => addQuickGoal(goal)}
                className="text-left p-2 text-xs bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors duration-200"
              >
                {goal}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="pt-2 border-t border-gray-200">
          <Button
            onClick={navigateToToday}
            variant="outline"
            size="sm"
            className="w-full justify-center"
          >
            <Calendar size={14} className="mr-1" />
            Jump to Today
          </Button>
        </div>
      </div>
    </div>
  );
};