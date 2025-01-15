"use client";
import { useEffect, useRef, useState } from "react";

const Passcode = ({userPasscode}) => {
  const [arrayValue, setArrayValue] = useState(["", "", "", ""]);
  const [currentFocusedIndex, setCurrentFocusedIndex] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    submitValue();
  }, [arrayValue, currentFocusedIndex]);

  const submitValue = () => {
    const pCodeIcons = document.querySelectorAll(".pCode");
    let passcode = "";

    arrayValue.forEach((value, index) => {
      passcode = value !== "" ? passcode + value : passcode + "";
    });

    if (passcode.length == 4) {
      if (passcode == userPasscode) {
        document
          .querySelector("#passcodeIcon")
          .classList.add("border-green-400");
        document
          .querySelector("#passcodeIcon")
          .classList.remove("border-red-400");
        document
          .querySelector("#passcodeIcon")
          .classList.remove("border-gray-400");

        pCodeIcons.forEach((value, index) => {
          pCodeIcons[index].classList.add("border-green-400");
          pCodeIcons[index].classList.remove("border-red-400");
          pCodeIcons[index].classList.remove("border-gray-400");
        });

        document.getElementById("my_modal_2").close();
        clearPasscode();
      } else {
        document.querySelector("#passcodeIcon").classList.add("border-red-400");
        document
          .querySelector("#passcodeIcon")
          .classList.remove("border-green-400");
        document
          .querySelector("#passcodeIcon")
          .classList.remove("border-gray-400");

        pCodeIcons.forEach((value, index) => {
          pCodeIcons[index].classList.add("border-red-400");
          pCodeIcons[index].classList.remove("border-green-400");
          pCodeIcons[index].classList.remove("border-gray-400");
        });
      }
    }
  };

  const onKeyDown = (e) => {
    const keyCode = parseInt(e.key);
    if (
      !(keyCode >= 0 && keyCode <= 9) &&
      e.key !== "Backspace" &&
      !(e.metaKey && e.key === "v")
    ) {
      e.preventDefault();
    }
  };

  const onChange = (e, index) => {
    setArrayValue((preValue) => {
      const newArray = [...preValue];
      const pCodeIcons = document.querySelectorAll(".pCode");

      if (parseInt(e.target.value)) {
        newArray[index] = parseInt(e.target.value);
      } else {
        newArray[index] = e.target.value;
      }

      document.querySelector("#passcodeIcon").classList.add("border-gray-400");
      document
        .querySelector("#passcodeIcon")
        .classList.remove("border-green-400");
      document
        .querySelector("#passcodeIcon")
        .classList.remove("border-red-400");

      if (e.target.value == "") {
        pCodeIcons[index].classList.add("border-gray-400");
        pCodeIcons[index].classList.remove("border-green-400");
        pCodeIcons[index].classList.remove("border-red-400");
      } else {
        pCodeIcons[index].classList.add("border-green-400");
        pCodeIcons[index].classList.remove("border-gray-400");
        pCodeIcons[index].classList.remove("border-red-400");
      }

      return newArray;
    });
  };

  const onKeyUp = (e, index) => {
    if (e.key === "Backspace") {
      if (index === 0) {
        setCurrentFocusedIndex(0);
      } else {
        setCurrentFocusedIndex(index - 1);

        if (inputRefs && inputRefs.current && index === currentFocusedIndex) {
          inputRefs.current[index - 1].focus();
        }
      }
    } else {
      if (parseInt(e.key) && index < arrayValue.length - 1) {
        setCurrentFocusedIndex(index + 1);

        if (inputRefs && inputRefs.current && index === currentFocusedIndex) {
          inputRefs.current[index + 1].focus();
        }
      }
    }
  };

  const onFocus = (e, index) => {
    setCurrentFocusedIndex(index);
  };

  const clearPasscode = () => {
    const pCodeIcons = document.querySelectorAll(".pCode");
    document.querySelector("#passcodeIcon").classList.add("border-gray-400");
    document
      .querySelector("#passcodeIcon")
      .classList.remove("border-green-400");
    document.querySelector("#passcodeIcon").classList.remove("border-red-400");

    pCodeIcons.forEach((value, index) => {
      pCodeIcons[index].classList.add("border-gray-400");
      pCodeIcons[index].classList.remove("border-green-400");
      pCodeIcons[index].classList.remove("border-red-400");
    });

    setArrayValue(["", "", "", ""]);
  };

  return (
    <>
      <button
        className="btn btn-outline"
        onClick={() => document.getElementById("my_modal_2").showModal()}
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
            strokeWidth="1.5"
            d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 
                0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"
          />
        </svg>
        ยืนยันตัวตน
      </button>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <div className="w-full flex mb-2 items-center justify-center">
            <svg
              className="w-[35px] h-[35px] text-gray-400"
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
                strokeWidth="1.5"
                d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 
                    1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"
              />
            </svg>
            <div
              id="passcodeIcon"
              className="flex mx-2 p-2 border-2 border-gray-400 rounded-lg"
            >
              <span className="pCode size-1 mx-2 border-4 border-gray-400 rounded-full"></span>
              <span className="pCode size-1 mx-2 border-4 border-gray-400 rounded-full"></span>
              <span className="pCode size-1 mx-2 border-4 border-gray-400 rounded-full"></span>
              <span className="pCode size-1 mx-2 border-4 border-gray-400 rounded-full"></span>
            </div>
          </div>
          <hr className="my-3 border-gray-300"></hr>
          <div className="flex w-full justify-center my-2">
            <div className="flex w-3/6 justify-between">
              {arrayValue.map((value, index) => (
                <input
                  key={`index-${index}`}
                  ref={(el) => el && (inputRefs.current[index] = el)}
                  inputMode="numeric"
                  maxLength={1}
                  type="text"
                  value={String(value)}
                  onChange={(e) => onChange(e, index)}
                  onKeyUp={(e) => onKeyUp(e, index)}
                  onKeyDown={(e) => onKeyDown(e)}
                  onFocus={(e) => onFocus(e, index)}
                  onPaste={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  className="input input-bordered w-1/5 max-w-xs text-center"
                />
              ))}
            </div>
          </div>
          <hr className="my-3 border-gray-300"></hr>
          <div className="w-full text-center text-xl">กรุณากรอกรหัสยืนยันตัวตนของท่าน</div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={clearPasscode}>close</button>
        </form>
      </dialog>
    </>
  );
};
export default Passcode;
