import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setPosition } from "../redux/visualize";

const useDragAndDrop = (isDragMode) => {
  const dispatch = useDispatch();
  const [dragging, setDragging] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [start, setStart] = useState({ x: 0, y: 0 });

  const startDrag = useCallback(
    (e, index) => {
      if (!isDragMode) return;
      setDragging(true);
      setDraggingIndex(index);
      setStart({ x: e.clientX, y: e.clientY });
    },
    [isDragMode]
  );

  const onDrag = useCallback(
    (e, positions) => {
      if (!dragging || draggingIndex === null) return;

      const deltaX = e.clientX - start.x;
      const deltaY = e.clientY - start.y;

      //clone positions
      const newPositions = positions.map((pos, index) =>
        index === draggingIndex ? { ...pos } : pos
      );
  
      if (!newPositions[draggingIndex]) {
        newPositions[draggingIndex] = { x: 0, y: 0 };
      }
      //จำกัดแค่ขอบของ container
      const container = e.currentTarget.closest('[id^="container-"]');
      const image = document.getElementById("image-container");

      if (container && image) {
        const containerRect = container.getBoundingClientRect();
        const imageRect = image.getBoundingClientRect();
  
        let newX = newPositions[draggingIndex].x + deltaX;
        let newY = newPositions[draggingIndex].y + deltaY;

        const isImageWiderThanContainer = imageRect.width > containerRect.width;
        const isImageTallerThanContainer = imageRect.height > containerRect.height;
  
        //ถ้าภาพกว้างกว่าขอบให้เลื่อนซ้าย-ขวาได้อยู่
        if (isImageWiderThanContainer) {
          if (imageRect.left + deltaX <= containerRect.left && imageRect.right + deltaX >= containerRect.right) {
            newPositions[draggingIndex] = { ...newPositions[draggingIndex], x: newX };
          }
        } else {
          if (imageRect.left + deltaX >= containerRect.left && imageRect.right + deltaX <= containerRect.right) {
            newPositions[draggingIndex] = { ...newPositions[draggingIndex], x: newX };
          }
        }
  
        //ถ้าภาพสูงกว่าขอบให้เลื่อนขึ้น-ลงได้อยู่
        if (isImageTallerThanContainer) {
          if (imageRect.top + deltaY <= containerRect.top && imageRect.bottom + deltaY >= containerRect.bottom) {
            newPositions[draggingIndex] = { ...newPositions[draggingIndex], y: newY };
          }
        } else {
          if (imageRect.top + deltaY >= containerRect.top && imageRect.bottom + deltaY <= containerRect.bottom) {
            newPositions[draggingIndex] = { ...newPositions[draggingIndex], y: newY };
          }
        }
  
        dispatch(setPosition(newPositions));
        setStart({ x: e.clientX, y: e.clientY });
      }
    },
    [dragging, draggingIndex, start, dispatch]
  );

  const stopDrag = useCallback(() => {
    setDragging(false);
    setDraggingIndex(null);
  }, []);

  return { startDrag, onDrag, stopDrag, dragging };
};

export default useDragAndDrop;
