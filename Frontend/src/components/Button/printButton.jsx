import React from "react";

const PrintButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="print-btn flex items-center justify-center border-2 border-vivid-blue rounded-full 2xl:px-6 px-4 py-1 bg-wheat text-vivid-blue font-medium hover:bg-vivid-blue hover:border-vivid-blue hover:text-wheat hover:cursor-pointer duration-200 w-28"
    >
      <label className="inline-flex w-full space-x-2 items-cente justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M17 2C17.5523 2 18 2.44772 18 3V7H21C21.5523 7 22 7.44772 22 8V18C22 18.5523 21.5523 19 21 19H18V21C18 21.5523 17.5523 22 17 22H7C6.44772 22 6 21.5523 6 21V19H3C2.44772 19 2 18.5523 2 18V8C2 7.44772 2.44772 7 3 7H6V3C6 2.44772 6.44772 2 7 2H17ZM16 17H8V20H16V17ZM20 9H4V17H6V16C6 15.4477 6.44772 15 7 15H17C17.5523 15 18 15.4477 18 16V17H20V9ZM8 10V12H5V10H8ZM16 4H8V7H16V4Z"></path>
        </svg>
        <span className="2xl:text-lg text-base font-medium">Print</span>
      </label>
    </button>
  );
};

export default PrintButton;
