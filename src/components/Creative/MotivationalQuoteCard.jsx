import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Star, Zap, RefreshCw } from 'lucide-react';

export const MotivationalQuoteCard = ({ selectedDate }) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const motivationalQuotes = [
    {
      text: "Every day is a new beginning. Take a deep breath, smile, and start again.",
      author: "Unknown",
      icon: Sparkles,
      gradient: "from-pink-400 to-purple-600"
    },
    {
      text: "You are stronger than you think and more capable than you imagine.",
      author: "Unknown", 
      icon: Heart,
      gradient: "from-red-400 to-pink-600"
    },
    {
      text: "Progress, not perfection. Every small step counts towards your dreams.",
      author: "Unknown",
      icon: Star,
      gradient: "from-yellow-400 to-orange-600"
    },
    {
      text: "Today's accomplishments were yesterday's impossibilities. Keep pushing!",
      author: "Unknown",
      icon: Zap,
      gradient: "from-blue-400 to-purple-600"
    },
    {
      text: "Believe in yourself and all that you are. You have unlimited potential.",
      author: "Unknown",
      icon: Sparkles,
      gradient: "from-green-400 to-blue-600"
    },
    {
      text: "The only way to do great work is to love what you do. Find your passion!",
      author: "Steve Jobs",
      icon: Heart,
      gradient: "from-purple-400 to-pink-600"
    },
    {
      text: "Success is not final, failure is not fatal: it's the courage to continue that counts.",
      author: "Winston Churchill",
      icon: Star,
      gradient: "from-indigo-400 to-purple-600"
    },
    {
      text: "Your limitation—it's only your imagination. Dream bigger, achieve more!",
      author: "Unknown",
      icon: Zap,
      gradient: "from-teal-400 to-blue-600"
    }
  ];

  const getDailyQuote = (date) => {
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
    return motivationalQuotes[dayOfYear % motivationalQuotes.length];
  };

  const currentQuote = getDailyQuote(selectedDate);
  const IconComponent = currentQuote.icon;

  const refreshQuote = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
      setIsAnimating(false);
    }, 300);
  };

  const displayQuote = isAnimating ? motivationalQuotes[currentQuoteIndex] : currentQuote;
  const DisplayIcon = displayQuote.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative overflow-hidden"
    >
      <div className={`quote-container bg-gradient-to-br ${displayQuote.gradient} relative`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-white/20"></div>
          <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-white/15"></div>
          <div className="absolute top-1/2 right-8 w-12 h-12 rounded-full bg-white/10"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm"
            >
              <DisplayIcon size={24} className="text-white" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-white">Daily Motivation</h3>
              <p className="text-white/80 text-sm">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
          
          <motion.button
            onClick={refreshQuote}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white/20 rounded-xl backdrop-blur-sm hover:bg-white/30 transition-colors"
            disabled={isAnimating}
          >
            <RefreshCw size={18} className="text-white" />
          </motion.button>
        </div>

        {/* Quote Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={displayQuote.text}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <blockquote className="text-lg leading-relaxed text-white mb-4 font-medium">
              "{displayQuote.text}"
            </blockquote>
            
            <div className="flex items-center justify-between">
              <cite className="text-white/80 text-sm font-medium">
                — {displayQuote.author}
              </cite>
              
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex gap-1"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    className="w-2 h-2 bg-white/60 rounded-full"
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-6 right-6 text-white/30"
        >
          <Sparkles size={20} />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, 8, 0],
            rotate: [0, -3, 3, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-8 left-6 text-white/20"
        >
          <Heart size={16} />
        </motion.div>
      </div>
    </motion.div>
  );
};