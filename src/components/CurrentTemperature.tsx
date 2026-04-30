import { useQuery } from "../hooks/useQuery";
import { useWeather } from "../hooks/useWeather";
import { useWeatherCodes } from "../hooks/useWeatherCodes";
import { dayFormatDate } from "../utils/formatDate";
import BgTodayLarge from "../assets/images/bg-today-large.svg";
import type { WeatherInfo } from "../types";

export default function CurrentTemperature() {
  const { activeCity } = useQuery();
  const { data, loading, error } = useWeather(activeCity.name);
  const weatherCodes = useWeatherCodes();
  if (!data) return;
  let currWeatherCode: WeatherInfo = weatherCodes[data.current.weather_code];
  if (
    (data.current.weather_code === 1 || data.current.weather_code === 0) &&
    data.current.is_day === 0
  )
    currWeatherCode = weatherCodes[100];

  console.log(currWeatherCode);
  if (loading) return <div>loading</div>;

  return (
    <div className="inline-block relative">
      <img src={BgTodayLarge} alt="" />
      <div className={`absolute inset-0 flex justify-around items-center`}>
        <div>
          <h2 className="text-3xl font-bold mb-2">
            {activeCity.name}, {activeCity.country}
          </h2>
          <h4 className="text-sm">
            {dayFormatDate(data?.daily?.time[0] || "")}
          </h4>
        </div>
        <div className="flex items-center justify-end gap-4">
          <img src={currWeatherCode.icon} alt="" className="w-1/4" />
          <h2 className="text-8xl font-bold italic">
            {Math.round(data.current.temperature)}°
          </h2>
        </div>
      </div>
    </div>
  );
}
