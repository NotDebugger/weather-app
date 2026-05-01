import type { WeatherData } from "../types";
import { hourFormatDate, dayFormatDate } from "../utils/formatDate";
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
