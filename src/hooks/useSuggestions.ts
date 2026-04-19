import { getSuggestionsCities } from "../services/suggestionsApi";
import { useQuery } from "./useQuery";
import type { City } from "../types";
import { useState, useEffect } from "react";

export function useSuggestions() {
  const { query } = useQuery();
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    const timeout = setTimeout(async () => {
      try {
        setSuggestionsLoading(true);
        const cities = await getSuggestionsCities(query);
        setSuggestions(cities);
      } catch (err) {
        console.log(err);
      } finally {
        setSuggestionsLoading(false);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);
  return { suggestions, setSuggestions, suggestionsLoading };
}
