import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./display.css";
import {
  setSelectedPosition,
  setPosition,
  setBoxColors,
} from "../../../redux/visualize";
import useDragAndDrop from "../../../hooks/useDragAndDrop.js";

const DisplayImage = ({ caseData, canvasRef }) => {
  const dispatch = useDispatch();

  const {
    imageUrls,
    layout,
    selectedPosition,
    contrast,
    brightness,
    scale,
    position,
    isDragMode,
    detectionBoxes,
    showDetectionBoxes,
    isLoading,
    boxColors,
  } = useSelector((state) => state.visualize);

  const patient = useSelector((state) => state.patient?.data || null);

  const { startDrag, onDrag, stopDrag, dragging } = useDragAndDrop(isDragMode);

  const [imageDimensions, setImageDimensions] = useState([]);

  const handleImageLoad = (e, index) => {
    const { naturalWidth, naturalHeight } = e.target;
    setImageDimensions((prev) => {
      const newDimensions = [...prev];
      newDimensions[index] = { naturalWidth, naturalHeight };
      return newDimensions;
    });
  };

  const calculateContrast = (contrast) => {
    if (contrast >= 0) {
      return 1 + (contrast / 100) * 5;
    } else {
      return 1 / (1 - contrast / 100);
    }
  };
  // ฟังก์ชั่นคำนวนปรับสีตามค่าBrightness
  const calculateBrightness = (brightness) => {
    return brightness / 100; // ปรับค่า brightness โดยใช้สเกล 0-2
  };

  const getRandomLightColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 70 + Math.random() * 30;
    const lightness = 70 + Math.random() * 20;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };
  useEffect(() => {
    const newColors = {};

    detectionBoxes.forEach((box) => {
      const className = box.class;
      if (!boxColors[className]) {
        newColors[className] = getRandomLightColor();
      }
    });

    if (Object.keys(newColors).length > 0) {
      dispatch(setBoxColors(newColors));
    }
  }, [detectionBoxes, boxColors, dispatch]);

  const getPatientInfoStyle = (layout, index) => {
    if (layout === "layout3") {
      return index === 0 ? "w-1/2 h-full" : "w-1/2 h-1/2";
    }
    const styles = {
      layout1: "w-full h-full",
      layout2: "w-1/2 h-full",
      layout4: "w-1/2 h-1/2",
    };
    return styles[layout] || "w-full h-full";
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
  useEffect(() => {
    // รีเซ็ตตำแหน่งทั้งหมดเมื่อ layout เปลี่ยน
    dispatch(setPosition(imageUrls.map(() => ({ x: 0, y: 0 }))));
  }, [layout, dispatch, imageUrls]);
  return (
    <div className={`grid ${gridStyles[layout]} relative w-full h-full`}>
      {imageUrls.map((image, index) => {
        const contrastValue = calculateContrast(contrast[image] || 0);
        const brightnessValue = calculateBrightness(brightness[image] || 0);

        const imageDimension = imageDimensions[index] || {};
        const imageWidth = imageDimension.naturalWidth || 1;
        const imageHeight = imageDimension.naturalHeight || 1;

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
                className={`w-full h-full overflow-hidden ${getBorderClasses(
                  index
                )}`}
                id={`container-${index}`}
              >
                <div className="w-full h-full flex justify-center items-center">
                  <div
                    className="w-fit h-full relative select-none"
                    onMouseDown={(e) => handleMouseDown(e, index)}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  >
                    <canvas
                      key={index}
                      ref={(el) => (canvasRef.current[index] = el)}
                      style={{
                        zIndex: 1,
                        transform: `translate(${position[index]?.x || 0}px, ${
                          position[index]?.y || 0
                        }px) scale(${scale[index] || 1})`,
                        width: "100%",
                        height: "100%",
                      }}
                    />
                    <div
                      className="w-full h-full"
                      style={{
                        transform: `translate(${position[index]?.x || 0}px, ${
                          position[index]?.y || 0
                        }px) scale(${scale[index] || 1})`,
                      }}
                    >
                      <img
                        src={image}
                        alt={`x-ray-${index}`}
                        className="w-22 h-full object-contain rounded-none"
                        id="image-container"
                        style={{
                          filter: `contrast(${contrastValue}) brightness(${brightnessValue})`,
                          zIndex: 0,
                          maxWidth: "100%",
                          maxHeight: "100%",
                          cursor: isDragMode ? "grab" : "default",
                          pointerEvents: 'none',
                        }}
                        onLoad={(e) => handleImageLoad(e, index)}
                      />
                      {showDetectionBoxes &&
                        !isLoading &&
                        detectionBoxes.map((box, i) => {
                          //คำนวณขนาดของกรอบ
                          const boxLeft = (box.xmin / imageWidth) * 100;
                          const boxWidth =
                            ((box.xmax - box.xmin) / imageWidth) * 100;
                          //label styles
                          const labelStyle = {
                            backgroundColor: boxColors[box.class],
                            top: "-1.5em",
                            zIndex: 1,
                            whiteSpace: "nowrap",
                          };

                          //ถ้าlabelออกนอกภาพให้ align ขวา
                          if (boxLeft + boxWidth > 90) {
                            labelStyle.right = "0px"; //ชิดขวา
                          } else {
                            labelStyle.left = "-2px"; //ชิดซ้าย
                          }

                          return (
                            <div
                              key={i}
                              className="absolute border-2"
                              style={{
                                borderColor: boxColors[box.class],
                                left: `${boxLeft}%`,
                                top: `${(box.ymin / imageHeight) * 100}%`,
                                width: `${boxWidth}%`,
                                height: `${
                                  ((box.ymax - box.ymin) / imageHeight) * 100
                                }%`,
                              }}
                            >
                              <span
                                className="absolute top-0 text-black text-xs px-1"
                                style={labelStyle}
                              >
                                {box.class} {box.confidence}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div
                    className={`patient-info flex flex-col justify-between text-wheat text-sm 2xl:text-base absolute py-2 px-4 ${getPatientInfoStyle(
                      layout,
                      index
                    )}`}
                  >
                    <div className="flex flex-row justify-between">
                      <div>
                        <p>
                          {patient.first_name} {patient.last_name}
                        </p>
                        <p>{patient.hn}</p>
                        <p>
                          {patient.age} Years / {patient.date_of_birth}
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
