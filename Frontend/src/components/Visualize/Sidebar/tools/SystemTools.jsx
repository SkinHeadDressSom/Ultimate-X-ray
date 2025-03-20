import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ButtonWithIcon from "../ButtonWithIcon";
import { SaveIcon, PrintIcon } from "../toolsdata";
import ReportPopup from "../Popup/reportPopup";
const API_URL = process.env.REACT_APP_BACKEND_URL;

const SystemTools = ({ canvasRef }) => {
  const [activeId, setActiveId] = useState(null);
  const [showReportPopup, setShowReportPopup] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  //รับxn
  const selectedImageId = useSelector(
    (state) => state.selectedImage.selectedImageId
  );
  //รับข้อมูลรูป
  const imageUrls = useSelector((state) => state.visualize.imageUrls);
  const { selectedPosition, contrast, brightness } = useSelector(
    (state) => state.visualize
  );
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
        setIsSaving(false);
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
      setIsSaving(true);
      const selectedCanvas = canvasRef.current[0];
      const imageUrl = imageUrls[0];
      await combineXRayAndAnnotation(selectedCanvas, imageUrl, "combined.png");
      setIsSaving(false);
    } else {
      setIsSaving(false);
    }
  };
  //รวมรูปX-rayกับAnnotation
  const combineXRayAndAnnotation = (canvas, imageUrl) => {
    if (!canvas || !imageUrl) {
      return;
    }
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    const img = new Image();
    img.src = imageUrl;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      tempCanvas.width = img.width;
      tempCanvas.height = img.height;
      const scaleX = img.width / canvas.width;
      const scaleY = img.height / canvas.height;
      //ผูกค่าcontrastกับรูป
      const imageContrast = contrast[imageUrl] || 0;
      const imageBrightness = brightness[imageUrl] || 0;
      // ฟังก์ชั่นคำนวนปรับสีตามค่าContrast
      const calculateContrast = (contrast) => {
        if (contrast >= 0) {
          return 1 + (contrast / 100) * 5; // ขยายค่าไปที่สูงสุดที่ 6 เมื่อ value = 100 และ หลัง * ต่ำกว่าค่าที่อยากได้ 1 หน่วยเสมอ
        } else {
          return 1 / (1 - contrast / 100); // ลดคอนทราสต์ลงแต่ไม่ให้ติดลบ
        }
      };
      const calculateBrightness = (brightness) => {
        return brightness / 100;
      };
      const contrastValue = calculateContrast(imageContrast);
      const brightnessValue = calculateBrightness(imageBrightness);
      tempCtx.filter = `contrast(${contrastValue}) brightness(${brightnessValue})`;
      tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);

      tempCtx.scale(scaleX, scaleY);
      tempCtx.drawImage(canvas, 0, 0);
      tempCtx.setTransform(1, 0, 0, 1, 0, 0);

      tempCanvas.toBlob((blob) => {
        if (blob) {
          uploadImageToDatabase(blob);
        } else {
          console.log("เกิดข้อผิดพลาดในการสร้าง Blob");
        }
      }, "image/png");
    };

    img.onerror = (error) => {
      console.error("Error loading image:", error);
    };
  };
  //เซฟขึ้น database
  const uploadImageToDatabase = async (blob) => {
    const formData = new FormData();
    formData.append(
      "image_file",
      new File([blob], "combined.png", { type: blob.type })
    );
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
            isActive={button.id === "save" ? isSaving : activeId === button.id}
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
