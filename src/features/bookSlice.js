import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getBooks = createAsyncThunk("books/getBooks", async () => {
  const res = await axios.get("http://localhost:4000/books");
  return res.data;
});

const bookEntity = createEntityAdapter({
  selectId: (book) => book.id,
});

const bookSlice = createSlice({
  name: "book",
  initialState: bookEntity.getInitialState(),
  extraReducers: {
    [getBooks.fulfilled]: (state, action) => {
      bookEntity.setAll(state, action.payload);
    },
  },
});

export const bookSelector = bookEntity.getSelectors((state) => state.book);
export default bookSlice.reducer;
