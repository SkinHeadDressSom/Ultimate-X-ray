import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "./auth";
import patientReducer from "./patient";
import visualizeReducer from "./visualize";
import selectedCasesReducer from "./selectedCase"
import selectedImageReducer from "./selectedImage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedPatientReducer = persistReducer(persistConfig, patientReducer);
const persistedCasesReducer = persistReducer(persistConfig, selectedCasesReducer)

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    patient: persistedPatientReducer,
    selectedCases: persistedCasesReducer,
    visualize: visualizeReducer,
    selectedImage: selectedImageReducer,
  },
});

export const persistor = persistStore(store);

export default store;