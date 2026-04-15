import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Trophy, Plus, X, Star } from 'lucide-react';

export const AchievementsCard = ({ 
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
      onAddAchievement(selectedDate, newAchievement.trim());
      setNewAchievement('');
      setIsAdding(false);
    }
  };

  const formattedDate = format(selectedDate, 'MMM d, yyyy');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-xl">
            <Trophy size={20} className="text-orange-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Achievements</h3>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="btn btn-ghost p-2"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Add achievement form */}
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
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              placeholder="What did you achieve today?"
              className="input mb-3"
              autoFocus
            />
            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary text-sm">
                Add Achievement
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

      {/* Achievements list */}
      <div className="space-y-3">
        {achievements.length === 0 ? (
          <div className="text-center py-8">
            <Star size={32} className="text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500 text-sm mb-1">No achievements yet for this day.</p>
            <p className="text-gray-400 text-xs">Add your first achievement!</p>
          </div>
        ) : (
          <AnimatePresence>
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100"
              >
                <Star size={16} className="text-orange-500 fill-current mt-0.5 flex-shrink-0" />
                <p className="flex-1 text-sm text-gray-700">{achievement.text}</p>
                <button
                  onClick={() => onRemoveAchievement(selectedDate, achievement.id)}
                  className="btn btn-ghost p-1 text-red-500 hover:text-red-600"
                >
                  <X size={12} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {achievements.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            🎉 {achievements.length} achievement{achievements.length !== 1 ? 's' : ''} today!
          </p>
        </div>
      )}
    </motion.div>
  );
};