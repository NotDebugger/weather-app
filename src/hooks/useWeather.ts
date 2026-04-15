import { useState, useEffect } from "react";
import { getWeatherData } from "../services/api";
import type { WeatherData } from "../types";

export function useWeather(query: string) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    if (!query) return;
    async function fetchData() {
      try {
        setLoading(true);
        const result = await getWeatherData(query, controller.signal);
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
  }, [query]);
  return { data: weatherData, loading, error };
}
