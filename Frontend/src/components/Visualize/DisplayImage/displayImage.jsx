import React, { useRef, useEffect } from "react";
import useFabricCanvas from "./Hook/FabricCanvas.js";
import "./display.css"; //ใช้บังคับขนาดของ Canvas
import * as fabric from "fabric";

const DisplayImage = ({
  imageUrls,
  caseData,
  patientData,
  layout,
  onImagePositionSelect,
  selectedPosition,
  selectedShape,
  isTextMode,
  setIsTextMode,
  contrast,
  selectedColor,
  isAnnotationHidden,
  scale,
  position,
  startDrag,
  onDrag,
  stopDrag,
  isDrawMode,
}) => {
  const canvasRef = useRef([]);
  const canvases = useFabricCanvas(
    canvasRef,
    imageUrls,
    selectedShape,
    isTextMode,
    setIsTextMode,
    selectedColor,
    isAnnotationHidden,
    isDrawMode
  );
  const calculateContrast = (contrast) => {
    return contrast >= 0 ? 1 + (contrast / 20) * 4 : 1 + contrast / 100;
  };
  const gridStyles = {
    layout1: "grid-cols-1 grid-rows-1",
    layout2: "grid-cols-2 grid-rows-1",
    layout3: "grid-cols-2 grid-rows-2",
    layout4: "grid-cols-2 grid-rows-2",
  };

  const getBorderClasses = (index) => {
    let borderClasses = "";
    if (selectedPosition === index)
      borderClasses += "border-4 border-vivid-blue ";
    if (layout === "layout2" && index === 0)
      borderClasses += "border-r-2 border-light-gray ";
    if (layout === "layout3") {
      if (index === 0) borderClasses += "border-r-2 border-light-gray ";
      if (index === 1) borderClasses += "border-b-2 border-light-gray ";
    }
    if (layout === "layout4") {
      if (index === 0 || index === 2)
        borderClasses += "border-r-2 border-light-gray ";
      if (index === 0 || index === 1)
        borderClasses += "border-b-2 border-light-gray ";
    }
    return borderClasses.trim();
  };

  return (
    <div className={`grid ${gridStyles[layout]} relative w-full h-full `}>
      {imageUrls.map((image, index) => (
        <div
          key={index}
          onClick={() => onImagePositionSelect(index)}
          className={` ${
            layout === "layout3" && index === 0 ? "col-span-1 row-span-2" : ""
          }`}
        >
          {image ? (
            <div
              className=" w-full h-full overflow-hidden relative"
              onMouseDown={(e) => startDrag(e, index)}
              onMouseMove={(e) => onDrag(e, index)}
              onMouseUp={stopDrag}
              onMouseLeave={stopDrag}
            >
              <canvas ref={(el) => (canvasRef.current[index] = el)} />
              <img
                src={image}
                alt={`x-ray-${index}`}
                className={`w-full h-full object-contain rounded-none ${getBorderClasses(
                  index
                )}`}
                style={{
                  filter: `contrast(${calculateContrast(contrast[index])})`,
                  zIndex: 0,
                  transform: `scale(${scale[index] || 1}) translate(${
                    position[index]?.x || 0
                  }px, ${position[index]?.y || 0}px)`,
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
              <div className="flex flex-col justify-between text-wheat text-sm 2xl:text-base absolute top-0 left-0 py-2 px-4 w-full h-full ">
                <div className="flex flex-row justify-between">
                  <div>
                    <p>
                      {patientData.first_name} {patientData.last_name}
                    </p>
                    <p>{patientData.hn}</p>
                    <p>
                      {patientData.age} / {patientData.date_of_birth}
                    </p>
                    <p>{patientData.sex}</p>
                    <p>
                      {patientData.weight}kg / {patientData.height}cm
                    </p>
                  </div>
                  <div>
                    <p>ABC Hospital</p>
                    <p>{caseData.an}</p>
                    <p>{caseData.study_date}</p>
                    <p>{caseData.time}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-end items-end">
                  <p>
                    Zoom: {scale[index] ? (scale[index] * 100).toFixed(0) : 100}
                    %
                  </p>
                  <p>WL: 2244</p>
                  <p>WW: 4400</p>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`w-full h-full bg-gray-800 flex items-center justify-center text-wheat text-lg cursor-pointer  ${getBorderClasses(
                index
              )}`}
              onClick={() => onImagePositionSelect(index)}
            >
              Click to add image
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DisplayImage;
