import type { WeatherData } from "../types";
import { createContext } from "react";

interface Weather {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
  refetch: (signal: AbortSignal) => Promise<void>;
}

export const WeatherContext = createContext<Weather | null>(null);
