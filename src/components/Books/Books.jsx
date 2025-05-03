import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";

import { Add, Clear } from "@mui/icons-material";
import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Visibility } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import TablePagination from "@mui/material/TablePagination";
import { getBooks, searchBooks } from "./books.service";
import { TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { bookStore } from "./booksStore";
import DeleteModal from "../shared/deleteModal";

export default function Books() {
  const [booksData, setBooksData] = useState({ books: [], count: 0 });
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setBooksData(getBooks(newPage, 4));
  };
  const handleSearch = (event) => {
    let filteredBooks = searchBooks(searchQuery);
    setBooksData({ ...booksData, books: filteredBooks });
  };
  const handleClearSearch = (event) => {
    setSearchQuery(() => "");
    setBooksData(getBooks(page, 4));
  };
  useEffect(() => {
    if (Books.length === 0) {
      setBooksData(getBooks(0, 4));
    }
  }, []);
  useEffect(() => {
    const unsubscribe = bookStore.subscribe((updatedBooks) => {
      handleChangePage(null, 0);
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      <div>
        <Typography className="w-fit !text-gray-600 !font-bold !text-4xl !mb-5 mt-5">
          Books
        </Typography>
        <div className="flex flex-row w-full justify-between items-center mb-5 mt-5 ">
          <TextField
            size="small"
            className="!rounded-xl !bg-white !border-white"
            placeholder="Search…"
            sx={{
              backgroundColor: "white",
              "& .MuiOutlinedInput-root": {
                borderRadius: "5px",
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <>
                  <IconButton onClick={handleSearch}>
                    <Search />
                  </IconButton>
                  <IconButton onClick={handleClearSearch}>
                    <Clear />
                  </IconButton>
                </>
              ),
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Button
            className="w-1/7 !mb-5 !rounded-2xl !p-3  !font-bold !text-[16px]"
            size="lg"
            variant="contained"
            color="primary"
            onClick={() => {
              navigate("/addBook");
            }}
          >
            <Add className="mr-2 w-{11vw}" />
            Add Book
          </Button>
        </div>
        <TableContainer component={Paper} className="!rounded-xl">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Book Title</TableCell>
                <TableCell align="left">Book Category</TableCell>
                <TableCell align="left">Book Author</TableCell>
                <TableCell align="left">Book ISBN</TableCell>
                <TableCell align="left">Book Version</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {booksData.books.length>0 && booksData.books.map((book) => (
                <TableRow
                  key={book.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{book.title}</TableCell>
                  <TableCell align="left">{book.category}</TableCell>
                  <TableCell align="left">{book.author}</TableCell>
                  <TableCell align="left">{book.isbn}</TableCell>
                  <TableCell align="left">{book.version}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="view"
                      onClick={() => {
                        navigate(`/bookDetails/${book.id}`);
                      }}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        navigate(`/editBook/${book.id}`);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <DeleteModal
                      bookId={book.id}
                      triggerButton={
                        <IconButton aria-label="delete">
                          <Delete />
                        </IconButton>
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
              {booksData.books.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" className="h-40 !text-xl !text-blue-700" >
                    No books found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={booksData.count} // Ensure this is a valid number
            rowsPerPage={4}
            page={page}
            rowsPerPageOptions={4} // Use an array here
            onPageChange={handleChangePage}
          />
        </TableContainer>
      </div>
    </>
  );
}
