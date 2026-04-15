import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { PenTool, Plus, X, Edit3, Save, Calendar } from 'lucide-react';

export const NotesCard = ({ 
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

  const formattedDate = format(selectedDate, 'EEEE, MMM d, yyyy');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-pink-100 rounded-xl">
            <PenTool size={20} className="text-pink-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Daily Notes</h3>
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

      {/* Add note form */}
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
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Write your thoughts, plans, or memories for today..."
              className="input h-20 resize-none mb-3"
              autoFocus
            />
            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary text-sm">
                <Save size={14} className="mr-1" />
                Save Note
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

      {/* Notes list */}
      <div className="space-y-3">
        {notes.length === 0 ? (
          <div className="text-center py-8">
            <Calendar size={32} className="text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500 text-sm mb-1">No notes for this day yet.</p>
            <p className="text-gray-400 text-xs">Click the + button to add your first note!</p>
          </div>
        ) : (
          <AnimatePresence>
            {notes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-4 bg-gray-50 rounded-xl border border-gray-100"
              >
                {editingId === note.id ? (
                  <div className="space-y-3">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="input h-16 resize-none"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="btn btn-primary text-xs px-3 py-1"
                      >
                        <Save size={12} className="mr-1" />
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="btn btn-secondary text-xs px-3 py-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed mb-2">{note.text}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(note.timestamp).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit(note)}
                        className="btn btn-ghost p-1"
                      >
                        <Edit3 size={12} />
                      </button>
                      <button
                        onClick={() => onRemoveNote(selectedDate, note.id)}
                        className="btn btn-ghost p-1 text-red-500 hover:text-red-600"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {notes.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            📝 {notes.length} note{notes.length !== 1 ? 's' : ''} for today
          </p>
        </div>
      )}
    </motion.div>
  );
};