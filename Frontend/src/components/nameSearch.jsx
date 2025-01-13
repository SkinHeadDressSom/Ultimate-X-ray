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
    <div className="w-full max-w-lg">
      <form onSubmit={handleNameSearch}>
        <div className="mb-4">
          <label htmlFor="patientName" className="block text-vivid-blue 2xl:text-lg text-base mb-2">
            Patient name
          </label>
          <div className="flex overflow-hidden mx-auto appearance-none border-[1px] rounded-full w-full text-vivid-blue border-light-gray leading-tight items-center focus:border-vivid-blue focus:ring-1 focus:ring-vivid-blue">
            <input
              className="w-full outline-none bg-transparent py-2 px-3 placeholder:font-light 2xl:placeholder:text-lg placeholder:text-base"
              id="patientName"
              type="text"
              value={patientName}
              onChange={handleChange}
              placeholder="Enter patient name"
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-light-blue hover:bg-vivid-blue text-vivid-blue hover:text-wheat rounded-full w-8 2xl:w-10 h-8 p-2 m-[1px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192.904 192.904"
                width="20px"
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

export default NameSearch;
