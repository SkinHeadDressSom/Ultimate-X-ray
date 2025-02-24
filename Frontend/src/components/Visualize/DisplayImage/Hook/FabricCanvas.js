import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as fabric from "fabric";
import {
  handleCanvasClick,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleMeasurementLine,
  handleRedo,
  handleUndo,
  handleHighlight
} from "../Event/CanvasEvent.js";
import { setIsTextMode } from "../../../../redux/visualize";

const useFabricCanvas = (canvasRef) => {
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
  //redo/undo
  const undoStackRef = useRef([]);
  const redoStackRef = useRef([]);
  //เก็บสถานะ
  const saveState = (canvas) => {
    const objects = canvas.getObjects();
    if (objects.length === 0) return;
    const lastObject = objects[objects.length - 1];
    if (undoStackRef.current.length === 0 || undoStackRef.current[undoStackRef.current.length - 1] !== lastObject) {
      undoStackRef.current.push(lastObject);
      redoStackRef.current = [];
      console.log("Undo Stack Size:", undoStackRef.current.length);
    }
  };
  //delete redo undo
  useEffect(() => {
    const handleKeyDownEvent = (event) => {
      canvases.forEach((canvas) => {
        const activeObject = canvas.getActiveObject();
        if (!activeObject) return;
        if (activeObject.type === "textbox" && activeObject.isEditing) return;
        if (event.code === "Backspace" || event.code === "Delete") {
          canvas.remove(activeObject);
          canvas.discardActiveObject();
          canvas.renderAll();
        }
      });
      if (event.ctrlKey && event.key === "z") {
        handleUndo(canvases[0], undoStackRef, redoStackRef);
      }
      if (event.ctrlKey && event.key === "y") {
        handleRedo(canvases[0], undoStackRef, redoStackRef);
      }
    };
    document.addEventListener("keydown", handleKeyDownEvent);
    return () => {
      document.removeEventListener("keydown", handleKeyDownEvent);
    };
  }, [canvases]);
  //set up canvas
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
      const ctx = canvasEl.getContext("2d");
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
      canvas.on("object:added", () => saveState(canvas));
      canvas.on("object:modified", () => saveState(canvas));
      canvas.on("object:removed", () => saveState(canvas));
      if (selectedShape === "highlight") {
        handleHighlight(canvas, selectedColor, isDrawMode);
      } else {
        canvas.isDrawingMode = false;
      }
      canvas.selection = true;
      canvas.on("selection:created", (event) => (canvas.selectedObject = event.selected[0]));
      canvas.on("selection:updated", (event) => (canvas.selectedObject = event.selected[0]));
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
    };
  }, [canvases, selectedShape, startPoint, isTextMode, selectedColor]);
  //ซ่อน annotation
  useEffect(() => {
    canvases.forEach((canvas) => {
      if (!canvas) return;
      canvas.getObjects().forEach((obj) => {
        if (obj.type !== "image") {
          obj.visible = !isAnnotationHidden;
        }
      });
      canvas.renderAll();
    });
  }, [isAnnotationHidden]);
  return { canvases, undo: () => handleUndo(canvases[0], undoStackRef, redoStackRef), redo: () => handleRedo(canvases[0], undoStackRef, redoStackRef)};
};

export default useFabricCanvas;