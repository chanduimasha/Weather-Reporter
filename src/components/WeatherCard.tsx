'use client';

import React from 'react';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Sun, 
  Eye,
  Gauge,
  Calendar,
  MapPin,
  Activity,
  CloudRain,
} from 'lucide-react';
import { WeatherCardProps } from '@/types/weather';
import { formatTime, getUVLevel } from '@/lib/utils';
import WeatherIcon from './WeatherIcon';
import LoadingSpinner from './LoadingSpinner';

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <LoadingSpinner size="large" className="mb-4" />
            <p className="text-white/80">Loading weather data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
        <div className="text-center text-white/80">
          <p>No weather data available</p>
        </div>
      </div>
    );
  }

  const { location, current } = weather;
  const uvLevel = getUVLevel(current.uv);

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      {/* Main Weather Card */}
      <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8 mb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <MapPin className="h-6 w-6 text-white/80" />
            <div>
              <h1 className="text-3xl font-bold text-white">
                {location.name}
              </h1>
              <p className="text-white/70">
                {location.region}, {location.country}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-white/70">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">
                {formatTime(current.last_updated)}
              </span>
            </div>
          </div>
        </div>

        {/* Main Temperature Display */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-6">
            <WeatherIcon 
              condition={current.condition.text}
              isDay={current.is_day === 1}
              size={80}
              className="animate-bounce-gentle"
            />
            <div>
              <div className="text-6xl font-bold text-white mb-2">
                {Math.round(current.temp_c)}°
              </div>
              <p className="text-xl text-white/80 capitalize">
                {current.condition.text}
              </p>
              <p className="text-white/60">
                Feels like {Math.round(current.feelslike_c)}°C
              </p>
            </div>
          </div>
        </div>

        {/* Core Requirements - Main Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <Thermometer className="h-5 w-5 text-red-400" />
              <span className="text-white/70 text-sm">Temperature</span>
            </div>
            <p className="text-2xl font-bold text-white">{current.temp_c}°C</p>
            <p className="text-white/60 text-sm">{current.temp_f}°F</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <Droplets className="h-5 w-5 text-blue-400" />
              <span className="text-white/70 text-sm">Humidity</span>
            </div>
            <p className="text-2xl font-bold text-white">{current.humidity}%</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <Wind className="h-5 w-5 text-green-400" />
              <span className="text-white/70 text-sm">Wind Speed</span>
            </div>
            <p className="text-2xl font-bold text-white">{current.wind_kph}</p>
            <p className="text-white/60 text-sm">km/h {current.wind_dir}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <Sun className="h-5 w-5 text-yellow-400" />
              <span className="text-white/70 text-sm">UV Index</span>
            </div>
            <p className="text-2xl font-bold text-white">{current.uv}</p>
            <p className={`text-sm font-medium ${uvLevel.color}`}>{uvLevel.level}</p>
          </div>
        </div>
      </div>

      {/* Additional Weather Details */}
      <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Activity className="h-6 w-6 mr-2" />
          Additional Details
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <Eye className="h-5 w-5 text-purple-400" />
              <span className="text-white/70 text-sm">Visibility</span>
            </div>
            <p className="text-xl font-bold text-white">{current.vis_km} km</p>
            <p className="text-white/60 text-sm">{current.vis_miles} miles</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <Gauge className="h-5 w-5 text-orange-400" />
              <span className="text-white/70 text-sm">Pressure</span>
            </div>
            <p className="text-xl font-bold text-white">{current.pressure_mb}</p>
            <p className="text-white/60 text-sm">mb</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <CloudRain className="h-5 w-5 text-blue-300" />
              <span className="text-white/70 text-sm">Precipitation</span>
            </div>
            <p className="text-xl font-bold text-white">{current.precip_mm}</p>
            <p className="text-white/60 text-sm">mm</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <Wind className="h-5 w-5 text-cyan-400" />
              <span className="text-white/70 text-sm">Wind Gust</span>
            </div>
            <p className="text-xl font-bold text-white">{current.gust_kph}</p>
            <p className="text-white/60 text-sm">km/h</p>
          </div>

         

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <Sun className="h-5 w-5 text-amber-400" />
              <span className="text-white/70 text-sm">Cloud Cover</span>
            </div>
            <p className="text-xl font-bold text-white">{current.cloud}%</p>
            <p className="text-white/60 text-sm">coverage</p>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default WeatherCard;