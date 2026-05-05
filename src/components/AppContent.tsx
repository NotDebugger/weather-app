import { useWeather } from "../hooks/useWeather";
import { useState } from "react";
import ErrorPage from "../components/ErrorPage";

// Components
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import CurrentTemperature from "../components/CurrentTemperature";
import HourlyForecast from "../components/HourlyForecast";
import CurrentWeatherInfo from "../components/CurrentWeatherInfo";
import DailyForecast from "../components/DailyForecast";
import { WeatherContext } from "../contexts/WeatherContext";

export default function AppContent() {
  const { data, loading, error, refetch } = useWeather();
  const [hasResult, setHasResult] = useState<boolean>(true);

  return (
    <WeatherContext.Provider value={{ data, loading, error, refetch }}>
      <Navbar />

      {error ? (
        <ErrorPage message={error} refetch={refetch} />
      ) : (
        <>
          <Search setHasResult={setHasResult} />
          {hasResult ? (
            <>
              <div className="flex justify-center gap-5 my-16 mx-5 flex-wrap md:flex-nowrap">
                <div className="flex flex-col gap-4">
                  <CurrentTemperature />
                  <CurrentWeatherInfo />
                  <DailyForecast />
                </div>
                <HourlyForecast />
              </div>
            </>
          ) : (
            <div className="text-center text-lg mt-3">
              <h2>No search result found!</h2>
            </div>
          )}
        </>
      )}
    </WeatherContext.Provider>
  );
}
