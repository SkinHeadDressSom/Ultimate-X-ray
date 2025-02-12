import React, { useState, useEffect } from "react";
import Topbar from "../components/Visualize/Topbar/topbar";
import Toolbar from "../components/Visualize/Sidebar/ToolBar";
import DisplayImage from "../components/Visualize/DisplayImage/displayImage";
import { useLocation } from "react-router-dom";
import React from 'react';
import Zommer from '../components/tools/zoomsume';

const Visualize = () => {
  const [imageUrls, setImageUrls] = useState([null]);
  const [layout, setLayout] = useState("layout1");
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [isTextMode, setIsTextMode] = useState(false);
  const location = useLocation();
  const caseData = location.state?.caseData || {};
  const allCases = location.state?.allCases || {};

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

  const handleImagePositionSelect = (position) => {
    setSelectedPosition(position);
  };

  return (
    <div className="w-screen max-h-lvh h-full">
      <div className="w-full">
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
          />
        </main>
      </div>
    </div>
  );
};
    <div> <Zommer /> </div>
  );
};

export default Visualize;

export default Visualize;