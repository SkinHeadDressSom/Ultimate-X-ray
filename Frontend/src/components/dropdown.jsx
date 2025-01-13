import React, { useState, useEffect, useRef } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);  // สร้าง state สำหรับเปิดปิด dropdown
  const dropdownRef = useRef(null); // ref ของ dropdown
  const buttonRef = useRef(null); // ref ของ button
  const commonItemContainerStyles = "inline-flex w-full items-center px-2 py-2 gap-2 rounded-md hover:bg-light-blue hover:cursor-pointer"

  // ใช้เปิดปิด dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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

    // ใช้เช็คว่าคลิกข้างนอก dropdown หรือยัง
    document.addEventListener("mousedown", handleClickOutside);

    // ใช้ปิด dropdown ถ้าไม่มีการคลิก dropdown
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative text-left flex items-center center">
      Study date
      <button
        className="rounded-sm hover:bg-light-gray"
        onClick={toggleDropdown}
        ref={buttonRef}
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
      {/* Dropdown menu*/}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute flex left-20 z-50 mt-28 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1 px-2 font-normal text-darkest-blue" role="none">
            {/* Sort ascending*/}
            <div className={commonItemContainerStyles}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="vivid-blue"
                className="w-4 h-auto"
              >
                <path d="M13.0001 22.0003L11.0002 22.0004L11.0002 5.82845L7.05044 9.77817L5.63623 8.36396L12.0002 2L18.3642 8.36396L16.9499 9.77817L13.0002 5.8284L13.0001 22.0003Z"></path>
              </svg>
              <p role="menuitem" tabIndex="-1" id="menu-item-sort-ascending">
                Sort ascending
              </p>
            </div>
            {/* Sort decending*/}
            <div className={commonItemContainerStyles}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="vivid-blue"
                className="w-4 h-auto"
              >
                <path d="M13.0001 1.99974L11.0002 1.9996L11.0002 18.1715L7.05044 14.2218L5.63623 15.636L12.0002 22L18.3642 15.636L16.9499 14.2218L13.0002 18.1716L13.0001 1.99974Z"></path>
              </svg>
              <p role="menuitem" tabIndex="-1" id="menu-item-sort-decending">
                Sort decending
              </p>
            </div>
            {/* select date*/}
            {/* <div className="inline-flex items-center w-full px-2 py-2 gap-2 rounded-md hover:bg-light-blue hover:cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="vivid-blue"
                className="w-4 h-auto"
              >
                <path d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z"></path>
              </svg>
              <p
                href="#"
                className=""
                role="menuitem"
                tabIndex="-1"
                id="menu-item-select-date"
              >
                Filter
              </p>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
