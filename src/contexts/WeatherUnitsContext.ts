import { createContext } from "react";
import type { Units } from "../types";

interface UnitsContext {
  units: Units;
  setUnits: React.Dispatch<React.SetStateAction<Units>>;
}

export const WeatherUnitsContext = createContext<UnitsContext | null>(null);
