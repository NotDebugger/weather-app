# Weather Now

Weather Now is a modern weather forecast web app built with React, TypeScript, Vite, and Tailwind CSS. It lets users search for cities, view current weather conditions, explore hourly updates, and check the daily forecast through a clean and responsive interface.

## Live Site

https://weather-now-app-v1.netlify.app/

## Features

- Search for cities with live location suggestions
- View current weather conditions for the selected city
- Check hourly forecast data with day-based filtering
- Explore the daily forecast with min and max temperatures
- Switch between metric and imperial units
- Responsive layout for desktop and mobile screens
- Error handling for invalid searches and failed requests

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Open-Meteo Forecast API
- Open-Meteo Geocoding API

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```text
src/
  components/   Reusable UI pieces
  contexts/     Shared state with React Context
  hooks/        Custom hooks for weather, search, and units
  services/     API requests and data fetching
  types/        TypeScript type definitions
  utils/        Formatting and weather helper functions
```

## Data Source

This project uses the Open-Meteo APIs for both geocoding and weather forecast data.

## Notes

- The app defaults to `Cairo, Egypt` on first load.
- No API key is required for the current weather data provider.
