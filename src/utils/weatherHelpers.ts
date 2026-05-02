import type { WeatherData, Units } from "../types";
import {
  hourFormatDate,
  dayFormatDate,
  dayFormatDateShort,
} from "../utils/formatDate";
import { getCurrentTime } from "../utils/formatDate";

export function getForecastByDay(data: WeatherData, selectedDay: string) {
  const selectedDayInfo = data.hourly.time
    .map((time, i) => ({
      time,
      temperature: data.hourly.temperature[i],
      weather_code: data.hourly.weather_code[i],
      is_day: data.hourly.is_day[i],
    }))
    .filter((dayInfo) => {
      const dayName = dayFormatDate(dayInfo.time);
      return dayName === selectedDay;
    });

  let forecastHours: string[] = selectedDayInfo.map((dayInfo) =>
    hourFormatDate(dayInfo.time),
  );

  let forecastTemperature: number[] = selectedDayInfo.map((dayInfo) =>
    Math.round(dayInfo.temperature),
  );

  let forecastCodes: number[] = selectedDayInfo.map(
    (dayInfo) => dayInfo.weather_code,
  );
  let forecastIsDay: number[] = selectedDayInfo.map(
    (dayInfo) => dayInfo.is_day,
  );
  const forecastDays: string[] =
    data?.daily.time.map((h) => dayFormatDate(h)) || [];

  const { currentTime, currentDay } = getCurrentTime();

  if (selectedDay === currentDay) {
    const startIndex = data?.hourly.time.indexOf(currentTime);
    if (startIndex === -1) return;

    forecastHours = data?.hourly.time
      .slice(startIndex, startIndex + 24)
      .map((h) => hourFormatDate(h));

    forecastTemperature = data?.hourly.temperature
      .slice(startIndex, startIndex + 24)
      .map((temp) => Math.round(temp));

    forecastCodes = data?.hourly.weather_code.slice(
      startIndex,
      startIndex + 24,
    );
    forecastIsDay = data?.hourly.is_day.slice(startIndex, startIndex + 24);
  }

  return {
    forecastHours,
    forecastTemperature,
    forecastCodes,
    forecastIsDay,
    forecastDays,
  };
}

export function getCurrentWeatherInfo(data: WeatherData, units: Units) {
  const currentWeatherInfo: {
    title: string;
    current: number | string;
    unit: string;
  }[] = [
    {
      title: "Feels Like",
      current:
        data.current.feelsLike != null
          ? Math.round(data.current.feelsLike)
          : "_",
      unit: "°",
    },
    { title: "Humidity", current: data.current.humidity ?? "_", unit: "%" },
    {
      title: "Wind",
      current:
        data.current.windSpeed != null
          ? Math.round(data.current.windSpeed)
          : "_",
      unit: units.wind === "kmh" ? " Km/h" : " Mph",
    },
    {
      title: "Precipitation",
      current: data.current.precipitation ?? "_",
      unit: units.precipitation === "mm" ? " mm" : " inch",
    },
  ];

  return currentWeatherInfo;
}

export function getDailyForecast(data: WeatherData) {
  const dailyForecastDays: string[] =
    data?.daily.time.map((h) => dayFormatDateShort(h)) ?? [];
  const dailyMaxTemp: number[] = data?.daily.tempMax.map((e) => Math.round(e));
  const dailyMinTemp: number[] = data?.daily.tempMin.map((e) => Math.round(e));
  const dailyWeatherCodes: number[] = data?.daily.weather_code;

  return { dailyForecastDays, dailyMaxTemp, dailyMinTemp, dailyWeatherCodes };
}
