import React, { useState } from "react";
import ButtonWithIcon from "../ButtonWithIcon";
import {
  Undo,
  Redo,
  Pointer,
  Drag,
  Zoomin,
  Zoomout,
  Contrast,
  Highlight,
} from "../toolsdata";
import ContrastPopup from "./contrastpop";

const ImageTools = () => {
  const [activeId, setActiveId] = useState("pointer");

  const buttons = [
    { id: "undo", icon: Undo },
    { id: "redo", icon: Redo },
    { id: "pointer", icon: Pointer },
    { id: "drag", icon: Drag },
    { id: "zoomin", icon: Zoomin },
    { id: "zoomout", icon: Zoomout },
    { id: "contrast", icon: Contrast },
    { id: "hightlight", icon: Highlight },
  ];

  const handleButtonClick = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
    // เพิ่ม logic การทำงานของแต่ละปุ่มตาม id
    switch (id) {
      case "undo":
        console.log("undo button clicked");
        break;
      case "redo":
        console.log("redo button clicked");
        break;
      case "pointer":
        console.log("pointer button clicked");
        break;
      case "drag":
        console.log("drag button clicked");
        break;
      case "zoomin":
        console.log("zoomin button clicked");
        break;
      case "zoomout":
        console.log("zoomout button clicked");
        break;
      case "contrast":
        console.log("contrast button clicked");
        break;
      case "highlight":
        console.log("hightlight button clicked");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-light-blue rounded-lg gap-y-2 p-2 w-full">
      <h1 className="text-dark-blue text-sm">Image tools</h1>
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

export default ImageTools;
