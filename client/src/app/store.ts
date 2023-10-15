import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import globalReducer from "../state";
import { api } from "@/state/api";

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: { global: globalReducer, [api.reducerPath]: api.reducer },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

setupListeners(store.dispatch);
