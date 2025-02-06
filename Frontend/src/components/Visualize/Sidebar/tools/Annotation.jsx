import React, { useState } from "react";
import ButtonWithIcon from "../ButtonWithIcon";
import { AddText, Arrow, Circle, Hide, Ruler, Square } from "../toolsdata";

const Annotaion = () => {
  const [activeId, setActiveId] = useState(null);

  const buttons = [
    { id: "arrow", icon: Arrow },
    { id: "circle", icon: Circle },
    { id: "square", icon: Square },
    { id: "addtext", icon: AddText },
    { id: "ruler", icon: Ruler },
    { id: "hide", icon: Hide },
  ];

  const handleButtonClick = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
    // เพิ่ม logic การทำงานของแต่ละปุ่มตาม id
    switch (id) {
      case "arrow":
        console.log("arrow button clicked");
        break;
      case "circle":
        console.log("circle button clicked");
        break;
      case "square":
        console.log("square button clicked");
        break;
      case "addtext":
        console.log("addtext button clicked");
        break;
      case "ruler":
        console.log("ruler button clicked");
        break;
      case "hide":
        console.log("hide button clicked");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-light-blue rounded-lg gap-y-2 p-2 w-full">
      <h1 className="text-dark-blue text-sm">Annotation</h1>
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

export default Annotaion;
