import { motion } from 'framer-motion';
import { useState } from 'react';

export const HolographicCard = ({ 
  children, 
  className = "", 
  icon: Icon,
  title,
  subtitle,
  delay = 0 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -10,
        rotateX: 5,
        rotateY: isHovered ? (mousePosition.x - 0.5) * 20 : 0,
        scale: 1.02
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden rounded-3xl p-6 cursor-pointer
        bg-gradient-to-br from-white/10 via-white/5 to-transparent
        backdrop-blur-xl border border-white/20
        shadow-2xl hover:shadow-neon
        transition-all duration-500
        ${className}
      `}
      style={{
        background: isHovered 
          ? `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,0,128,0.2) 0%, rgba(128,0,255,0.1) 50%, transparent 100%)`
          : undefined
      }}
    >
      {/* Holographic overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `
            linear-gradient(
              ${mousePosition.x * 360}deg,
              rgba(255,0,128,0.1) 0%,
              rgba(128,0,255,0.1) 25%,
              rgba(0,128,255,0.1) 50%,
              rgba(0,255,128,0.1) 75%,
              rgba(255,128,0,0.1) 100%
            )
          `
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            animate={{
              y: [0, -100],
              x: [0, Math.random() * 50 - 25],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: '100%',
            }}
          />
        ))}
      </div>

      {/* Header */}
      {(Icon || title) && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.2 }}
          className="flex items-center gap-3 mb-4 relative z-10"
        >
          {Icon && (
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="p-3 rounded-2xl bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 backdrop-blur-xl border border-white/20"
            >
              <Icon size={24} className="text-white" />
            </motion.div>
          )}
          {title && (
            <div>
              <h3 className="text-lg font-bold text-white neon-text">{title}</h3>
              {subtitle && (
                <p className="text-sm text-white/70">{subtitle}</p>
              )}
            </div>
          )}
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.4 }}
        className="relative z-10"
      >
        {children}
      </motion.div>

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"
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
        <div className="absolute inset-[1px] rounded-3xl bg-black/40 backdrop-blur-xl" />
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"
        animate={{
          boxShadow: [
            '0 0 20px rgba(255, 0, 128, 0.3)',
            '0 0 40px rgba(128, 0, 255, 0.4)',
            '0 0 20px rgba(255, 0, 128, 0.3)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
};