import React, { useState, useEffect, useRef } from "react";
import StatusExamine from "./statusComplete";
import StatusSchedule from "./statusSchedule";
const Filter = () => {
  const [isOpen, setIsOpen] = useState(false); // สร้าง state สำหรับเปิดปิด dropdown
  const [isCheckedExamine, setIsCheckedExamine] = useState(false); // examine checkbox
  const [isCheckedSchedule, setIsCheckedSchedule] = useState(false); // schedule checkbox
  const dropdownRef = useRef(null); // ref ของ dropdown
  const buttonRef = useRef(null); // ref ของ button
  const commonCheckBoxStyles =
    "absolute text-vivid-blue opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none";
  const commonInputStyles =
    "peer h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-vivid-blue checked:border-2";
  const commonCheckBoxContainerStyles =
    "inline-flex w-full items-center px-2 py-2 gap-2 rounded-md hover:bg-light-blue hover:cursor-pointer";
  // เปิดปิด dropdown
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // ปิด dropdown ตอนคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (event) => {
      // เช็คว่า dropdown ถูกคลิ๊กหรือยัง
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

    // ถ้าไม่มีการคลิก dropdown ให้ปิด dropdown
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ใช้เช็คว่า checkbox ถูกคลิกหรือยัง
  const handleCheckExamine = (event) => {
    setIsCheckedExamine(event.target.checked); // Update state
  };

  const handleCheckSchedule = (event) => {
    setIsCheckedSchedule(event.target.checked); // Update state
  };

  return (
    <div className="relative text-left flex items-center center">
      Status
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
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute flex left-12 z-50 mt-28 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1 px-2 font-normal text-darkest-blue" role="none">
            <div className={commonCheckBoxContainerStyles}>
              <div className="flex items-center justify-center">
                <label
                  htmlFor="examine"
                  className="flex items-center cursor-pointer relative"
                >
                  <input
                    type="checkbox"
                    className={`${commonInputStyles}`}
                    id="check-examine"
                    checked={isCheckedExamine}
                    onChange={handleCheckExamine}
                  />
                  <span className={commonCheckBoxStyles}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
              </div>
              <div role="menuitem" tabIndex="-1" id="menu-item-examine">
                <StatusExamine />
              </div>
            </div>
            <div className={commonCheckBoxContainerStyles}>
              <div className="flex items-center justify-center">
                <label
                  htmlFor="schedule"
                  className="flex items-center cursor-pointer relative"
                >
                  <input
                    type="checkbox"
                    className={commonInputStyles}
                    id="check-schedule"
                    checked={isCheckedSchedule}
                    onChange={handleCheckSchedule}
                  />
                  <span className={commonCheckBoxStyles}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
              </div>
              <div role="menuitem" tabIndex="-1" id="menu-item-schedule">
                <StatusSchedule />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
