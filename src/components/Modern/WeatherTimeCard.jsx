import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud, CloudRain, Wind, Droplets, Eye } from 'lucide-react';

export const WeatherTimeCard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather] = useState({
    temp: 24,
    condition: 'sunny',
    humidity: 62,
    windSpeed: 12,
    visibility: 10
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning!";
    if (hour < 17) return "Good Afternoon!";
    if (hour < 21) return "Good Evening!";
    return "Good Night!";
  };

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny':
        return <Sun size={24} className="text-orange-400" />;
      case 'cloudy':
        return <Cloud size={24} className="text-gray-400" />;
      case 'rainy':
        return <CloudRain size={24} className="text-blue-400" />;
      default:
        return <Sun size={24} className="text-orange-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            {getGreeting()} 👋
          </h2>
          <p className="text-sm text-gray-500">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        {getWeatherIcon()}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-2xl font-bold text-gray-800">
            {currentTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })}
          </div>
          <p className="text-xs text-gray-500">Current Time</p>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-800">{weather.temp}°C</div>
          <p className="text-xs text-gray-500 capitalize">{weather.condition}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-2 bg-gray-50 rounded-xl">
          <Droplets size={16} className="text-blue-500 mx-auto mb-1" />
          <p className="text-xs text-gray-500">Humidity</p>
          <p className="text-sm font-semibold text-gray-800">{weather.humidity}%</p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-xl">
          <Wind size={16} className="text-green-500 mx-auto mb-1" />
          <p className="text-xs text-gray-500">Wind</p>
          <p className="text-sm font-semibold text-gray-800">{weather.windSpeed} km/h</p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-xl">
          <Eye size={16} className="text-purple-500 mx-auto mb-1" />
          <p className="text-xs text-gray-500">Visibility</p>
          <p className="text-sm font-semibold text-gray-800">{weather.visibility} km</p>
        </div>
      </div>
    </motion.div>
  );
};