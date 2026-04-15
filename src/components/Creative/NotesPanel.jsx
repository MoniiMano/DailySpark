import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { 
  PenTool, 
  Plus, 
  X, 
  Save, 
  Edit3, 
  Calendar,
  Sparkles,
  Heart,
  Star
} from 'lucide-react';

export const NotesPanel = ({ 
  selectedDate, 
  notes, 
  onAddNote, 
  onUpdateNote,
  onRemoveNote 
}) => {
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNote.trim()) {
      onAddNote(selectedDate, newNote.trim());
      setNewNote('');
      setIsAdding(false);
    }
  };

  const handleEdit = (note) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onUpdateNote(selectedDate, editingId, editText.trim());
      setEditingId(null);
      setEditText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const formattedDate = format(selectedDate, 'EEEE, MMMM d, yyyy');

  const noteColors = [
    'from-pink-400 to-rose-500',
    'from-purple-400 to-indigo-500',
    'from-blue-400 to-cyan-500',
    'from-green-400 to-emerald-500',
    'from-yellow-400 to-orange-500',
    'from-red-400 to-pink-500'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="glass rounded-3xl p-6 shadow-creative-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="p-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl shadow-lg"
          >
            <PenTool size={24} className="text-white" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-white">Daily Notes</h3>
            <p className="text-white/80 text-sm">{formattedDate}</p>
          </div>
        </div>
        
        <motion.button
          onClick={() => setIsAdding(!isAdding)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm hover:bg-white/30 transition-colors"
        >
          <Plus size={20} className="text-white" />
        </motion.button>
      </div>

      {/* Add note form */}
      <AnimatePresence>
        {isAdding && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="mb-6"
          >
            <div className="glass-dark rounded-2xl p-4">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Write your thoughts, plans, or memories for today..."
                className="note-input w-full h-24 resize-none"
                autoFocus
              />
              <div className="flex gap-2 mt-3">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-creative flex items-center gap-2 text-sm"
                >
                  <Save size={16} />
                  Save Note
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors text-sm"
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Notes list */}
      <div className="space-y-4">
        {notes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mb-4"
            >
              <Calendar size={48} className="text-white/40 mx-auto" />
            </motion.div>
            <p className="text-white/60 mb-2">No notes for this day yet.</p>
            <p className="text-white/40 text-sm">Click the + button to add your first note!</p>
          </motion.div>
        ) : (
          <AnimatePresence>
            {notes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300
                }}
                className={`
                  relative overflow-hidden rounded-2xl p-4 
                  bg-gradient-to-br ${noteColors[index % noteColors.length]}
                  shadow-lg hover:shadow-xl transition-all duration-300
                `}
              >
                {/* Background decoration */}
                <div className="absolute top-2 right-2 opacity-20">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {index % 3 === 0 ? <Sparkles size={16} /> : 
                     index % 3 === 1 ? <Heart size={16} /> : <Star size={16} />}
                  </motion.div>
                </div>

                {editingId === note.id ? (
                  // Edit mode
                  <div className="space-y-3">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="note-input w-full h-20 resize-none"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <motion.button
                        onClick={handleSaveEdit}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-sm flex items-center gap-1"
                      >
                        <Save size={14} />
                        Save
                      </motion.button>
                      <motion.button
                        onClick={handleCancelEdit}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  // View mode
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <p className="text-white leading-relaxed mb-2">{note.text}</p>
                      <p className="text-white/70 text-xs">
                        {new Date(note.timestamp).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    
                    <div className="flex gap-1">
                      <motion.button
                        onClick={() => handleEdit(note)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                      >
                        <Edit3 size={14} className="text-white" />
                      </motion.button>
                      <motion.button
                        onClick={() => onRemoveNote(selectedDate, note.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white/20 rounded-lg hover:bg-red-400/50 transition-colors"
                      >
                        <X size={14} className="text-white" />
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Footer stats */}
      {notes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 pt-4 border-t border-white/20"
        >
          <p className="text-white/60 text-sm text-center">
            📝 {notes.length} note{notes.length !== 1 ? 's' : ''} for today
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};