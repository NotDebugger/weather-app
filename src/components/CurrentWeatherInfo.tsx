import { useContext } from "react";
import { WeatherContext } from "../contexts/WeatherContext";
import { useUnits } from "../hooks/useUnits";
import { getCurrentWeatherInfo } from "../utils/weatherHelpers";

export default function CurrentWeatherInfo() {
  const { units } = useUnits();
  const weather = useContext(WeatherContext);
  if (!weather) return;
  const { data, loading } = weather;
  if (!data) return;

  const currentWeatherInfo: {
    title: string;
    current: number | string;
    unit: string;
  }[] = getCurrentWeatherInfo(data, units);

  return (
    <div className="flex justify-center md:justify-between my-5 flex-wrap gap-2">
      {currentWeatherInfo.map((e, i) => (
        <div
          key={i}
          className="bg-l-primary/60 p-3 rounded-xl w-[calc(50%-8px)] md:w-2/9 border border-white/10"
        >
          <h4 className="text-md md:text-sm text-gray-400 mb-2">{e.title}</h4>
          <p className={`text-xl md:text-lg ${loading && "text-gray-400"}`}>
            {loading ? "_" : `${e.current}${e.unit}`}
          </p>
        </div>
      ))}
    </div>
  );
}
