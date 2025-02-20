import React, { useState } from "react";
import { Typography, Box } from "@mui/material";

const ContrastPopup = () => {
  const [contrast, setContrast] = useState(0);
  const [image, setImage] = useState(null);

  // ฟังก์ชั่นคำนวนปรับสีตามค่าContrast
  const calculateContrast = (value) => {
    if (value >= 0) {
      return 1 + (value / 100) * 2; // ขยายค่าไปที่สูงสุด 3 เมื่อ value = 100
    } else {
      return 1 / (1 - value / 100); // ลดคอนทราสต์ลงแต่ไม่ให้ติดลบ
    }
  };

  // ฟังก์ชั่นอัปโหลดรูปภาพ
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImage(objectUrl);
    }
  };

  return (
    <Box className="p-4 bg-white rounded-lg shadow-md w-64 margin-center" sx={{ position: "relative" }}>
      <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />
      {image && (
        <img
          src={image}
          alt="Uploaded"
          style={{
            maxWidth: "100%",
            maxHeight: 200,
            borderRadius: 8,
            filter: `contrast(${calculateContrast(contrast)})`,
          }}
        />
      )}
      <Box sx={{ position: "absolute", top: 8, right: 8, bgcolor: "#fff", p: 1, borderRadius: 2, width: 50, height: 30, textAlign: "center", border: "1px solid black" }}>
        <Typography variant="body2" sx={{ textAlign: "center", lineHeight: "12px" }}>{contrast}</Typography>
      </Box>
      <label className="block text-gray-700 font-semibold mb-1">
        Contrast
      </label>

      <div className="flex items-center">
        <input
          type="range"
          min="-100"
          max="+100"
          value={contrast}
          onChange={(e) => setContrast(parseInt(e.target.value, 10))}
          className="w-full accent-blue-600"
        />
      </div>
    </Box>

  );
};

export default ContrastPopup;