import SunnyIcon from "../assets/images/icon-sunny.webp";
import FogIcon from "../assets/images/icon-fog.webp";
import DrizzleIcon from "../assets/images/icon-drizzle.webp";
import OvercastIcon from "../assets/images/icon-overcast.webp";
import PartlyCloudyIcon from "../assets/images/icon-partly-cloudy.webp";
import RainIcon from "../assets/images/icon-rain.webp";
import SnowIcon from "../assets/images/icon-snow.webp";
import StormIcon from "../assets/images/icon-storm.webp";
import MoonIcon from "../assets/images/full-moon.png";
import type { WeatherInfo } from "../types";

export function useWeatherCodes() {
  const sunnyInfo: WeatherInfo = { label: "Sunny", icon: SunnyIcon };
  const drizzleInfo: WeatherInfo = { label: "Drizzle", icon: DrizzleIcon };
  const rainInfo: WeatherInfo = { label: "Rain", icon: RainIcon };
  const snowInfo: WeatherInfo = { label: "Snow", icon: SnowIcon };
  const stormInfo: WeatherInfo = { label: "Storm", icon: StormIcon };

  const weatherCodes: Record<number, WeatherInfo> = {
    0: sunnyInfo,
    1: sunnyInfo,
    100: { label: "Moon", icon: MoonIcon },

    2: { label: "Partly cloudy", icon: PartlyCloudyIcon },
    3: { label: "Overcast", icon: OvercastIcon },
    45: { label: "Fog", icon: FogIcon },

    51: drizzleInfo,
    53: drizzleInfo,
    55: drizzleInfo,

    61: rainInfo,
    63: rainInfo,
    65: rainInfo,

    71: snowInfo,
    73: snowInfo,
    75: snowInfo,

    80: stormInfo,
    81: stormInfo,
    82: stormInfo,
    95: stormInfo,
    96: stormInfo,
    99: stormInfo,
  };
  return weatherCodes;
}
