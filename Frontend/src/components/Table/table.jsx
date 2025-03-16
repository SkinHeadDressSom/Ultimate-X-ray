import { Skeleton } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAnnotationImages from "../../hooks/useAnnotationImages";
import useCaseImages from "../../hooks/useCaseImages";
import usePagination from "../../hooks/usePagination";
import { toggleCaseSelection } from "../../redux/selectedCase";
import ViewerButton from "../Button/viewerButton";
import Dropdown from "./dropdown";
import Filter from "./Filter";
import Pagination from "./pagination";
import StatusComplete from "./statusComplete";
import StatusSchedule from "./statusSchedule";

const Table = ({ patientCases, loading, patient }) => {
  const dispatch = useDispatch();
  const selectedCases = useSelector(
    (state) => state.selectedCases.selectedCases
  );

  const { patient_cases } = patientCases || {};
  const [checkedState, setCheckedState] = useState([]);
  const navigate = useNavigate();
  // Common table cell styles
  const commonStyles = {
    tableCell: "px-4 py-3",
    tableHead: "px-4 py-1",
    button:
      "rounded-full border border-light-gray py-2 px-3 text-sm hover:bg-vivid-blue hover:text-white disabled:opacity-50",
  };
  const { currentPage, totalPages, handlePageChange } = usePagination(
    patient_cases?.length || 0,
    10
  );
  const casesWithImages = useCaseImages(patient_cases);

  // 1. Gather all unique xn values from casesWithImages
  const xnValues = casesWithImages.reduce((acc, caseItem) => {
    caseItem.case_images.forEach((img) => {
      if (!acc.includes(img.xn)) {
        acc.push(img.xn);
      }
    });
    return acc;
  }, []);

  // 2. Get the annotation images mapping using the batch hook
  const annotationMap = useAnnotationImages(xnValues);

  // 3. Create a new array with annotated cases (append annotation_image for each image)
  const annotatedCases = casesWithImages.map((caseItem) => ({
    ...caseItem,
    case_images: caseItem.case_images.map((image) => ({
      ...image,
      annotation_image: annotationMap[image.xn] || null,
    })),
  }));

  // console.log("====================== annotatedCases", annotatedCases);
  const indexOfLastCase = currentPage * 10;
  const indexOfFirstCase = indexOfLastCase - 10;
  const currentCases = Array.isArray(patient_cases)
    ? patient_cases.slice(indexOfFirstCase, indexOfLastCase)
    : [];
  // Status Component Selector
  const renderStatus = (status) => {
    if (status === "Completed") {
      return <StatusComplete />;
    } else if (status === "Scheduled") {
      return <StatusSchedule />;
    }
    return null;
  };
  // Skeleton Loader Row Component
  const SkeletonRow = () => (
    <tr className="even:bg-extra-light-blue odd:bg-wheat">
      {Array(8)
        .fill(null)
        .map((_, idx) => (
          <td key={idx} className={commonStyles.tableCell}>
            <Skeleton
              variant={idx === 0 ? "rectangular" : "text"}
              width={idx === 0 ? 20 : idx === 8 ? 30 : 60}
            />
          </td>
        ))}
    </tr>
  );
  const handleCheckboxChange = (e, caseId) => {
    e.stopPropagation();
    dispatch(toggleCaseSelection(caseId));
  };

  const handleRowClick = async (caseItem) => {
    const selectedCase = annotatedCases.find((c) => c.an === caseItem.an);
    if (selectedCase) {
      dispatch(toggleCaseSelection(selectedCase));
      navigate("/visualize", {
        state: {
          caseData: selectedCase,
          allCases: annotatedCases,
          patient,
        },
      });
    } else {
      console.error("Selected case not found");
    }
  };

  const handleMultipleClick = async () => {
    if (selectedCases.length === 0) {
      alert("กรุณาเลือกเคสก่อน");
      return;
    }

    const selectedCasesWithImages = annotatedCases.filter((caseItem) =>
      selectedCases.includes(caseItem.an)
    );
    navigate("/visualize", {
      state: {
        selectedCases: selectedCasesWithImages,
        allCases: annotatedCases,
        patient,
      },
    });
  };
  return (
    <>
      <div className="flex justify-between items-end w-full pb-1">
        <div className="2xl:text-2xl text-xl text-vivid-blue">Studies</div>
        <ViewerButton onClick={handleMultipleClick} />
      </div>
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
              <th className={commonStyles.tableHead}>No.</th>
              <th className={commonStyles.tableHead}>
                <Filter />
              </th>
              <th className={commonStyles.tableHead}>Description</th>
              <th className={commonStyles.tableHead}>
                <Dropdown />
              </th>
              <th className={commonStyles.tableHead}>Time</th>
              <th className={commonStyles.tableHead}>Accession No.</th>
              <th className={commonStyles.tableHead}>Images</th>
            </tr>
          </thead>
          <tbody className="text-darkest-blue 2xl:text-lg text-sm">
            {loading ? (
              Array(2)
                .fill(0)
                .map((_, index) => <SkeletonRow key={index} />)
            ) : Array.isArray(patient_cases) && patient_cases.length > 0 ? (
              patient_cases.map((caseItem, index) => (
                <tr
                  key={caseItem.an}
                  className="even:bg-extra-light-blue odd:bg-wheat hover:bg-lightest-blue hover:cursor-pointer"
                  onClick={() => handleRowClick(caseItem)} // Navigate when clicking row
                >
                  <td
                    className={`${commonStyles.tableCell} flex justify-center`}
                  >
                    <div
                      className="flex items-center justify-center"
                      onClick={(e) => e.stopPropagation()} // Prevent row click when clicking checkbox
                    >
                      <label className="flex items-center cursor-pointer relative">
                        <input
                          type="checkbox"
                          className="peer h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-vivid-blue checked:border-2"
                          id={`check-${index}`}
                          checked={selectedCases.includes(caseItem.an)}
                          onChange={(e) => handleCheckboxChange(e, caseItem.an)}
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
                  <td className={commonStyles.tableCell}>{index + 1}</td>
                  <td className={`${commonStyles.tableCell} flex`}>
                    {renderStatus(caseItem.status)}
                  </td>
                  <td className={commonStyles.tableCell}>
                    {caseItem.description}
                  </td>
                  <td className={commonStyles.tableCell}>
                    {caseItem.study_date}
                  </td>
                  <td className={commonStyles.tableCell}>{caseItem.time}</td>
                  <td className={commonStyles.tableCell}>{caseItem.an}</td>
                  <td className={commonStyles.tableCell}>
                    {caseItem.image_count}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-2">
        <div className="text-vivid-blue">
          Total {patient_cases?.length || 0} studies
        </div>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            commonStyles={commonStyles}
          />
        )}
      </div>
    </>
  );
};

export default Table;
