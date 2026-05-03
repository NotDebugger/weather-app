import ErrorIcon from "../assets/images/icon-error.svg";
import RetryIcon from "../assets/images/icon-retry.svg";

export default function ErrorPage({
  message,
  refetch,
}: {
  message: string;
  refetch: () => Promise<void>;
}) {
  return (
    <div className="flex flex-col justify-center items-center mt-16 gap-3">
      <img src={ErrorIcon} alt="" className="w-10" />
      <h1 className="text-4xl">Something went wrong</h1>
      <p>( {message} )</p>
      <button
        className="flex gap-2 items-center bg-l-primary p-2 rounded text-sm cursor-pointer hover:bg-l-primary/80"
        onClick={refetch}
      >
        <img src={RetryIcon} alt="" />
        Refresh
      </button>
    </div>
  );
}
