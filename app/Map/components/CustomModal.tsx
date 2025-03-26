import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CustomModalProps, WeatherData } from "@/types/types";
import {
  Cloud,
  CloudRain,
  CloudSnow,
  CloudFog,
  Sun,
  CloudSun,
  Wind,
  Thermometer,
  Droplets,
  X,
  CloudLightning,
} from "lucide-react";

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  weatherData: externalWeatherData,
}) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [isOpen, onClose]);

  // Find weather data in children if exists
  const findWeatherData = (): WeatherData | null => {
    let foundWeatherData: WeatherData | null = null;

    // Use React.Children to iterate through children
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        // Type assertion for child.props
        const props = child.props as any;
        if (props && props.weatherData) {
          foundWeatherData = props.weatherData as WeatherData;
        }
      }
    });

    return foundWeatherData;
  };

  // We either use direct weatherData prop or try to find it in children
  const weatherData = externalWeatherData || findWeatherData();

  // Helper function to get appropriate weather icon
  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase();

    if (desc.includes("thunderstorm") || desc.includes("lightning")) {
      return <CloudLightning size={28} className="text-gray-700" />;
    } else if (desc.includes("drizzle") || desc.includes("rain")) {
      return <CloudRain size={28} className="text-blue-500" />;
    } else if (desc.includes("snow")) {
      return <CloudSnow size={28} className="text-blue-200" />;
    } else if (
      desc.includes("mist") ||
      desc.includes("fog") ||
      desc.includes("haze")
    ) {
      return <CloudFog size={28} className="text-gray-400" />;
    } else if (desc.includes("clear")) {
      return <Sun size={28} className="text-yellow-400" />;
    } else if (desc.includes("cloud") && desc.includes("part")) {
      return <CloudSun size={28} className="text-gray-500" />;
    } else if (desc.includes("cloud")) {
      return <Cloud size={28} className="text-gray-500" />;
    } else {
      return <Sun size={28} className="text-yellow-400" />;
    }
  };

  // Function to get weather color theme
  const getWeatherColorTheme = (description: string) => {
    const desc = description?.toLowerCase() || "";

    if (desc.includes("thunderstorm") || desc.includes("lightning")) {
      return "bg-gradient-to-br from-gray-700 to-gray-900 text-white";
    } else if (desc.includes("drizzle") || desc.includes("rain")) {
      return "bg-gradient-to-br from-blue-300 to-blue-500 text-white";
    } else if (desc.includes("snow")) {
      return "bg-gradient-to-br from-blue-50 to-blue-200 text-gray-800";
    } else if (
      desc.includes("mist") ||
      desc.includes("fog") ||
      desc.includes("haze")
    ) {
      return "bg-gradient-to-br from-gray-200 to-gray-400 text-gray-800";
    } else if (desc.includes("clear")) {
      return "bg-gradient-to-br from-yellow-300 to-orange-500 text-white";
    } else if (desc.includes("cloud")) {
      return "bg-gradient-to-br from-gray-100 to-gray-300 text-gray-800";
    } else {
      return "bg-gradient-to-br from-blue-100 to-blue-300 text-gray-800";
    }
  };

  const weatherDescription = weatherData?.current?.weather?.[0]?.description;
  const headerClass = weatherDescription
    ? getWeatherColorTheme(weatherDescription)
    : "";
  const isWeatherModal = !!weatherData;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-transparent bg-opacity-50 z-[9999] backdrop-blur-sm"
            style={{ position: "fixed", zIndex: 9999 }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none p-4"
            style={{ position: "fixed", zIndex: 10000 }}
          >
            <div
              className={cn(
                "bg-white dark:bg-neutral-800 rounded-xl shadow-xl max-w-md w-full",
                isWeatherModal ? "max-h-[90vh] overflow-hidden" : "max-h-fit",
                "pointer-events-auto flex flex-col border border-neutral-200 dark:border-neutral-700"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className={`flex justify-between items-center p-4 border-b border-neutral-200 dark:border-neutral-700 ${
                  isWeatherModal ? headerClass : ""
                } transition-colors duration-300`}
              >
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  {weatherDescription && getWeatherIcon(weatherDescription)}
                  {title || "Modal"}
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              {isWeatherModal ? (
                <div className="p-0">
                  <div className="p-6 space-y-4">
                    {/* Location and Main Temperature */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-xl text-gray-900 dark:text-white">
                          {weatherData.location}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Updated just now
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end">
                          <Thermometer
                            size={18}
                            className="text-red-500 mr-1"
                          />
                          <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {weatherData.current.temp}°C
                          </span>
                        </div>
                        <div className="flex items-center justify-end text-sm text-gray-500 dark:text-gray-400">
                          <span>
                            Feels like {weatherData.current.feels_like}°C
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 dark:border-gray-700"></div>

                    {/* Weather Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Droplets size={18} className="text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Humidity
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {weatherData.current.humidity}%
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Wind size={18} className="text-blue-400" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Wind Speed
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {weatherData.current.wind_speed} m/s
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Weather description card */}
                    <div className="mt-4 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                      <div className="flex items-center">
                        <div className="mr-4">
                          {getWeatherIcon(
                            weatherData.current.weather[0].description
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white capitalize">
                            {weatherData.current.weather[0].description}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            The current weather conditions in your selected
                            location.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 overflow-visible">{children}</div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CustomModal;
