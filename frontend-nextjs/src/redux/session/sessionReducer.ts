import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SessionState, User, UserRole } from "./types";

const initialState: SessionState = {
  loggedUser: null,
  loading: false,
  dashboardHashParams: "home",
  userRole: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setLoggedUser: (state, action: PayloadAction<User>) => {
      state.loggedUser = action.payload;
    },
    logout: (state) => {
      state.loggedUser = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setDashboardHashParams: (state, action: PayloadAction<string>) => {
      state.dashboardHashParams = action.payload;
    },
    cleanDashboardHashParams: (state) => {
      state.dashboardHashParams = "home";
    },
    setUserRole: (state, action: PayloadAction<UserRole>) => {
      state.userRole = action.payload;
    },
  },
});

export const {
  setLoggedUser,
  logout,
  setLoading,
  setDashboardHashParams,
  cleanDashboardHashParams,
  setUserRole,
} = sessionSlice.actions;
export default sessionSlice.reducer;
