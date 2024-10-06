import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import sessionReducer from "./session/sessionReducer";
import toastSlice from "./toast/toastSlice";

const rootReducer = combineReducers({
  toast: toastSlice,
  session: sessionReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export const useReduxState = () => useSelector((state: RootState) => state);
export type AppDispatch = typeof store.dispatch;
