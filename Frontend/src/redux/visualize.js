import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  imageUrls: [],
  layout: "layout1",
  selectedPosition: 0,
  selectedShape: null,
  isTextMode: false,
  isContrastMode: false,
  isZoomMode: false,
  isAIMode: false,
  contrast: {},
  brightness: {},
  selectedColor: "white",
  isAnnotationHidden: false,
  scale: [1],
  position: [{ x: 0, y: 0 }],
  isDragMode: false,
  onPointerClick: true,
  isDrawMode: false,
  detectionBoxes: [],
  showDetectionBoxes: false,
  boxColors: {},
  annotationMap: {},
  isLoading: false,
  storeAnnotation: {},
};

const visualizeSlice = createSlice({
  name: 'visualize',
  initialState,
  reducers: {
    setImageUrls: (state, action) => {
      state.imageUrls = action.payload;
    
      action.payload.forEach((imageUrl) => {
        if (!(imageUrl in state.contrast)) {
          state.contrast[imageUrl] = 0;
        }
        if (!(imageUrl in state.brightness)) {
          state.brightness[imageUrl] = 100;
        }
      });
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
    setIsContrastMode: (state, action) => {
      state.isContrastMode = action.payload;
    },
    setIsZoomMode: (state, action) => {
      state.isZoomMode = action.payload;
    },
    setIsAIMode: (state, action) => {
      state.isAIMode = action.payload;
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
      state.brightness = {}; //ใช้ reset brightness
    },
    setDetectionBoxes: (state, action) => {
      state.detectionBoxes = action.payload;
    },
    setShowDetectionBoxes: (state, action) => {
      state.showDetectionBoxes = action.payload;
    },
    setBoxColors: (state, action) => {
      state.boxColors = { ...state.boxColors, ...action.payload };
    },    
    setAnnotationMap: (state, action) => {
      state.annotationMap = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setStoreAnnotation: (state, action) => {
      const { imageUrl, value } = action.payload; //ใช้ imageUrls เป็นคีย์
      state.storeAnnotation = { ...state.storeAnnotation, [imageUrl]: value };
    },  
  },
});

export const {
  setImageUrls,
  setLayout,
  setSelectedPosition,
  setSelectedShape,
  setIsTextMode,
  setIsContrastMode,
  setIsZoomMode,
  setIsAIMode,
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
  setDetectionBoxes,
  setShowDetectionBoxes,
  setBoxColors,
  setAnnotationMap,
  setIsLoading,
  setStoreAnnotation,
} = visualizeSlice.actions;

export default visualizeSlice.reducer;