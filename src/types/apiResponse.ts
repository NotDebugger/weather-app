export interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    precipitation: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    weather_code: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
}

export interface GeoResponse {
  results: {
    latitude?: number;
    longitude?: number;
    name?: string;
    country?: string;
  }[];
}

export interface City {
  name: string;
  country?: string;
}
