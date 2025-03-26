# Intermediate Frontend Developer Technical Test - Open Cities Lab - Nadeem Mohammed

### Live URL: https://weather-app-50637.web.app/

## Technologies Used

- Next.js: React framework for server-rendered applications
- React Leaflet: React components for Leaflet maps
- Tailwind CSS: Utility-first CSS framework for styling
- Framer Motion: Animation library for React
- AceterityUI: Component library for modern UI elements
- next-themes: Theme management for Next.js applications
- Tabler Icons: SVG icon library
- TypeScript: Static typing for JavaScript

## Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager

## Installation Guide

Clone the repository:

```bash
git clone https://github.com/DeemTheDev/weather_app.git
cd weather_app
```

Install dependencies:

```bash
npm install
# or
yarn install
```

Create a .env.local file in the root directory and add API key (Important!):

```
NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY='97fa0d68adc1074c49e550fe70320f57'
```

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 in your browser to see the application.

## Usage

- Click anywhere on the map to get a Pin location, click on the Pin to view weather information for that location
- Use the search bar to find specific locations
- Click on markers to view detailed weather information
- Toggle between light and dark themes using the theme button

## Development Notes

### API Integration

This project uses two primary APIs:

- Weather API for fetching current weather conditions
- Geocoding API for location search functionality

### Responsive Design

The application is designed to work on mobile and desktop devices with different UI layouts for each:

- Desktop: Full-featured sidebar and floating dock navigation
- Mobile: Collapsible menu and simplified controls

### Development Approach

- Using React Leaflet for map integration due to its comprehensive features and ease of use with React
- Implementing context-based state management for weather data to avoid prop drilling
- Creating dynamically styled weather displays that change appearance based on weather conditions
- Prioritizing responsive design to ensure great UX across device sizes
- Using TypeScript for type safety and improved development experience

The project presented a rewarding challenge that aligned well with my results-oriented approach to development. As someone who thrives on technical challenges, I found particular satisfaction in extending the application beyond the basic requirements with enhanced functionality and polished UI/UX elements. It was a pleasure completing this assessment while pushing the boundaries of what was expected, resulting in a project I'm proud to showcase in my portfolio..
