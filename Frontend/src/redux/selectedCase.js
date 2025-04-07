import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCases: [],
  selectedAN: [],
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
    setSelectedAN: (state, action) => {
      state.selectedAN = action.payload;
    },
    resetSelectedAN: (state) => {
      state.selectedAN = null;
    }
  },
});

export const { toggleCaseSelection, setSelectedCases,setSelectedAN,resetSelectedAN } = selectedCasesSlice.actions;
export default selectedCasesSlice.reducer;