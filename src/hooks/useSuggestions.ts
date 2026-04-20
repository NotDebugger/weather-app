import { getSuggestionsCities } from "../services/suggestionsApi";
import { useQuery } from "./useQuery";
import type { City } from "../types";
import { useState, useEffect } from "react";

export function useSuggestions() {
  const { queryInput } = useQuery();
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!queryInput) {
      setSuggestions([]);
      return;
    }
    const timeout = setTimeout(async () => {
      try {
        setSuggestionsLoading(true);
        const cities = await getSuggestionsCities(queryInput);
        setSuggestions(cities);
      } catch (err) {
        console.log(err);
      } finally {
        setSuggestionsLoading(false);
      }
    }, 800);
    return () => clearTimeout(timeout);
  }, [queryInput]);
  return { suggestions, setSuggestions, suggestionsLoading };
}
