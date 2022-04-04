import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "../features/bookSlice";

export const store = configureStore({
  reducer: {
    book: bookSlice,
  },
});
