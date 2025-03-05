import React, { createContext, useContext, useState, ReactNode } from "react";
import { MapContextProps, WeatherData } from "@/types/types";
import { fetchWeatherData } from "../api/weather";

const MapContext = createContext<MapContextProps | undefined>(undefined);

export const MapProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Durban, South Africa coordinates
  const DURBAN_COORDINATES: [number, number] = [-29.8587, 31.0218];

  const [position, setPosition] = useState<[number, number] | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isWeatherModalOpen, setIsWeatherModalOpen] = useState<boolean>(false);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);

  // Handler for fetching weather data
  const handleWeatherDataFetch = async (lat: number, lon: number) => {
    setWeatherData(null);
    setError(null);
    setLoading(true);

    try {
      const data = await fetchWeatherData(lat, lon);
      setWeatherData(data);
      setIsWeatherModalOpen(true);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle location selection from search
  const handleLocationSelect = (lat: number, lon: number) => {
    // Set position for marker
    setPosition([lat, lon]);

    // Fetch weather data
    handleWeatherDataFetch(lat, lon);

    // Pan the map to the selected location
    if (mapInstance) {
      mapInstance.setView([lat, lon], 13);
    }
  };

  return (
    <MapContext.Provider
      value={{
        position,
        setPosition,
        weatherData,
        setWeatherData,
        loading,
        error,
        mapInstance,
        setMapInstance,
        isWeatherModalOpen,
        setIsWeatherModalOpen,
        handleLocationSelect,
        handleWeatherDataFetch,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
};
