import type { City } from "../types";
import { createContext } from "react";

interface QueryState {
  queryInput: string;
  setQueryInput: React.Dispatch<React.SetStateAction<string>>;
  activeCity: City;
  setActiveCity: React.Dispatch<React.SetStateAction<City>>;
}
export const QueryContext = createContext<QueryState | null>(null);
