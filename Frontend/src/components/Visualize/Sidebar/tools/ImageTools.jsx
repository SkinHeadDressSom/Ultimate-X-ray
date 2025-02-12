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

const ImageTools = ({ onContrastChange }) => {
  const [activeId, setActiveId] = useState(null);
  const [showContrastPopup, setShowContrastPopup] = useState(false);

  const buttons = [
    { id: "undo", icon: Undo },
    { id: "redo", icon: Redo },
    { id: "pointer", icon: Pointer },
    { id: "drag", icon: Drag },
    { id: "zoomin", icon: Zoomin },
    { id: "zoomout", icon: Zoomout },
    { id: "contrast", icon: Contrast },
    { id: "highlight", icon: Highlight },
  ];

  const handleButtonClick = (id) => {
    if (id === "contrast") {
      setShowContrastPopup((prev) => !prev); // สลับเปิด/ปิด popup
    } else {
      setActiveId((prevId) => (prevId === id ? null : id)); // เปลี่ยน active tool
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
            isActive={
              activeId === button.id ||
              (button.id === "contrast" && showContrastPopup)
            }
            onClick={() => handleButtonClick(button.id)}
          />
        ))}
      </div>
      {showContrastPopup && (
        <ContrastPopup
          onClose={() => setShowContrastPopup(false)}
          onContrastChange={onContrastChange}
        />
      )}
    </div>
  );
};

export default ImageTools;
