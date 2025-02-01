import React, { useState } from "react";
import { Slider, Typography, Box, Button } from "@mui/material";

const ImageUploader = ({ onUpload }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => onUpload(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, p: 2, borderRadius: 2, bgcolor: "#f5f5f5" }}>
      <Button variant="contained" component="label">
        Upload Image
        <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
      </Button>
    </Box>
  );
};

const ContrastPopup = () => {
  const [contrast, setContrast] = useState(5);
  const [image, setImage] = useState(null);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, p: 2, borderRadius: 2, bgcolor: "#f5f5f5" }}>
      <ImageUploader onUpload={setImage} />
      {image && <img src={image} alt="Uploaded" style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8 }} />}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="body1">Contrast</Typography>
        <Slider
          value={contrast}
          min={0}
          max={10}
          step={1}
          onChange={(e, newValue) => setContrast(newValue)}
          sx={{ width: 150 }}
        />
        <Typography variant="body2" sx={{ minWidth: 24 }}>{contrast}</Typography>
      </Box>
    </Box>
  );
};

export default ContrastPopup;
