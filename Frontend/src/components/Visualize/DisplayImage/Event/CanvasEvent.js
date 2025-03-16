import * as fabric from "fabric";
//undo
export const handleUndo = (canvas, undoStackRef, redoStackRef) => {
    if (!canvas) return;
    if (undoStackRef.current.length > 0) {
      const lastObject = undoStackRef.current.pop();
      redoStackRef.current.push(lastObject);
      canvas.remove(lastObject);
      canvas.renderAll();
    }
  };
//redo
export const handleRedo = (canvas, undoStackRef, redoStackRef) => {
if (!canvas) return;
if (redoStackRef.current.length > 0) {
    const lastObject = redoStackRef.current.pop();
    undoStackRef.current.push(lastObject);
    canvas.add(lastObject);
    canvas.renderAll();
}
};
//highlight
export const handleHighlight = (canvas, selectedColor, isDrawMode) => {
    if (!canvas || !selectedColor || !isDrawMode) return;
  
    const hexToRgb = (hex) => {
      hex = hex.replace(/^#/, '');
      const bigint = parseInt(hex, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `${r}, ${g}, ${b}`;
    };
  
    if (isDrawMode) {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      const highlightColorWithOpacity = `rgba(${hexToRgb(selectedColor)}, 0.4)`;
      canvas.freeDrawingBrush.color = highlightColorWithOpacity;
      canvas.freeDrawingBrush.width = 50;
    } else {
      canvas.isDrawingMode = false;
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
export const handleMouseDown = (event, isDrawingRef, setStartPoint, selectedShape) => {
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
//measurement
export const handleMeasurementLine = (event, canvas, selectedShape, selectedColor) => {
    if (selectedShape !== "measurement") return;

    const pointer = canvas.getPointer(event.e);
    const startPoint = { x: pointer.x, y: pointer.y };

    //เส้นหลัก
    const line = new fabric.Line([startPoint.x, startPoint.y, startPoint.x, startPoint.y], {
        stroke: "Yellow",
        strokeWidth: 4,
        selectable: false,
        evented: false,
    });

    //ขีดปลายเส้น
    const startTick = new fabric.Line([startPoint.x, startPoint.y - 10, startPoint.x, startPoint.y + 10], {
        stroke: "Yellow",
        strokeWidth: 4,
        selectable: false,
        evented: false,
    });

    const endTick = new fabric.Line([startPoint.x, startPoint.y - 10, startPoint.x, startPoint.y + 10], {
        stroke: "Yellow",
        strokeWidth: 4,
        selectable: false,
        evented: false,
    });

    //ขีดกลางเส้น
    const tickMark = new fabric.Line([startPoint.x, startPoint.y - 5, startPoint.x, startPoint.y + 5], {
        stroke: "Yellow",
        strokeWidth: 3,
        selectable: false,
        evented: false,
    });

    //ข้อความ
    const text = new fabric.Textbox("0 mm", {
        left: startPoint.x,
        top: startPoint.y + 15, //อยู่ใต้เส้น
        fontSize: 25,
        fill: "Yellow",
        backgroundColor: "black",
        padding: 5,
        width: 120, // กำหนดความกว้างให้พอเหมาะ
        textAlign: "center",
        selectable: false,
        evented: false,
    });

    canvas.add(line, startTick, endTick, tickMark, text);

    const updateMeasurement = (moveEvent) => {
        const pointer = canvas.getPointer(moveEvent.e);
        line.set({ x2: pointer.x, y2: pointer.y });

        //ขีดที่ปลายเส้น
        endTick.set({ x1: pointer.x, y1: pointer.y - 10, x2: pointer.x, y2: pointer.y + 10 });

        //ขีดกลางเส้น
        const midX = (startPoint.x + pointer.x) / 2;
        const midY = (startPoint.y + pointer.y) / 2;
        tickMark.set({ x1: midX, y1: midY - 5, x2: midX, y2: midY + 5 });

        //คำนวณระยะทาง
        const distance = Math.hypot(pointer.x - startPoint.x, pointer.y - startPoint.y);
        const distanceInMM = (distance / 10).toFixed(2); // สมมติ 1px = 0.1mm
        text.set({ text: `${distanceInMM} mm`, left: midX, top: midY + 15 });

        canvas.renderAll();
    };

    const stopMeasurement = () => {
        canvas.off("mouse:move", updateMeasurement);
        canvas.off("mouse:up", stopMeasurement);
    };
    
    canvas.on("mouse:move", updateMeasurement);
    canvas.on("mouse:up", stopMeasurement);
};
