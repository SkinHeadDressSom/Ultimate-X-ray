import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonWithIcon from "../ButtonWithIcon";
import ContrastPopup from "../Popup/contrastpop";
import Colorpopup from "../Popup/colorpop";
import {
  setIsDragMode,
  setSelectedShape,
  setIsTextMode,
  setIsZoomMode,
  setIsContrastMode,
  setOnPointerClick,
  setIsDrawMode,
  setSelectedColor,
  setContrast,
  setBrightness,
  setScale,
  setIsAnnotationHidden,
} from "../../../../redux/visualize";
import {
  UndoBtn,
  RedoBtn,
  Pointer,
  Drag,
  Zoomin,
  Zoomout,
  ContrastBtn,
  Hide,
} from "../toolsdata";

const ImageTools = ({ undo, redo }) => {
  const dispatch = useDispatch();
  const {
    selectedShape,
    imageUrls,
    isDragMode,
    selectedColor,
    scale,
    selectedPosition,
    isAnnotationHidden,
    isAIMode,
  } = useSelector((state) => state.visualize);

  const [activeId, setActiveId] = useState("pointer");
  const [showContrastPopup, setShowContrastPopup] = useState(false);
  const [showColorPopup, setShowColorPopup] = useState(false);

  const buttons = [
    { id: "undobtn", icon: UndoBtn, action: undo },
    { id: "redobtn", icon: RedoBtn, action: redo },
    { id: "pointer", icon: Pointer },
    { id: "drag", icon: Drag },
    { id: "zoomin", icon: Zoomin, action: () => handleZoom(1.1) },
    { id: "zoomout", icon: Zoomout, action: () => handleZoom(0.9) },
    {
      id: "contrastbtn",
      icon: ContrastBtn,
      action: () => {
        setShowContrastPopup((prev) => !prev);
        dispatch(setIsContrastMode(true));
      },
    },

    { id: "hide", icon: Hide },
  ];

  const handleZoom = useCallback(
    (zoomFactor) => {
      const newScale = [...scale];
      if (selectedPosition !== null) {
        newScale[selectedPosition] =
          (newScale[selectedPosition] || 1) * zoomFactor;
      } else {
        newScale[0] = (newScale[0] || 1) * zoomFactor;
      }
      dispatch(setScale(newScale));
      dispatch(setIsZoomMode(true));
    },
    [scale, selectedPosition, dispatch]
  );

  const resetToolsState = useCallback(() => {
    dispatch(setSelectedShape(null));
    dispatch(setIsTextMode(false));
    dispatch(setIsDrawMode(false));
    dispatch(setIsZoomMode(false));
    dispatch(setIsContrastMode(false));
    setShowContrastPopup(false);
    setShowColorPopup(false);
  }, [dispatch]);
  const resetIsDragMode = useCallback(() => {
    dispatch(setIsDragMode(false));
  }, [dispatch]);

  const handleButtonClick = (id) => {
    setActiveId(id);
    dispatch(setOnPointerClick(id === "pointer"));
    resetIsDragMode();
    const button = buttons.find((btn) => btn.id === id);
    if (button?.action) {
      button.action();
      return;
    }
    if (id === "drag") {
      dispatch(setIsDragMode(true));
    } else if (id === "pointer") {
      resetToolsState();
    } else if (id === "hide") {
      dispatch(setIsAnnotationHidden(!isAnnotationHidden));
      resetToolsState();
      setActiveId(isAnnotationHidden ? null : "hide");
    }
  };

  useEffect(() => {
    if (isDragMode) {
      resetToolsState();
    } else if (selectedShape || isAIMode) {
      setActiveId(null);
    }
  }, [isDragMode, selectedShape, resetToolsState]);

  return (
    <div className="flex flex-col items-center justify-center bg-light-blue rounded-lg gap-y-2 p-2 w-full">
      <h1 className="text-dark-blue text-sm">Image tools</h1>
      <div className="grid grid-cols-2 gap-2">
        {buttons.map(({ id, icon }) => (
          <ButtonWithIcon
            key={id}
            icon={icon}
            isActive={
              activeId === id || (id === "contrastbtn" && showContrastPopup)
            }
            onClick={() => handleButtonClick(id)}
          />
        ))}
      </div>

      {showContrastPopup && (
        <ContrastPopup
          onClose={() => setShowContrastPopup(false)}
          onContrastChange={(value) =>
            dispatch(
              setContrast({ imageUrl: imageUrls[selectedPosition], value })
            )
          }
          onBrightnessChange={(value) =>
            dispatch(
              setBrightness({ imageUrl: imageUrls[selectedPosition], value })
            )
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
