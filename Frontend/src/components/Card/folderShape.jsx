import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "../Table/table";
import PatientInformation from "./patientInformation";
const API_URL = process.env.REACT_APP_BACKEND_URL;

const FolderShape = ({ patient }) => {
  const [patientCases, setPatientCases] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPatientCases = async (hn) => {
    try {
      const response = await axios.get(
        `${API_URL}/fetch-data/api/patients/${hn}/cases`,
        { withCredentials: true }
      );

      if (response.data.data.length === 0) {
        setPatientCases([]); // Clear old data if no cases found
      } else {
        setPatientCases(response.data.data);
      }
    } catch (error) {
      console.log(error);
      setPatientCases([]); // Reset on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patient?.hn) {
      getPatientCases(patient.hn);
    }
  }, [patient]);

  return (
    <div className="flex flex-col">
      <div className="inline-flex">
        <div className="bg-wheat w-38 h-12 lg:w-40 lg:h-12 2xl:h-14 rounded-tl-lg shadow-xl inline-flex items-center justify-start px-5 gap-2 text-vivid-blue">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="2xl:w-7 h-auto w-6"
          >
            <path d="M8 4H21V6H8V4ZM4.5 6.5C3.67157 6.5 3 5.82843 3 5C3 4.17157 3.67157 3.5 4.5 3.5C5.32843 3.5 6 4.17157 6 5C6 5.82843 5.32843 6.5 4.5 6.5ZM4.5 13.5C3.67157 13.5 3 12.8284 3 12C3 11.1716 3.67157 10.5 4.5 10.5C5.32843 10.5 6 11.1716 6 12C6 12.8284 5.32843 13.5 4.5 13.5ZM4.5 20.4C3.67157 20.4 3 19.7284 3 18.9C3 18.0716 3.67157 17.4 4.5 17.4C5.32843 17.4 6 18.0716 6 18.9C6 19.7284 5.32843 20.4 4.5 20.4ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"></path>
          </svg>
          <p className="2xl:text-xl text-lg">Worklist</p>
        </div>
        <div className="border-l-lg border-l-transparent border-b-[48px] 2xl:border-b-[56px] border-b-wheat border-r-[40px] border-r-transparent rounded-tr-lg"></div>
      </div>
      <div className="flex flex-wrap bg-wheat w-full h-auto pb-32 mb-10 rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-lg border-t-[1px] border-light-gray">
        <div className="flex flex-col xl:flex-row w-full py-5 px-5 gap-10 ">
          <aside className="w-5/12 xl:w-3/12 2xl:w-4/12 min-w-[300px] max-w-[400px]">
            <PatientInformation patient={patient} />
          </aside>
          <main className="w-full">
            <Table patientCases={patientCases} patient={patient} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default FolderShape;
