import { LocationResult, SearchProps } from "@/types/types";
import React, { useState, useEffect, useRef } from "react";
import { searchLocationsByName } from "../api/geocoding";

const Search: React.FC<SearchProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<LocationResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Search after user stops typing
    const delayDebounceFn = setTimeout(() => {
      if (query.length >= 3) {
        handleSearch();
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSearch = async () => {
    if (query.trim() === "") return;

    setLoading(true);
    setError(null);

    try {
      const data = await searchLocationsByName(query);
      setResults(data);
      setIsDropdownOpen(true);
    } catch (err) {
      console.error("Error searching locations:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSelectLocation = (location: LocationResult) => {
    onLocationSelect(location.lat, location.lon);
    setIsDropdownOpen(false);
    setResults([]);
    setQuery("");
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md z-10">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a location..."
          className="w-full px-4 py-2 border  text-black border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-800 dark:text-white"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="animate-spin h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

      {isDropdownOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
          <ul>
            {results.map((location, index) => (
              <li
                key={`${location.name}-${location.lat}-${location.lon}-${index}`}
                onClick={() => handleSelectLocation(location)}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer"
              >
                <div className="font-medium text-black dark:text-white">
                  {location.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {location.state ? `${location.state}, ` : ""}
                  {location.country}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
