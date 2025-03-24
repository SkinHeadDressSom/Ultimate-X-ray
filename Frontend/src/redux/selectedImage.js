import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedImageId: null,
};

const selectedImageSlice = createSlice({
  name: "selectedImage",
  initialState,
  reducers: {
    setSelectedImageId: (state, action) => {
      state.selectedImageId = action.payload;
    },
    clearSelectedImageId: (state) => {
      state.selectedImageId = null;
    },
  },
});

export const { setSelectedImageId, clearSelectedImageId } =
  selectedImageSlice.actions;

export default selectedImageSlice.reducer;
