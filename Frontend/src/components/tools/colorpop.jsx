import React, { useState } from "react";

const Colorpopup = () => {
  const [selectedColor, setSelectedColor] = useState("#ff0000");

  const defaultColors = ["#3498db", "#e74c3c" ,"#f1c40f",  "#2ecc71", "#9b59b6"];

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
              className="absolute left-full ml-4 w-32 h-10 opacity-0 cursor-pointer transition-opacity duration-200 hover:opacity-100"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

const Colorpopup = () => {
  const [selectedColor, setSelectedColor] = useState("#ff0000");
  const defaultColors = ["#3498db", "#f1c40f", "#e74c3c", "#2ecc71", "#9b59b6"];
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 600;
    canvas.style.width = `${800}px`;
    canvas.style.height = `${600}px`;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = selectedColor;
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = selectedColor;
    }
  }, [selectedColor]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  return (
    <div className="p-4 bg-gray-100 rounded-xl shadow-md w-48">
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

        <label className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer bg-gradient-to-r from-red-500 via-green-500 to-blue-500">
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="hidden"
          />
        </label>
      </div>
      <canvas
        ref={canvasRef} 
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        className="mt-4 border border-gray-300"
      />
    </div>
  );
};

export default Colorpopup;