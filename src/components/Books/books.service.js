import { UploadClient } from "@uploadcare/upload-client";
import { bookStore } from "./booksStore";

export const getBooks = (page, itemsPerPage) => {
  const books = localStorage.getItem("books");
  const allBooks = books ? JSON.parse(books) : [];

  if (
    typeof page !== "number" ||
    typeof itemsPerPage !== "number" ||
    page < 0 ||
    itemsPerPage <= 0
  ) {
    return {
      count: allBooks.length,
      books: allBooks,
    };
  }

  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    count: allBooks.length,
    books: allBooks.slice(startIndex, endIndex),
  };
};
export const getBookById = (id) => {
  const allBooks = getBooks().books;
  return allBooks.find((book) => book.id === id);
};

export const saveBooks = (books) => {
  localStorage.setItem("books", JSON.stringify(books));
  bookStore.notify(books);
};

export const addBook = async (book) => {
  const allBooks = getBooks().books;
  const coverUrl = await uploadFile(book.cover);
  const pdfUrl = await uploadFile(book.pdf);
  const { cover, pdf, ...bookWithoutFiles } = book;
  const newBook = {
    ...bookWithoutFiles,
    coverUrl,
    pdfUrl,
    id: Math.floor(Math.random() * 1000000)+'',
  };
  const newBooksData = [...allBooks, newBook];
  saveBooks(newBooksData);
  return newBook;
};

export const updateBook = async (id, updatedBook) => {
  try {
    if (!id || !updatedBook) {
      throw new Error("Invalid parameters: id and updatedBook are required");
    }
    const allBooks = getBooks().books;
    const index = allBooks.findIndex((book) => book.id === id);
    if (index === -1) {
      throw new Error(`Book with id ${id} not found`);
    }
    const updatedBookData = { ...updatedBook };
    if (updatedBook.cover) {
      const coverUrl = await uploadFile(updatedBook.cover);
      updatedBookData.coverUrl = coverUrl;
    }
    if (updatedBook.pdf) {
      const pdfUrl = await uploadFile(updatedBook.pdf);
      updatedBookData.pdfUrl = pdfUrl;
    }
    const { cover, pdf, ...bookWithoutFiles } = updatedBookData;
    allBooks[index] = { ...bookWithoutFiles, id };
    saveBooks(allBooks);
    return allBooks[index];
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};
export const deleteBook = (id) => {
  const allBooks = getBooks().books;
  const filteredBooks = allBooks.filter((book) => book.id !== id);  
  saveBooks(filteredBooks);
};

export const searchBooks = (query) => {
  const booksData = getBooks();
  return (
    booksData.books.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    ) || "not found"
  );
};
export const uploadFile = async (fileData) => {
  try {
    const client = new UploadClient({ publicKey: "5ea81a76577871383b75" });
    const file = await client.uploadFile(fileData);
    const fileUrl = `https://ucarecdn.com/${file.uuid}/`;
    return fileUrl;
  } catch (error) {
    console.error("Upload failed:", error);
    throw new Error("File upload failed");
  }
};
export const checkBookCoverDimensions = (file) => {
  if (!file) {
    return "Book cover is required";
  }

  // ...existing code...

  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onerror = () => {
      console.error("Error loading image");
      URL.revokeObjectURL(img.src);
      resolve("Invalid image file");
    };

    img.onload = () => {
      URL.revokeObjectURL(img.src);

      if (img.width < 128 || img.height < 200) {
        const message = `Image dimensions must be at least 128×200 pixels. Current dimensions: ${img.width}×${img.height}`;
        resolve(message);
      }
      resolve(true);
    };
  });
};
