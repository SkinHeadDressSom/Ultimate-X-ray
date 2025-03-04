import React, { useState } from "react";
import ButtonWithIcon from "../ButtonWithIcon";
import { SaveIcon, PrintIcon } from "../toolsdata";
import ReportPopup from "../Popup/reportPopup";
const SystemTools = () => {
  const [activeId, setActiveId] = useState(null);
  const [showReportPopup, setShowReportPopup] = useState(false);

  const buttons = [
    { id: "save", icon: SaveIcon },
    { id: "print", icon: PrintIcon },
  ];

  const handleButtonClick = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
    if (id === "print") {
      setShowReportPopup((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-light-blue rounded-lg gap-y-2 p-2 w-full">
      <h1 className="text-dark-blue text-sm">System</h1>
      <div className="grid grid-cols-2 gap-2 items-center justify-between">
        {buttons.map((button) => (
          <ButtonWithIcon
            key={button.id}
            icon={button.icon}
            isActive={activeId === button.id}
            onClick={() => handleButtonClick(button.id)}
          />
        ))}
      </div>
      {showReportPopup && (
        <ReportPopup
          onClose={() => {
            setShowReportPopup(false);
            setActiveId(null);
          }}
        />
      )}
    </div>
  );
};

export default SystemTools;
