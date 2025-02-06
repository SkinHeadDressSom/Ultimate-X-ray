import React from "react";

const DisplayImage = ({ imageUrls, layout }) => {
  const filteredImages = imageUrls.filter((cases) => cases !== null);
  //จัดการ grid
  const gridStyles = {
    layout1: "grid-cols-1 grid-rows-1",
    layout2: "grid-cols-2 grid-rows-1",
    layout3: "grid-cols-2 grid-rows-2",
    layout4: "grid-cols-2 grid-rows-2",
  };

  return (
    <div className={`grid ${gridStyles[layout]} gap-1 w-full h-full p-2 `}>
      {filteredImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`x-ray-${index}`}
          className={`w-full h-full object-contain rounded-md ${
            layout === "layout3" && index === 0 ? "col-span-1 row-span-2" : ""
          }`}
        />
      ))}
    </div>
  );
};

export default DisplayImage;
