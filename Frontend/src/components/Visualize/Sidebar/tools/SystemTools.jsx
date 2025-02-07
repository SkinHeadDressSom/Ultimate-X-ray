import React, { useState } from "react";
import ButtonWithIcon from "../ButtonWithIcon";
import { SaveIcon, PrintIcon } from "../toolsdata"

const SystemTools = () => {
  const [activeId, setActiveId] = useState(null);

  const buttons = [
    { id: "save", icon: SaveIcon },
    { id: "print", icon: PrintIcon },
  ];

  const handleButtonClick = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
    // เพิ่ม logic การทำงานของแต่ละปุ่มตาม id
    switch (id) {
      case "save":
        console.log("Save button clicked");
        break;
      case "print":
        console.log("Print button clicked");
        break;
      default:
        break;
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
    </div>
  );
};

export default SystemTools;
