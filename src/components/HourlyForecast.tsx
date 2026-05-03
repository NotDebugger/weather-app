import { WeatherContext } from "../contexts/WeatherContext";
import { useContext } from "react";
import { useState } from "react";
import { getForecastByDay } from "../utils/weatherHelpers";
import { useWeatherCodes } from "../hooks/useWeatherCodes";
import { getCurrentTime } from "../utils/formatDate";
import IconDropdown from "../assets/images/icon-dropdown.svg";

export default function HourlyForecast() {
  const weatherCodes = useWeatherCodes();
  const [open, setOpen] = useState<boolean>(false);
  const { currentDay } = getCurrentTime();
  const [selectedDay, setSelectedDay] = useState<string>(currentDay);
  const weather = useContext(WeatherContext);

  if (!weather) return;
  const { data, loading } = weather;
  if (!data) return;

  const forecast = getForecastByDay(data, selectedDay || currentDay);

  if (!forecast) return;
  const {
    forecastHours,
    forecastTemperature,
    forecastCodes,
    forecastIsDay,
    forecastDays,
  } = forecast;

  function handleWeatherCodeIcon(i: number) {
    if (
      (forecastCodes[i] === 1 || forecastCodes[i] === 0) &&
      forecastIsDay[i] === 0
    )
      return weatherCodes[100].icon;
    return weatherCodes[forecastCodes[i]].icon;
  }
  return (
    <div className="bg-primary rounded-xl border border-white/10 p-4 forecast">
      <div className="flex gap-5 mb-3 items-center justify-between text-sm">
        <h3>Hourly Forecast</h3>
        <div className="relative">
          <button
            className="bg-l-primary w-28 px-2 py-1 rounded cursor-pointer flex justify-between border border-white/5"
            onClick={() => setOpen(!open)}
          >
            {loading ? "-" : selectedDay}
            <img
              src={IconDropdown}
              alt=""
              className={`${open && "rotate-180"} transition duration-300`}
            />
          </button>
          {open && (
            <ul className="absolute p-2 rounded-lg text-sm w-32 right-0 top-9 bg-primary z-10 shadow-md border border-white/10">
              {forecastDays.map((day) => (
                <li
                  key={day}
                  className="hover:bg-l-primary px-2 py-1 rounded cursor-pointer"
                  onClick={() => {
                    setSelectedDay(day);
                    setOpen(false);
                  }}
                >
                  {day}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="h-115 overflow-y-auto">
        <ul className="flex flex-col gap-2 p-1">
          {forecastHours.map((hour, i) => (
            <li
              key={i}
              className="flex justify-between items-center min-h-10 p-2 bg-l-primary rounded text-sm border border-white/10"
            >
              {loading ? (
                <div></div>
              ) : (
                <>
                  <span className="flex items-center gap-2">
                    <img
                      src={handleWeatherCodeIcon(i)}
                      alt="weather icon"
                      className="w-6"
                    />{" "}
                    {hour}
                  </span>
                  <span>{forecastTemperature[i]}°</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
