import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Topbar from "../components/Visualize/Topbar/topbar";
import Toolbar from "../components/Visualize/Sidebar/ToolBar";
import DisplayImage from "../components/Visualize/DisplayImage/displayImage";
import { useLocation } from "react-router-dom";
import { getLayoutImages } from "../utils/layoutUtils";
import { setImageUrls, setLayout } from "../redux/visualize";
import useFabricCanvas from "../components/Visualize/DisplayImage/Hook/FabricCanvas";

const Visualize = () => {
  const dispatch = useDispatch();
  const { imageUrls, selectedPosition } = useSelector(
    (state) => state.visualize
  );

  const location = useLocation();
  const caseData = location.state?.caseData || {};
  const allCases = location.state?.allCases || {};

  // Create a ref for canvases
  const canvasRef = useRef([]);
  const { canvases, undo, redo } = useFabricCanvas(canvasRef);

  const handleImageSelect = useCallback(
    (newImage) => {
      const updatedImages = [...imageUrls];

      if (selectedPosition !== null) {
        updatedImages[selectedPosition] = newImage;
      } else if (imageUrls.length === 1) {
        updatedImages[0] = newImage;
      } else {
        const firstEmptyIndex = updatedImages.findIndex(
          (img, index) => index < imageUrls.length && img === null
        );
        if (firstEmptyIndex !== -1) {
          updatedImages[firstEmptyIndex] = newImage;
        }
      }
      dispatch(setImageUrls(updatedImages));
    },
    [imageUrls, selectedPosition, dispatch]
  );

  const handleLayoutChange = useCallback(
    (newLayout) => {
      dispatch(setLayout(newLayout));
      const updatedImages = getLayoutImages(newLayout, imageUrls);
      dispatch(setImageUrls(updatedImages));
    },
    [imageUrls, dispatch]
  );

  useEffect(() => {
    return () => {
      localStorage.removeItem("caseList");
      localStorage.removeItem("selectedImageId");
    };
  }, []);

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
            undo={undo}
            redo={redo}
          />
        </aside>
        <main className="w-screen bg-black flex items-center justify-center">
          <DisplayImage
            caseData={caseData}
            canvasRef={canvasRef}
            canvasses={canvases}
          />
        </main>
      </div>
    </div>
  );
};

export default Visualize;
