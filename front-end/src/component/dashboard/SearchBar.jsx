import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

function SearchBar() {
  const [, setSearchParams] = useSearchParams();
  const [username, setUsername] = useState("");

  function handleOnChange(e) {
    setUsername(e.target.value);
  }

  async function handleOnsubmit(e) {
    e.preventDefault();
    setSearchParams({ pageNum: 1, username: !username ? "all" : username });
  }

  return (
    <div className="mb-4 w-full flex gap-6  ">
      <div className="flex relative">
        <form onSubmit={handleOnsubmit}>
          <input
            type="text"
            value={username}
            placeholder="Type the user email"
            className="py-3 pl-4  pr-6 text-lg border-2 border-neutral-300 rounded-md outline-none target:border-none w-[24rem] font-medium text-neutral-500"
            onChange={(e) => handleOnChange(e)}
          />
          <button className="absolute right-0 top-0 cursor-pointer  p-4 bg-purple-500 hover:bg-purple-600 rounded-r-md transition-all duration-500">
            <FaSearch
              className="text-white transition-all duration-700"
              size={24}
            />
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
