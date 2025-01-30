import React from "react";

const StatusSchedule = ({ onComponentClick }) => {
  return (
    <div
      onClick={onComponentClick}
      className="flex bg-warn-color text-darkest-blue rounded-full px-3 py-[2px] place-self-center"
    >
      Schedule
    </div>
  );
};

export default StatusSchedule;
