# Weather Dashboard

A modern React + TypeScript weather dashboard built with Vite.

## Overview

This project displays current weather, hourly forecasts, and multi-day forecasts using the OpenWeatherMap API. It includes city search, geolocation support, recent search history, and a temperature unit toggle.

## Features

- Search weather by city name
- View current conditions and weather highlights
- 5-day forecast
- Hourly forecast for the next 24 hours
- Current location weather using browser geolocation
- Recent search history
- Temperature switch between °C and °F

## Getting Started

### Prerequisites

- Node.js 18+ or newer
- npm 10+ or compatible package manager

### Install dependencies

```bash
npm install
```

### Configure the API key

Create a `.env.local` file in the project root with your OpenWeatherMap API key:

```env
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```

### Start the development server

```bash
npm run dev
```

Open the URL shown in the terminal to view the app.

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Project Structure

```
src/
  App.tsx
  main.tsx
  components/
    CityCard.tsx
    CurrentWeather.tsx
    Forecast.tsx
    Highlights.tsx
    HourlyForecast.tsx
    SearchBar.tsx
    WeatherCard.tsx
  hooks/
    useWeather.ts
    useCityWeather.ts
  services/
    WeatherService.ts
  styles/
    App.css
    CurrentWeather.css
    Forecast.css
    HourlyForecast.css
    SearchBar.css
  types/
    Weather.ts
```

## Available Scripts

- `npm run dev` — start the local development server
- `npm run build` — compile the app for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint on the source files

## Notes

- `dist/` is ignored by Git and is generated during the build.
- The app uses `import.meta.env.VITE_WEATHER_API_KEY` for API configuration.
- Remove or update `README.md`, `.env.local`, and `.gitignore` to match your deployment workflow.

## License

This project is provided as-is for demonstration and development.
