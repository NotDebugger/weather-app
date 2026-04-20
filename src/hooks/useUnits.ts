import { useContext } from "react";
import { WeatherUnitsContext } from "../contexts/WeatherUnitsContext";

export function useUnits() {
  const context = useContext(WeatherUnitsContext);

  if (!context) throw new Error("Units not found");
  return context;
}
