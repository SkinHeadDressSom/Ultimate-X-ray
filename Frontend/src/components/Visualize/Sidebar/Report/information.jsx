import React from "react";
import { useSelector } from "react-redux";
const DetailRow = ({ label, value }) => (
  <div className="flex w-full">
    <p className="font-medium w-28">{label}</p>
    <p className="mx-3">:</p>
    <p>{value || "N/A"}</p>
  </div>
);
const Information = () => {
  const patient = useSelector((state) => state.patient?.data);
  const selectedCases = useSelector(
    (state) => state.selectedCases.selectedCases[0]
  );
  const Date_Time = new Date();
  const hours = Date_Time.getHours();
  const minutes = Date_Time.getMinutes().toString().padStart(2, "0");
  const seconds = Date_Time.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for AM/PM format
  const showTime = `${formattedHours}:${minutes}:${seconds} ${ampm}`;

  const month = Date_Time.getMonth() + 1;
  const year = Date_Time.getFullYear();
  const date = Date_Time.getDate();
  const currentDate = month + "/" + date + "/" + year;
  return (
    <div className="grid grid-cols-2 gap-6 text-darkest-blue">
      <div>
        <DetailRow
          label="Name"
          value={`${patient?.first_name || ""} ${patient?.last_name || ""}`}
        />
        <DetailRow label="HN" value={patient?.hn} />
        <DetailRow
          label="Age/DOB"
          value={`${patient?.age || "N/A"} Years / ${
            patient?.date_of_birth || "N/A"
          }`}
        />

        <DetailRow label="Sex" value={patient?.sex} />
        <DetailRow
          label="Weight/Height"
          value={` ${patient?.weight || "N/A"} kg / ${
            patient?.height || "N/A"
          } cm`}
        />
      </div>
      <div>
        <DetailRow label="Phone No." value={patient?.phone} />
        <DetailRow label="Accession No." value={selectedCases?.an} />
        <DetailRow label="Report By" value="..." />
        <DetailRow
          label="Collection Date"
          value={`${selectedCases?.study_date} ${selectedCases?.time}`}
        />
        <DetailRow label="Report Date" value={`${currentDate} ${showTime}`} />
      </div>
    </div>
  );
};

export default Information;
