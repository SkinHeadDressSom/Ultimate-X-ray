import React, { useState, useRef, useEffect } from "react";
import "./chart.css";

const Colorpopup = ({ onClose, selectedColor, setSelectedColor }) => {
  const popupRef = useRef(null);
  const defaultColors = ["#3498db", "#f1c40f", "#e74c3c", "#2ecc71", "#9b59b6"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={popupRef}
      className="p-4 bg-lightest-blue rounded-xl shadow-md w-48 absolute z-10 left-28 top-[550px] text-darkest-blue"
    >
      <h2 className="text-lg font-bold text-gray-700 mb-2">Colors</h2>
      <div className="grid grid-cols-3 gap-2">
        {defaultColors.map((color, index) => (
          <button
            key={index}
            className={`w-10 h-10 rounded-full border-2 ${
              selectedColor === color
                ? "border-vivid-blue"
                : "border-light-gray"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => {
              setSelectedColor(color);
              onClose();
            }}
          />
        ))}

        {/* ปุ่มเลือกสีเพิ่มเติม */}
        <div className="relative">
          <label className="w-10 h-10 rounded-full border-2 border-light-gray flex items-center justify-center cursor-pointer wheel">
            <input
              type="color"
              className="absolute left-full ml-7 w-30 h-50 opacity-0 cursor-pointer transition-opacity duration-200"
              onChange={(e) => {
                setSelectedColor(e.target.value);
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Colorpopup;
