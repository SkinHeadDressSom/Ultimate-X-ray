import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatient: (state, action) => {
      state.data = action.payload;
    },
    clearPatient: (state) => {
      state.data = null;
    },
  },
});

export const { setPatient, clearPatient } = patientSlice.actions;
export default patientSlice.reducer;