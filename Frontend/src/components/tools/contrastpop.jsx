import React, { useState } from "react";
import { Typography, Box } from "@mui/material";

const ContrastPopup = () => {
  const [contrast, setContrast] = useState(0);

  // ฟังก์ชั่นคำนวนปรับสีตามค่าContrast
  const calculateContrast = (value) => {
    return value >= 0 ? 1 + (value / 20) * 4 : 1 + (value / 100);
  };
  // -------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <Box className="p-4 bg-white rounded-lg shadow-md w-64 margin-center" sx={{ position: "relative" }}>

      {/* อันนี้ไว้เชื่อมต่อกับรูปภาพเปลี่ยนวิธีเอาให้ปรับตามรูปที่เลือที่กำลังแสดง */}
      {/* <ImageUploader onUpload={setImage} />
      {image && <img src={image} alt="Uploaded" style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8, filter: `contrast(${calculateContrast(contrast)})` }} />} */}
      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

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
          max="100"
          value={contrast}
          onChange={(e) => setContrast(parseInt(e.target.value, 10))}
          className="w-full accent-blue-600"
        />
      </div>
    </Box>

  );
};

export default ContrastPopup;