import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    userData: null,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    userDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userDataSuccess(state, action) {
      state.loading = false;
      state.userData = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.userData = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  userDataStart,
  userDataSuccess,
  userDataFailure,
  logout,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
