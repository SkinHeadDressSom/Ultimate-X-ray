import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as ArrowDown } from "../../assets/arrowDown.svg";

const Search = ({ onPatientDataFetched }) => {
  const [inputValue, setInputValue] = useState("");
  const [patientData, setPatientData] = useState(null);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputPlaceholder, setInputPlaceholder] = useState("Enter patient ID");
  const [selectedMenuItem, setSelectedMenuItem] = useState("HN");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  //mockup patient name
  const suggestions = ["Alice", "David", "Tony", "Anthony", "Hanna"];

  // Reusable styles
  const commonCheckBoxStyles =
    "inline-flex w-full items-center px-2 py-2 gap-2 rounded-md hover:bg-light-blue cursor-pointer text-sm";
  const commonFocusStyles =
    "focus:ring-1 focus:ring-vivid-blue focus:border-vivid-blue";

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);

    if (inputValue.trim() === "") {
      setFilteredSuggestions([]); // Hide dropdown when input is empty
    } else {
      const filteredSuggestions = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filteredSuggestions);
    }
  };
  //select ชื่อคนไข้แล้วให้แสดงในช่อง search
  const handleSelect = (value) => {
    setInputValue(value);
    setFilteredSuggestions([]);
  };

  //Back-end
  const getPatient = async (hn) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/fetch-data/api/patients/by-hn/${hn}`,
        { withCredentials: true }
      );
      console.log("API Response from HN search:", response.data);
      setPatientData(response.data.data);
      onPatientDataFetched(response.data.data);
    } catch (err) {
      console.error(
        "API Error:",
        err.response ? err.response.data : err.message
      );
      handleError("Patient not found");
    }
  };

  const getPatientByName = async (name) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/fetch-data/api/patients/by-name/${name}`,
        { withCredentials: true }
      );

      console.log("API Response from name search:", response.data);
      setPatientData(response.data.data);
      onPatientDataFetched(response.data.data);
    } catch (err) {
      console.error(
        "API Error:",
        err.response ? err.response.data : err.message
      );
      handleError("Patient not found");
    }
  };

  //handle error
  const handleError = (message) => {
    setError(message);
    setPatientData(null);
  };
  //handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // หาHN
    if (selectedMenuItem === "HN") {
      if (inputValue.trim() === "") {
        setError("Patient ID cannot be empty.");
        return;
      }
      getPatient(inputValue);
    }
    // หาName
    else if (selectedMenuItem === "Name") {
      if (inputValue.trim() === "") {
        setError("Patient name cannot be empty.");
        return;
      }
      getPatient(inputValue);
    }
  };

  //เปลี่ยน input type ให้ HN=number
  const inputType = selectedMenuItem === "HN" ? "number" : "text";

  const menuItems = {
    HN: "Enter patient ID",
    Name: "Enter patient name",
  };
  // handle choice ที่เลือก
  const handleMenuItemClick = (value) => {
    setInputPlaceholder(menuItems[value]);
    setSelectedMenuItem(value);
    setIsOpen(false);
  };
  //เปิดปิด dropdown
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  // ปิด dropdown ตอนคลิ๊กข้างนอก
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !dropdownRef.current?.contains(event.target) &&
        !buttonRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-3/12 max-w-[400px]">
      <form onSubmit={handleSearch}>
        <div className="flex">
          <button
            className={` ${commonFocusStyles} shrink-0 z-10 inline-flex items-center py-2 px-3 text-sm text-center border border-light-gray text-darkest-blue rounded-s-full hover:bg-gray-200`}
            type="button"
            onClick={toggleDropdown}
            ref={buttonRef}
          >
            {selectedMenuItem}
            <ArrowDown />
          </button>

          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute flex justify-center top-14 z-50 w-24 origin-top-right rounded-md bg-wheat shadow-lg ring-1 ring-black/5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <button className="py-1 font-normal text-darkest-blue">
                {["HN", "Name"].map((item) => (
                  <div
                    key={item}
                    className={commonCheckBoxStyles}
                    onClick={() => handleMenuItemClick(item)}
                    role="menuitem"
                    tabIndex="-1"
                  >
                    {item}
                  </div>
                ))}
              </button>
            </div>
          )}

          <div className="relative w-full">
            <input
              id="patientData"
              type={inputType}
              placeholder={inputPlaceholder}
              value={inputValue}
              onChange={handleChange}
              required
              className={`${commonFocusStyles} overflow-hidden w-full outline-none bg-transparent py-2 px-3 placeholder:font-light 2xl:placeholder:text-lg placeholder:text-base border-s-0 border-[1px] rounded-e-full rounded-s-light-gray rounded-s-0 text-vivid-blue border-light-gray leading-tight focus:border-s-[1px]`}
            />
            {filteredSuggestions.length > 0 && (
              <ul className="absolute w-full left-0 top-10 p-1 z-50 rounded-md bg-wheat shadow-lg ring-1 ring-black/5 focus:outline-none">
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className={`${commonCheckBoxStyles} font-normal text-darkest-blue`}
                    onClick={() => handleSelect(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
            <button
              type="submit"
              className="absolute inset-y-0 right-0 text-sm flex items-center justify-center bg-light-blue hover:bg-vivid-blue text-vivid-blue hover:text-wheat duration-200 rounded-full w-auto p-2 m-[2px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192.904 192.904"
                width="18px"
                fill="currentColor"
              >
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
