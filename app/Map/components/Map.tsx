import React, { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { MapContainer } from "react-leaflet";
import { createPortal } from "react-dom";
// Weather data interface
import { WeatherData } from "@/types/types";
import { fetchWeatherData } from "../api/weather";
import CustomModal from "./CustomModal";
import Search from "./Search";
import { useMapContext } from "../context/MapContext";

export default function Map() {
  // Durban, South Africa coordinates
  const DURBAN_COORDINATES: [number, number] = [-29.8587, 31.0218];
  const {
    position,
    setPosition,
    weatherData,
    loading,
    error,
    isWeatherModalOpen,
    setIsWeatherModalOpen,
    handleWeatherDataFetch,
    handleLocationSelect,
    setMapInstance,
  } = useMapContext();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const markerRef = useRef(null);

  // Check if we're in browser environment for portal
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Component to handle map clicks
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        console.log("Latitude:", lat, "Longitude:", lng);
        setPosition([lat, lng]); // Update state with new position
        handleWeatherDataFetch(lat, lng);
      },
    });
    return null;
  };

  // Handler for opening the modal with existing data
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Format coordinate values to 4 decimal places
  const formatCoordinate = (value: any) => {
    return value.toFixed(4);
  };

  return (
    <>
      <MapContainer
        style={{ height: "100%", width: "100%", borderRadius: "5px" }}
        center={DURBAN_COORDINATES}
        zoom={10}
        scrollWheelZoom={true}
        ref={setMapInstance}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && (
          <Marker
            position={position}
            ref={markerRef}
            eventHandlers={{
              add: (e) => {
                e.target.openPopup();
              },
            }}
          >
            <Popup>
              <div className="bg-white dark:bg-gray-800 rounded-md p-2 shadow">
                <div className="text-center mb-3">
                  <h3 className="font-medium text-gray-800 dark:text-white text-lg">
                    Location Details
                  </h3>
                  <div className="flex flex-col gap-1 mt-2 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-gray-600 dark:text-gray-300">
                        Latitude:
                      </span>
                      <span className="font-mono font-medium text-blue-600 dark:text-blue-400">
                        {formatCoordinate(position[0])}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-gray-600 dark:text-gray-300">
                        Longitude:
                      </span>
                      <span className="font-mono font-medium text-blue-600 dark:text-blue-400">
                        {formatCoordinate(position[1])}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                  <button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-1"
                    onClick={handleOpenModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Show Weather Data
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        )}
        <MapClickHandler />
      </MapContainer>

      {/* Render modal in a portal to avoid z-index issues */}
      {isMounted &&
        createPortal(
          <CustomModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Weather Data"
            weatherData={weatherData}
          >
            {loading && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-2">Loading weather data...</span>
              </div>
            )}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-500 font-medium">{error}</p>
              </div>
            )}
          </CustomModal>,
          document.body
        )}
    </>
  );
}
