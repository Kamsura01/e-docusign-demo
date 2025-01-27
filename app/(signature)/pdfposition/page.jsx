"use client";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Navbar from "@/components/Navbar";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const NewDocumentPage = () => {
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // Uploaded File
  const [fileName, setFileName] = useState("");
  const [numPages, setNumPages] = useState(0); // Total Pages
  const [pageNumber, setPageNumber] = useState(1); // Current Page
  const [positionID, setPositionID] = useState(1);
  const [positions, setPositions] = useState([]);

  const handlePdfUpload = async (e) => {
    e.preventDefault();
    clearData();
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      setError(file.name + " File Type is wrong.");
      setDisplay(false);
      return;
    }

    setFileName(file.name);
    setSelectedFile(file);
    setDisplay(true);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onPageLoadSuccess = () => {
    const canvas = document.querySelectorAll("canvas");

    if (canvas.length > 1) {
      const canvasWidth = canvas[1].getBoundingClientRect().width;
      const canvasHeight = canvas[1].getBoundingClientRect().height;
      canvas[0].width = canvasWidth;
      canvas[0].height = canvasHeight;

      for (let i = 0; i < positions.length; i++) {
        const id = positions[i].id;
        const page = positions[i].page;
        const x = positions[i].x;
        const y = positions[i].y;

        if (page == pageNumber) {
          drawPostionMarking(canvas[0], id, x, y);
        }
      }
    }
  };

  const addSignaturePosition = (e) => {
    const canvas = document.querySelector("canvas#signatureCanvas");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPositionID(() => positionID + 1);

    const selectedPosition = {
      id: positionID,
      fileName: fileName,
      page: pageNumber,
      width: rect.width,
      height: rect.height,
      x: x,
      y: y,
    };

    drawPostionMarking(canvas, positionID, x, y);
    setPositions((positions) => [...positions, selectedPosition]);
  };

  const removeSignaturePosition = (index) => {
    const canvas = document.querySelector("canvas#signatureCanvas");

    removePositionMarking(canvas, positions[index].x, positions[index].y);
    setPositions((i) => i.filter((_, i) => i !== index));
  };

  const drawPostionMarking = (canvas, positionID, x, y) => {
    if (canvas) {
      // Draw
      const context = canvas.getContext("2d");
      // Add Text
      context.fillStyle = "#22c55e";
      context.font = "30px Arial";
      context.fillText(positionID, x - 8, y + 10);
      // Add Fill
      context.beginPath();
      context.arc(x, y, 25, 0, Math.PI * 2);
      context.lineWidth = 3;
      context.strokeStyle = "#22c55e";
      context.stroke();
    }
  };

  const removePositionMarking = (canvas, x, y) => {
    if (canvas) {
      // Draw
      const context = canvas.getContext("2d");
      // Remove Fill
      context.clearRect(x - 55 / 2, y - 55 / 2, 55, 55);
    }
  };

  const clearData = () => {
    setError("");
    setSelectedFile(null);
    setFileName("");
    setNumPages(0);
    setPageNumber(1);
    setPositionID(1);
    setPositions([]);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto font-prompt">
        <h1 className="text-3xl my-3">เอกสารใหม่</h1>
        <hr className="my-3"></hr>
        <div className="flex w-full bg-slate-300 justify-start">
          <div className="flex my-2 mx-4">
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
                className="alert alert-error py-2 mx-2 content-center text-white"
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
            <button
              className="btn btn-outline mx-3"
              style={{ display: display ? "inline-block" : "none" }}
              disabled={pageNumber <= 1}
              onClick={() =>
                setPageNumber((prevPageNumber) => prevPageNumber - 1)
              }
            >
              กลับ
            </button>
            <span
              className="content-center"
              style={{ display: display ? "inline-block" : "none" }}
            >
              {pageNumber}/{numPages}
            </span>
            <button
              className="btn btn-outline mx-3"
              style={{ display: display ? "inline-block" : "none" }}
              disabled={pageNumber >= numPages}
              onClick={() =>
                setPageNumber((prevPageNumber) => prevPageNumber + 1)
              }
            >
              ถัดไป
            </button>
          </div>
        </div>
        <div
          className="flex mb-3"
          style={{ display: display ? "flex" : "none" }}
        >
          <div className="w-1/4 bg-slate-200 py-2">
            <ul className="w-full p-3">
              {positions.map((position, index) => (
                <li
                  key={index}
                  className="max-w-sm p-6 mb-2 bg-white border border-gray-200 rounded-lg shadow"
                >
                  <h5 className="mb-2 text-xl text-wrap font-bold tracking-tight text-gray-900">
                    ไฟล์: {position.fileName} (ไอดี: {position.id})
                  </h5>
                  <div className="flex justify-between">
                    <div className="align-middle font-normal text-gray-700 dark:text-gray-400">
                      <div>
                        หน้า: {position.page}, X: {position.x}, Y: {position.y}
                      </div>
                      <div>
                        กว้าง: {position.width}, ยาว: {position.height}
                      </div>
                    </div>
                    <button
                      className="btn btn-error text-white"
                      onClick={() => removeSignaturePosition(index)}
                    >
                      ลบ
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-3/4 inline-flex justify-center overflow-x-auto border bg-gray-400 border-gray-400">
            {selectedFile && (
              <div className="relative">
                <canvas
                  id="signatureCanvas"
                  onClick={addSignaturePosition}
                  className="absolute z-10"
                ></canvas>
                <Document
                  file={selectedFile}
                  renderMode="canvas"
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page
                    pageNumber={pageNumber}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    onLoadSuccess={onPageLoadSuccess}
                    scale={1.5}
                  />
                </Document>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewDocumentPage;
