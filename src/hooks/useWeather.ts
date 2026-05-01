import { useState, useEffect } from "react";
import { getWeatherData } from "../services/api";
import type { WeatherData } from "../types";
import { useUnits } from "./useUnits";
import { useQuery } from "./useQuery";

export function useWeather() {
  const { activeCity } = useQuery();
  const query = activeCity.name;
  const { units } = useUnits();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    if (!query) return;
    async function fetchData() {
      try {
        setLoading(true);
        const result = await getWeatherData(query, units, controller.signal);
        setWeatherData(result);
      } catch (error) {
        console.log(error);
        setError("Failed to load weather data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, [query, units]);
  return { data: weatherData, loading, error };
}
