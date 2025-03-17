import React from "react";

const SaveButton = () => {
  return (
    <button className="print-btn flex items-center justify-center border-2 border-vivid-blue rounded-full 2xl:px-6 px-4 py-1 bg-vivid-blue text-wheat font-medium hover:bg-dark-blue hover:border-dark-blue hover:cursor-pointer duration-200 w-28">
      <label className="inline-flex w-full space-x-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M18 19H19V6.82843L17.1716 5H16V9H7V5H5V19H6V12H18V19ZM4 3H18L20.7071 5.70711C20.8946 5.89464 21 6.149 21 6.41421V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM8 14V19H16V14H8Z"></path>
        </svg>
        <span className="2xl:text-lg text-base font-medium">Save</span>
      </label>
    </button>
  );
};

export default SaveButton;
