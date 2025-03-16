import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as CloseLine } from "../../../assets/topbar/closeLine.svg";
import { ReactComponent as CloseFill } from "../../../assets/topbar/closeFill.svg";
import { setSelectedImageId } from "../../../redux/selectedImage";

function Thumbnail({ item, onClose, onImageSelect }) {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const selectedImageId = useSelector(
    (state) => state.selectedImage.selectedImageId
  );
  return (
    <div className="w-full min-w-fit h-full border border-light-gray ">
      <div className="flex justify-between gap-2 items-center bg-light-blue border-b border-b-light-gray px-2 p-0.5 text-sm">
        <div className="flex gap-2 items-center text-sm">
          <span className="text-darkest-blue">{item.study_date}</span>
          <span className="text-darkest-blue">{item.time}</span>
        </div>
        <button
          onClick={() => onClose(item)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            <CloseFill className="w-4 h-auto" fill="#DC2626 " />
          ) : (
            <CloseLine className="w-4 h-auto" fill="#0d42c9" />
          )}
        </button>
      </div>
      <div className="flex flex-row flex-wrap gap-2  justify-center items-center py-1">
        {item.case_images.map((imageObj) => (
          <img
            key={imageObj.xn}
            src={imageObj.file_path}
            alt={imageObj.xn}
            onClick={() => {
              onImageSelect(imageObj.file_path);
              dispatch(setSelectedImageId(imageObj.xn));
            }}
            className={`w-20 h-20 object-cover rounded-md hover:cursor-pointer ${
              selectedImageId === imageObj.xn
                ? "border-2 border-vivid-blue"
                : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Thumbnail;
