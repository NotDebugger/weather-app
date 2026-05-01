import { useSuggestions } from "../hooks/useSuggestions";
import { useQuery } from "../hooks/useQuery";
import LoadingIcon from "../assets/images/icon-loading.svg";

export default function SearchSuggestions() {
  const { suggestions, setSuggestions, suggestionsLoading } = useSuggestions();
  const { setQueryInput, setActiveCity } = useQuery();

  return (
    <>
      {suggestionsLoading ? (
        <div className="px-3 py-2 flex gap-2 cursor-pointer bg-primary rounded-lg absolute top-10 w-full z-20">
          <img src={LoadingIcon} alt="" className="animate-spin" />
          Search in progress
        </div>
      ) : (
        suggestions?.length > 0 && (
          <ul className="bg-primary rounded-lg p-2 absolute top-10 w-full z-20">
            {suggestions.map((city, i) => {
              if (i > 3) return;
              return (
                <li
                  className="px-2 py-1 cursor-pointer hover:bg-l-primary rounded-lg"
                  key={i}
                  onClick={() => {
                    setActiveCity(city);
                    setQueryInput("");
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
