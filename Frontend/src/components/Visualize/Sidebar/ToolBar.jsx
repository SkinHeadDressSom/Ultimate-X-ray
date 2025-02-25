import React from "react";
import SystemTools from "./tools/SystemTools";
import Layout from "./tools/Layout";
import ImageTools from "./tools/ImageTools";
import Annotaion from "./tools/Annotation";
import AIButton from "./tools/AI";

const Toolbar = ({
  onLayoutChange,
  setSelectedShape,
  isTextMode,
  setIsTextMode,
  onContrastChange,
  selectedColor,
  setSelectedColor,
  isAnnotationHidden,
  setIsAnnotationHidden,
  isDragMode,
  setIsDragMode,
  zoomIn,
  zoomOut,
  drag,
  onPointerClick,
  setOnPointerClick,
  isDrawMode,
  setIsDrawMode,
}) => {
  const tools = [
    { component: <SystemTools />, key: "systemTools" },
    { component: <Layout onLayoutChange={onLayoutChange} />, key: "layout" },
    {
      component: (
        <ImageTools
          onContrastChange={(value) => onContrastChange(value)}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          isDragMode={isDragMode}
          setIsDragMode={setIsDragMode}
          drag={drag}
          setIsTextMode={setIsTextMode}
          setSelectedShape={setSelectedShape}
          setOnPointerClick={setOnPointerClick}
          isDrawMode={isDrawMode}
          setIsDrawMode={setIsDrawMode}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      ),
      key: "imageTools",
    },
    {
      component: (
        <Annotaion
          setSelectedShape={setSelectedShape}
          isTextMode={isTextMode}
          setIsTextMode={setIsTextMode}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          isAnnotationHidden={isAnnotationHidden}
          setIsAnnotationHidden={setIsAnnotationHidden}
          onPointerClick={onPointerClick}
          setOnPointerClick={setOnPointerClick}
        />
      ),
      key: "annotation",
    },
    { component: <AIButton />, key: "aiButton" },
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-y-2 p-2">
      {tools.map(({ component, key }, index) => (
        <React.Fragment key={key}>
          {component}
          {index < tools.length - 1 && (
            <hr className="w-3/4 border-light-gray" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Toolbar;
