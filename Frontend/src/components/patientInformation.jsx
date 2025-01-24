import React, { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import patientData from "../assets/mockup";

const PatientInformation = ({ patient }) => {
  // handle loading status
  const [loading, setLoading] = useState(true);
  const [patientDetails, setPatientDetails] = useState(null);

  // Simulate fetching data with a timeout
  useEffect(() => {
    if (patient) {
      setPatientDetails(patient);
      setTimeout(() => {
        setLoading(false); // Data has loaded
      }, 2000); // Adjust time as per your data fetch simulation
    }
  }, [patient]);

  // key-value pairs for patient details
  const defaultPatientDetails = [
    { label: "Patient ID", value: patientDetails?.hn },
    { label: "Name", value: patientDetails?.first_name + ' ' + patientDetails?.last_name },
    { label: "Age", value: patientDetails?.age },
    { label: "DOB", value: patientDetails?.date_of_birth },
    { label: "Sex", value: patientDetails?.sex },
    { label: "Weight", value: patientDetails?.weight },
    { label: "Height", value: patientDetails?.height },
    { label: "Phone", value: patientDetails?.phone },
  ];

  return (
    <div className="w-full h-auto shadow-lg">
      <div className="inline-flex w-full bg-light-blue rounded-t-md border-t-[1px] border-r-[1px] border-l-[1px] border-light-gray px-5 py-2 gap-2 text-vivid-blue">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="2xl:w-7 w-6 h-auto"
        >
          <path d="M3 6H21V18H3V6ZM2 4C1.44772 4 1 4.44772 1 5V19C1 19.5523 1.44772 20 2 20H22C22.5523 20 23 19.5523 23 19V5C23 4.44772 22.5523 4 22 4H2ZM13 8H19V10H13V8ZM18 12H13V14H18V12ZM10.5 10C10.5 11.3807 9.38071 12.5 8 12.5C6.61929 12.5 5.5 11.3807 5.5 10C5.5 8.61929 6.61929 7.5 8 7.5C9.38071 7.5 10.5 8.61929 10.5 10ZM8 13.5C6.067 13.5 4.5 15.067 4.5 17H11.5C11.5 15.067 9.933 13.5 8 13.5Z"></path>
        </svg>
        <p className="2xl:text-xl text-base">Patient information</p>
      </div>
      <div className="border-b-[1px] border-r-[1px] border-l-[1px] border-light-gray rounded-b-md px-5 py-3 text-darkest-blue">
        <div className="flex gap-4">
          <table className="w-full text-left 2xl:text-xl text-base">
            <tbody>
              {loading
                ? // Skeleton Loader for each row
                  Array(8)
                    .fill(0)
                    .map((_, index) => (
                      <tr key={index}>
                        <th>
                          <Skeleton variant="text" width="100px" />
                        </th>
                        <th>
                          <Skeleton variant="text" width="20px" />
                        </th>
                        <td>
                          <Skeleton variant="text" width="150px" />
                        </td>
                      </tr>
                    ))
                : // Render actual patient data once it's loaded
                defaultPatientDetails.map(({ label, value }, index) => (
                    <tr key={index}>
                      <th>{label}</th>
                      <th className="px-3">:</th>
                      <td>{value}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientInformation;
