import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./display.css";
import { setSelectedPosition } from "../../../redux/visualize";
import useDragAndDrop from "../../../hooks/useDragAndDrop.js";

const DisplayImage = ({ caseData, canvasRef }) => {
  const dispatch = useDispatch();

  const {
    imageUrls,
    layout,
    selectedPosition,
    contrast,
    scale,
    position,
    isDragMode,
  } = useSelector((state) => state.visualize);

  const patient = useSelector((state) => state.patient?.data || null);

  const { startDrag, onDrag, stopDrag, dragging } = useDragAndDrop(isDragMode);

  // ฟังก์ชั่นคำนวนปรับสีตามค่าContrast
  const calculateContrast = (contrast) => {
    if (contrast >= 0) {
      return 1 + (contrast / 100) * 5; // ขยายค่าไปที่สูงสุดที่ 6 เมื่อ value = 100 และ หลัง * ต่ำกว่าค่าที่อยากได้ 1 หน่วยเสมอ
    } else {
      return 1 / (1 - contrast / 100); // ลดคอนทราสต์ลงแต่ไม่ให้ติดลบ
    }
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

  const handleImagePositionSelect = (index) => {
    dispatch(setSelectedPosition(index));
  };

  const handleMouseDown = (e, index) => {
    if (isDragMode) {
      startDrag(e, index);
    }
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      onDrag(e, position);
    }
  };

  const handleMouseUp = () => {
    if (dragging) {
      stopDrag();
    }
  };

  return (
    <div className={`grid ${gridStyles[layout]} relative w-full h-full`}>
      {imageUrls.map((image, index) => {
        const contrastValue = calculateContrast(contrast[index] || 0);
        return (
          <div
            key={index}
            onClick={() => handleImagePositionSelect(index)}
            className={`${
              layout === "layout3" && index === 0 ? "col-span-1 row-span-2" : ""
            }`}
          >
            {image ? (
              <div
                className={`w-full h-full overflow-hidden relative ${getBorderClasses(
                  index
                )}`}
                onMouseDown={(e) => handleMouseDown(e, index)}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <canvas ref={(el) => (canvasRef.current[index] = el)} />
                <img
                  src={image}
                  alt={`x-ray-${index}`}
                  className="w-full h-full object-contain rounded-none"
                  style={{
                    filter: `contrast(${contrastValue})`,
                    zIndex: 0,
                    transform: `translate(${position[index]?.x || 0}px, ${
                      position[index]?.y || 0
                    }px) scale(${scale[index] || 1})`,
                    maxWidth: "100%",
                    maxHeight: "100%",
                    cursor: isDragMode ? "grab" : "default",
                  }}
                />
                <div className="flex flex-col justify-between text-wheat text-sm 2xl:text-base absolute top-0 left-0 py-2 px-4 w-full h-full ">
                  <div className="flex flex-row justify-between">
                    <div>
                      <p>
                        {patient.first_name} {patient.last_name}
                      </p>
                      <p>{patient.hn}</p>
                      <p>
                        {patient.age} / {patient.date_of_birth}
                      </p>
                      <p>{patient.sex}</p>
                      <p>
                        {patient.weight}kg / {patient.height}cm
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
                      Zoom:{" "}
                      {scale[index] ? (scale[index] * 100).toFixed(0) : 100}%
                    </p>
                    <p>WL: 2244</p>
                    <p>WW: 4400</p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`w-full h-full bg-gray-800 flex items-center justify-center text-wheat text-lg cursor-pointer ${getBorderClasses(
                  index
                )}`}
                onClick={() => handleImagePositionSelect(index)}
              >
                Click to add image
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DisplayImage;
