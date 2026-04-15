import { useState } from 'react';
import { format } from 'date-fns';
import { Trophy, Plus, X, Zap, Award } from 'lucide-react';

export const AchievementPanel = ({ 
  selectedDate, 
  achievements, 
  onAddAchievement, 
  onRemoveAchievement 
}) => {
  const [newAchievement, setNewAchievement] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newAchievement.trim()) {
      onAddAchievement(selectedDate, newAchievement);
      setNewAchievement('');
      setIsAdding(false);
    }
  };

  const formattedDate = format(selectedDate, 'MMM d, yyyy');

  return (
    <div className="bg-white rounded-3xl shadow-medium border border-neutral-200 p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent-orange/10 rounded-xl">
            <Trophy size={20} className="text-accent-orange" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">Achievements</h3>
            <p className="text-sm text-neutral-500">{formattedDate}</p>
          </div>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className={`p-3 rounded-xl transition-all duration-200 ${
            isAdding 
              ? 'bg-neutral-100 text-neutral-600 rotate-45' 
              : 'bg-accent-orange text-white hover:bg-orange-600 shadow-soft hover:shadow-medium'
          }`}
          aria-label="Add achievement"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Add achievement form */}
      {isAdding && (
        <div className="mb-6 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              placeholder="What did you achieve today?"
              className="input-base"
              autoFocus
            />
            <div className="flex space-x-2">
              <button
                type="submit"
                className="flex-1 btn-primary py-3 rounded-xl"
              >
                Add Achievement
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="btn-secondary py-3 px-4 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Achievements list */}
      <div className="space-y-3">
        {achievements.length === 0 ? (
          <div className="text-center py-12">
            <div className="p-4 bg-neutral-50 rounded-2xl w-fit mx-auto mb-4">
              <Award size={32} className="text-neutral-400" />
            </div>
            <p className="text-neutral-600 font-medium mb-1">No achievements yet</p>
            <p className="text-sm text-neutral-400">
              Add your first win of the day!
            </p>
          </div>
        ) : (
          achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className="group flex items-start space-x-3 p-4 bg-accent-green/5 border border-accent-green/20 rounded-2xl hover:bg-accent-green/10 transition-all duration-200 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-1.5 bg-accent-green/20 rounded-lg mt-0.5">
                <Zap size={12} className="text-accent-green" />
              </div>
              <p className="flex-1 text-sm text-neutral-700 leading-relaxed">
                {achievement.text}
              </p>
              <button
                onClick={() => onRemoveAchievement(selectedDate, achievement.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-100 text-neutral-400 hover:text-red-500 transition-all duration-200"
                aria-label="Remove achievement"
              >
                <X size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Achievement count */}
      {achievements.length > 0 && (
        <div className="mt-6 pt-4 border-t border-neutral-100">
          <div className="flex items-center justify-center space-x-2 text-sm">
            <Zap size={14} className="text-accent-orange" />
            <span className="text-neutral-600">
              <span className="font-semibold text-accent-orange">{achievements.length}</span>
              {' '}achievement{achievements.length !== 1 ? 's' : ''} today
            </span>
            <Zap size={14} className="text-accent-orange" />
          </div>
        </div>
      )}
    </div>
  );
};