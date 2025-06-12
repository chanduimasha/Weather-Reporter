// src/app/api/weather/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { fetchWeatherData } from '@/lib/weather-api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || 'Colombo';

  try {
    const data = await fetchWeatherData(city);
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
}