import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "../reducers/authSlice";
import themeReducer from "../reducers/themeSlice"; //

// Componi il root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
});

// Configurazione per redux-persist
const persistConfig = {
  key: "root",
  storage,
};

// Wrappa il root reducer con persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Crea lo store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Crea il persistor
export const persistor = persistStore(store);
