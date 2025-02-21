import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as fabric from "fabric";
import { handleKeyDown, handleCanvasClick, handleMouseDown, handleMouseMove, handleMouseUp, handleMeasurementLine } from "../Event/CanvasEvent.js";
import {
  setIsTextMode,
} from "../../../../redux/visualize";
const useFabricCanvas = (canvasRef,) => {
  const dispatch = useDispatch();
  const {
    selectedColor,
    imageUrls,
    selectedShape,
    isTextMode,
    isDrawMode,
    isAnnotationHidden,
  } = useSelector((state) => state.visualize);
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
      const hexToRgb = (hex) => {
        //ลบ #
        hex = hex.replace(/^#/, '');
        
        //แปลง HEX เป็น RGB
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r}, ${g}, ${b}`;
      };
      if (selectedShape === "highlight" && isDrawMode) {
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        
        // ตั้งค่าสีด้วย RGBA (alpha = 0.2 สำหรับ opacity 40%)
        const highlightColorWithOpacity = `rgba(${hexToRgb(selectedColor)}, 0.4)`;
        canvas.freeDrawingBrush.color = highlightColorWithOpacity;
        
        canvas.freeDrawingBrush.width = 50; //ความหนา
      } else {
        canvas.isDrawingMode = false;
      }
      
      canvas.selection = true;
      canvas.on("selection:created", (event) => (canvas.selectedObject = event.selected[0]));
      canvas.on("selection:updated", (event) => (canvas.selectedObject = event.selected[0]));
  
      document.addEventListener("keydown", (event) => handleKeyDown(event, canvases));
      canvas.on("mouse:down", (event) => {
        if (selectedShape === "measurement") {
            handleMeasurementLine(event, canvas, selectedShape, selectedColor);
        } else {
            handleMouseDown(event, isDrawingRef, setStartPoint, selectedShape, selectedColor);
        }
    });
    canvas.on("mouse:move", (event) => {
        if (selectedShape === "measurement" && isDrawingRef.current) {
            handleMeasurementLine(event, canvas, selectedShape, selectedColor);
        } else {
            handleMouseMove(event, isDrawingRef, startPoint, canvas, selectedShape, selectedColor);
        }
    });
    canvas.on("mouse:up", (event) => handleMouseUp(event, isDrawingRef, startPoint, canvas, selectedShape, selectedColor));
    canvas.on("mouse:down", (event) => handleCanvasClick(event, canvas, selectedShape, isTextMode, () => dispatch(setIsTextMode(false)), selectedColor));
});

  
    return () => {
      canvases.forEach((canvas) => {
        if (!canvas) return;
        canvas.off("mouse:down");
        canvas.off("mouse:move");
        canvas.off("mouse:up");
        canvas.off("selection:created");
        canvas.off("selection:updated");
        canvas.isDrawingMode = false;
      });
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvases, selectedShape, startPoint, isTextMode, selectedColor]);
  useEffect(() => {
    canvases.forEach((canvas) => {
      if (!canvas) return;
  
      // ซ่อน annotation ทั้งหมด
      canvas.getObjects().forEach((obj) => {
        if (obj.type !== "image") {
          obj.visible = !isAnnotationHidden;
        }
      });
  
      canvas.renderAll();
    });
  }, [isAnnotationHidden]);
  
  return canvases;
  
};

export default useFabricCanvas;