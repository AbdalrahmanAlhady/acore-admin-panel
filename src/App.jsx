
import { RouterProvider } from "react-router-dom";
import router from "./components/routes";
import { useEffect } from "react";
import { getBooks, saveBooks } from "./components/Books/books.service";
import defaultBooks from "./data/defaultBooks";

function App() {
  useEffect(() => {
    const booksData = getBooks();
    if (booksData.books.length === 0) {
      saveBooks(defaultBooks);
    }
  }, []);
  return (
      <RouterProvider router={router} />
  );
}

export default App;
