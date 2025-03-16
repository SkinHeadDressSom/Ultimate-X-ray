import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  imageUrls: [],
  layout: "layout1",
  selectedPosition: 0,
  selectedShape: null,
  isTextMode: false,
  contrast: [],
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
      const { index, value } = action.payload;
      state.contrast = [...state.contrast];
      state.contrast[index] = value;
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
  },
});

export const {
  setImageUrls,
  setLayout,
  setSelectedPosition,
  setSelectedShape,
  setIsTextMode,
  setContrast,
  setSelectedColor,
  setIsAnnotationHidden,
  setScale,
  setPosition,
  setIsDragMode,
  setOnPointerClick,
  setIsDrawMode,
} = visualizeSlice.actions;

export default visualizeSlice.reducer;