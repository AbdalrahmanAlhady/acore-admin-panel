import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Typography variant="h1" className="!text-6xl !font-bold !mb-4">
        404
      </Typography>
      <Typography variant="h5" className="!mb-8 !text-gray-600">
        Page Not Found
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/books")}
        className="!rounded-xl !px-6 !py-2"
      >
        Go Back to Books
      </Button>
    </div>
  );
}
