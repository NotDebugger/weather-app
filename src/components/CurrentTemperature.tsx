import { useQuery } from "../hooks/useQuery";
import { useContext } from "react";
import { WeatherContext } from "../contexts/WeatherContext";
import { useWeatherCodes } from "../hooks/useWeatherCodes";
import { currentTimeFormatDate } from "../utils/formatDate";
import BgTodayLarge from "../assets/images/bg-today-large.svg";
import type { WeatherInfo } from "../types";

export default function CurrentTemperature() {
  const { activeCity } = useQuery();
  const weatherCodes = useWeatherCodes();

  const weather = useContext(WeatherContext);
  if (!weather) return;

  const { data, loading } = weather;
  if (!data) return;

  let currWeatherCode: WeatherInfo = weatherCodes[data.current.weather_code];
  if (
    (data.current.weather_code === 1 || data.current.weather_code === 0) &&
    data.current.is_day === 0
  )
    currWeatherCode = weatherCodes[100];

  return (
    <div
      className={`h-60 lg:min-w-150 xl:w-180 bg-primary rounded-2xl ${loading && "flex justify-center items-center"}`}
    >
      {loading ? (
        <div className="flex gap-1 items-center flex-col">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full animate-pulse [animation-delay:0.2s]"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full animate-pulse [animation-delay:0.4s]"></span>
          </div>
          <span className="text-sm text-gray-400">Loading...</span>
        </div>
      ) : (
        <div
          className={`flex sm:justify-between text-center items-center justify-center gap-3 sm:gap-0 flex-col sm:flex-row bg-cover md:bg-center bg-no-repeat h-60 rounded-2xl`}
          style={{ backgroundImage: `url(${BgTodayLarge})` }}
        >
          <div className=" w-1/2">
            <h2 className="text-3xl font-bold mb-2">
              {activeCity.name}, {activeCity.country}
            </h2>
            <h4 className="text-sm">
              {currentTimeFormatDate(data?.daily?.time[0] || "")}
            </h4>
          </div>
          <div className="flex items-center justify-end gap-3 mr-8">
            <img src={currWeatherCode.icon} alt="" className="w-1/4" />
            <h2 className="text-8xl font-bold italic">
              {Math.round(data.current.temperature)}°
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
