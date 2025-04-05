import React, { useCallback, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Topbar from "../components/Visualize/Topbar/topbar";
import Toolbar from "../components/Visualize/Sidebar/ToolBar";
import DisplayImage from "../components/Visualize/DisplayImage/displayImage";
import { useLocation } from "react-router-dom";
import { getLayoutImages } from "../utils/layoutUtils";
import useFabricCanvas from "../components/Visualize/DisplayImage/Hook/FabricCanvas";
import { setSelectedCases, resetSelectedAN } from "../redux/selectedCase";
import { setSelectedImageId } from "../redux/selectedImage";
import useAnnotationImages from "../hooks/useAnnotationImages";
import {
  setImageUrls,
  setLayout,
  resetContrast,
  resetBrightness,
  setAnnotationMap,
} from "../redux/visualize";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const Visualize = () => {
  const dispatch = useDispatch();
  const { imageUrls, selectedPosition, annotationMap, isLoading } = useSelector(
    (state) => state.visualize
  );

  const location = useLocation();
  const caseData = location.state?.caseData || []; //เลือกเคสเดียว
  const allCases = location.state?.allCases || [];
  const selectedCases = location.state?.selectedCases || []; //เลือกหลายเคส

  useEffect(() => {
    if (selectedCases.length > 0) {
      dispatch(setSelectedCases(selectedCases));
    } else if (caseData) {
      dispatch(setSelectedCases([caseData]));
    }
  }, [dispatch, selectedCases, caseData]);

  const casesToDisplay = selectedCases.length > 0 ? selectedCases : [caseData];
  const xnValues = useMemo(
    () =>
      casesToDisplay.flatMap((caseItem) =>
        caseItem.case_images.map((img) => img.xn)
      ),
    [casesToDisplay]
  );

  const annotations = useAnnotationImages(xnValues);

  useEffect(() => {
    dispatch(setAnnotationMap(annotations));
  }, [xnValues, annotations, dispatch]);

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
      dispatch(resetContrast());
      dispatch(resetBrightness());
      dispatch(setSelectedImageId(null));
      dispatch(resetSelectedAN());
    };
  }, [location]);

  return (
    <div className="w-screen max-h-lvh h-full">
      {/* Backdrop with CircularProgress */}
      {isLoading && (
        <Backdrop
          open={true}
          style={{
            zIndex: 1000,
            color: "#fff",
          }}
        >
          <CircularProgress />
        </Backdrop>
      )}

      <div className="z-50 relative">
        <Topbar
          onImageSelect={handleImageSelect}
          caseData={casesToDisplay}
          allCases={allCases}
        />
      </div>
      <div className="flex flex-row" style={{ height: "calc(100vh - 7rem)" }}>
        <aside className="bg-wheat w-1/12 min-w-28 max-w-32">
          <Toolbar
            onLayoutChange={handleLayoutChange}
            undo={undo}
            redo={redo}
            canvasRef={canvasRef}
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
