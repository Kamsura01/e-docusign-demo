"use client";
import { useState, useRef } from "react";
import ReactSignatureCanvas from "react-signature-canvas";

const SignatureCanvas = () => {
  const sigCanvas = useRef();
  const [imageURL, setImageURL] = useState(null);
  const [penColor, setPenColor] = useState("black");
  const colors = ["black", "blue", "red"];

  const createSignature = () => {
    const URL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    setImageURL(URL);
    document.getElementById("my_modal_3").close();
  };

  return (
    <>
      <button
        className="btn btn-outline"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m4.988 19.012 5.41-5.41m2.366-6.424 4.058 4.058-2.03 5.41L5.3 20 
                    4 18.701l3.355-9.494 5.41-2.029Zm4.626 4.625L12.197 6.61 14.807 4 20 9.194l-2.61 2.61Z"
          />
        </svg>
        สร้างลายเซ็นต์
      </button>

      {imageURL && (
        <div className="w-1/3 border border-black p-5 my-3">
          <img src={imageURL} alt="signature" className="signature"></img>
        </div>
      )}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box pb-3">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="bg-gray-200 m-3">
            <ReactSignatureCanvas
              penColor={penColor}
              canvasProps={{ className: `w-full h-60` }}
              ref={sigCanvas}
            />
          </div>
          <div className="m-3">
            <hr></hr>
            <div className="flex mt-3 justify-between content-center">
              <div className="content-center">
                <p className="text-ls inline-block mr-2">สีปากกา: </p>
                {colors.map((color) => (
                  <span
                    key={color}
                    style={{
                      backgroundColor: color,
                      border: `${
                        color === penColor ? `2px solid ${color}` : ""
                      }`,
                      padding: `0px 12px`,
                      borderRadius: `100%`,
                      marginRight: `5px`,
                      cursor: `pointer`,
                    }}
                    onClick={() => setPenColor(color)}
                  ></span>
                ))}
              </div>
              <div className="flex">
                <button
                  className="btn btn-ghost text-ls"
                  onClick={() => {
                    sigCanvas.current.clear();
                  }}
                >
                  ล้าง
                </button>
                <button
                  className="btn btn-outline text-ls createSignature ml-2"
                  onClick={createSignature}
                >
                  สร้าง
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
export default SignatureCanvas;
