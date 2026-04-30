import axios from "axios";
import type { City, GeoResponse } from "../types";

export async function getSuggestionsCities(query: string): Promise<City[]> {
  const geoRes = await axios.get<GeoResponse>(
    `https://geocoding-api.open-meteo.com/v1/search?name=${query}`,
  );
  const cities = geoRes.data.results?.map(
    (city): City => ({
      name: city.name || "",
      country: city.country,
    }),
  );

  return cities;
}
