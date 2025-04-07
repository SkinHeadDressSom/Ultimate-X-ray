import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonWithIcon from "../ButtonWithIcon";
import { AddText, Arrow, Circle, Draw, Ruler, Square } from "../toolsdata";
import Colorpopup from "../Popup/colorpop";
import {
  setSelectedShape,
  setIsTextMode,
  setSelectedColor,
  setIsAnnotationHidden,
  setOnPointerClick,
  setIsDragMode,
  setIsDrawMode,
  setIsAIMode,
  setIsZoomMode,
} from "../../../../redux/visualize";

const Annotation = () => {
  const dispatch = useDispatch();
  const {
    selectedShape,
    selectedColor,
    isAnnotationHidden,
    onPointerClick,
    isDragMode,
    isDrawMode,
    isTextMode,
    isContrastMode,
    isZoomMode,
    isAIMode,
  } = useSelector((state) => state.visualize);

  const [activeId, setActiveId] = useState(null);
  const [showColorPopup, setShowColorPopup] = useState(false);

  const buttons = [
    { id: "arrow", icon: Arrow },
    { id: "circle", icon: Circle },
    { id: "square", icon: Square },
    { id: "text", icon: AddText },
    { id: "measurement", icon: Ruler },
    { id: "highlight", icon: Draw },
  ];

  const resetToolsState = useCallback(() => {
    dispatch(setSelectedShape(null));
    dispatch(setIsTextMode(false));
    dispatch(setIsDrawMode(false));
    dispatch(setIsDragMode(false));
    setShowColorPopup(false);
  }, [dispatch]);

  const handleButtonClick = (id) => {
    dispatch(setOnPointerClick(false));
    dispatch(setIsDragMode(false));
    dispatch(setIsAIMode(false));
    dispatch(setIsZoomMode(false));

    if (id === "hide") {
      dispatch(setIsAnnotationHidden(!isAnnotationHidden));
      resetToolsState();
      setActiveId(isAnnotationHidden ? null : "hide");
    } else {
      setActiveId(id);
      dispatch(setSelectedShape(id));
      if (id === "text") {
        dispatch(setIsTextMode(true));
        setShowColorPopup(true);
      } else if (["arrow", "circle", "square"].includes(id)) {
        setShowColorPopup(true);
      } else if (id === "highlight") {
        setShowColorPopup(true);
        dispatch(setIsDrawMode(true));
      }
    }
  };

  useEffect(() => {
    if (
      onPointerClick ||
      isDragMode ||
      isTextMode ||
      isAnnotationHidden ||
      isContrastMode ||
      isZoomMode ||
      isAIMode
    ) {
      setActiveId(null);
      dispatch(setSelectedShape(null));
      dispatch(setIsTextMode(false));
      dispatch(setIsDrawMode(false));
    }
  }, [
    onPointerClick,
    isDragMode,
    isDrawMode,
    isAnnotationHidden,
    isContrastMode,
    isZoomMode,
    isAIMode,
    dispatch,
    resetToolsState,
  ]);
  return (
    <div className="flex flex-col items-center justify-center bg-light-blue rounded-lg gap-y-2 p-2 w-full">
      <h1 className="text-dark-blue text-sm">Annotation</h1>
      <div className="grid grid-cols-2 gap-2">
        {buttons.map(({ id, icon, action }) => (
          <ButtonWithIcon
            key={id}
            icon={icon}
            isActive={activeId === id}
            onClick={() => handleButtonClick(id)}
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
