import React from "react";

const StatusComplete = ({ onComponentClick }) => {
  return (
    <div
      onClick={onComponentClick}
      className="flex bg-success-color rounded-full px-3 py-[2px] place-self-center text-darkest-blue"
    >
      Complete
    </div>
  );
};

export default StatusComplete;
