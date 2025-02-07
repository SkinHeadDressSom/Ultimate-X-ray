import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchPatient = () => {
  const [patientID, setPatientID] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // fetch Patient
  const getPatient = async (HN) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/fetch-data/api/patients/by-hn/${HN}`,
        { withCredentials: true }
      );
      console.log(response.data); 
      return response.data.data;
    } catch (error) {
      console.log(error);
      return null;  
    }
  };

  // ฟังก์ชั่นแจ้งเตือนการค้นหาข้อมูลผู้ป่วย
  const handleSearch = async (e) => {
    e.preventDefault();

    if (patientID.trim() === "") {
      setError("Patient ID cannot be empty");
    }
    
    const patient = await getPatient(patientID);

    if (patient) {
      navigate("/dashboard", { state: { patient } });
    } else {
      setError("Invalid patient ID");
    }
  };

  // ฟังก์ชั่นจำกัด input ID จำกัดแค่ตัวเลข
  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPatientID(value);
    }
  };

  return (
    <div className="bg-lightest-blue w-screen h-screen flex justify-center items-center">
      <div className="flex flex-wrap flex-col center w-2/4 md:w-3/6 lg:4/6 xl:max-w-2/6 xl:w-2/6 2xl:w-/6 h-auto px-10 py-20 justify-center items-center bg-wheat gap-y-5 rounded-xl shadow-md border-[1px] border-light-gray">
        <p className="text-darkest-blue font-medium text-xl md:text-2xl lg:text-2xl">
          Find Patient
        </p>
        <div className="mb-4 w-2/3">
          <div className="relative">
            <input
              id="patientID"
              type="number"
              placeholder="Enter patient ID"
              value={patientID}
              onChange={handleChange}
              className="overflow-hidden w-full outline-none bg-transparent py-2 px-3 placeholder:font-light 2xl:placeholder:text-lg placeholder:text-sm border-[1px] rounded-full text-vivid-blue border-light-gray leading-tight items-center focus:border-vivid-blue focus:ring-1 focus:ring-vivid-blue [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              type="submit"
              onClick={handleSearch}
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
          {error && <p className="text-red-500 text-sm mt-2 pl-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SearchPatient;
