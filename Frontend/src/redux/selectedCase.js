import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCases: [],
};

const selectedCasesSlice = createSlice({
  name: "selectedCases",
  initialState,
  reducers: {
    toggleCaseSelection: (state, action) => {
      const caseId = action.payload;
      if (state.selectedCases.includes(caseId)) {
        state.selectedCases = state.selectedCases.filter((id) => id !== caseId);
      } else {
        state.selectedCases.push(caseId);
      }
    },
    setSelectedCases: (state, action) => {
      state.selectedCases = action.payload.map((caseItem) => caseItem);
    },
  },
});

export const { toggleCaseSelection, setSelectedCases } = selectedCasesSlice.actions;
export default selectedCasesSlice.reducer;