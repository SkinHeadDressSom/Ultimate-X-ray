import React from "react";

const CancelButton = ({ onButtonClosed }) => {
  return (
    <>
      <button
        onClick={onButtonClosed}
        className="flex border-2 border-vivid-blue rounded-full 2xl:px-6 px-4 py-0.5 text-vivid-blue font-medium hover:bg-error-color cursor-pointer hover:text-wheat hover:border-error-color"
      >
        Cancel
      </button>
    </>
  );
};

export default CancelButton;
