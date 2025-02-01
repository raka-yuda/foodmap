import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeState {
  themeVariant: "default" | "rounded" | "modern";
}

const initialState = {
  themeVariant: "rounded"
  // themeVariant: "default"
} as ThemeState;

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<ThemeState>) => {
      state.themeVariant = action.payload.themeVariant
    },
  },
});

export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer;