import React, { useState, useEffect } from "react";
import Topbar from "../components/Visualize/Topbar/topbar";
import Toolbar from "../components/Visualize/Sidebar/ToolBar";
import DisplayImage from "../components/Visualize/DisplayImage/displayImage";
import { useLocation } from "react-router-dom";

const Visualize = () => {
  const [imageUrls, setImageUrls] = useState([null]);
  const [layout, setLayout] = useState("layout1");
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [isTextMode, setIsTextMode] = useState(false);
  const [contrast, setContrast] = useState([0]);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [isAnnotationHidden, setIsAnnotationHidden] = useState(false);
  const [scale, setScale] = useState([]);
  const [position, setPosition] = useState([]);
  const [isDragMode, setIsDragMode] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [onPointerClick, setOnPointerClick] = useState(true);
  const [isDrawMode, setIsDrawMode] = useState(false);

  const startDrag = (e, index) => {
    if (!isDragMode) return; // ถ้าไม่ได้เปิดโหมด Drag ห้ามลาก
    if (!e || !e.clientX || !e.clientY) return;
    if (e.button !== 0) return;
    if (selectedPosition === null || !position[selectedPosition]) return;

    setDragging(true);
    setDraggingIndex(index);
    setStart({
      x: e.clientX - position[index].x,
      y: e.clientY - position[index].y,
    });
  };

  const onDrag = (e) => {
    if (draggingIndex === null) return;
    requestAnimationFrame(() => {
      setPosition((prevPositions) => {
        const newPositions = [...prevPositions];
        newPositions[draggingIndex] = {
          x: e.clientX - start.x,
          y: e.clientY - start.y,
        };
        return newPositions;
      });
    });
  };

  const stopDrag = () => {
    setDragging(false);
    setDraggingIndex(null);
  };

  const location = useLocation();
  const caseData = location.state?.caseData || {};
  const allCases = location.state?.allCases || {};
  const zoomIn = () => {
    setScale((prevScales) => {
      const newScales = [...prevScales];
      newScales[selectedPosition] = Math.min(
        newScales[selectedPosition] + 0.3,
        3
      );
      return newScales;
    });
  };

  const zoomOut = () => {
    setScale((prevScales) => {
      const newScales = [...prevScales];
      newScales[selectedPosition] = Math.max(
        newScales[selectedPosition] - 0.3,
        1
      );
      return newScales;
    });
  };
  const handleImagePositionSelect = (index) => {
    setSelectedPosition(index);
    // เมื่อเลือกภาพให้ตั้งค่า scale และ position สำหรับภาพนั้น
    setScale((prevScales) => {
      const newScales = [...prevScales];
      newScales[index] = newScales[index] || 1; // ถ้ายังไม่ได้ตั้งค่า scale สำหรับภาพนี้
      return newScales;
    });
    setPosition((prevPositions) => {
      const newPositions = [...prevPositions];
      newPositions[index] = newPositions[index] || { x: 0, y: 0 }; // ถ้ายังไม่ได้ตั้งค่า position
      return newPositions;
    });
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem("caseList");
      localStorage.removeItem("selectedImageId");
    };
  }, []);

  const handleImageSelect = (newImage) => {
    setImageUrls((prevImages) => {
      const updatedImages = [...prevImages];
      if (layout === "layout1") {
        updatedImages[0] = newImage;
      } else if (layout === "layout2") {
        const firstEmptyIndex = updatedImages.findIndex(
          (img, index) => index < 2 && img === null
        );
        if (firstEmptyIndex !== -1) {
          updatedImages[firstEmptyIndex] = newImage;
        }
      } else if (layout === "layout3") {
        const firstEmptyIndex = updatedImages.findIndex(
          (img, index) => index < 3 && img === null
        );
        if (firstEmptyIndex !== -1) {
          updatedImages[firstEmptyIndex] = newImage;
        }
      } else if (layout === "layout4") {
        const firstEmptyIndex = updatedImages.findIndex(
          (img, index) => index < 4 && img === null
        );
        if (firstEmptyIndex !== -1) {
          updatedImages[firstEmptyIndex] = newImage;
        }
      }
      return updatedImages;
    });

    if (selectedPosition !== null) {
      setImageUrls((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[selectedPosition] = newImage;
        return updatedImages;
      });
    }
  };

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
    setImageUrls((prevImages) => {
      let newImages = [...prevImages];
      if (newLayout === "layout1") return [prevImages[0] || null];
      if (newLayout === "layout2")
        return [prevImages[0] || null, prevImages[1] || null];
      if (newLayout === "layout3")
        return [
          prevImages[0] || null,
          prevImages[1] || null,
          prevImages[2] || null,
        ];
      if (newLayout === "layout4")
        return [
          prevImages[0] || null,
          prevImages[1] || null,
          prevImages[2] || null,
          prevImages[3] || null,
        ];
      return newImages;
    });

    const firstEmptyIndex = imageUrls.findIndex((img) => img === null);
    if (firstEmptyIndex !== -1) {
      setSelectedPosition(firstEmptyIndex);
    }
  };
  //ปรับค่า contrast แยกตามรูป
  const handleContrastChange = (value) => {
    setContrast((prevContrast) => {
      const updatedContrast = [...prevContrast];
      updatedContrast[selectedPosition] = value;
      return updatedContrast;
    });
  };
  return (
    <div className="w-screen max-h-lvh h-full">
      <div className="z-50 relative">
        <Topbar
          onImageSelect={handleImageSelect}
          caseData={[caseData]}
          allCases={allCases}
        />
      </div>
      <div className="flex flex-row" style={{ height: "calc(100vh - 7rem)" }}>
        <aside className="bg-wheat w-1/12 min-w-28 max-w-32">
          <Toolbar
            onLayoutChange={handleLayoutChange}
            setSelectedShape={setSelectedShape}
            isTextMode={isTextMode}
            setIsTextMode={setIsTextMode}
            onContrastChange={handleContrastChange}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            isAnnotationHidden={isAnnotationHidden}
            setIsAnnotationHidden={setIsAnnotationHidden}
            isDragMode={isDragMode}
            setIsDragMode={setIsDragMode}
            zoomIn={zoomIn}
            zoomOut={zoomOut}
            drag={startDrag}
            onPointerClick={onPointerClick}
            setOnPointerClick={setOnPointerClick}
            isDrawMode={isDrawMode}
            setIsDrawMode={setIsDrawMode}
          />
        </aside>
        <main className="w-screen bg-black flex items-center justify-center">
          <DisplayImage
            imageUrls={imageUrls}
            layout={layout}
            onImagePositionSelect={handleImagePositionSelect}
            selectedPosition={selectedPosition}
            selectedShape={selectedShape}
            isTextMode={isTextMode}
            setIsTextMode={setIsTextMode}
            contrast={contrast}
            selectedColor={selectedColor}
            isAnnotationHidden={isAnnotationHidden}
            scale={scale}
            position={position}
            startDrag={startDrag}
            onDrag={onDrag}
            stopDrag={stopDrag}
            isDrawMode={isDrawMode}
            setIsDrawMode={setIsDrawMode}
          />
        </main>
      </div>
    </div>
  );
};
export default Visualize;
