import './App.css'
import { useWeather } from './hooks/useWeather'

function App() {
  const { data, loading, error } = useWeather("New York");
  console.log(data, loading, error);

  return (
    <>

    </>
  )
}

export default App
