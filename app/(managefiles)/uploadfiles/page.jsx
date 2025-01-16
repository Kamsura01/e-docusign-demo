"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";

const UploadFilesPage = () => {
  const [error, setError] = useState("");

  const handlePdfUpload = async (e) => {
    e.preventDefault();
    clearData();
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      setError(
        file.name + ": รูปแบบของเอกสารไม่ถูกต้อง ต้องเป็นไฟล์ .pdf เท่านั้น"
      );
      return;
    }
  };

  const clearData = () => {
    setError("");
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto font-prompt">
        <h1 className="text-3xl my-3">จัดการเอกสาร</h1>
        <hr className="my-3"></hr>
        <div className="flex w-full bg-slate-300 justify-start p-2">
          <input
            id="fileUpload"
            type="file"
            accept="application/pdf"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={handlePdfUpload}
          />
          {error && (
            <div
              role="alert"
              className="alert alert-error py-2 mx-2 content-center text-white w-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default UploadFilesPage;
