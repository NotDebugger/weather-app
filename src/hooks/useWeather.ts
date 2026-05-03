import { useState, useEffect } from "react";
import { getWeatherData } from "../services/api";
import type { WeatherData } from "../types";
import { useUnits } from "./useUnits";
import { useQuery } from "./useQuery";
import axios from "axios";

export function useWeather() {
  const { activeCity } = useQuery();
  const query = activeCity.name;
  const { units } = useUnits();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchData(signal?: AbortSignal): Promise<void> {
    try {
      setLoading(true);
      setError(null);

      const result = await getWeatherData(query, units, signal);

      setWeatherData(result);
    } catch (error) {
      if (axios.isCancel(error)) return;

      console.log(error);
      setError("Failed to load weather data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    if (!query) return;

    fetchData(controller.signal);
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, units]);
  return {
    data: weatherData,
    loading,
    error,
    refetch: () => fetchData(),
  };
}
