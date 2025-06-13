import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getWeatherGradient(condition: string, isDay: boolean): string {
  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) {
    return isDay 
      ? 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500'
      : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900';
  }
  
  if (lowerCondition.includes('cloud')) {
    return 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600';
  }
  
  if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
    return 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700';
  }
  
  if (lowerCondition.includes('snow')) {
    return 'bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400';
  }
  
  if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
    return 'bg-gradient-to-br from-gray-700 via-gray-800 to-black';
  }
  
  // Default gradient
  return 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600';
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour12: true,
    hour: 'numeric',
    minute: '2-digit'
  });
}

export function getUVLevel(uv: number): { level: string; color: string } {
  if (uv <= 2) return { level: 'Low', color: 'text-green-500' };
  if (uv <= 5) return { level: 'Moderate', color: 'text-yellow-500' };
  if (uv <= 7) return { level: 'High', color: 'text-orange-500' };
  if (uv <= 10) return { level: 'Very High', color: 'text-red-500' };
  return { level: 'Extreme', color: 'text-purple-500' };
}