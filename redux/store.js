import { configureStore } from "@reduxjs/toolkit";
import authSliceLogin from "./async-slices/auth/authSlice";
import authSlice from "./slices/authSlice";
import pathName from "./path/pathName";
import inversionSlice from "./async-slices/inversionSlice";
import { userReducer } from "./async-slices/user/userReducer";
import dataSlice from "./async-slices/dataSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    session: authSliceLogin,
    path: pathName,
    inversiones: inversionSlice,
    user: userReducer,
    data: dataSlice, 
  }
})