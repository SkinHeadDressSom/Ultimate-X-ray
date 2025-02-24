import React, { useState } from "react";
import ButtonWithIcon from "../ButtonWithIcon";
import {
  UndoBtn,
  RedoBtn,
  Pointer,
  Drag,
  Zoomin,
  Zoomout,
  ContrastBtn,
  Highlight,
} from "../toolsdata";
import ContrastPopup from "./contrastpop";
import Colorpopup from "./colorpop";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsDragMode,
  setSelectedShape,
  setIsTextMode,
  setOnPointerClick,
  setIsDrawMode,
  setSelectedColor,
  setContrast,
  setScale,
} from "../../../../redux/visualize";

const ImageTools = ({ undo, redo }) => {
  const dispatch = useDispatch();
  const { isDragMode, selectedColor, contrast, scale, selectedPosition } =
    useSelector((state) => state.visualize);
  const [activeId, setActiveId] = useState("pointer");
  const [showContrastPopup, setShowContrastPopup] = useState(false);
  const [showColorPopup, setShowColorPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState("550px");

  const buttons = [
    { id: "undobtn", icon: UndoBtn },
    { id: "redobtn", icon: RedoBtn },
    { id: "pointer", icon: Pointer },
    { id: "drag", icon: Drag },
    { id: "zoomin", icon: Zoomin },
    { id: "zoomout", icon: Zoomout },
    { id: "contrastbtn", icon: ContrastBtn },
    { id: "highlight", icon: Highlight },
  ];

  const handleButtonClick = (id) => {
    if (id === "pointer") {
      dispatch(setOnPointerClick(true));
      setActiveId("pointer");
      dispatch(setIsDragMode(false));
      setShowContrastPopup(false);
      setShowColorPopup(false);
      dispatch(setSelectedShape(null));
      dispatch(setIsTextMode(false));
      dispatch(setIsDrawMode(false));
    } else if (id === "zoomin" || id === "zoomout") {
      // Handle zoom in/zoom out
      const zoomFactor = id === "zoomin" ? 1.1 : 0.9; // Increase or decrease scale by 10%
      const newScale = [...scale];
      if (selectedPosition !== null) {
        newScale[selectedPosition] = newScale[selectedPosition]
          ? newScale[selectedPosition] * zoomFactor
          : zoomFactor;
      } else {
        newScale[0] = newScale[0] ? newScale[0] * zoomFactor : zoomFactor;
      }
      dispatch(setScale(newScale));
    } else if (id === "undobtn") {
      undo();
    } else if (id === "redobtn") {
      redo();
    } else {
      if (id === "contrastbtn") {
        setShowContrastPopup((prev) => !prev);
      }
      if (id === "drag") {
        dispatch(setIsDragMode(!isDragMode));
      }
      if (id === "highlight") {
        setPopupPosition("500px");
        dispatch(setIsDrawMode(true));
        dispatch(setSelectedShape(id));
        setShowColorPopup(true);
      }
      setActiveId(id);
      dispatch(setOnPointerClick(false));
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
          onContrastChange={(value) =>
            dispatch(setContrast({ index: selectedPosition, value }))
          }
        />
      )}
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

export default ImageTools;
