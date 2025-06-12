// src/components/SearchBar.tsx
'use client';

import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { SearchBarProps } from '@/types/weather';
import LoadingSpinner from './LoadingSpinner';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleQuickSearch = (city: string) => {
    setQuery(city);
    onSearch(city);
  };

  const popularCities = [
    'Colombo', 'Kandy', 'Galle', 'Jaffna', 'Trincomalee',
    'London', 'New York', 'Tokyo', 'Sydney', 'Dubai'
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city... (e.g., Colombo, London)"
            className="w-full pl-12 pr-20 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute inset-y-0 right-0 pr-4 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <LoadingSpinner size="small" />
            ) : (
              <Search className="h-5 w-5 text-white hover:text-white/80 transition-colors" />
            )}
          </button>
        </div>
      </form>

      {/* Popular Cities */}
      <div className="mt-4">
        <p className="text-white/70 text-sm mb-2 text-center">Popular cities:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {popularCities.map((city) => (
            <button
              key={city}
              onClick={() => handleQuickSearch(city)}
              disabled={isLoading}
              className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-sm hover:bg-white/20 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;