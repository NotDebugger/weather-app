import { QueryContext } from "../contexts/QueryContext";
import { useContext } from "react";

export function useQuery() {
  const context = useContext(QueryContext);

  if (!context) throw new Error("Context not found");
  return context;
}
