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

export const addBook = createAsyncThunk("books/addBook", async (data) => {
  const res = await axios.post("http://localhost:4000/books", data);
  return res.data;
});

export const delBook = createAsyncThunk("books/delBook", async (id) => {
  await axios.delete(`http://localhost:4000/books/${id}`);
  return id;
});

export const editBook = createAsyncThunk(
  "books/editBook",
  async ({ id, title, author, genre, price, year }) => {
    const res = await axios.patch(`http://localhost:4000/books/${id}`, {
      title,
      author,
      genre,
      price,
      year,
    });
    return res.data;
  }
);

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
    [addBook.fulfilled]: (state, action) => {
      bookEntity.addOne(state, action.payload);
    },
    [delBook.fulfilled]: (state, action) => {
      bookEntity.removeOne(state, action.payload);
    },
    [editBook.fulfilled]: (state, action) => {
      bookEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    },
  },
});

export const bookSelector = bookEntity.getSelectors((state) => state.book);
export default bookSlice.reducer;
