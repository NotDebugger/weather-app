import "./App.css";
import { useWeather } from "./hooks/useWeather";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { useState } from "react";
import { QueryContext } from "./contexts/QueryContext";

function App() {
  const [query, setQuery] = useState<string>("");
  const { data, loading, error } = useWeather("New York");
  console.log(data, loading, error);

  return (
    <>
      <QueryContext.Provider value={{ query, setQuery }}>
        <Navbar />
        <Search />
      </QueryContext.Provider>
    </>
  );
}

export default App;
