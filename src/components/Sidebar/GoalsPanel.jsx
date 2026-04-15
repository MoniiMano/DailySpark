import { useState } from 'react';
import { Target, Plus, X, Check } from 'lucide-react';

export const GoalsPanel = ({ 
  goals, 
  onAddGoal, 
  onToggleGoal, 
  onRemoveGoal 
}) => {
  const [newGoal, setNewGoal] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newGoal.trim()) {
      onAddGoal(newGoal);
      setNewGoal('');
      setIsAdding(false);
    }
  };

  const completedGoals = goals.filter(goal => goal.completed);
  const pendingGoals = goals.filter(goal => !goal.completed);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target size={20} className="text-motivation-purple" />
          <h3 className="text-lg font-semibold text-gray-800">Goals</h3>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="p-2 rounded-lg bg-motivation-purple text-white hover:bg-indigo-600 transition-colors duration-200"
          aria-label="Add goal"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Add goal form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-4 animate-slide-up">
          <div className="flex gap-2">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="What's your goal?"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-motivation-purple focus:border-transparent"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 bg-motivation-purple text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200"
            >
              Add
            </button>
          </div>
        </form>
      )}

      {/* Goals list */}
      <div className="space-y-3">
        {goals.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Target size={32} className="mx-auto mb-2 opacity-50" />
            <p>No goals set yet.</p>
            <p className="text-sm">Set your first goal!</p>
          </div>
        ) : (
          <>
            {/* Pending goals */}
            {pendingGoals.map((goal) => (
              <div
                key={goal.id}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in"
              >
                <button
                  onClick={() => onToggleGoal(goal.id)}
                  className="mt-0.5 w-5 h-5 rounded border-2 border-gray-300 hover:border-motivation-purple transition-colors duration-200 flex items-center justify-center"
                  aria-label="Mark as completed"
                >
                  {goal.completed && <Check size={12} className="text-motivation-purple" />}
                </button>
                <p className={`flex-1 text-sm ${goal.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {goal.text}
                </p>
                <button
                  onClick={() => onRemoveGoal(goal.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  aria-label="Remove goal"
                >
                  <X size={16} />
                </button>
              </div>
            ))}

            {/* Completed goals */}
            {completedGoals.length > 0 && (
              <>
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs font-medium text-gray-500 mb-2">COMPLETED</p>
                </div>
                {completedGoals.map((goal) => (
                  <div
                    key={goal.id}
                    className="flex items-start gap-3 p-3 bg-success-50 rounded-lg border border-success-200 animate-fade-in"
                  >
                    <button
                      onClick={() => onToggleGoal(goal.id)}
                      className="mt-0.5 w-5 h-5 rounded border-2 border-success-500 bg-success-500 transition-colors duration-200 flex items-center justify-center"
                      aria-label="Mark as incomplete"
                    >
                      <Check size={12} className="text-white" />
                    </button>
                    <p className="flex-1 text-sm line-through text-gray-600">
                      {goal.text}
                    </p>
                    <button
                      onClick={() => onRemoveGoal(goal.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                      aria-label="Remove goal"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>

      {/* Progress indicator */}
      {goals.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{completedGoals.length}/{goals.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-motivation-purple h-2 rounded-full transition-all duration-300"
              style={{ width: `${goals.length > 0 ? (completedGoals.length / goals.length) * 100 : 0}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};