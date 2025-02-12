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
  
}) => {
  const tools = [
    { component: <SystemTools />, key: "systemTools" },
    { component: <Layout onLayoutChange={onLayoutChange} />, key: "layout" },
    { component: <ImageTools />, key: "imageTools" },
    {
      component: (
        <Annotaion
          setSelectedShape={setSelectedShape}
          isTextMode={isTextMode}
          setIsTextMode={setIsTextMode}
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
