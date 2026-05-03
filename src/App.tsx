import "./App.css";
import type { Units } from "./types";
import type { City } from "./types";
import { useState } from "react";
import { QueryContext } from "./contexts/QueryContext";
import { WeatherUnitsContext } from "./contexts/WeatherUnitsContext";
import AppContent from "./components/AppContent";

function App() {
  const [units, setUnits] = useState<Units>({
    temp: "celsius",
    wind: "kmh",
    precipitation: "mm",
  });
  const [queryInput, setQueryInput] = useState<string>("");
  const [activeCity, setActiveCity] = useState<City>({
    name: queryInput || "Cairo",
    country: "Egypt",
  });

  return (
    <>
      <QueryContext.Provider
        value={{ queryInput, setQueryInput, activeCity, setActiveCity }}
      >
        <WeatherUnitsContext.Provider value={{ units, setUnits }}>
          <AppContent />
        </WeatherUnitsContext.Provider>
      </QueryContext.Provider>
    </>
  );
}

export default App;
