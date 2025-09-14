import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import addressReducer from "./addressSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    address: addressReducer,
  },
});
