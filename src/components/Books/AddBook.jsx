import {
  FormControl,
  Box,
  Button,
  FormLabel,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";


import {
  addBook,
  checkBookCoverDimensions,
  getBookById,
  updateBook,
} from "./books.service";
import { useEffect, useState } from "react";

import EmptyBookCover from "../shared/emptyBookCover";
import { FormSelect } from "../shared/formSelectField";
import { FormTextField } from "../shared/formTextField";
import { FileUpload } from "@mui/icons-material";

const categories = ["Fiction", "Non-Fiction", "Science", "History"];
const versions = ["1.0", "1.1", "2.0"];

const AddBook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isValidCover, setIsValidCover] = useState(false);
  const [pdfInfo, setPdfInfo] = useState(null);
  const [mode, setMode] = useState("add");
  const [isLoading, setIsLoading] = useState(false);
  const [editedBook, setEditedBook] = useState({});

  const {
    setValue,
    handleSubmit,
    control,
    reset,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      author: "",
      category: "",
      price: "",
      version: "",
      olderVersion: "",
      edition: "",
      isbn: "",
      releaseDate: "",
      brief: "",
      cover: null,
      pdf: null,
      noOfPages: 0,
      avgReadingTime: 0,
      mode: "add", // Add mode to form state
    },
  });

  const noOfPages = watch("noOfPages");
  const currentMode = watch("mode");

  // Calculate avgReadingTime based on noOfPages
  useEffect(() => {
    if (currentMode === "add") {
      const calculatedTime = Math.max((noOfPages * 2) / 60, 0); // Ensure non-negative
      setValue("avgReadingTime", Number(calculatedTime.toFixed(2))); // Round to 2 decimals
    }
  }, [noOfPages, setValue, currentMode]);

  // Fetch book data for edit mode
  useEffect(() => {
    const fetchBookData = async () => {
      if (!id) return;

      setIsLoading(true);

      const book = await getBookById(id);
      if (book) {
        setEditedBook(book);
        setMode("edit");
        setValue("mode", "edit");

        reset({
          title: book.title || "",
          author: book.author || "",
          category: book.category || "",
          price: book.price || "",
          version: book.version || "",
          olderVersion: book.olderVersion || "",
          edition: book.edition || "",
          isbn: book.isbn || "",
          releaseDate: book.releaseDate || "",
          coverUrl: book.coverUrl || "",
          pdfUrl: book.pdfUrl || "",
          brief: book.brief || "",
          noOfPages: parseInt(book.noOfPages) || 0,
          avgReadingTime: parseFloat(book.avgReadingTime) || 0,
          mode: "edit",
        });
      } else {
        throw new Error("Book not found");
      }
    };
    fetchBookData();
    // Cleanup function
    return () => {
      reset();
      setEditedBook({});
      setIsValidCover(false);
      setPdfInfo(null);
    };
  }, [id, reset, setValue, setError, navigate]);
  const handleCoverChange = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsValidCover(false);
    const result = await checkBookCoverDimensions(file);
    if (result === true) {
      setIsValidCover(true);
      field.onChange(file);
      clearErrors("cover");
    } else {
      setError("cover", {
        type: "dimensions",
        message: result,
      });
      field.onChange(null);
    }
  };
  const handlePdfChange = async (e, field) => {
    const file = e.target.files[0];
    if (!file) {
      field.onChange(null);
      setError("pdf", {
        type: "required",
        message: "PDF file is required",
      });
      setPdfInfo(null);
      return;
    } else {
      field.onChange(file);
      setPdfInfo({
        name: file?.name,
        type: file?.type,
        size: file?.size,
      });
      clearErrors("pdf");
    }
  };

  const onSubmit = (data) => {
    if (mode === "edit") {
      updateBook(id, data);
    } else {
      addBook(data);
    }
    navigate("/books");
  };

  const onCancel = () => {
    reset();
    navigate("/books");
  };

  return (
    <>
      <Typography
        level="h1"
        className="w-fit !text-gray-600 !text-3xl !font-bold !mb-2 !ml-2"
      >
        Add Book
      </Typography>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 rounded-xl shadow-md flex flex-row justify-between gap-10"
      >
        <div className="left flex flex-col w-1/2 gap-4 ">
          <FormTextField
            formElementColor={true}
            name="title"
            control={control}
            errors={errors}
            label="Book Title"
            required
          />

          <FormTextField
            formElementColor={true}
            name="author"
            control={control}
            errors={errors}
            label="Book Author"
            required
          />

          <FormSelect
            formElementColor={true}
            name="category"
            control={control}
            errors={errors}
            label="Categories"
            options={categories}
            required
            className="m-4"
          />
          <FormTextField
            formElementColor={true}
            name="noOfPages"
            control={control}
            errors={errors}
            label="Book Number of Pages"
            type="number"
            required
          />
          <FormTextField
            formElementColor={true}
            name="avgReadingTime"
            control={control}
            errors={errors}
            label="Book Average Reading Time/Hour"
            type="number"
            required
            disabled={true}
            helperText="Calculated based on number of pages"
          />

          <FormTextField
            formElementColor={true}
            name="price"
            control={control}
            errors={errors}
            label="Book Price"
            type="number"
            required
            rules={{
              required: "Book price is required",
              validate: {
                validPrice: (value) => {
                  // Check if value is a valid number with max 2 decimal places
                  if (!/^\d+(\.\d{0,2})?$/.test(value)) {
                    return "Price must have maximum 2 decimal places";
                  }
                  // Check if value is positive
                  if (parseFloat(value) <= 0) {
                    return "Price must be greater than 0";
                  }
                  return true;
                },
              },
              max: {
                value: 9999.99,
                message: "Price cannot exceed 9999.99",
              },
              min: {
                value: 0.01,
                message: "Price must be at least 0.01",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            helperText="Enter price with maximum 2 decimal places"
          />

          <FormTextField
            formElementColor={true}
            name="version"
            control={control}
            errors={errors}
            label="Book Version"
            required
            rules={{
              required: "Book version is required",
              pattern: {
                value: /^[a-zA-Z0-9_.-]+$/,
                message: "Invalid version format",
              },
            }}
          />

          <FormSelect
            formElementColor={true}
            name="olderVersion"
            control={control}
            errors={errors}
            label="Book Older Version"
            options={versions}
            className="m-4"
          />

          <FormTextField
            name="edition"
            formElementColor={true}
            control={control}
            errors={errors}
            label="Book Edition"
          />

          <FormTextField
            formElementColor={true}
            name="isbn"
            control={control}
            errors={errors}
            label="Book ISBN"
            required
            rules={{
              required: "Book ISBN is required",
              validate: {
                isbnFormat: (value) => {
                  // ISBN-13 pattern: ###-#-##-######-#
                  const isbn13Pattern = /^978-[0-9]-[0-9]{2}-[0-9]{6}-[0-9]$/;
                  // ISBN-10 pattern: #-##-######-#
                  const isbn10Pattern = /^[0-9]-[0-9]{2}-[0-9]{6}-[0-9X]$/;

                  if (isbn13Pattern.test(value) || isbn10Pattern.test(value)) {
                    return true;
                  }

                  return "ISBN must be in format: ###-#-##-######-# (ISBN-13) or #-##-######-# (ISBN-10)";
                },
              },
            }}
            helperText="Enter ISBN with or without dashes (e.g., 978-3-16-148410-0)"
          />

          <FormTextField
            formElementColor={true}
            name="releaseDate"
            control={control}
            errors={errors}
            label="Book Release Date"
            type="date"
          />
        </div>

        <div className="right flex flex-col  gap-4 w-1/2">
          {mode === "edit" && !isValidCover && (
            <EmptyBookCover coverUrl={editedBook.coverUrl} />
          )}
          {mode === "add" || (mode === "edit" && isValidCover) ? (
            <EmptyBookCover coverFile={isValidCover ? watch("cover") : null} />
          ) : null}

          <Typography
            level="body-xs"
            color="textSecondary"
            mt={3}
            fontWeight="semiBold"
            fontSize={14}
          >
            Best dimensions for book cover image are 128×200 or higher
          </Typography>
          <FileUpload
            name="cover"
            control={control}
            errors={errors}
            accept="image/*"
            label={
              mode === "edit" ? "Reupload Book Cover" : "Upload Book Cover"
            }
            required={mode === "edit" && editedBook.coverUrl ? false : true}
            variant="button"
            onChangeHandler={handleCoverChange}
          />

          <FormTextField
            formElementColor={true}
            name={"brief"}
            control={control}
            errors={errors}
            label="Book Brief"
            required={true}
            multiline={true}
            maxLength={800}
            rows={4}
            rules={{
              required: "Book brief is required",
              maxLength: { value: 800, message: "Max 800 characters" },
            }}
          />
          {!pdfInfo && (
            <FileUpload
              name="pdf"
              control={control}
              errors={errors}
              accept=".pdf"
              label="Upload Book PDF"
              hint="Only PDF files accepted"
              required={mode === "edit" && editedBook.pdfUrl ? false : true}
              variant="box"
              onChangeHandler={handlePdfChange}
            />
          )}
          {pdfInfo && (
            <div className="pdf-name-preview !flex !flex-col !items-center !gap-4 !border-dashed !border-2 !border-gray-300 !rounded-lg !p-2 hover:!border-gray-500 cursor-pointer">
              <div className="flex flex-row w-full justify-center items-center gap-3">
                <AttachFileIcon className="!text-gray-500 " />
                <Typography
                  level="body-xl"
                  mt={1}
                  color="text.primary"
                  fontSize={24}
                  className="!m-0"
                >
                  {watch("pdf") ? watch("pdf").name : "No PDF file selected"}
                </Typography>
                <IconButton
                  onClick={() => {
                    setPdfInfo(null);
                  }}
                >
                  <HighlightOffOutlinedIcon color="error" />
                </IconButton>
              </div>
            </div>
          )}
          {mode === "edit" && !pdfInfo && editedBook.pdfUrl && (
            <div className="pdf-name-preview !flex !flex-col !items-center !gap-4 !border-dashed !border-2 !border-gray-300 !rounded-lg !p-2 hover:!border-gray-500 cursor-pointer">
              <div className="flex flex-row w-full justify-center items-center gap-3">
                <IconButton
                  onClick={() => {
                    window.open(editedBook.pdfUrl, "_blank");
                  }}
                >
                  <VisibilityIcon color="primary" className="!mr-3" />
                  <Typography
                    level="body-xl"
                    mt={1}
                    color="text.primary"
                    fontSize={24}
                    className="!m-0"
                  >
                    View Current PDF
                  </Typography>
                </IconButton>
              </div>
            </div>
          )}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: "auto",
            }}
          >
            <Button
              variant="contained"
              onClick={onCancel}
              className="!bg-gray-300 !rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="!rounded-xl"
            >
              {mode === "edit" ? "Update" : "Save"}
            </Button>
          </Box>
        </div>
      </form>
    </>
  );
};

export default AddBook;
