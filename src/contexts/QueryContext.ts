import { createContext } from "react";

interface QueryState {
  queryInput: string;
  setQueryInput: React.Dispatch<React.SetStateAction<string>>;
  activeQuery: string;
  setActiveQuery: React.Dispatch<React.SetStateAction<string>>;
}
export const QueryContext = createContext<QueryState | null>(null);
