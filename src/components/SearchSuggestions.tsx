import { useSuggestions } from "../hooks/useSuggestions";
import { useQuery } from "../hooks/useQuery";
import LoadingIcon from "../assets/images/icon-loading.svg";

export default function SearchSuggestions() {
  const { suggestions, setSuggestions, suggestionsLoading } = useSuggestions();
  const { setQuery } = useQuery();

  return (
    <>
      {suggestionsLoading ? (
        <div className="px-3 py-2 flex gap-2 cursor-pointer bg-gray-700/55 rounded-lg">
          <img src={LoadingIcon} alt="" className="animate-spin" />
          Search in progress
        </div>
      ) : (
        suggestions?.length > 0 && (
          <ul className="bg-gray-700/55 rounded-lg p-2">
            {suggestions.map((city, i) => {
              if (i > 3) return;
              return (
                <li
                  className="px-2 py-1 cursor-pointer hover:bg-gray-700 rounded-lg"
                  key={i}
                  onClick={() => {
                    setQuery(city.name || "");
                    setSuggestions([]);
                  }}
                >
                  {city.name}, {city.country}
                </li>
              );
            })}
          </ul>
        )
      )}
    </>
  );
}
