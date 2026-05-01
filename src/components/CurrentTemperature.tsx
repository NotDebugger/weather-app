import { useQuery } from "../hooks/useQuery";
import { useWeather } from "../hooks/useWeather";
import { useWeatherCodes } from "../hooks/useWeatherCodes";
import { currentTimeFormatDate } from "../utils/formatDate";
import BgTodayLarge from "../assets/images/bg-today-large.svg";
import type { WeatherInfo } from "../types";

export default function CurrentTemperature() {
  const { activeCity } = useQuery();
  const { data, loading, error } = useWeather();
  const weatherCodes = useWeatherCodes();
  if (!data) return;
  let currWeatherCode: WeatherInfo = weatherCodes[data.current.weather_code];
  if (
    (data.current.weather_code === 1 || data.current.weather_code === 0) &&
    data.current.is_day === 0
  )
    currWeatherCode = weatherCodes[1];

  return (
    <div className="w-1/2 h-60 bg-primary rounded-2xl">
      {loading ? (
        <div className="text-center">loading</div>
      ) : (
        <div
          className={`flex justify-between items-center bg-cover bg-center bg-no-repeat h-60 rounded-2xl`}
          style={{ backgroundImage: `url(${BgTodayLarge})` }}
        >
          <div className="ml-8">
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
