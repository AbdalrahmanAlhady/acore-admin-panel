import { useEffect } from "react";

export default function EmptyBookCover({ coverFile, coverUrl }) {
  useEffect(() => {
    if (coverFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const bookInput = document.querySelector(".book-input");
        bookInput.style.backgroundImage = `url(${e.target.result})`;
        bookInput.style.backgroundSize = "cover";
        bookInput.style.backgroundPosition = "center";
      };
      reader.readAsDataURL(coverFile);
    }
  }, [coverFile]);
  useEffect(() => {
    if (coverUrl) {
      const bookInput = document.querySelector(".book-input");
      bookInput.style.backgroundImage = `url(${coverUrl})`;
      bookInput.style.backgroundSize = "cover";
      bookInput.style.backgroundPosition = "center";
    }
  }, [coverUrl]);

  return (
    <>
      <style>
        {`
            .book-input {
              position: relative;
              width: 128px;
              height: 200px;
              background: white;
              border-radius: 16px;
              box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.1);
              cursor: pointer;
              align-self: center;
            }
            input[type="file"] {
              opacity: 0;
              width: 100%;
              height: 100%;
              cursor: pointer;
            }
          `}
      </style>
      <div className="book-input "></div>
    </>
  );
}
