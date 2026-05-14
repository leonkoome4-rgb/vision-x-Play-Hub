import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

const SearchInput = ({ onSearch }) => {
  const ref = useRef(null);
  return (
    <form onSubmit={event => {
      event.preventDefault();
      if (ref.current) onSearch(ref.current.value);
    }} className="flex">
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400"><BsSearch /></span>
        <input ref={ref} placeholder="Search games..." className="pl-10 pr-3 py-2 rounded-lg bg-[#0b0b0b] border border-white/6 text-sm w-full" />
      </div>
    </form>
  );
};

export default SearchInput;