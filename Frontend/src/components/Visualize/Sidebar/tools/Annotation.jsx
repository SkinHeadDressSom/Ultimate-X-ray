import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonWithIcon from "../ButtonWithIcon";
import { AddText, Arrow, Circle, Hide, Ruler, Square } from "../toolsdata";
import Colorpopup from "../Popup/colorpop";
import {
  setSelectedShape,
  setIsTextMode,
  setSelectedColor,
  setIsAnnotationHidden,
  setOnPointerClick,
  setIsDragMode,
} from "../../../../redux/visualize";

const buttons = [
  { id: "arrow", icon: Arrow },
  { id: "circle", icon: Circle },
  { id: "square", icon: Square },
  { id: "text", icon: AddText },
  { id: "measurement", icon: Ruler },
  { id: "hide", icon: Hide },
];

const Annotation = () => {
  const dispatch = useDispatch();
  const { selectedColor, isAnnotationHidden, onPointerClick, isDragMode } =
    useSelector((state) => state.visualize);

  const [activeId, setActiveId] = useState(null);
  const [showColorPopup, setShowColorPopup] = useState(false);

  const handleButtonClick = useCallback(
    (id) => {
      dispatch(setOnPointerClick(false));
      dispatch(setIsDragMode(false));
      if (id === "hide") {
        dispatch(setIsAnnotationHidden(!isAnnotationHidden));
        dispatch(setSelectedShape(null));
        setActiveId(isAnnotationHidden ? null : "hide");
      } else {
        setActiveId(id);
        dispatch(setSelectedShape(id));

        if (id === "text") {
          dispatch(setIsTextMode(true));
          setShowColorPopup(true);
        } else if (["arrow", "circle", "square"].includes(id)) {
          setShowColorPopup(true);
        }
      }
    },
    [dispatch, isAnnotationHidden]
  );

  useEffect(() => {
    if (onPointerClick || isDragMode) {
      setActiveId(null);
      setShowColorPopup(false);
      dispatch(setSelectedShape(null));
      dispatch(setIsTextMode(false));
      dispatch(setIsAnnotationHidden(false));
      dispatch(setOnPointerClick(false));
    }
  }, [onPointerClick, isDragMode, dispatch]);

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

export default Annotation;
