import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Zap } from 'lucide-react';

export const CosmicHeader = ({ 
  currentMonth, 
  onPreviousMonth, 
  onNextMonth, 
  onToday 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className="glass-card p-8 relative overflow-hidden"
    >
      {/* Floating spark elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-4 left-4 text-neon-pink opacity-30"
        >
          <Sparkles size={16} />
        </motion.div>
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 30, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-8 right-8 text-neon-blue opacity-40"
        >
          <Zap size={20} />
        </motion.div>
      </div>

      <div className="flex items-center justify-between relative z-10">
        {/* Brand */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="flex items-center gap-4"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue p-1">
              <div className="w-full h-full rounded-full bg-black/20 backdrop-blur-xl flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-white text-2xl font-bold neon-text"
                >
                  ✨
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          <div>
            <motion.h1 
              className="text-3xl font-bold text-white neon-text"
              style={{ fontFamily: 'Orbitron, monospace' }}
              animate={{ 
                textShadow: [
                  '0 0 10px #ff0080',
                  '0 0 20px #8000ff, 0 0 30px #ff0080',
                  '0 0 10px #ff0080'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              DailySpark
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/80 text-sm"
            >
              Ignite Your Daily Motivation ⚡
            </motion.p>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToday}
            className="cosmic-btn px-6 py-2 text-sm"
          >
            Today
          </motion.button>
          
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
              onClick={onPreviousMonth}
              className="p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </motion.button>
            
            <motion.div
              key={currentMonth}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="min-w-[200px] text-center"
            >
              <h2 className="text-2xl font-bold text-white neon-text" style={{ fontFamily: 'Orbitron, monospace' }}>
                {currentMonth}
              </h2>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              onClick={onNextMonth}
              className="p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: 'linear-gradient(45deg, #ff0080, #8000ff, #0080ff, #00ff80, #ff8000, #ff0080)',
          backgroundSize: '400% 400%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="absolute inset-[2px] rounded-3xl bg-black/20 backdrop-blur-xl" />
      </motion.div>
    </motion.div>
  );
};