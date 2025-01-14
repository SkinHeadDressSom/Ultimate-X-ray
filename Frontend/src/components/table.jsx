import React, { useState, useEffect } from "react";
import StatusExamine from "./statusExamine";
import StatusSchedule from "./statusSchedule";
import Dropdown from "./dropdown";
import Filter from "./Filter";
import patientData from "../assets/mockup";
import { Skeleton } from "@mui/material";

const Table = () => {
  // Simulate loading state (replace with actual fetch)
  const [loading, setLoading] = useState(true);
  const [checkedState, setCheckedState] = useState({});
  // Common table cell styles
  const commonTableStyles = "px-4 py-3";
  const commonHeadTableStyles = "px-4 py-1";

  // Simulate loading of data (replace with actual fetch logic)
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); // Simulate a 2-second data fetch delay
  }, []);

  // Handle checkbox change
  const handleCheckboxChange = (caseId) => {
    setCheckedState((prevCheckedState) => ({
      ...prevCheckedState,
      [caseId]: !prevCheckedState[caseId],
    }));
  };

  // Skeleton Loader Row Component
  const SkeletonRow = () => (
    <tr className="even:bg-extra-light-blue odd:bg-wheat">
      {Array(9)
        .fill(null)
        .map((_, idx) => (
          <td key={idx} className={commonTableStyles}>
            <Skeleton
              variant={idx === 0 ? "rectangular" : "text"}
              width={idx === 0 ? 20 : idx === 8 ? 30 : 60}
            />
          </td>
        ))}
    </tr>
  );

  // Status Component Selector
  const renderStatus = (status) => {
    if (status === "Examine") {
      return <StatusExamine />;
    } else if (status === "Scheduled") {
      return <StatusSchedule />;
    }
    return null;
  };

  return (
    <div className="relative overflow-auto shadow-md w-full rounded-md border-[1px] border-light-gray">
      <table className="w-full text-left text-sm table-auto">
        <thead>
          <tr className="bg-light-blue 2xl:text-lg text-sm text-darkest-blue">
            <th className="px-6 py-3 text-vivid-blue flex items-center justify-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 2xl:w-6 h-full"
              >
                <path d="M6.99979 7V3C6.99979 2.44772 7.4475 2 7.99979 2H20.9998C21.5521 2 21.9998 2.44772 21.9998 3V16C21.9998 16.5523 21.5521 17 20.9998 17H17V20.9925C17 21.5489 16.551 22 15.9925 22H3.00728C2.45086 22 2 21.5511 2 20.9925L2.00276 8.00748C2.00288 7.45107 2.4518 7 3.01025 7H6.99979ZM8.99979 7H15.9927C16.549 7 17 7.44892 17 8.00748V15H19.9998V4H8.99979V7ZM15 9H4.00255L4.00021 20H15V9ZM8.50242 18L4.96689 14.4645L6.3811 13.0503L8.50242 15.1716L12.7451 10.9289L14.1593 12.3431L8.50242 18Z"></path>
              </svg>
            </th>
            <th className={commonHeadTableStyles}>No.</th>
            <th className={commonHeadTableStyles}>
              <Filter />
            </th>
            <th className={commonHeadTableStyles}>Description</th>
            <th className={commonHeadTableStyles}>
              <Dropdown />
            </th>
            <th className={commonHeadTableStyles}>Time</th>
            <th className={commonHeadTableStyles}>Accession No.</th>
            <th className={commonHeadTableStyles}>Case ID</th>
            <th className={commonHeadTableStyles}>Images</th>
          </tr>
        </thead>
        <tbody className="text-darkest-blue 2xl:text-lg text-sm">
          {loading
            ? Array(2)
                .fill(0)
                .map((_, index) => <SkeletonRow key={index} />)
            : patientData.case.map((caseItem, index) => (
                <tr
                  key={caseItem.caseId}
                  className="even:bg-extra-light-blue odd:bg-wheat hover:bg-lightest-blue hover:cursor-pointer"
                >
                  <td className={`${commonTableStyles} flex justify-center`}>
                    <div className="flex items-center justify-center">
                      <label className="flex items-center cursor-pointer relative">
                        <input
                          type="checkbox"
                          className="peer h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-vivid-blue checked:border-2"
                          id={`check-${index}`}
                          checked={checkedState[caseItem.caseId] || false}
                          onChange={() => handleCheckboxChange(caseItem.caseId)}
                        />
                        <span className="absolute text-vivid-blue opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
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
                  </td>
                  <td className={commonTableStyles}>{index + 1}</td>
                  <td className={`${commonTableStyles} flex`}>
                    {renderStatus(caseItem.status)}
                  </td>
                  <td className={commonTableStyles}>{caseItem.description}</td>
                  <td className={commonTableStyles}>{caseItem.date}</td>
                  <td className={commonTableStyles}>{caseItem.time}</td>
                  <td className={commonTableStyles}>{caseItem.accession}</td>
                  <td className={commonTableStyles}>{caseItem.caseId}</td>
                  <td className={commonTableStyles}>{caseItem.images}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
