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

const ImageTools = ({
  onContrastChange,
  zoomIn,
  zoomOut,
  drag,
  isDragMode,
  setIsDragMode,
}) => {
  const [activeId, setActiveId] = useState("pointer"); // ค่าเริ่มต้นเป็น pointer
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
    if (id === "pointer") {
      // ถ้ากด pointer ให้ปิดโหมดอื่นทั้งหมด
      setActiveId("pointer");
      setIsDragMode(false);
      setShowContrastPopup(false);
    } else {
      if (id === "contrast") {
        setShowContrastPopup((prev) => !prev);
      }
      if (id === "drag") {
        setIsDragMode((prev) => !prev);
      }
      setActiveId(id); // กดปุ่มอื่นให้เปลี่ยน activeId เสมอ
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
            onClick={() => {
              handleButtonClick(button.id);
              if (button.id === "zoomin") zoomIn();
              if (button.id === "zoomout") zoomOut();
              if (button.id === "drag") drag();
            }}
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
