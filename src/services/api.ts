import axios from "axios";
import type { WeatherData, OpenMeteoResponse, GeoResponse } from "../types";

const mapWeatherData = (data: OpenMeteoResponse): WeatherData => {
  return {
    current: {
      temperature: data.current.temperature_2m,
      windSpeed: data.current.wind_speed_10m,
      precipitation: data.current.precipitation,
      humidity: data.current.relative_humidity_2m,
      feelsLike: data.current.apparent_temperature,
      is_day: data.current.is_day,
      weather_code: data.current.weather_code,
    },
    hourly: {
      time: data.hourly.time,
      temperature: data.hourly.temperature_2m,
      weather_code: data.hourly.weather_code,
      is_day: data.hourly.is_day,
    },
    daily: {
      time: data.daily.time,
      tempMax: data.daily.temperature_2m_max,
      tempMin: data.daily.temperature_2m_min,
      weather_code: data.daily.weather_code,
    },
  };
};

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function getWeatherData(
  query: string,
  units: {
    temp: string;
    wind: string;
    precipitation: string;
  },
  controllerSignal?: AbortSignal,
): Promise<WeatherData> {
  try {
    const geoRes = await axios.get<GeoResponse>(
      `https://geocoding-api.open-meteo.com/v1/search?name=${query}`,
      { signal: controllerSignal },
    );

    const firstResult = geoRes.data.results?.[0];

    if (!firstResult) {
      throw new Error("City not found");
    }

    const { latitude, longitude } = firstResult;

    const weatherRes = await axios.get<OpenMeteoResponse>(
      `${BASE_URL}?latitude=${latitude}&longitude=${longitude}&timezone=auto&temperature_unit=${units.temp}&wind_speed_unit=${units.wind}&precipitation_unit=${units.precipitation}&current=is_day,weather_code,temperature_2m,weather_code,wind_speed_10m,precipitation,relative_humidity_2m,apparent_temperature&hourly=temperature_2m,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min,weather_code`,
      {
        signal: controllerSignal,
      },
    );

    return mapWeatherData(weatherRes.data);
  } catch (error) {
    if (axios.isCancel(error)) throw error;
    if (axios.isAxiosError(error))
      throw new Error(
        error.response?.data?.reason ||
          error.response?.data?.message ||
          error.message,
      );
    throw error;
  }
}
