import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Plus, X, Check } from 'lucide-react';

export const GoalsCard = ({ 
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
      onAddGoal(newGoal.trim());
      setNewGoal('');
      setIsAdding(false);
    }
  };

  const completedGoals = goals.filter(goal => goal.completed);
  const pendingGoals = goals.filter(goal => !goal.completed);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-xl">
            <Target size={20} className="text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Goals</h3>
            <p className="text-sm text-gray-500">Set your objectives</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="btn btn-ghost p-2"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Add goal form */}
      <AnimatePresence>
        {isAdding && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="mb-4"
          >
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="What's your goal?"
              className="input mb-3"
              autoFocus
            />
            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary text-sm">
                Add Goal
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="btn btn-secondary text-sm"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Goals list */}
      <div className="space-y-3">
        {goals.length === 0 ? (
          <div className="text-center py-8">
            <Target size={32} className="text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500 text-sm mb-1">No goals set yet.</p>
            <p className="text-gray-400 text-xs">Set your first goal!</p>
          </div>
        ) : (
          <>
            {/* Pending goals */}
            {pendingGoals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100"
              >
                <button
                  onClick={() => onToggleGoal(goal.id)}
                  className="mt-0.5 w-5 h-5 rounded border-2 border-gray-300 hover:border-green-500 transition-colors duration-200 flex items-center justify-center"
                >
                  {goal.completed && <Check size={12} className="text-green-500" />}
                </button>
                <p className={`flex-1 text-sm ${goal.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                  {goal.text}
                </p>
                <button
                  onClick={() => onRemoveGoal(goal.id)}
                  className="btn btn-ghost p-1 text-red-500 hover:text-red-600"
                >
                  <X size={12} />
                </button>
              </motion.div>
            ))}

            {/* Completed goals */}
            {completedGoals.length > 0 && (
              <>
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs font-medium text-gray-400 mb-2">COMPLETED</p>
                </div>
                {completedGoals.map((goal, index) => (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-100"
                  >
                    <button
                      onClick={() => onToggleGoal(goal.id)}
                      className="mt-0.5 w-5 h-5 rounded border-2 border-green-500 bg-green-500 transition-colors duration-200 flex items-center justify-center"
                    >
                      <Check size={12} className="text-white" />
                    </button>
                    <p className="flex-1 text-sm line-through text-gray-600">
                      {goal.text}
                    </p>
                    <button
                      onClick={() => onRemoveGoal(goal.id)}
                      className="btn btn-ghost p-1 text-red-500 hover:text-red-600"
                    >
                      <X size={12} />
                    </button>
                  </motion.div>
                ))}
              </>
            )}
          </>
        )}
      </div>

      {/* Progress indicator */}
      {goals.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{completedGoals.length}/{goals.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${goals.length > 0 ? (completedGoals.length / goals.length) * 100 : 0}%` }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};