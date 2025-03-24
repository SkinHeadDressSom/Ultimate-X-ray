import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as CloseLine } from "../../../assets/topbar/closeLine.svg";
import { ReactComponent as CloseFill } from "../../../assets/topbar/closeFill.svg";
import { ReactComponent as MagicWand } from "../../../assets/topbar/magicwand.svg";
import { setSelectedImageId } from "../../../redux/selectedImage";
import { setShowDetectionBoxes } from "../../../redux/visualize";

function Thumbnail({ item, onClose, onImageSelect, annotationMap }) {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const selectedImageId = useSelector(
    (state) => state.selectedImage.selectedImageId
  );
  const { showDetectionBoxes } = useSelector((state) => state.visualize);
  const [selectedAnnotationId, setSelectedAnnotationId] = useState(null);
  const [validImagePaths, setValidImagePaths] = useState({
    annotation: {},
    original: {},
  });

  //เช็คว่ามีไฟล์ภาพจริงๆไหม
  const checkImageExist = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  useEffect(() => {
    const checkImages = async () => {
      const newValidPaths = { annotation: {}, original: {} };
      for (const imageObj of item.case_images) {
        const originalValid = await checkImageExist(imageObj.file_path);
        newValidPaths.original[imageObj.xn] = originalValid;
        if (annotationMap[imageObj.xn]) {
          const annotationValid = await checkImageExist(
            annotationMap[imageObj.xn].file_path
          );
          newValidPaths.annotation[imageObj.xn] = annotationValid;
        }
      }
      setValidImagePaths(newValidPaths);
    };
    checkImages();
  }, [item, annotationMap]);

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
      <div className="flex flex-row flex-wrap gap-1 justify-center items-center py-1 px-1">
        {item.case_images.map((imageObj) => (
          <div key={imageObj.xn} className="relative flex flex-row gap-1">
            {/* original */}
            {validImagePaths.original[imageObj.xn] && (
              <img
                src={imageObj.file_path}
                alt={imageObj.xn}
                onClick={() => {
                  onImageSelect(imageObj.file_path);
                  dispatch(setSelectedImageId(imageObj.xn));
                  setSelectedAnnotationId(null);
                  dispatch(setShowDetectionBoxes(false));
                }}
                className={`w-20 h-20 object-cover rounded-md hover:cursor-pointer ${
                  selectedImageId === imageObj.xn
                    ? "border-2 border-vivid-blue"
                    : ""
                }`}
              />
            )}
            {/*  annotation_image*/}
            {annotationMap[imageObj.xn] &&
              validImagePaths.annotation[imageObj.xn] && (
                <div
                  onClick={() => {
                    onImageSelect(annotationMap[imageObj.xn].file_path);
                    setSelectedAnnotationId(imageObj.xn);
                    dispatch(setSelectedImageId(null));
                    dispatch(setShowDetectionBoxes(false));
                  }}
                >
                  <img
                    src={annotationMap[imageObj.xn].file_path}
                    alt="annotation"
                    className={`w-20 h-20 object-cover rounded-md hover:cursor-pointer ${
                      selectedAnnotationId === imageObj.xn
                        ? "border-2 border-vivid-blue"
                        : ""
                    }`}
                  />
                  <MagicWand
                    className="absolute w-6 h-6 right-0 top-0"
                    fill="#FFFDFD"
                  />
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Thumbnail;
