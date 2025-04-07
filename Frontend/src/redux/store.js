import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "./auth";
import patientReducer from "./patient";
import visualizeReducer from "./visualize";
import selectedCasesReducer from "./selectedCase"
import selectedImageReducer from "./selectedImage";

const authPersistConfig = {
  key: "auth",
  storage,
};

const patientPersistConfig = {
  key: "patient",
  storage,
};

const selectedCasesPersistConfig = {
  key: "selectedCases",
  storage,
};

const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    patient: persistReducer(patientPersistConfig, patientReducer),
    selectedCases: persistReducer(selectedCasesPersistConfig, selectedCasesReducer),
    visualize: visualizeReducer,
    selectedImage: selectedImageReducer,
  },
});


const persistor = persistStore(store);

export {store, persistor};