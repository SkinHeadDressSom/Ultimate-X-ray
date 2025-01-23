import React from "react";
import { useState } from "react";

const NameSearch = () => {
  const [patientName, setPatientName] = useState("");

  const handleNameSearch = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setPatientName(e.target.value);
  };

  return (
    <div className="w-56">
      <form onSubmit={handleNameSearch}>
        <div className="mb-4">
          <label
            htmlFor="patientName"
            className="block text-vivid-blue 2xl:text-lg text-base mb-1 pl-2"
          >
            Patient name
          </label>
          <div className="mb-4 w-full">
            <div className="relative">
              <input
                id="patientName"
                type="text"
                placeholder="Enter patient name"
                value={patientName}
                onChange={handleChange}
                className="overflow-hidden w-full outline-none bg-transparent py-2 px-3 placeholder:font-light 2xl:placeholder:text-lg placeholder:text-base border-[1px] rounded-full text-vivid-blue border-light-gray leading-tight items-center focus:border-vivid-blue focus:ring-1 focus:ring-vivid-blue"
              />
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
        </div>
      </form>
    </div>
  );
};

export default NameSearch;
