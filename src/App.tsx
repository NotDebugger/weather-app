import "./App.css";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { useState } from "react";
import { QueryContext } from "./contexts/QueryContext";
import { WeatherUnitsContext } from "./contexts/WeatherUnitsContext";
import type { Units } from "./types";

function App() {
  const [units, setUnits] = useState<Units>({
    temp: "celsius",
    wind: "kmh",
    precipitation: "mm",
  });
  const [queryInput, setQueryInput] = useState<string>("");
  const [activeQuery, setActiveQuery] = useState<string>(queryInput);

  return (
    <>
      <QueryContext.Provider
        value={{ queryInput, setQueryInput, activeQuery, setActiveQuery }}
      >
        <WeatherUnitsContext.Provider value={{ units, setUnits }}>
          <Navbar />
          <Search />
        </WeatherUnitsContext.Provider>
      </QueryContext.Provider>
    </>
  );
}

export default App;
