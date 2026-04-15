export interface WeatherData {
  current: {
    temperature: number;
    windSpeed: number;
    precipitation: number;
    humidity: number;
    feelsLike: number;
  };
  hourly: {
    time: string[];
    temperature: number[];
    weatherCode: number[];
  };
  daily: {
    time: string[];
    tempMax: number[];
    tempMin: number[];
    weatherCode: number[];
  };
}
