import { useState } from "react";
import Logo from "../assets/images/logo.svg";
import IconUnits from "../assets/images/icon-units.svg";
import IconDropdown from "../assets/images/icon-dropdown.svg";
import { useUnits } from "../hooks/useUnits";
import type { Units } from "../types";

export default function Navbar() {
  const { units, setUnits } = useUnits();
  const [open, SetOpen] = useState<boolean>(false);
  const tempOptions: { label: string; value: Units["temp"] }[] = [
    { label: "Celsius (°C)", value: "celsius" },
    { label: "Fahrenheit (°F)", value: "fahrenheit" },
  ];
  const windOptions: { label: string; value: Units["wind"] }[] = [
    { label: "Km/h", value: "kmh" },
    { label: "Mph", value: "mph" },
  ];
  const precipitationOptions: {
    label: string;
    value: Units["precipitation"];
  }[] = [
    { label: "Millimeters (mm)", value: "mm" },
    { label: "Inches", value: "inch" },
  ];

  const defaultClass: string =
    "px-2 py-1 text-xs hover:bg-l-primary rounded cursor-pointer flex justify-between items-center";
  const CheckIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="18px"
      viewBox="0 -960 960 960"
      width="18px"
      fill="#fff"
    >
      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
    </svg>
  );

  return (
    <div className="flex justify-between items-center px-16 py-6">
      <div className="flex justify-center items-center gap-2">
        <img src={Logo} alt="logo" />
      </div>
      <div className="relative">
        <button
          className="flex items-center p-2 bg-primary rounded-lg cursor-pointer"
          onClick={() => SetOpen(!open)}
        >
          <img src={IconUnits} alt="" />
          <span className="mx-1 text-xs">Units</span>
          <img
            src={IconDropdown}
            alt=""
            className={`${open && "rotate-180"} transition duration-300`}
          />
        </button>
        {open && (
          <div className="absolute p-2 rounded-lg w-44 bg-primary right-0 top-12 z-10 shadow-md border border-white/10">
            <div>
              <h4 className="text-xs text-gray-400">Temperature</h4>
              {tempOptions.map((opt) => (
                <p
                  key={opt.value}
                  className={`${defaultClass}`}
                  onClick={() => {
                    setUnits((prev) => ({ ...prev, temp: opt.value }));
                    SetOpen(false);
                  }}
                >
                  {opt.label}
                  {units.temp === opt.value && CheckIcon()}
                </p>
              ))}
              <hr className="opacity-20 my-2" />
            </div>
            <div>
              <h4 className="text-xs text-gray-400">Wind Speed</h4>
              {windOptions.map((opt) => (
                <p
                  key={opt.value}
                  className={`${defaultClass}`}
                  onClick={() => {
                    setUnits((prev) => ({ ...prev, wind: opt.value }));
                    SetOpen(false);
                  }}
                >
                  {opt.label}
                  {units.wind === opt.value && CheckIcon()}
                </p>
              ))}
              <hr className="opacity-20 my-2" />
            </div>
            <div>
              <h4 className="text-xs text-gray-400">Precipitation</h4>
              {precipitationOptions.map((opt) => (
                <p
                  key={opt.value}
                  className={`${defaultClass}`}
                  onClick={() => {
                    setUnits((prev) => ({ ...prev, precipitation: opt.value }));
                    SetOpen(false);
                  }}
                >
                  {opt.label}
                  {units.precipitation === opt.value && CheckIcon()}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
