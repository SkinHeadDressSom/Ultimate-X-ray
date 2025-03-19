import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as ArrowDown } from "../../assets/arrowDown.svg";
const API_URL = import.meta.env.BACKEND_URL;

const Search = ({ onPatientDataFetched }) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("HN");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Reusable styles
  const commonCheckBoxStyles =
    "inline-flex w-full items-center px-2 py-2 gap-2 rounded-md hover:bg-light-blue cursor-pointer text-sm";
  const commonFocusStyles =
    "focus:ring-1 focus:ring-vivid-blue focus:border-vivid-blue";

  // Menu placeholder text mapping
  const menuItems = {
    HN: "Enter patient ID",
    Name: "Enter patient name",
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.trim() === "" || selectedMenuItem !== "Name") {
      setFilteredSuggestions([]);
    } else {
      getPatientSuggestions(value);
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
        `${API_URL}/fetch-data/api/patients/by-hn/${hn}`,
        { withCredentials: true }
      );
      console.log("API Response from HN search:", response.data);
      onPatientDataFetched(response.data.data);
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
    }
  };

  const getPatientByName = async (name) => {
    try {
      const response = await axios.get(
        `${API_URL}/fetch-data/api/patients/by-name/${name}`,
        { withCredentials: true }
      );

      console.log("API Response from name search:", response.data);
      const patients = response.data.data;

      if (patients.length === 1) {
        onPatientDataFetched(patients[0]);
      } else {
        // If multiple results, let user select one from suggestions
        setFilteredSuggestions(
          patients.map((p) => `${p.first_name} ${p.last_name}`)
        );
      }
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
    }
  };

  const getPatientSuggestions = async (name) => {
    try {
      const response = await axios.get(
        `${API_URL}/fetch-data/api/patients/by-name/${name}`,
        { withCredentials: true }
      );

      const patients = response.data.data;
      setFilteredSuggestions(
        patients.map((patient) => `${patient.first_name} ${patient.last_name}`)
      );
    } catch (err) {
      console.error("Error fetching patient suggestions:", err);
      setFilteredSuggestions([]);
    }
  };
  //handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    selectedMenuItem === "HN"
      ? getPatient(inputValue)
      : getPatientByName(inputValue);
  };
  // handle choice ที่เลือก
  const handleMenuItemClick = (value) => {
    setSelectedMenuItem(value);
    setIsOpen(false);
    setInputValue("");
    setFilteredSuggestions([]);
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
          {/* Dropdown */}
          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute flex justify-center top-14 z-50 w-24 origin-top-right rounded-md bg-wheat shadow-lg ring-1 ring-black/5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <button className="py-1 font-normal text-darkest-blue">
                {Object.keys(menuItems).map((item) => (
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
          {/* Search Input */}
          <div className="relative w-full">
            <input
              id="patientData"
              type={selectedMenuItem === "HN" ? "number" : "text"}
              placeholder={menuItems[selectedMenuItem]}
              value={inputValue}
              onChange={handleChange}
              required
              className={`${commonFocusStyles} overflow-hidden w-full outline-none bg-transparent py-2 px-3 placeholder:font-light 2xl:placeholder:text-lg placeholder:text-base border-s-0 border-[1px] rounded-e-full rounded-s-light-gray text-vivid-blue border-light-gray leading-tight`}
            />
            {/* Suggestions */}
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
            {/* Search Button */}
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
