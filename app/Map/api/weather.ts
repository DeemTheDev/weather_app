// api/weather.ts

import {  WeatherData } from "@/types/types";

/**
 * Fetches weather data for the given coordinates
 * @param lat Latitude value
 * @param lon Longitude value
 * @returns Weather data response
 */
export async function fetchWeatherData(lat: number, lon: number): Promise<WeatherData> {
  if (!process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY) {
    throw new Error("API key is missing");
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY}&units=metric`
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${errorBody}`
    );
  }

  const data = await response.json();
  
  // Transform the API data into the dedicated application's data format
  const transformedData: WeatherData = {
    current: {
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      weather: data.weather,
    },
     location: data.name,
  };

  return transformedData;
}

