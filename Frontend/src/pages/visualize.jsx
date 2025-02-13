import React, { useState } from "react";
import Topbar from "../components/Visualize/Topbar/topbar";
import Toolbar from "../components/Visualize/Sidebar/ToolBar";
import DisplayImage from "../components/Visualize/DisplayImage/displayImage";
import { useLocation } from "react-router-dom";

const Visualize = () => {
  const [imageUrls, setImageUrls] = useState([null, null, null, null]);
  const [layout, setLayout] = useState("layout1");

  const location = useLocation();
  const caseData = location.state?.caseData || {};
  const allCases = location.state?.allCases || {};

  // เลือกภาพ
  const handleImageSelect = (newImage) => {
    setImageUrls((prevImages) => {
      const updatedImages = [...prevImages];
      if (layout === "layout1") {
        updatedImages[0] = newImage;
      } else if (layout === "layout2") {
        updatedImages[1] = updatedImages[0] ? newImage : updatedImages[1];
      } else if (layout === "layout3") {
        updatedImages[2] = updatedImages[1] ? newImage : updatedImages[2];
      } else if (layout === "layout4") {
        updatedImages[3] = updatedImages[2] ? newImage : updatedImages[3];
      }
      return updatedImages;
    });
  };

  // เปลี่ยน layout
  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
    setImageUrls((prevImages) => {
      if (newLayout === "layout1") return [prevImages[0], null, null, null];
      if (newLayout === "layout2")
        return [prevImages[0], prevImages[1], null, null];
      if (newLayout === "layout3")
        return [prevImages[0], prevImages[1], prevImages[2], null];
      return prevImages;
    });
  };

  return (
    <div className="w-screen max-h-lvh h-full">
      <div className="w-full">
        <Topbar onImageSelect={handleImageSelect} caseData={[caseData]} allCases={allCases} />
      </div>

      <div className="flex flex-row" style={{ height: "calc(100vh - 7rem)" }}>
        <aside className="bg-wheat w-1/12 min-w-28 max-w-32">
          <Toolbar onLayoutChange={handleLayoutChange} />
        </aside>
        <main className="w-screen bg-black flex items-center justify-center">
          <DisplayImage imageUrls={imageUrls} layout={layout} />
        </main>
      </div>
    </div>
  );
};

export default Visualize;