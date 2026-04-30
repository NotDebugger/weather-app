export interface WeatherData {
  current: {
    temperature: number;
    windSpeed: number;
    precipitation: number;
    humidity: number;
    feelsLike: number;
    is_day: number;
    weather_code: number;
  };
  hourly: {
    time: string[];
    temperature: number[];
    weather_code: number[];
  };
  daily: {
    time: string[];
    tempMax: number[];
    tempMin: number[];
    weather_code: number[];
  };
}

export interface WeatherInfo {
  label: string;
  icon: string;
}
