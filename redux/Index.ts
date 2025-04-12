
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PERSIST, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./store";

// Redux Persist Configuration
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

// Create Redux Store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, REHYDRATE],
      },
    }),
});

// Create Persistor
export const persistor = persistStore(store);

