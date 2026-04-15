/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spark: {
          50: '#fef7ff',
          100: '#fdeeff',
          200: '#fcdcff',
          300: '#f9bfff',
          400: '#f492ff',
          500: '#ed5eff',
          600: '#d633f0',
          700: '#b821d1',
          800: '#9620a8',
          900: '#7a1c87',
        },
        cosmic: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        neon: {
          pink: '#ff0080',
          blue: '#0080ff',
          green: '#00ff80',
          purple: '#8000ff',
          orange: '#ff8000',
          cyan: '#00ffff',
        }
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        'spark-gradient': 'linear-gradient(135deg, #ff0080 0%, #8000ff 25%, #0080ff 50%, #00ff80 75%, #ff8000 100%)',
        'aurora': 'linear-gradient(45deg, #ff0080, #8000ff, #0080ff, #00ff80, #ff8000, #ff0080)',
        'nebula': 'radial-gradient(ellipse at center, rgba(255,0,128,0.3) 0%, rgba(128,0,255,0.2) 25%, rgba(0,128,255,0.1) 50%, transparent 70%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite alternate',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'bounce-soft': 'bounceSoft 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'aurora-flow': 'auroraFlow 8s ease-in-out infinite',
        'spark-dance': 'sparkDance 4s ease-in-out infinite',
        'cosmic-drift': 'cosmicDrift 15s linear infinite',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite',
        'morph': 'morph 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) rotate(2deg)' },
          '66%': { transform: 'translateY(-10px) rotate(-1deg)' },
        },
        pulseGlow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 0, 128, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(128, 0, 255, 0.8), 0 0 60px rgba(0, 128, 255, 0.3)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-15px) scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        auroraFlow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        sparkDance: {
          '0%, 100%': { transform: 'translateX(0) translateY(0) rotate(0deg) scale(1)' },
          '25%': { transform: 'translateX(10px) translateY(-10px) rotate(90deg) scale(1.1)' },
          '50%': { transform: 'translateX(-5px) translateY(-20px) rotate(180deg) scale(0.9)' },
          '75%': { transform: 'translateX(-10px) translateY(-5px) rotate(270deg) scale(1.05)' },
        },
        cosmicDrift: {
          '0%': { transform: 'translateX(-100vw) rotate(0deg)' },
          '100%': { transform: 'translateX(100vw) rotate(360deg)' },
        },
        neonPulse: {
          '0%, 100%': { 
            textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
            transform: 'scale(1)'
          },
          '50%': { 
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
            transform: 'scale(1.02)'
          },
        },
        morph: {
          '0%, 100%': { borderRadius: '20px' },
          '33%': { borderRadius: '50px 20px' },
          '66%': { borderRadius: '20px 50px' },
        },
      },
      boxShadow: {
        'neon': '0 0 20px rgba(255, 0, 128, 0.5), 0 0 40px rgba(128, 0, 255, 0.3)',
        'cosmic': '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'spark': '0 0 30px rgba(255, 0, 128, 0.4), 0 0 60px rgba(128, 0, 255, 0.2)',
        'aurora': '0 0 50px rgba(0, 128, 255, 0.3), 0 0 100px rgba(255, 0, 128, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
        'xl': '40px',
      },
    },
  },
  plugins: [],
}