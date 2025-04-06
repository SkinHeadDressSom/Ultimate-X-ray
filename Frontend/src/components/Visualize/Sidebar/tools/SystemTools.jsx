import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ButtonWithIcon from "../ButtonWithIcon";
import { SaveIcon, PrintIcon } from "../toolsdata";
import ReportPopup from "../Popup/reportPopup";
import { setIsLoading } from "../../../../redux/visualize";
const API_URL = process.env.REACT_APP_BACKEND_URL;

const SystemTools = ({ canvasRef }) => {
  const dispatch = useDispatch();
  const [activeId, setActiveId] = useState(null);
  const [showReportPopup, setShowReportPopup] = useState(false);
  const { detectionBoxes, showDetectionBoxes } = useSelector(
    (state) => state.visualize
  );

  //รับxn
  const selectedImageId = useSelector(
    (state) => state.selectedImage.selectedImageId
  );
  //รับข้อมูลรูป
  const {
    imageUrls,
    selectedPosition,
    contrast,
    brightness,
    isLoading,
    boxColors,
  } = useSelector((state) => state.visualize);
  //รับiconของปุ่ม
  const buttons = [
    { id: "save", icon: SaveIcon },
    { id: "print", icon: PrintIcon },
  ];
  //จัดการการคลิกปุ่ม
  const handleButtonClick = async (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
    if (id === "print") {
      setShowReportPopup((prev) => !prev);
    } else if (id === "save") {
      try {
        await handleSaveCanvas();
      } catch (error) {
        console.error("Error saving canvas:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    }
  };
  //เซฟรูป
  const handleSaveCanvas = async () => {
    if (
      canvasRef.current &&
      canvasRef.current.length > 0 &&
      imageUrls.length > 0
    ) {
      dispatch(setIsLoading(true));
      const selectedCanvas = canvasRef.current[0];
      const imageUrl = imageUrls[0];
      try {
        await combineXRayAndAnnotation(
          canvasRef.current[selectedPosition],
          imageUrl,
          boxColors,
          "combined.png"
        );
      } catch (error) {
        console.error("Error combining X-ray and Annotation:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
      //fetch saving annotation
    } else {
      dispatch(setIsLoading(false));
    }
  };
  //รวมรูปX-rayกับAnnotation
  const combineXRayAndAnnotation = (canvas, imageUrl, boxColors) => {
    return new Promise((resolve, reject) => {
      if (!canvas || !imageUrl) {
        reject("Canvas or imageUrl is missing");
        return;
      }
      //สร้าง canvas ชั่วคราว
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      const img = new Image();
      img.src = imageUrl;
      img.crossOrigin = "anonymous";
      img.onload = () => {
        //กำหนดขนาด canvas ชั่วคราวให้เท่ากับขนาดรูป
        tempCanvas.width = img.width;
        tempCanvas.height = img.height;
        const scaleX = img.width / canvas.width;
        const scaleY = img.height / canvas.height;
        //contrast and brightness
        const imageContrast = contrast[imageUrl] || 0;
        const imageBrightness = brightness[imageUrl] || 0;

        const calculateContrast = (contrast) =>
          contrast >= 0 ? 1 + (contrast / 100) * 5 : 1 / (1 - contrast / 100);
        const calculateBrightness = (brightness) => brightness / 100;

        tempCtx.filter = `contrast(${calculateContrast(
          imageContrast
        )}) brightness(${calculateBrightness(imageBrightness)})`;

        tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
        tempCtx.scale(scaleX, scaleY);
        tempCtx.drawImage(canvas, 0, 0);
        tempCtx.setTransform(1, 0, 0, 1, 0, 0);
        //Bounding Box
        if (detectionBoxes?.length > 0 && showDetectionBoxes) {
          //กำหนดตำแหน่งlabel
          detectionBoxes.forEach((box) => {
            const classColor = boxColors?.[box.class] || "yellow";
            tempCtx.strokeStyle = classColor; //สีกรอบ
            tempCtx.lineWidth = 8; //ความหนาของกรอบ

            const fontSize = 50; //ขนาดฟอนต์
            const padding = 35; //padding
            tempCtx.font = `${fontSize}px Arial`;
            const x = box.xmin;
            const y = box.ymin;
            const width = box.xmax - box.xmin;
            const height = box.ymax - box.ymin;

            //วาด bbox
            tempCtx.strokeRect(x, y, width, height);

            //label
            const label = `${box.class} ${box.confidence.toFixed(2)}`;

            //คำนวณขนาดข้อความ
            const textMetrics = tempCtx.measureText(label);
            const textWidth = textMetrics.width;
            const textHeight =
              textMetrics.actualBoundingBoxAscent +
              textMetrics.actualBoundingBoxDescent;

            //ตำแหน่งพื้นหลังข้อความ
            let textX = x;
            //เช็คว่าlabelจะเกินภาพมั้ย
            if (textX + textWidth + padding > tempCanvas.width) {
              //ถ้าออกนอกภาพให้ align ขวา
              textX = x + width - textWidth - padding;
              if (textX < 0) textX = 0;
            }

            const textY = y - textHeight - padding;
            const backgroundX = textX;
            const backgroundY = textY;

            //พื้นหลังข้อความ
            tempCtx.fillStyle = classColor;
            tempCtx.fillRect(
              backgroundX,
              backgroundY,
              textWidth + padding,
              textHeight + padding
            );

            //ข้อความ
            tempCtx.fillStyle = "black";
            tempCtx.fillText(label, textX + padding / 2, y - padding / 2);
          });
        }

        tempCanvas.toBlob((blob) => {
          if (blob) {
            uploadImageToDatabase(blob)
              .then(() => {
                console.log("Image uploaded successfully");
                resolve();
              })
              .catch((error) => {
                console.error("Error uploading image:", error);
                reject(error);
              });
          } else {
            console.error("Error creating Blob");
            reject("Error creating Blob");
          }
        }, "image/png");
      };

      img.onerror = (error) => {
        console.error("Error loading image:", error);
        reject(error);
      };
    });
  };
  //เซฟขึ้น database
  const uploadImageToDatabase = async (blob) => {
    const formData = new FormData();
    formData.append(
      "image_file",
      new File([blob], "combined.png", { type: blob.type })
    );
    formData.append("detection_data", JSON.stringify(detectionBoxes));
    try {
      const response = await axios.post(
        `${API_URL}/fetch-data/api/images/annotation/${selectedImageId}/save`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  //main component
  return (
    <div className="flex flex-col items-center justify-center bg-light-blue rounded-lg gap-y-2 p-2 w-full">
      <h1 className="text-dark-blue text-sm">System</h1>
      <div className="grid grid-cols-2 gap-2 items-center justify-between">
        {buttons.map((button) => (
          <ButtonWithIcon
            key={button.id}
            icon={button.icon}
            isActive={button.id === "save" ? isLoading : activeId === button.id}
            onClick={() => handleButtonClick(button.id)}
          />
        ))}
      </div>
      {showReportPopup && (
        <ReportPopup
          onClose={() => {
            setShowReportPopup(false);
            setActiveId(null);
          }}
        />
      )}
    </div>
  );
};

export default SystemTools;
