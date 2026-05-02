import { useWeather } from "../hooks/useWeather";
import { useUnits } from "../hooks/useUnits";
import { getCurrentWeatherInfo } from "../utils/weatherHelpers";

export default function CurrentWeatherInfo() {
  const { data } = useWeather();
  const { units } = useUnits();
  if (!data) return;

  const currentWeatherInfo: {
    title: string;
    current: number | string;
    unit: string;
  }[] = getCurrentWeatherInfo(data, units);

  return (
    <div className="flex justify-between my-5">
      {currentWeatherInfo.map((e, i) => (
        <div
          key={i}
          className="bg-l-primary/60 p-3 rounded-xl w-36 border border-white/10"
        >
          <h4 className="text-sm text-gray-400 mb-2">{e.title}</h4>
          <p className="text-lg">
            {e.current}
            {e.unit}
          </p>
        </div>
      ))}
    </div>
  );
}
