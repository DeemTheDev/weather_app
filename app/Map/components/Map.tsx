import React, { useState, useEffect } from "react";
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
          <Marker position={position}>
            <Popup>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors"
                onClick={handleOpenModal}
              >
                Show Weather Data
              </button>
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
