import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as Assending } from "../../assets/ascending.svg";
import { ReactComponent as Desending } from "../../assets/decending.svg";
import { ReactComponent as ExpandUD } from "../../assets/expandUpDown.svg";

const Dropdown = ({ setSortOrder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const handleSortAscending = () => setSortOrder("asc");
  const handleSortDescending = () => setSortOrder("desc");
  const commonItemContainerStyles =
    "inline-flex w-full items-center px-2 py-2 gap-2 rounded-md hover:bg-light-blue hover:cursor-pointer";

  // ใช้เปิดปิด dropdown
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // ปิด dropdown ตอนคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative text-left flex items-center">
      Study date
      <button
        className="rounded-sm hover:bg-light-gray"
        onClick={toggleDropdown}
        ref={buttonRef}
      >
        <ExpandUD />
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-20 z-50 mt-28 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
          role="menu"
          tabIndex="-1"
        >
          <div className="py-1 px-2 font-normal text-darkest-blue">
            {/* Sort ascending */}
            <div
              className={commonItemContainerStyles}
              onClick={handleSortAscending}
            >
              <Assending />
              <p role="menuitem" tabIndex="-1">
                Sort ascending
              </p>
            </div>
            {/* Sort descending */}
            <div
              className={commonItemContainerStyles}
              onClick={handleSortDescending}
            >
              <Desending />
              <p role="menuitem" tabIndex="-1">
                Sort descending
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
