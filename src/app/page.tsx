// src/app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { WeatherData } from '@/types/weather';
import { fetchWeatherDataServer } from '@/lib/weather-api';
import { getWeatherGradient } from '@/lib/utils';
import WeatherCard from '@/components/WeatherCard';
import SearchBar from '@/components/SearchBar';
import { AlertCircle, Wifi, WifiOff } from 'lucide-react';

// Generate consistent particle data that won't change between server and client
const generateParticles = () => {
  const particles = [];
  for (let i = 0; i < 20; i++) {
    particles.push({
      id: i,
      width: 5 + (i * 0.5) % 10,
      height: 5 + (i * 0.3) % 10,
      left: (i * 5) % 100,
      top: (i * 7) % 100,
      delay: (i * 0.5) % 10,
      duration: 10 + (i * 0.8) % 20
    });
  }
  return particles;
};

const PARTICLES = generateParticles();

export default function HomePage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted before showing random elements
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check online status
  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  // Load initial weather data for Colombo
  useEffect(() => {
    loadWeather('Colombo');
  }, []);

  const loadWeather = async (city: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherDataServer(city);
      setWeather(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Weather fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (city: string) => {
    if (!isOnline) {
      setError('No internet connection. Please check your connection and try again.');
      return;
    }
    loadWeather(city);
  };

  const backgroundGradient = weather 
    ? getWeatherGradient(weather.current.condition.text, weather.current.is_day === 1)
    : 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600';

  return (
    <div className={`min-h-screen ${backgroundGradient} transition-all duration-1000 ease-in-out`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Floating Particles - Only render after mounting to avoid hydration mismatch */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {PARTICLES.map((particle) => (
            <div
              key={particle.id}
              className="absolute bg-white/10 rounded-full animate-float"
              style={{
                width: particle.width,
                height: particle.height,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg animate-slide-up">
            Weather Now
          </h1>
          <p className="text-xl text-white/80 drop-shadow-md animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Real-time weather information for any city worldwide
          </p>
          
          {/* Connection Status */}
          <div className="flex items-center justify-center mt-4 space-x-2">
            {isOnline ? (
              <>
                <Wifi className="h-5 w-5 text-green-400" />
                <span className="text-green-400 text-sm">Connected</span>
              </>
            ) : (
              <>
                <WifiOff className="h-5 w-5 text-red-400" />
                <span className="text-red-400 text-sm">No connection</span>
              </>
            )}
          </div>
        </header>

        {/* Search Bar */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Error Display */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 animate-slide-up">
            <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-4 flex items-center space-x-3">
              <AlertCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
              <div>
                <h3 className="text-red-300 font-semibold">Weather Error</h3>
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Weather Display */}
        <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
          {weather && (
            <WeatherCard weather={weather} isLoading={isLoading} />
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-white/60 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="text-sm">
            Weather data provided by{' '}
            <a 
              href="https://www.weatherapi.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white underline transition-colors"
            >
              WeatherAPI.com
            </a>
          </p>
          <p className="text-xs mt-2">
            Built with Next.js 15 and Tailwind CSS
          </p>
        </footer>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.6; }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}