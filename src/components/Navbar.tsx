import { useState } from "react"
import Logo from "../assets/images/logo.svg"
import IconUnits from "../assets/images/icon-units.svg"
import IconDropdown from "../assets/images/icon-dropdown.svg"

export default function Navbar() {
  const [units, setUnits] = useState({
    temp: "celsius",
    wind: "kmh",
    precipitation: "mm"
  })
  const [open, SetOpen] = useState<boolean>(false);

  const defaultClass: string = "px-2 py-1 text-xs hover:bg-gray-700 rounded-lg cursor-pointer flex justify-between items-center";
  const checkTrue = () => (<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#fff"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" /></svg>);

  return (
    <div className="flex justify-between items-center px-16 py-6">
      <div className="flex justify-center items-center gap-2">
        <img src={Logo} alt="logo" />
      </div>
      <div className="relative">
        <button className="flex items-center p-2 bg-gray-700/55 rounded-lg cursor-pointer" onClick={() => SetOpen(!open)}>
        <img src={IconUnits} alt="" />
        <span className="mx-1 text-xs">Units</span>
        <img src={IconDropdown} alt="" className={`${open && "rotate-180"} transition duration-400`} />
      </button>
      {open && (
        <div className="absolute p-2 rounded-lg w-44 bg-gray-700/60  right-0 top-12 z-10">
          <div>
            <h4 className="text-xs text-gray-400">Temperature</h4>
              <p className={`${defaultClass}`} onClick={() => setUnits({ ...units, temp: "celsius" })}>Celsius (°C) {units.temp === "celsius" && checkTrue()}</p>
            <p className={`${defaultClass}`} onClick={() => setUnits({...units, temp: "fahrenheit"})}>Fahrenheit (°F) {units.temp === "fahrenheit" && checkTrue()}</p>
            <hr className="text-gray-400 my-2"/>
          </div>
          <div>
            <h4 className="text-xs text-gray-400">Wind Speed</h4>
            <p className={`${defaultClass}`} onClick={() => setUnits({...units, wind: "kmh"})}>Km/h {units.wind === "kmh" && checkTrue()}</p>
            <p className={`${defaultClass}`} onClick={() => setUnits({...units, wind: "mph"})}>mph {units.wind === "mph" && checkTrue()}</p>
            <hr className="text-gray-400 my-2"/>
          </div>
          <div>
            <h4 className="text-xs text-gray-400">Precipitation</h4>
            <p className={`${defaultClass}`} onClick={() => setUnits({...units, precipitation: "mm"})}>Millimeters (mm) {units.precipitation === "mm" && checkTrue()}</p>
            <p className={`${defaultClass}`} onClick={() => setUnits({...units, precipitation: "in"})}>Inches (in) {units.precipitation === "in" && checkTrue()}</p>
          </div>
        </div>
        )}
      </div>
  </div>
  )
}