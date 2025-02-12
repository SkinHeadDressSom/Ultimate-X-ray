import { useEffect, useState, useRef } from "react";
import * as fabric from "fabric";
import { handleKeyDown, handleCanvasClick, handleMouseDown, handleMouseMove, handleMouseUp } from "../Event/CanvasEvent.js";

const useFabricCanvas = (canvasRef, imageUrls, selectedShape, isTextMode, setIsTextMode) => {
  const [canvases, setCanvases] = useState([]);
  const isDrawingRef = useRef(false);
  const [startPoint, setStartPoint] = useState(null);

  useEffect(() => {
    const newCanvases = imageUrls.map((_, index) => {
        const canvasEl = canvasRef.current[index];
        if (!canvasEl) return null;
        // ตั้งค่าความละเอียดของ Canvas
        const scale = window.devicePixelRatio;
        canvasEl.width = canvasEl.offsetWidth * scale;
        canvasEl.height = canvasEl.offsetHeight * scale;

        const canvas = new fabric.Canvas(canvasEl, { selection: false });

        // ปิด anti-aliasing
        const ctx = canvasEl.getContext('2d');
        ctx.imageSmoothingEnabled = false;

        return canvas;
    });

    setCanvases(newCanvases);

    return () => newCanvases.forEach((canvas) => canvas && canvas.dispose());
  }, [imageUrls, canvasRef]);

  useEffect(() => {
    if (!selectedShape) return;
  
    canvases.forEach((canvas) => {
      if (!canvas) return;
  
      canvas.selection = true;
      canvas.on("selection:created", (event) => (canvas.selectedObject = event.selected[0]));
      canvas.on("selection:updated", (event) => (canvas.selectedObject = event.selected[0]));
  
      document.addEventListener("keydown", (event) => handleKeyDown(event, canvases));
      canvas.on("mouse:down", (event) => handleMouseDown(event, isDrawingRef, setStartPoint, selectedShape));
      canvas.on("mouse:move", (event) => handleMouseMove(event, isDrawingRef, startPoint, canvas, selectedShape));
      canvas.on("mouse:up", (event) => handleMouseUp(event, isDrawingRef, startPoint, canvas, selectedShape));
      canvas.on("mouse:down", (event) => handleCanvasClick(event, canvas, selectedShape, isTextMode, setIsTextMode));  // Pass isTextMode and setIsTextMode
    });
  
    return () => {
      canvases.forEach((canvas) => {
        if (!canvas) return;
        canvas.off("mouse:down");
        canvas.off("mouse:move");
        canvas.off("mouse:up");
        canvas.off("selection:created");
        canvas.off("selection:updated");
      });
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvases, selectedShape, startPoint, isTextMode, setIsTextMode]);
    
  
  return canvases;
};

export default useFabricCanvas;