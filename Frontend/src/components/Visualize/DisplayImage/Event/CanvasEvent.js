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
      canvas.freeDrawingBrush.width = 100;

      canvas.on('path:created', function(e) {
        const path = e.path;
        path.set({
          selectable: true,
        });
        canvas.renderAll();
      });
    } else {
      canvas.isDrawingMode = false;
      canvas.off("path:created");
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
      left: pointer.x ,
      top: pointer.y ,
      fontSize: 90,
      fontFamily: "Roboto",
      fill:selectedColor,
      backgroundColor: "",
      editable: true,
      borderColor: "blue",
      cornerColor: "red",
      cornerSize: 60,
      hasBorders: false,
      hasControls: false,
    });
  
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    text.enterEditing();
    text.selectAll();
    setIsTextMode(false); //เพิ่มข้อความได้ครั้งเดียว
};
//คลิ๊กแล้วเริ่มวาด
export const handleMouseDown = (event, isDrawingRef, setStartPoint, selectedShape, selectedColor) => {
    if (event.target || !event.pointer || isDrawingRef.current) return;
    isDrawingRef.current = true;
    // console.log(event.pointer.x, event.pointer.y)
    // console.log(position, scale)
    const canvasX = (event.pointer.x) ;
    const canvasY = (event.pointer.y) ;
    // console.log(canvasX, canvasY)
    setStartPoint({ x: canvasX, y: canvasY });
};
//เลื่อนเมาส์
export const handleMouseMove = (event, isDrawingRef, startPoint, canvas, selectedShape, selectedColor) => {
    if (!isDrawingRef.current || !startPoint || !event.pointer) return;
    const pointer = canvas.getPointer(event.e, true);
    const x = (pointer.x) ;
    const y = (pointer.y) ;
    // const { x, y } = event.pointer;
    canvas.clearContext(canvas.contextTop);
    let shape;

    if (selectedShape === "circle") {
        shape = new fabric.Circle({
        left: startPoint.x,
        top: startPoint.y,
        radius: Math.hypot(x - startPoint.x, y - startPoint.y),
        fill: "transparent",
        stroke: selectedColor,
        strokeWidth: 10,
        evented: false,
        selectable: false,
        });
    } else if (selectedShape === "square") {
        shape = new fabric.Rect({
        left: Math.min(startPoint.x, x),
        top: Math.min(startPoint.y, y),
        width: Math.abs(x - startPoint.x),
        height: Math.abs(y - startPoint.y),
        fill: "transparent",
        stroke: selectedColor,
        strokeWidth: 10,
        evented: false,
        selectable: false,
        });
    } else if (selectedShape === "arrow") {
        shape = new fabric.Line([startPoint.x, startPoint.y, x, y], {
        stroke: selectedColor,
        strokeWidth: 10,
        evented: false,
        selectable: false,
        });
    }

    if (shape) {
        shape.render(canvas.contextTop);
    }
};

//ปล่อยเมาส์แล้วสร้าง shape
export const handleMouseUp = (event, isDrawingRef, startPoint, canvas, selectedShape, selectedColor) => {
    if (!isDrawingRef.current || !startPoint || !event.pointer) return;
    const x = (event.pointer.x) ;
    const y = (event.pointer.y) ;
    // const { x, y } = event.pointer;
    let shape;
    if (selectedShape === "circle") {
        const radius = Math.hypot(x - startPoint.x, y - startPoint.y);
        shape = new fabric.Circle({
            left: startPoint.x,
            top: startPoint.y,
            radius: radius,
            fill: "transparent",
            stroke: selectedColor,
            strokeWidth: 10,
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
            strokeWidth: 10,
            selectable: true,
        });
    }else if (selectedShape === "arrow") {
        shape = createArrow(startPoint, { x, y }, selectedColor);
      }

    if (shape) {
        shape.set({
            evented: true,
            hasControls: true,
            hasBorders: true,
        });
        canvas.add(shape);
        canvas.renderAll();
    }
    isDrawingRef.current = false;
};
//สร้างลูกศร
export const createArrow = (startPoint, endPoint, selectedColor) => {
    const angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x) * (180 / Math.PI);
    const headLength = 40; // ความยาวของหัวลูกศร
    // สร้างเส้นลูกศร
    const line = new fabric.Line([startPoint.x, startPoint.y, endPoint.x, endPoint.y], {
        stroke: selectedColor,
        strokeWidth: 10,
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
        selectable: true,
        evented: false,
    });
    // รวมเส้นและหัวลูกศรเป็นกลุ่ม
    const arrow = new fabric.Group([line, arrowHead], {
        selectable: true,
        hasControls: true,
        hasBorders: true,
    });
    return arrow;
};
//measurement
export const handleMeasurementLine = (event, canvas, selectedShape, selectedColor, scale) => {
    if (selectedShape !== "measurement") return;

    const pointer = canvas.getPointer(event.e);
    const startPoint = { x: pointer.x , y: pointer.y  };

    //เส้นหลัก
    const line = new fabric.Line([startPoint.x, startPoint.y, startPoint.x, startPoint.y], {
        stroke: "#FFDE37",
        strokeWidth: 10,
        selectable: false,
        evented: false,
    });

    //ขีดปลายเส้น
    const startTick = new fabric.Line([startPoint.x, startPoint.y - 20, startPoint.x, startPoint.y + 20], {
        stroke: "#FFDE37",
        strokeWidth: 10,
        selectable: false,
        evented: false,
    });

    const endTick = new fabric.Line([startPoint.x, startPoint.y - 20, startPoint.x, startPoint.y + 20], {
        stroke: "#FFDE37",
        strokeWidth: 10,
        selectable: false,
        evented: false,
    });

    //ขีดกลางเส้น
    const tickMark = new fabric.Line([startPoint.x, startPoint.y - 10, startPoint.x, startPoint.y + 10], {
        stroke: "#FFDE37",
        strokeWidth: 10,
        selectable: false,
        evented: false,
    });

    //ข้อความ
    const text = new fabric.Textbox("0 mm", {
        left: startPoint.x,
        top: startPoint.y + 15, //อยู่ใต้เส้น
        fontSize: 60,
        fontFamily: "Roboto",
        fill: "#FFDE37",
        backgroundColor: "black",
        padding: 5,
        width: 300, // กำหนดความกว้างให้พอเหมาะ
        textAlign: "center",
        selectable: false,
        evented: false,
    });

    canvas.add(line, startTick, endTick, tickMark, text);

    const updateMeasurement = (moveEvent) => {
        const pointer = canvas.getPointer(moveEvent.e);
        const x = pointer.x ;
        const y = pointer.y ;
        line.set({ x2: x, y2: y });

        //ขีดที่ปลายเส้น
        endTick.set({ x1: x, y1: y - 20, x2: x, y2: y + 20 });

        //ขีดกลางเส้น
        const midX = (startPoint.x + x) / 2;
        const midY = (startPoint.y + y) / 2;
        tickMark.set({ x1: midX, y1: midY - 10, x2: midX, y2: midY + 10 });

        //คำนวณระยะทาง
        const distance = Math.hypot(x - startPoint.x, y - startPoint.y);
        const distanceInMM = (distance / 10).toFixed(2); // สมมติ 1px = 0.1mm
        text.set({ text: `${distanceInMM} mm`, left: midX, top: midY + 15 });

        canvas.renderAll();
    };

    const stopMeasurement = () => {
        canvas.off("mouse:move", updateMeasurement);
        canvas.off("mouse:up", stopMeasurement);
        //grouping
        const measurementGroup = new fabric.Group([line, startTick, endTick, tickMark, text], {
            selectable: true,
            evented: false,
            hasControls: false,
            hasBorders: false,
            hoverCursor: "move",
        });

        canvas.remove(line, startTick, endTick, tickMark, text);
        canvas.add(measurementGroup);
    };
    
    canvas.on("mouse:move", updateMeasurement);
    canvas.on("mouse:up", stopMeasurement);
};
