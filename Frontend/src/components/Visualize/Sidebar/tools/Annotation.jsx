import React, { useState, useEffect } from "react";
import ButtonWithIcon from "../ButtonWithIcon";
import { AddText, Arrow, Circle, Hide, Ruler, Square } from "../toolsdata";
import Colorpopup from "../Popup/colorpop";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedShape,
  setIsTextMode,
  setSelectedColor,
  setIsAnnotationHidden,
  setOnPointerClick,
} from "../../../../redux/visualize";

const Annotaion = () => {
  const dispatch = useDispatch();
  const { selectedColor, isAnnotationHidden, onPointerClick } = useSelector(
    (state) => state.visualize
  );

  const [activeId, setActiveId] = useState(null);
  const [showColorPopup, setShowColorPopup] = useState(false);

  const buttons = [
    { id: "arrow", icon: Arrow },
    { id: "circle", icon: Circle },
    { id: "square", icon: Square },
    { id: "text", icon: AddText },
    { id: "measurement", icon: Ruler },
    { id: "hide", icon: Hide },
  ];

  const handleButtonClick = (id) => {
    if (id === "pointer") {
      setActiveId(null);
      dispatch(setSelectedShape(null));
      dispatch(setIsTextMode(false));
      setShowColorPopup(false);
      dispatch(setIsAnnotationHidden(false));
      dispatch(setOnPointerClick(false));
    } else if (id === "hide") {
      dispatch(setOnPointerClick(false));
      dispatch(setIsAnnotationHidden(!isAnnotationHidden));
      setActiveId((prev) => (!prev || !isAnnotationHidden ? "hide" : null));
    } else {
      setActiveId(id);
      dispatch(setOnPointerClick(false));
      dispatch(setSelectedShape(id));
      if (id === "text") {
        dispatch(setIsTextMode(true));
        setShowColorPopup((prev) => !prev);
      } else if (id === "arrow" || id === "circle" || id === "square") {
        setShowColorPopup((prev) => !prev);
      }
    }
  };

  useEffect(() => {
    if (onPointerClick === true) {
      setActiveId(null);
    }
  }, [onPointerClick]);

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
      {showColorPopup && (
        <Colorpopup
          onClose={() => setShowColorPopup(false)}
          selectedColor={selectedColor}
          setSelectedColor={(color) => dispatch(setSelectedColor(color))}
        />
      )}
    </div>
  );
};

export default Annotaion;
