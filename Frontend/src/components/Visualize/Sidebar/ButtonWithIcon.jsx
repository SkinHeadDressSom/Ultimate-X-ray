import React from "react";

const ButtonWithIcon = ({ icon: Icon, onClick, isActive, label }) => {
  return (
    <button
      className={`text-vivid-blue rounded-lg p-[1px] delay-100 ${
        isActive
          ? "bg-vivid-blue text-wheat"
          : "hover:bg-vivid-blue hover:text-wheat"
      }`}
      onClick={onClick}
    >
      <Icon className="w-7 h-auto" />
      {label && <span className="ml-2">{label}</span>}
    </button>
  );
};

export default ButtonWithIcon;
