import * as fabric from "fabric";
//ลบ annotation
export const handleKeyDown = (event, canvases) => {
    const activeObject = canvases.find((canvas) => canvas.getActiveObject())?.getActiveObject();
    if (!activeObject) return;
    if (activeObject.type === "textbox" && activeObject.isEditing) return;
    if (event.code === "Backspace" || event.code === "Delete") {
        const canvas = canvases.find((canvas) => canvas.getActiveObject());
        if (canvas) {
        canvas.remove(activeObject);
        canvas.discardActiveObject();
        canvas.renderAll();
        }
    }
};
//คลิ๊กที่ canvas แล้วเพิ่มข้อความ
export const handleCanvasClick = (event, canvas, selectedShape, isTextMode, setIsTextMode, selectedColor) => {
    if (selectedShape !== "text" || !isTextMode) return;
    if (event.target && event.target.type === "textbox") {
      event.target.enterEditing();
      event.target.selectAll();
      return;
    }
    const pointer = canvas.getPointer(event.e);
    const text = new fabric.Textbox("Enter text", {
      left: pointer.x,
      top: pointer.y,
      fontSize: 40,
      fill:selectedColor,
      backgroundColor: "",
      editable: true,
      borderColor: "blue",
      cornerColor: "red",
      cornerSize: 10,
    });
  
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    text.enterEditing();
    text.selectAll();
    setIsTextMode(false); //เพิ่มข้อความได้ครั้งเดียว
};
//คลิ๊กแล้วเริ่มวาด
export const handleMouseDown = (event, isDrawingRef, setStartPoint, selectedShape,) => {
if (event.target || !event.pointer || isDrawingRef.current) return;
isDrawingRef.current = true;
setStartPoint({ x: event.pointer.x, y: event.pointer.y });
};
//เลื่อนเมาส์
export const handleMouseMove = (event, isDrawingRef, startPoint, canvas, selectedShape, selectedColor) => {
    if (!isDrawingRef.current || !startPoint || !event.pointer) return;
    const { x, y } = event.pointer;
    canvas.clearContext(canvas.contextTop);
    let shape; 
    if (selectedShape === "circle") {
        shape = new fabric.Circle({
            left: startPoint.x,
            top: startPoint.y,
            radius: Math.hypot(x - startPoint.x, y - startPoint.y),
            fill: "transparent",
            stroke: selectedColor,
            strokeWidth: 4,
        });
    } else if (selectedShape === "square") {
        shape = new fabric.Rect({
            left: Math.min(startPoint.x, x),
            top: Math.min(startPoint.y, y),
            width: Math.abs(x - startPoint.x),
            height: Math.abs(y - startPoint.y),
            fill: "transparent",
            stroke: selectedColor,
            strokeWidth: 4,
        });
    } else if (selectedShape === "arrow") {
        shape = new fabric.Line([startPoint.x, startPoint.y, x, y], {
            stroke: selectedColor,
            strokeWidth: 4,
            evented: false, 
            selectable: false, 
        });
    }
    if (shape) {
        shape.render(canvas.contextTop);
    }
};
//ปล่อยเมาส์แล้วสร้าง shape
export const handleMouseUp = (event, isDrawingRef, startPoint, canvas, selectedShape,selectedColor) => {
    if (!isDrawingRef.current || !startPoint || !event.pointer) return;
    const { x, y } = event.pointer;
    let shape;
    if (selectedShape === "circle") {
        const radius = Math.hypot(x - startPoint.x, y - startPoint.y);
        shape = new fabric.Circle({
            left: startPoint.x,
            top: startPoint.y,
            radius: radius,
            fill: "transparent",
            stroke: selectedColor,
            strokeWidth: 4,
            selectable: true,
        });
    } else if (selectedShape === "square") {
        shape = new fabric.Rect({
            left: Math.min(startPoint.x, x),
            top: Math.min(startPoint.y, y),
            width: Math.abs(x - startPoint.x),
            height: Math.abs(y - startPoint.y),
            fill: "transparent",
            stroke: selectedColor,
            strokeWidth: 4,
            selectable: true,
        });
    }else if (selectedShape === "arrow") {
        shape = createArrow(startPoint, { x, y }, selectedColor);

      }

    if (shape) {
        canvas.add(shape);
        canvas.renderAll();
    }
    isDrawingRef.current = false;
};
//สร้างลูกศร
export const createArrow = (startPoint, endPoint, selectedColor) => {
    const angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x) * (180 / Math.PI);
    const headLength = 20; // ความยาวของหัวลูกศร
    // สร้างเส้นลูกศร
    const line = new fabric.Line([startPoint.x, startPoint.y, endPoint.x, endPoint.y], {
        stroke: selectedColor,
        strokeWidth: 4,
        selectable: true,
        evented: false,
    });
    // คำนวณตำแหน่งหัวลูกศร
    const arrowHead = new fabric.Triangle({
        width: headLength,
        height: headLength,
        fill: selectedColor,
        left: endPoint.x,
        top: endPoint.y,
        angle: angle + 90, //หมุนหัวลูกศร
        originX: "center",
        originY: "center",
        selectable: false,
        evented: false,
    });
    // รวมเส้นและหัวลูกศรเป็นกลุ่ม
    const arrow = new fabric.Group([line, arrowHead], {
        selectable: true,
    });
    return arrow;
};
