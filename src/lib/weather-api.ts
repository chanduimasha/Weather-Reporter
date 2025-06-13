import axios from 'axios';
import { WeatherData } from '@/types/weather';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

export async function fetchWeatherData(city: string = 'Colombo'): Promise<WeatherData> {
  if (!API_KEY) {
    throw new Error('Weather API key is not configured');
  }

  try {
    const response = await axios.get(`${BASE_URL}/current.json`, {
      params: {
        key: API_KEY,
        q: city,
        aqi: 'no'
      }
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
      }
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.');
      }
      if (error.response?.status === 403) {
        throw new Error('API key has exceeded the allowed quota.');
      }
    }
    throw new Error('Failed to fetch weather data. Please try again later.');
  }
}

export async function fetchWeatherDataServer(city: string = 'Colombo'): Promise<WeatherData> {
  const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch weather data');
  }
  
  return response.json();
}