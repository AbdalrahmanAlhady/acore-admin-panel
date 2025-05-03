import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { deleteBook } from "../Books/books.service";
import { useNavigate } from "react-router-dom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #ffff",
  borderRadius: "10px",
  p: 3,
  width: "50%",
  height: "20%",
  margin: "auto",
};

export default function DeleteModal({ triggerButton, bookId }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    deleteBook(bookId);
    handleClose();
    navigate("/books", { replace: true });
  };

  return (
    <div className="inline">
      {React.cloneElement(triggerButton, { onClick: handleOpen })}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-modal-title"
            className="text-gray-500 !font-bold !text-2xl"
          >
            Delete Book
          </Typography>
          <Typography
            id="modal-modal-description"
            className="text-gray-500 "
            sx={{ mt: 2 }}
          >
            Are you sure you want to delete this book?
          </Typography>
          <div className="flex justify-end mt-5">
            <Button
              onClick={handleClose}
              variant="contained"
              className="!ml-3 !rounded-xl !p-3 !font-bold"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              variant="contained"
              color="error"
              className="!ml-3 !rounded-xl !font-bold"
              sx={{ textTransform: "none" }}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
