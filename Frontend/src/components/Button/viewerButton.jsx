import React from "react";

const ViewerButton = () => {
  return (
    <>
      <button className="flex border-2 border-vivid-blue rounded-full 2xl:px-6 px-4 py-1 bg-vivid-blue text-wheat font-medium hover:bg-dark-blue hover:border-dark-blue hover:cursor-pointer duration-200">
        <label className="inline-flex w-full space-x-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="rgba(255,255,255,1)"
            className="w-6 h-6"
          >
            <path d="M8 3V5H4V9H2V3H8ZM2 21V15H4V19H8V21H2ZM22 21H16V19H20V15H22V21ZM22 9H20V5H16V3H22V9Z"></path>
          </svg>
          <span className="2xl:text-lg text-base font-medium">Viewer</span>
        </label>
      </button>
    </>
  );
};

export default ViewerButton;
