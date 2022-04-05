import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addBook } from "../features/bookSlice";

const Add = ({ setTambah }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [genre, setGenre] = useState("");

  const dispatch = useDispatch();
  const data = {
    title: title,
    author: author,
    genre: genre,
    price: price,
    year: year,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBook(data));
    setTambah(false);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "New Book Successfully Added",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="pb-5">
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

export default Add;
