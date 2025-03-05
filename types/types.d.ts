// Weather data interface 
export interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    weather: {
      description: string;
      icon: string;
    }[];
  };
    location: string;
}

export interface MapProps {
  onOpenModal: (data: WeatherData) => void;
  weatherData: WeatherData | null;
}

export interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  weatherData?: WeatherData | null; 
}

export interface GeocodingResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface SearchProps {
  onLocationSelect: (lat: number, lon: number) => void;
}

export interface LocationResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}


export interface MapContextProps {
  position: [number, number] | null;
  setPosition: React.Dispatch<React.SetStateAction<[number, number] | null>>;
  weatherData: WeatherData | null;
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherData | null>>;
  loading: boolean;
  error: string | null;
  mapInstance: L.Map | null;
  setMapInstance: React.Dispatch<React.SetStateAction<L.Map | null>>;
  isWeatherModalOpen: boolean;
  setIsWeatherModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLocationSelect: (lat: number, lon: number) => void;
  handleWeatherDataFetch: (lat: number, lon: number) => Promise<void>;
}

export interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
  external?: boolean;
  onClick?: () => void; 
}

export interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}