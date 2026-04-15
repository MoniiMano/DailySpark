import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';

export const MotivationCard = ({ selectedDate }) => {
  const [quoteIndex, setQuoteIndex] = useState(0);

const quotes = [
  { text: "Every day is a new beginning. Take a deep breath and start again.", author: "Unknown" },
  { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
  { text: "Success doesn’t come from what you do occasionally, it comes from what you do consistently.", author: "Marie Forleo" },
  { text: "Dream big. Start small. Act now.", author: "Robin Sharma" },
  { text: "Don’t stop until you’re proud.", author: "Unknown" },
  { text: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
  { text: "Small steps every day lead to big results.", author: "Unknown" },
  { text: "You don’t have to be perfect, just consistent.", author: "Unknown" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Your only limit is your mind.", author: "Unknown" },
  { text: "Do something today that your future self will thank you for.", author: "Unknown" },
  { text: "Great things never come from comfort zones.", author: "Unknown" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
  { text: "Stay positive, work hard, make it happen.", author: "Unknown" },
  { text: "Don’t wait for opportunity. Create it.", author: "Unknown" },
  { text: "Difficult roads often lead to beautiful destinations.", author: "Unknown" },
  { text: "Your future is created by what you do today, not tomorrow.", author: "Robert Kiyosaki" },
  { text: "Wake up with determination, go to bed with satisfaction.", author: "Unknown" },
  { text: "Success is the sum of small efforts repeated daily.", author: "Robert Collier" },
  { text: "Consistency beats motivation.", author: "Unknown" },
  { text: "Fall seven times, stand up eight.", author: "Japanese Proverb" },
  { text: "Hard work beats talent when talent doesn’t work hard.", author: "Tim Notke" },
  { text: "You are capable of amazing things.", author: "Unknown" },
  { text: "Make today count.", author: "Unknown" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" }
];

  const getDailyQuote = (date) => {
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
    return quotes[dayOfYear % quotes.length];
  };

  const currentQuote = quoteIndex === 0 ? getDailyQuote(selectedDate) : quotes[quoteIndex];

  const refreshQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-xl">
            <Sparkles size={20} className="text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Daily Motivation</h3>
            <p className="text-sm text-gray-500">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
        
        <button
          onClick={refreshQuote}
          className="btn btn-ghost p-2"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      <blockquote className="text-gray-700 leading-relaxed mb-4">
        "{currentQuote.text}"
      </blockquote>
      
      <cite className="text-sm text-gray-500 font-medium">
        — {currentQuote.author}
      </cite>
    </motion.div>
  );
};