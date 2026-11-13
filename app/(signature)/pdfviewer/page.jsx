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

  const pdfDetails = [
    /*{ id: 1, page: 1, x: 233.5, y: 1037 },
    { id: 2, page: 1, x: 621.5, y: 1041 },
    { id: 3, page: 1, x: 437.5, y: 670 },*/

    { id: 1, page: 4, x: 439.5, y: 1008 },
    { id: 2, page: 6, x: 441.5, y: 1010 },
    { id: 3, page: 8, x: 439.5, y: 1010 },
    { id: 4, page: 9, x: 558.5, y: 738 },
    { id: 5, page: 10, x: 660.5, y: 746 },
  ];

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
    /* const sigUrl =
      "https://raw.githubusercontent.com/Kamsura01/heng_e_doc/main/uploads/sigTest2.png"; 
    const sigUrlImgBytes = await fetch(sigUrl).then((res) => res.arrayBuffer());
    const sigImage = await pdfDoc.embedPng(sigUrlImgBytes);*/

    const sigImage = await pdfDoc.embedPng('data:image/png;base64,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');

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
