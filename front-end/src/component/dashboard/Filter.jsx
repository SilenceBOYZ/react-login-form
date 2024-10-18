import { useState } from "react";
import { IoFilter } from "react-icons/io5";



function Filter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex">
      <button
        className="border-2 p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="px-1 flex items-center gap-4">
          <IoFilter size={18} />
          <span className="text-lg font-medium text-neutral-500">Filter</span>
        </span>

        <ul
          className={`absolute text-left text-sm bg-white rounded-md
             shadow-md z-10 left-0 top-16 w-[12rem] cursor-pointer ${
               !isOpen ? "invisible opacity-0" : "visible opacity-100"
             }
             transition-all duration-500`}
        >
          <li className="py-4 mb-2 px-4 font-medium hover:bg-neutral-200 transition-all duration-600">
            Order A to Z
          </li>
          <li className="py-4 mb-2 px-4 font-medium hover:bg-neutral-200 transition-all duration-600">
            Order Z to A
          </li>
        </ul>
      </button>
    </div>
  );
}

export default Filter;
