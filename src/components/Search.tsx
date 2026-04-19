import SearchIcon from "../assets/images/icon-search.svg";
import { useQuery } from "../hooks/useQuery";
import SearchSuggestions from "./SearchSuggestions";

export default function Search() {
  const { query, setQuery } = useQuery();

  return (
    <div className="mt-5 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-10">How's the sky looking today?</h1>
      <form
        className="flex gap-2 text-sm items-start"
        onSubmit={(e: React.SubmitEvent<HTMLFormElement>) => e.preventDefault()}
      >
        <div className="flex flex-col gap-1">
          <div className="bg-gray-700/55 flex items-center px-2 py-2 rounded-lg">
            <img src={SearchIcon} alt="" className="w-5 h-5 mx-3 opacity-70" />
            <input
              className="w-xs outline-none"
              type="text"
              placeholder="Search for a place..."
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
            />
          </div>
          <SearchSuggestions />
        </div>
        <button className="px-3 py-2 bg-indigo-700 rounded-lg cursor-pointer">
          Search
        </button>
      </form>
    </div>
  );
}
