import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  imageUrls: [],
  layout: "layout1",
  selectedPosition: 0,
  selectedShape: null,
  isTextMode: false,
  contrast: {},
  brightness: {},
  selectedColor: "white",
  isAnnotationHidden: false,
  scale: [],
  position: [{ x: 0, y: 0 }],
  isDragMode: false,
  onPointerClick: true,
  isDrawMode: false,
};

const visualizeSlice = createSlice({
  name: 'visualize',
  initialState,
  reducers: {
    setImageUrls: (state, action) => {
      state.imageUrls = action.payload;
      state.brightness = action.payload.reduce((acc, imageUrl) => {
        acc[imageUrl] = 100; //ค่าเริ่มต้น=100
        return acc;
      }, {});
    },
    setLayout: (state, action) => {
      state.layout = action.payload;
    },
    setSelectedPosition: (state, action) => {
      state.selectedPosition = action.payload;
    },
    setSelectedShape: (state, action) => {
      state.selectedShape = action.payload;
    },
    setIsTextMode: (state, action) => {
      state.isTextMode = action.payload;
    },
    setContrast: (state, action) => {
      const { imageUrl, value } = action.payload; //ใช้ imageUrls เป็นคีย์
      state.contrast = { ...state.contrast, [imageUrl]: value };
    },   
    setBrightness: (state, action) => {
      const { imageUrl, value } = action.payload; //ใช้ imageUrls เป็นคีย์
      state.brightness = { ...state.brightness, [imageUrl]: value };
    },   
    setSelectedColor: (state, action) => {
      state.selectedColor = action.payload;
    },
    setIsAnnotationHidden: (state, action) => {
      state.isAnnotationHidden = action.payload;
    },
    setScale: (state, action) => {
      state.scale = action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    setIsDragMode: (state, action) => {
      state.isDragMode = action.payload;
    },
    setOnPointerClick: (state, action) => {
      state.onPointerClick = action.payload;
    },
    setIsDrawMode: (state, action) => {
      state.isDrawMode = action.payload;
    },
    resetContrast: (state) => {
      state.contrast = {}; //ใช้ reset contrast
    },
    resetBrightness: (state) => {
      state.contrast = {}; //ใช้ reset contrast
    },
  },
});

export const {
  setImageUrls,
  setLayout,
  setSelectedPosition,
  setSelectedShape,
  setIsTextMode,
  setContrast,
  setBrightness,
  resetContrast,
  resetBrightness,
  setSelectedColor,
  setIsAnnotationHidden,
  setScale,
  setPosition,
  setIsDragMode,
  setOnPointerClick,
  setIsDrawMode,
} = visualizeSlice.actions;

export default visualizeSlice.reducer;