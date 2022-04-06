import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { editBook, getBooks } from "../features/bookSlice";

const Edit = ({ book, edit, setEdit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [genre, setGenre] = useState("");
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (edit) {
      setTitle(book.title);
      setAuthor(book.author);
      setYear(book.year);
      setPrice(book.price);
      setGenre(book.genre);
      setId(book.id);
    }
  }, [edit, book]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(editBook({ id, title, author, genre, price, year }));
    setTimeout(() => {
      setEdit(false);
      dispatch(getBooks());
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Edit Book Success",
        showConfirmButton: false,
        timer: 1500,
      });
    }, 100);
  };

  return (
    <div className="pt-7 pb-5 relative">
      <div
        className="absolute top-0 right-0 text-xs font-semibold text-red-700 italic cursor-pointer"
        onClick={() => setEdit(false)}
      >
        Cancel Edit
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          className="inputt"
          placeholder="Title..."
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="inputt"
          placeholder="Author..."
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="number"
          className="inputt"
          placeholder="Year..."
          required
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="number"
          className="inputt"
          placeholder="Price..."
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <select
          className="inputt"
          required
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">Genre...</option>
          <option value="action">Action</option>
          <option value="advanture">Advanture</option>
          <option value="magic">Magic</option>
        </select>
        <button type="submit" className="inputt bg-sky-300">
          Save Book
        </button>
      </form>
    </div>
  );
};

export default Edit;
