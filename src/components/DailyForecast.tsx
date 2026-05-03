import { getDailyForecast } from "../utils/weatherHelpers";
import { useWeatherCodes } from "../hooks/useWeatherCodes";
import { WeatherContext } from "../contexts/WeatherContext";
import { useContext } from "react";

export default function DailyForecast() {
  const weatherCodes = useWeatherCodes();
  const weather = useContext(WeatherContext);
  if (!weather) return;

  const { data, loading } = weather;
  if (!data) return;

  const { dailyForecastDays, dailyMaxTemp, dailyMinTemp, dailyWeatherCodes } =
    getDailyForecast(data);

  return (
    <div>
      <h3 className="mb-3">Daily Forecast</h3>
      <div className="flex justify-between">
        {dailyForecastDays.map((day, i) => (
          <div
            key={i}
            className="flex flex-col items-center w-1/9 min-h-28 text-sm bg-l-primary/60 border border-white/10 rounded-xl p-2"
          >
            {loading ? (
              <div></div>
            ) : (
              <>
                <h4>{day}</h4>
                <img
                  src={weatherCodes[dailyWeatherCodes[i]]?.icon}
                  alt=""
                  className="w-10 py-2"
                />
                <div className="flex gap-5 text-gray-300">
                  <span>{dailyMaxTemp?.[i]}°</span>
                  <span>{dailyMinTemp?.[i]}°</span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
