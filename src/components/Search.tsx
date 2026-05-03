import SearchIcon from "../assets/images/icon-search.svg";
import SearchSuggestions from "./SearchSuggestions";
import { useQuery } from "../hooks/useQuery";
import { useSuggestions } from "../hooks/useSuggestions";

export default function Search({
  setHasResult,
}: {
  setHasResult: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { queryInput, setQueryInput } = useQuery();
  const { suggestions } = useSuggestions();
  console.log(suggestions);

  return (
    <div className="mt-5 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-10 font-[Bricolage_Grotesque]">
        How's the sky looking today?
      </h1>
      <form
        className="flex gap-2 text-sm items-start"
        onSubmit={(e: React.SubmitEvent<HTMLFormElement>) => e.preventDefault()}
      >
        <div className="flex flex-col gap-1 relative">
          <div className="bg-primary flex items-center px-2 py-2 rounded-lg border border-white/5">
            <img src={SearchIcon} alt="" className="w-5 h-5 mx-3 opacity-70" />
            <input
              className="w-xs outline-none"
              type="text"
              placeholder="Search for a place..."
              value={queryInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQueryInput(e.target.value)
              }
            />
          </div>
          <SearchSuggestions setHasResult={setHasResult} />
        </div>
        <button
          className="px-3 py-2 bg-indigo-700 rounded-lg cursor-pointer shadow-xl/30 hover:bg-indigo-800 transition shadow-indigo-700"
          onClick={() => {
            if (!queryInput.trim()) return;

            if (!suggestions?.length) {
              setHasResult(false);
            } else {
              setHasResult(true);
            }
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
}
