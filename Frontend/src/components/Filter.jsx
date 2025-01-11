import React, { useState } from "react";
import StatusExamine from "./statusExamine";
import StatusSchedule from "./statusSchedule";
const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative text-left flex items-center center">
        Status
      <button
        className="rounded-sm hover:bg-light-gray"
        onClick={toggleDropdown}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-auto"
        >
          <path d="M18 9 12 3 6 9H18ZM18 15 12 21 6 15H18Z"></path>
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute flex left-12 z-50 mt-28 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
        >
          <div className="py-1 px-2 font-normal text-darkest-blue" role="none">
            <div className="inline-flex w-full items-center px-2 py-2 gap-2 rounded-md hover:bg-light-blue hover:cursor-pointer">
              <div className="flex items-center justify-center">
                <label className="flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    class="peer h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-vivid-blue checked:border-2"
                    id="check"
                  />
                  <span class="absolute text-vivid-blue opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
              </div>
              <p
                href="#"
                className=""
                role="menuitem"
                tabindex="-1"
                id="menu-item-0"
              >
                <StatusExamine />
              </p>
            </div>
            <div className="inline-flex items-center w-full px-2 py-2 gap-2 rounded-md hover:bg-light-blue hover:cursor-pointer">
              <div className="flex items-center justify-center">
                <label className="flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    class="peer h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-vivid-blue checked:border-2"
                    id="check"
                  />
                  <span class="absolute text-vivid-blue opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
              </div>
              <p
                href="#"
                className=""
                role="menuitem"
                tabindex="-1"
                id="menu-item-0"
              >
                <StatusSchedule />
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
