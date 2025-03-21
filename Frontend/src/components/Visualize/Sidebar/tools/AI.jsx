import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ButtonWithIcon from "../ButtonWithIcon";
import { AI } from "../toolsdata";
import { setDetectionBoxes, setShowDetectionBoxes } from "../../../../redux/visualize";
const API_URL = process.env.REACT_APP_BACKEND_URL;

const AIButton = () => {
  const { imageUrls, showDetectionBoxes } = useSelector((state) => state.visualize);
  const dispatch = useDispatch();

  const buttons = [
    { id: "AI", icon: AI },
  ];

  const detectBbox = async (url) => {
    try {
      const formData = new FormData();
      formData.append("url", url);

      const response = await axios.post(
        `${API_URL}/detect`,
        formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
      });
      return response.data.detections;
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = async (id) => {
    if (!showDetectionBoxes) {
        dispatch(setShowDetectionBoxes(true));
        const detections = await detectBbox(imageUrls[0]);
        dispatch(setDetectionBoxes(detections));
    } else {
      dispatch(setShowDetectionBoxes(false));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-light-blue rounded-lg gap-y-2 p-2 w-full">
      <h1 className="text-dark-blue text-sm">AI</h1>
      <div className="grid grid-cols-1 items-center justify-between">
        {buttons.map((button) => (
          <ButtonWithIcon
            key={button.id}
            icon={button.icon}
            isActive={showDetectionBoxes}
            onClick={() => handleButtonClick(button.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AIButton;
