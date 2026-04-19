import { createContext } from "react";

interface QueryState {
  query: string;
  setQuery: (value: string) => void;
}
export const QueryContext = createContext<QueryState | null>(null);
