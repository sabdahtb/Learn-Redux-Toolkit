import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookSelector, getBooks } from "../features/bookSlice";

const Home = () => {
  const dispatch = useDispatch();
  const books = useSelector(bookSelector.selectAll);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <div>
      <h1 className="font-semibold text-2xl text-red-700">Redux Anime</h1>
      <h1 className="font-semibold text-sm text-red-700 mb-5">
        Wellcome to my Anime Book List
      </h1>
      {books.map((book) => (
        <div
          className="p-3 bg-white rounded-sm mb-3 max-w-lg shadow-md"
          key={book.id}
        >
          <p className="text-lg font-semibold">{book.title}</p>
          <p className="text-xs font-semibold text-gray-500">
            {book.author}({book.year}) ●{" "}
            <span className={book.genre}>{book.genre}</span>
          </p>
          <p className="text-sm font-semibold">Price : Rp.{book.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
