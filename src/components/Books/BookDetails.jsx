import { useNavigate, useParams } from "react-router-dom";
import { getBookById, getBooks } from "./books.service";

import { Box, Button, Chip, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import DeleteModal from "../shared/deleteModal";
import EmptyBookCover from "../shared/emptyBookCover";

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    async function fetchBook() {
      try {
        const bookData = await getBookById(id);
        setBook(bookData);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [id]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    const suffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${suffix(day)} of ${month} ${year}`;
  };
  const onEdit = () => {
    navigate(`/editBook/${book.id}`);
  };
  const onDelete = () => {};

  return (
    <>
      <Typography
        level="h1"
        className="w-fit !text-gray-600 !text-4xl !font-bold !mb-5"
      >
        Book Details
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : book ? (
        <div className="container bg-white shadow-md rounded-xl p-10 flex flex-col md:flex-row gap-8 w-full h-full">
          <div className="grid grid-cols-4 grid-rows-5 gap-4 w-full h-full">
            <div className="row-span-2">
              <EmptyBookCover coverUrl={book.coverUrl || ""} />
            </div>
            <div className="col-start-2 row-start-1 row-span-2">
              <h2 className="text-2xl font-bold mb-10">{book.title}</h2>
              <div className=" flex justify-around">
                <div className="flex flex-col space-x-4 text-gray-600">
                  <span className="text-blue-700 font-bold text-3xl mr-0">
                    {book.noOfPages}
                  </span>
                  <span className="font-bold text-gray-400 text-xl">Pages</span>
                </div>
                <div className="flex flex-col space-x-4 text-gray-600">
                  <span className="text-blue-700 font-bold text-3xl mr-0">
                    {book.avgReadingTime}h
                  </span>
                  <span className="font-bold text-gray-400 text-xl">
                    To read
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-2 row-span-2 col-start-1 row-start-3 flex flex-col gap-4">
              <p className="w-fit text-gray-500 mt-10">
                By {book.author} | {formatDate(book.releaseDate)}
              </p>
              <p className="text-blue-700 font-bold w-fit">${book.price}</p>
              <p className="text-gray-500  w-fit">ISBN: {book.isbn}</p>
              <p className="text-gray-500  w-fit">Version: {book.version}</p>
              <Chip
                className="w-fit !text-gray-500"
                color="default"
                label={book.category}
              />
            </div>
            <div className="col-start-4 row-start-1">
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: 2,
                }}
              >
                <DeleteModal
                  bookId={book.id}
                  triggerButton={
                    <Button
                      type="submit"
                      variant="contained"
                      color="error"
                      className="!rounded-xl !normal-case !font-bold !p-3"
                      onClick={onDelete}
                    >
                      Delete
                    </Button>
                  }
                />

                <Button
                  variant="contained"
                  onClick={onEdit}
                  className=" !rounded-xl !normal-case !h-12 !font-bold !p-3 "
                  color="primary"
                >
                  Edit
                </Button>
              </Box>
            </div>
            <div className="row-span-2 col-start-3 row-start-3">
              <Typography className="w-fit !text-gray-400 !text-2xl !mt-10 !mb-5 !font-bold">
                Brief
              </Typography>
              <p className="text-gray-500 w-fit text-left">{book.brief}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>Book not found</div>
      )}
    </>
  );
}
