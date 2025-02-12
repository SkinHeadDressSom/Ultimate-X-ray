import React, { useState } from "react";
import ButtonWithIcon from "../ButtonWithIcon";
import { AddText, Arrow, Circle, Hide, Ruler, Square } from "../toolsdata";

const Annotaion = ({ setSelectedShape, isTextMode, setIsTextMode }) => {
  const [activeId, setActiveId] = useState(null);

  const buttons = [
    { id: "arrow", icon: Arrow },
    { id: "circle", icon: Circle },
    { id: "square", icon: Square },
    { id: "text", icon: AddText },
    { id: "ruler", icon: Ruler },
    { id: "hide", icon: Hide },
  ];

  const handleButtonClick = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
    setSelectedShape(id);
    if (id === "text") {
      setIsTextMode((prevMode) => !prevMode);
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
