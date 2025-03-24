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

      const newPositions = [...positions];

      if (!newPositions[draggingIndex]) {
        newPositions[draggingIndex] = { x: 0, y: 0 };
      }

      newPositions[draggingIndex] = {
        x: newPositions[draggingIndex].x + deltaX,
        y: newPositions[draggingIndex].y + deltaY,
      };

      dispatch(setPosition(newPositions));

      setStart({ x: e.clientX, y: e.clientY });
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
