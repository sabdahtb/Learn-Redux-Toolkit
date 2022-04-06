import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { bookSelector, delBook, getBooks } from "../features/bookSlice";
import Add from "./add";
import Edit from "./edit";

const Home = () => {
  const dispatch = useDispatch();
  const books = useSelector(bookSelector.selectAll);
  const [tambah, setTambah] = useState(false);
  const [book, setBook] = useState({});
  const [edit, setEdit] = useState(false);

  const handleDelete = (id, title) => {
    Swal.fire({
      text: `Want to delete ${title} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(delBook(id));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Book Successfully Deleted",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const tampilEdit = (book) => {
    setEdit(false);
    setBook(book);
    setEdit(true);
  };

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <div>
      <h1 className="font-semibold text-2xl text-red-700">Redux Anime</h1>
      <h1 className="font-semibold text-sm text-red-700 mb-5">
        Wellcome to my Anime Book List
      </h1>

      <button
        className="outline-none border-none rounded-sm bg-sky-500 text-white px-3 py-1 font-semibold mb-5"
        onClick={() => setTambah(!tambah)}
      >
        Add Books
      </button>

      {tambah ? <Add setTambah={setTambah} /> : ""}
      {edit ? <Edit book={book} edit={edit} setEdit={setEdit} /> : ""}

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
        {books.map((book) => (
          <div
            className="p-3 bg-white relative rounded-md shadow-md"
            key={book.id}
          >
            <p className="text-lg font-semibold">{book.title}</p>
            <p className="text-xs font-semibold text-gray-500">
              {book.author}({book.year}) ●{" "}
              <span className={book.genre}>{book.genre}</span>
            </p>
            <button
              className={`text-sm font-semibold mt-4 p-2 cursor-default rounded-md ${book.genre}s`}
            >
              Price : Rp.{book.price}
            </button>
            <div
              className="text-xs font-semibold text-orange-500 italic cursor-pointer mx-1 mt-2"
              onClick={() => tampilEdit(book)}
            >
              Edit Book
            </div>
            <span
              className="hapus"
              onClick={() => handleDelete(book.id, book.title)}
            >
              ✕
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
