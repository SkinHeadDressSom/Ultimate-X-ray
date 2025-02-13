import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as AddLine } from "../../../assets/topbar/addLine.svg";
import { ReactComponent as AddFill } from "../../../assets/topbar/addFill.svg";
import OpenButton from "../../Button/openButton";
import CancelButton from "../../Button/cancelButton";
import mockup from "./mockup";

const Addfile = ({ allCases }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // ref ของ dropdown
  const buttonRef = useRef(null); // ref ของ button

  const handleClick = () => {
    setIsClicked((prev) => !prev); 
    setIsOpen((prev) => !prev);
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        ref={buttonRef}
      >
        {isClicked ? (
          <AddFill className="w-4 h-auto" fill="#0D42C9" />
        ) : isHovered ? (
          <AddFill className="w-4 h-auto" fill="#0D42C9" />
        ) : (
          <AddLine className="w-4 h-auto" fill="#0D42C9" />
        )}
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute flex flex-col left-50 -top-20 z-50 mt-28 w-64 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
          role="menu"
          tabIndex="-1"
        >
          <div className="flex items-center text-darkest-blue gap-1 bg-light-blue w-full px-2 py-1 text-base rounded-t-md">
            <AddLine className="w-5 h-auto" fill="#0d42c9 " />
            <span>Choose file to open</span>
          </div>
          <div>
            {allCases.map((item, index) => (
              <div
                key={index}
                className="flex gap-2 items-center text-sm px-2 py-1.5 even:bg-extra-light-blue odd:bg-wheat rounded-md hover:cursor-pointer hover:bg-light-blue"
              >
                <label className="flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    className="peer h-3.5 w-3.5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-vivid-blue checked:border-2"
                  />
                  <span className="absolute text-vivid-blue opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
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
                <span className="text-darkest-blue">{item.study_date}</span>
                <span className="text-darkest-blue">{item.time}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-end p-1 gap-1">
            <CancelButton
              onButtonClosed={() => {
                setIsOpen(false);
                setIsClicked(false);
              }}
            />
            <OpenButton />
          </div>
        </div>
      )}
    </>
  );
};

export default Addfile;