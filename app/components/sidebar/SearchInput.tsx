import React from "react";
import { CiSearch } from "react-icons/ci";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <form className="flex items-center gap-2 justify-between">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        className="input input-bordered rounded-full bg-gray-200"
      />
      <button type="submit" className="btn btn-circle bg-yellow-500 text-white">
        <CiSearch className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
