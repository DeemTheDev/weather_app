import { GeocodingResult } from "@/types/types";

/**
 * Search for locations by name and convert back to longitude and latitude for Map zoom in
 * @param query The location name to search for
 * @param limit Maximum number of results (default: 5)
 * @returns Array of geocoding results
 */
export async function searchLocationsByName(query: string, limit: number = 5): Promise<GeocodingResult[]> {
  if (!process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY) {
    throw new Error("API key is missing");
  }

  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY}`
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${errorBody}`
    );
  }

  return response.json();
}