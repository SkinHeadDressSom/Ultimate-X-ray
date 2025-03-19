import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

const ContrastPopup = ({ onClose, onContrastChange, onBrightnessChange }) => {
  const selectedPosition = useSelector(
    (state) => state.visualize.selectedPosition
  );
  const contrastFromRedux = useSelector(
    (state) => state.visualize.contrast[selectedPosition] || 0
  );
  const [contrast, setContrast] = useState(contrastFromRedux);
  const [brightness, setBrightness] = useState(100); // เพิ่มสถานะสำหรับ brightness
  const popupRef = useRef(null);

  useEffect(() => {
    setContrast(contrastFromRedux);
  }, [contrastFromRedux, selectedPosition]);

  // ฟังก์ชันเปลี่ยนค่า contrast จาก input number
  const handleInputChange = (e) => {
    let value = e.target.value === "" ? "" : parseFloat(e.target.value);

    if (value !== "" && (value < -100 || value > 100)) {
      value = Math.max(-100, Math.min(100, value)); // จำกัดค่าระหว่าง -100 ถึง 100
    }
    setContrast(value);
    onContrastChange(value);
    onBrightnessChange(value);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose(); // ปิด popup ถ้าคลิกนอก
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <Box
      ref={popupRef}
      className="flex flex-col items-center justify-center p-3 gap-4 bg-lightest-blue text-darkest-blue rounded-lg shadow-md w-64 absolute z-10 left-28 top-[450px]"
    >
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className="text-lg font-semibold">Contrast</h1>
        <input
          type="number"
          min="-100"
          max="100"
          value={contrast}
          onChange={handleInputChange}
          className="border-[1px] border-light-gray w-14 px-2 py-1 rounded-md text-sm text-center outline-none bg-transparent [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      <div className="flex items-center w-full py-2">
        <input
          type="range"
          min="-100"
          max="100"
          value={contrast}
          onChange={(e) => {
            setContrast(Number(e.target.value));
            onContrastChange(Number(e.target.value));
          }}
          className="w-full accent-blue-600 appearance-none rounded-full h-1 bg-gray"
        />
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className="text-lg font-semibold">Brightness</h1>
        <input
          type="number"
          min="-100"
          max="100"
          value={brightness}
          onChange={handleInputChange}
          className="border-[1px] border-light-gray w-14 px-2 py-1 rounded-md text-sm text-center outline-none bg-transparent [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      <div className="flex items-center w-full py-2">
        <input
          type="range"
          min="0"
          max="200"
          value={brightness}
          onChange={(e) => {
            setBrightness(Number(e.target.value));
            onBrightnessChange(Number(e.target.value));
          }}
          className="w-full accent-blue-600 appearance-none rounded-full h-1 bg-gray"
        />
      </div>
    </Box>
  );
};

export default ContrastPopup;
