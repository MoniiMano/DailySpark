import { TrendingUp, Calendar, Target, Star } from 'lucide-react';

export const MonthlyStats = ({ stats }) => {
  const {
    totalDays,
    daysWithAchievements,
    achievementRate,
    completedGoals,
    totalGoals,
    goalCompletionRate
  } = stats;

  const statCards = [
    {
      icon: Calendar,
      label: 'Active Days',
      value: `${daysWithAchievements}/${totalDays}`,
      percentage: achievementRate,
      color: 'text-motivation-orange',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      icon: Target,
      label: 'Goals Completed',
      value: `${completedGoals}/${totalGoals}`,
      percentage: goalCompletionRate,
      color: 'text-motivation-purple',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={20} className="text-motivation-pink" />
        <h3 className="text-lg font-semibold text-gray-800">Monthly Progress</h3>
      </div>

      <div className="space-y-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${stat.bgColor} ${stat.borderColor} animate-fade-in`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <stat.icon size={18} className={stat.color} />
                <span className="text-sm font-medium text-gray-700">{stat.label}</span>
              </div>
              <span className="text-lg font-bold text-gray-800">{stat.value}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    stat.color.includes('orange') ? 'bg-motivation-orange' : 'bg-motivation-purple'
                  }`}
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
              <span className={`text-sm font-semibold ${stat.color}`}>
                {stat.percentage}%
              </span>
            </div>
          </div>
        ))}

        {/* Motivational message */}
        <div className="mt-6 p-4 bg-gradient-to-r from-motivation-pink/10 to-motivation-purple/10 rounded-lg border border-motivation-pink/20">
          <div className="flex items-center gap-2 mb-2">
            <Star size={16} className="text-motivation-pink" />
            <span className="text-sm font-medium text-gray-700">Keep Going!</span>
          </div>
          <p className="text-sm text-gray-600">
            {achievementRate >= 70 
              ? "Amazing progress! You're crushing your goals! 🚀"
              : achievementRate >= 40
              ? "Great momentum! Keep building those daily wins! 💪"
              : "Every small step counts. You've got this! 🌟"
            }
          </p>
        </div>
      </div>
    </div>
  );
};