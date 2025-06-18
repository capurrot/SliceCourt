import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    slamTheme: "theme-australian",
  },
  reducers: {
    setSlamTheme(state, action) {
      state.slamTheme = action.payload;
    },
  },
});

export const { setSlamTheme } = themeSlice.actions;
export default themeSlice.reducer;
