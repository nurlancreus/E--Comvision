import { RootState } from "@/app/store";
import { type ModeType } from "@/theme";
import { createSlice } from "@reduxjs/toolkit";

interface GlobalStateType {
  mode: ModeType;
  userId: string;
}

const initialState: GlobalStateType = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const selectMode = (state: RootState) => state.global.mode;
export const selectUserId = (state: RootState) => state.global.userId;

export const { setMode } = globalSlice.actions;
export default globalSlice.reducer;
