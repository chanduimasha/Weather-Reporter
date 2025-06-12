// src/components/WeatherIcon.tsx
'use client';

import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning,
  CloudDrizzle,
  Cloudy,
  Moon,
  CloudMoon
} from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  isDay: boolean;
  size?: number;
  className?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  condition, 
  isDay, 
  size = 64, 
  className = '' 
}) => {
  const getIcon = () => {
    const lowerCondition = condition.toLowerCase();
    
    // Clear/Sunny conditions
    if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) {
      return isDay ? <Sun size={size} /> : <Moon size={size} />;
    }
    
    // Cloudy conditions
    if (lowerCondition.includes('partly cloudy')) {
      return isDay ? <Cloudy size={size} /> : <CloudMoon size={size} />;
    }
    
    if (lowerCondition.includes('cloudy') || lowerCondition.includes('overcast')) {
      return <Cloud size={size} />;
    }
    
    // Rainy conditions
    if (lowerCondition.includes('drizzle')) {
      return <CloudDrizzle size={size} />;
    }
    
    if (lowerCondition.includes('rain')) {
      return <CloudRain size={size} />;
    }
    
    // Snow conditions
    if (lowerCondition.includes('snow') || lowerCondition.includes('blizzard')) {
      return <CloudSnow size={size} />;
    }
    
    // Thunder/Storm conditions
    if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
      return <CloudLightning size={size} />;
    }
    
    // Default fallback
    return isDay ? <Sun size={size} /> : <Moon size={size} />;
  };

  return (
    <div className={`text-white drop-shadow-lg ${className}`}>
      {getIcon()}
    </div>
  );
};

export default WeatherIcon;