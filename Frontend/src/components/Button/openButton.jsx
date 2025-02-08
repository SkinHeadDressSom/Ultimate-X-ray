import React from "react";

const OpenButton = ({ onClick }) => {
  return (
    <>
      <button
        className="flex border-2 border-vivid-blue rounded-full 2xl:px-6 px-4 py-0.5 bg-vivid-blue text-wheat font-medium hover:bg-dark-blue hover:border-dark-blue hover:cursor-pointer duration-200"
        onClick={onClick}
      >
        Open
      </button>
    </>
  );
};

export default OpenButton;
