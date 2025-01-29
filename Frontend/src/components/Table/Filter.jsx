import React, { useState, useEffect, useRef } from "react";
import StatusExamine from "./statusComplete";
import StatusSchedule from "./statusSchedule";
import { ReactComponent as ExpandUD } from "../../assets/expandUpDown.svg";

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

  // ใช้เช็คว่า checkbox ถูกคลิกหรือยัง
  const handleCheck = (setter) => (event) => setter(event.target.checked);

  const renderCheckbox = (id, checked, onChange, Component) => (
    <div className={commonCheckBoxContainerStyles}>
      <div className="flex items-center justify-center">
        <label
          htmlFor={id}
          className="flex items-center cursor-pointer relative"
        >
          <input
            type="checkbox"
            className={commonInputStyles}
            id={id}
            checked={checked}
            onChange={onChange}
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
      <div role="menuitem" tabIndex="-1">
        <Component />
      </div>
    </div>
  );

  return (
    <div className="relative text-left flex items-center">
      Status
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
          className="absolute flex left-12 z-50 mt-28 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
          role="menu"
          tabIndex="-1"
        >
          <div className="py-1 px-2 font-normal text-darkest-blue">
            {renderCheckbox(
              "check-examine",
              isCheckedExamine,
              handleCheck(setIsCheckedExamine),
              StatusExamine
            )}
            {renderCheckbox(
              "check-schedule",
              isCheckedSchedule,
              handleCheck(setIsCheckedSchedule),
              StatusSchedule
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
