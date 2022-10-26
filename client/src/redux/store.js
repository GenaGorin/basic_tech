import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { userSlice } from "./userSlice";
import { usersSlice } from "./usersSlice";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user"],
};

const reducer = combineReducers({
  user: userSlice.reducer,
  users: usersSlice.reducer,
});
const persistedReducers = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});
