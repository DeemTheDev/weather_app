WeatherMap Project
Overview
WeatherMap is an interactive weather visualization application that allows users to explore weather conditions across different locations around the world. Built with modern web technologies, it features an intuitive map interface with location search capabilities and detailed weather information displays.
Features

Interactive map interface with location markers
Location search functionality with autocomplete
Detailed weather information display with dynamic styling
Responsive design for mobile and desktop
Dark/light theme toggle
Animated UI elements for enhanced user experience

Technologies Used

Next.js: React framework for server-rendered applications
React Leaflet: React components for Leaflet maps
Tailwind CSS: Utility-first CSS framework for styling
Framer Motion: Animation library for React
AceterityUI: Component library for modern UI elements
next-themes: Theme management for Next.js applications
Tabler Icons: SVG icon library
TypeScript: Static typing for JavaScript

Prerequisites

Node.js 16.x or higher
npm or yarn package manager

Getting Started
Installation

Clone the repository:
bashCopygit clone https://github.com/your-username/weather-map.git
cd weather-map

Install dependencies:
bashCopynpm install
# or
yarn install

Create a .env.local file in the root directory and add your API keys:
CopyNEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key
NEXT_PUBLIC_GEOCODING_API_KEY=your_geocoding_api_key

Start the development server:
bashCopynpm run dev
# or
yarn dev

Open http://localhost:3000 in your browser to see the application.

Project Structure
Copy├── app/                    # Next.js app directory
│   ├── Map/                # Map feature components
│   │   ├── components/     # UI components for map
│   │   ├── api/            # API service functions
│   │   └── context/        # Context providers
├── components/             # Shared UI components
│   ├── ui/                 # Base UI components
│   └── ThemeToggle.tsx     # Theme switching component
├── lib/                    # Utility functions
├── public/                 # Static assets
└── types/                  # TypeScript type definitions
Usage

Click anywhere on the map to get weather information for that location
Use the search bar to find specific locations
Click on markers to view detailed weather information
Toggle between light and dark themes using the theme button

Development Notes
API Integration
This project uses two primary APIs:

Weather API for fetching current weather conditions
Geocoding API for location search functionality

Configure these in the .env.local file as shown in the installation steps.
Responsive Design
The application is designed to work on mobile and desktop devices with different UI layouts for each:

Desktop: Full-featured sidebar and floating dock navigation
Mobile: Collapsible menu and simplified controls

Development Approach
This project was developed with a focus on creating an intuitive and visually appealing weather visualization tool. Some key development decisions included:

Using React Leaflet for map integration due to its comprehensive features and ease of use with React
Implementing context-based state management for weather data to avoid prop drilling
Creating dynamically styled weather displays that change appearance based on weather conditions
Prioritizing responsive design to ensure great UX across device sizes
Using TypeScript for type safety and improved development experience

The development process presented interesting challenges, particularly around map integration, asynchronous data fetching, and creating a cohesive UI that adapts to different weather conditions. These challenges provided valuable opportunities to implement creative solutions and extend the application's functionality beyond basic requirements
