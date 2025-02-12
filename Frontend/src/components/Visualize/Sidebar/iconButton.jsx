import React from "react";

const IconButton = ({ icon, onClick }) => {
  return (
    <button
      className="text-vivid-blue hover:bg-vivid-blue hover:text-wheat rounded-lg p-[1px] delay-100 focus:text-wheat focus:bg-vivid-blue"
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default IconButton;
