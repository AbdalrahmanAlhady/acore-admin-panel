import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./../../components/Login/Login.jsx";
import Books from "./../../components/Books/Books.jsx";
import AddBook from "./../../components/Books/AddBook.jsx";
import BookDetails from "./../../components/Books/BookDetails.jsx";
import ProtectedLayout from "../Layout/protectedLayout.jsx";
import NotFoundPage from "../Layout/notFoundPage.jsx";
import Layout from "../Layout/layout.jsx";


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/books" replace />,
      },
      {
        path: "/login",
        element: localStorage.getItem("email") ? (
          <Navigate to="/books" replace />
        ) : (
          <Login />
        ),
      },
      {
        element: <ProtectedLayout />,
        children: [
          { path: "/books", element: <Books /> },
          { path: "/addBook", element: <AddBook /> },
          { path: "/editBook/:id", element: <AddBook /> },
          { path: "/bookDetails/:id", element: <BookDetails /> },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
