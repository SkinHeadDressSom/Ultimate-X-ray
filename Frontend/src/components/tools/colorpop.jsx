import React, { useState } from "react";

const Colorpopup = () => {
  const [selectedColor, setSelectedColor] = useState("#ff0000");
  // สีตั้งต้น
  const defaultColors = ["#3498db", "#f1c40f", "#e74c3c", "#2ecc71", "#9b59b6"];

  return (

    <div className="p-4 bg-gray-100 rounded-xl shadow-md w-48 relative">
      <h2 className="text-lg font-bold text-gray-700 mb-2">Colors</h2>
      <div className="grid grid-cols-3 gap-2">
        {defaultColors.map((color, index) => (
          <button
            key={index}
            className="w-10 h-10 rounded-full border border-gray-300"
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          />
        ))}

        {/* ปุ่มเลือกสีเพิ่มเติม */}

        <div className="relative">
          <label className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer bg-gradient-to-r from-red-500 via-green-500 to-blue-500">
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="absolute left-full ml-7 w-30 h-50 opacity-0 cursor-pointer transition-opacity duration-200"
            />
            <div
              className="absolute top-0 left-full ml-2 w-10 h-10 rounded-full border border-gray-300"
              style={{ backgroundColor: selectedColor }}
            />
          </label>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-md font-bold text-gray-700 mb-2">Selected Color:</h3>
        <div
          className="w-10 h-10 rounded-full border border-gray-300"
          style={{ backgroundColor: selectedColor }}
        />
      </div>
    </div>
  );
};

export default Colorpopup;