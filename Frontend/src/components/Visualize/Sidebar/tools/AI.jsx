import axios from "axios";
import React, { act, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ButtonWithIcon from "../ButtonWithIcon";
import { AI } from "../toolsdata";
import {
  setDetectionBoxes,
  setShowDetectionBoxes,
  setIsLoading,
  setIsAIMode,
} from "../../../../redux/visualize";
const API_URL = process.env.REACT_APP_BACKEND_URL;

const AIButton = () => {
  const {
    imageUrls,
    showDetectionBoxes,
    selectedShape,
    isAnnotationHidden,
    onPointerClick,
    isDragMode,
    isContrastMode,
    isZoomMode,
  } = useSelector((state) => state.visualize);
  const [activeId, setActiveId] = useState(null);
  const dispatch = useDispatch();

  const buttons = [{ id: "AI", icon: AI }];

  const detectBbox = async (imageUrls) => {
    try {
      const formData = new FormData();
      formData.append("url", imageUrls);

      const response = await axios.post(
        `${API_URL}/detect`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        { withCredentials: true }
      );
      return response.data.detections;
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = async (id) => {
    setActiveId(id);
    dispatch(setIsAIMode(true));
    if (!showDetectionBoxes) {
      dispatch(setShowDetectionBoxes(true));
      dispatch(setIsLoading(true));
      const detections = await detectBbox(imageUrls[0]);
      detections.forEach((detection) => {
        const confidence = detection.confidence * 100;
        detection.confidence = `${confidence.toFixed(0)}%`;
      });
      dispatch(setDetectionBoxes(detections));
      dispatch(setIsLoading(false));
    } else {
      dispatch(setShowDetectionBoxes(false));
    }
  };

  useEffect(() => {
    if (
      onPointerClick ||
      isDragMode ||
      isAnnotationHidden ||
      isContrastMode ||
      isZoomMode ||
      selectedShape
    ) {
      setActiveId(null);
      dispatch(setIsAIMode(false));
    }
  }, [
    onPointerClick,
    isDragMode,
    isAnnotationHidden,
    isContrastMode,
    isZoomMode,
    dispatch,
  ]);
  return (
    <div className="flex flex-col items-center justify-center bg-light-blue rounded-lg gap-y-2 p-2 w-full">
      <h1 className="text-dark-blue text-sm">AI</h1>
      <div className="grid grid-cols-1 items-center justify-between">
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

export default AIButton;
