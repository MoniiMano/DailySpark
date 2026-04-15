import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Eye, Droplets, Thermometer } from 'lucide-react';

export const TimeWeatherWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState({
    temp: 24,
    condition: 'sunny',
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    feelsLike: 26
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getWeatherIcon = (condition) => {
    const iconProps = { size: 32, className: "weather-icon text-white" };
    
    switch (condition) {
      case 'sunny':
        return <Sun {...iconProps} className="weather-icon text-yellow-300" />;
      case 'cloudy':
        return <Cloud {...iconProps} />;
      case 'rainy':
        return <CloudRain {...iconProps} className="weather-icon text-blue-300" />;
      case 'snowy':
        return <CloudSnow {...iconProps} />;
      default:
        return <Sun {...iconProps} className="weather-icon text-yellow-300" />;
    }
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 21) return "Good Evening";
    return "Good Night";
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="time-weather glass rounded-3xl p-6 text-white"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <motion.h2 
            className="text-2xl font-bold mb-1"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {getGreeting()}! 👋
          </motion.h2>
          <p className="text-white/80 text-sm">{formatDate(currentTime)}</p>
        </div>
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {getWeatherIcon(weather.condition)}
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Time Display */}
        <div className="glass-dark rounded-2xl p-4">
          <motion.div
            className="text-3xl font-bold gradient-text mb-1"
            animate={{ opacity: [1, 0.8, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {formatTime(currentTime)}
          </motion.div>
          <p className="text-white/60 text-xs">Current Time</p>
        </div>

        {/* Weather Display */}
        <div className="glass-dark rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Thermometer size={16} className="text-orange-300" />
            <span className="text-2xl font-bold">{weather.temp}°C</span>
          </div>
          <p className="text-white/60 text-xs capitalize">{weather.condition}</p>
        </div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <motion.div 
          className="glass-dark rounded-xl p-3 text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Droplets size={16} className="text-blue-300 mx-auto mb-1" />
          <p className="text-xs text-white/60">Humidity</p>
          <p className="font-semibold">{weather.humidity}%</p>
        </motion.div>

        <motion.div 
          className="glass-dark rounded-xl p-3 text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Wind size={16} className="text-green-300 mx-auto mb-1" />
          <p className="text-xs text-white/60">Wind</p>
          <p className="font-semibold">{weather.windSpeed} km/h</p>
        </motion.div>

        <motion.div 
          className="glass-dark rounded-xl p-3 text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Eye size={16} className="text-purple-300 mx-auto mb-1" />
          <p className="text-xs text-white/60">Visibility</p>
          <p className="font-semibold">{weather.visibility} km</p>
        </motion.div>
      </div>
    </motion.div>
  );
};