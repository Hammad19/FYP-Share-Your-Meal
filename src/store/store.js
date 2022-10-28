import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import authSlice from "./slices/authSlice";
import foodSlice from "./slices/foodSlice";

const reducers = combineReducers({
  auth: authSlice,
  food: foodSlice
});

// const persistConfig = {
//   key: "root",
//   storage,
// };


// const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;