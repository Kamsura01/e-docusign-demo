"use client";
import { useEffect, useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { Document, Page, pdfjs } from "react-pdf";
import Navbar from "@/components/Navbar";
import DownloadFileButton from "@/components/DownloadFileButton";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ViewDocumentPage = () => {
  const [pdfScale, setPdfScale] = useState(1.5);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [newPdfURL, setNewPdfURL] = useState("");

  const [pdfHeader, setPdfHeader] = useState({
    fileName: "ตัวอย่างเอกสารโอนย้าย.pdf",
    fileURL:
      "https://raw.githubusercontent.com/Kamsura01/heng_e_doc/main/uploads/ตัวอย่างเอกสารโอนย้าย.pdf",
    width: 892,
    height: 1262,
  });

  const [pdfDetails, setpdfDetails] = useState([
    /*{ id: 1, page: 1, x: 233.5, y: 1037 },
    { id: 2, page: 1, x: 621.5, y: 1041 },
    { id: 3, page: 1, x: 437.5, y: 670 },*/

    { id: 1, page: 4, x: 439.5, y: 1008 },
    { id: 2, page: 6, x: 441.5, y: 1010 },
    { id: 3, page: 8, x: 439.5, y: 1010 },
    { id: 4, page: 9, x: 558.5, y: 738 },
    { id: 5, page: 10, x: 660.5, y: 746 },
  ]);

  useEffect(() => {
    if (!newPdfURL) {
      generatePdfFile();
    }
  });

  const generatePdfFile = async () => {
    // PDF
    const PdfBytes = await fetch(pdfHeader.fileURL).then((res) =>
      res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(PdfBytes);
    const pages = pdfDoc.getPages();

    // Signature Image
    const sigUrl =
      "https://raw.githubusercontent.com/Kamsura01/heng_e_doc/main/uploads/sigTest2.png";
    const sigUrlImgBytes = await fetch(sigUrl).then((res) => res.arrayBuffer());
    const sigImage = await pdfDoc.embedPng(sigUrlImgBytes);

    // Set PDF
    for (let i = 0; i < pages.length; i++) {
      // Scale
      pages[i].scaleContent(pdfScale, pdfScale);
      pages[i].scaleAnnotations(pdfScale, pdfScale);

      // Size
      if (pages.length > 1) {
        pages[i].setWidth(pdfHeader.width);
        pages[i].setHeight(pdfHeader.height);
      } else {
        pages[i].setWidth(pdfHeader.height);
        pages[i].setHeight(pdfHeader.width);
      }
    }

    for (let i = 0; i < pdfDetails.length; i++) {
      const pdfDetail = pdfDetails[i];
      const imgWidth = 150;
      const imgHeight = 50;
      const pdfHeight = pdfHeader.height / pdfScale;
      const pageIndex = pages.length > 1 ? pdfDetail.page - 1 : 0;
      const degree = pages.length > 1 ? 0 : -90;

      const x =
        pages.length > 1
          ? pdfDetail.x / pdfScale - imgWidth / 2
          : (pdfHeader.height - pdfDetail.y) / pdfScale - imgHeight / 2;

      const y =
        pages.length > 1
          ? pdfHeight - pdfDetail.y / pdfScale - imgHeight / 2
          : (pdfHeader.width - pdfDetail.x) / pdfScale + imgWidth / 2;

      pages[pageIndex].drawImage(sigImage, {
        x: x,
        y: y,
        width: imgWidth,
        height: imgHeight,
        rotate: degrees(degree),
      });
    }

    const newPdfBytes = await pdfDoc.save();
    const blob = new Blob([newPdfBytes], {
      type: "application/pdf",
    });
    const url = URL.createObjectURL(blob);
    setNewPdfURL(url);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto font-prompt">
        <h1 className="text-3xl my-3">พรีวิวเอกสาร</h1>
        <hr className="my-3"></hr>
        <div className="flex w-full bg-slate-300 justify-between">
          <div className="my-2 flex">
            <button className="btn btn-outline mx-3" onClick={generatePdfFile}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 
                    8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              โหลดใหม่
            </button>
            <div className="flex items-center">
              <button
                className="btn btn-outline mx-3"
                disabled={pageNumber <= 1}
                onClick={() =>
                  setPageNumber((prevPageNumber) => prevPageNumber - 1)
                }
              >
                กลับ
              </button>
              <div>
                {pageNumber}/{numPages}
              </div>
              <button
                className="btn btn-outline mx-3"
                disabled={pageNumber >= numPages}
                onClick={() =>
                  setPageNumber((prevPageNumber) => prevPageNumber + 1)
                }
              >
                ถัดไป
              </button>
            </div>
          </div>
          <div className="my-2 flex">
            <DownloadFileButton url={newPdfURL} />
          </div>
        </div>
        <div className="flex mb-3">
          <div className="w-1/4 bg-slate-200 py-2">
            <ul className="w-full p-3">
              {pdfDetails.map((detail, index) => (
                <li
                  key={index}
                  className="max-w-sm p-6 mb-2 bg-white border border-gray-200 rounded-lg shadow 
                    cursor-pointer hover:border-gray-400"
                  onClick={() => setPageNumber(detail.page)}
                >
                  <h5 className="mb-2 text-xl text-wrap font-bold tracking-tight text-gray-900">
                    ไฟล์: {pdfHeader.fileName} (ไอดี: {detail.id})
                  </h5>
                  <div className="flex justify-between">
                    <div className="align-middle font-normal text-gray-700 dark:text-gray-400">
                      <div>
                        หน้า: {detail.page}, X: {detail.x}, Y: {detail.y}
                      </div>
                      <div>
                        กว้าง: {pdfHeader.width}, ยาว: {pdfHeader.height}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-3/4 inline-flex justify-center overflow-x-auto border bg-gray-400 border-gray-400">
            {newPdfURL && (
              <Document
                file={newPdfURL}
                renderMode="canvas"
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page
                  pageNumber={pageNumber}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  scale={1}
                  width={pdfHeader.width}
                  height={pdfHeader.height}
                />
              </Document>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDocumentPage;
