import React, { useRef, useEffect } from "react";
import Information from "../Report/information";
import Result from "../Report/result";
import PrintButton from "../../../Button/printButton";

const ReportPopup = ({ onClose }) => {
  return (
    <div className="absolute w-full flex justify-center h-5/6 max-h-fit z-50 top-14 left-0">
      <div className="w-2/4 rounded-lg">
        <div className="bg-light-blue flex justify-between rounded-t-lg py-2 px-4">
          <h1 className="text-vivid-blue inline-flex gap-1 items-center">
            <ReportIcon />
            <span className="text-darkest-blue font-medium text-xl">
              Report
            </span>
          </h1>
          <CloseButton onClick={onClose} />
        </div>
        <div className="bg-wheat rounded-b-lg py-4 px-6 flex flex-col gap-y-4 max-h-fit h-full overflow-y-scroll">
          <Information />
          <Result />
          <PrintButton />
        </div>
      </div>
    </div>
  );
};

const ReportIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8"
  >
    <path d="M21 8V20.9932C21 21.5501 20.5552 22 20.0066 22H3.9934C3.44495 22 3 21.556 3 21.0082V2.9918C3 2.45531 3.4487 2 4.00221 2H14.9968L21 8ZM19 9H14V4H5V20H19V9ZM8 7H11V9H8V7ZM8 11H16V13H8V11ZM8 15H16V17H8V15Z"></path>
  </svg>
);

const CloseButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="text-darkest-blue hover:cursor-pointer hover:scale-105"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
    </svg>
  </button>
);

export default ReportPopup;
