import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  }
});

store.subscribe(() => {
  const userState = store.getState().user;
  localStorage.setItem("user", JSON.stringify(userState));
});