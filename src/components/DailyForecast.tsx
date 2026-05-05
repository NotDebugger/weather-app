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
    <div className="text-lg md:text-sm">
      <h3 className="mb-3">Daily Forecast</h3>
      <div className="flex gap-3 justify-start xl:justify-between flex-wrap">
        {dailyForecastDays.map((day, i) => (
          <div
            key={i}
            className="flex flex-col items-center w-[calc((1/3*100%)-12px)] md:w-[calc((1/5*100%)-12px)] lg:w-[calc((1/7*100%)-12px)] min-h-28 bg-l-primary/60 border border-white/10 rounded-xl p-2"
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
