"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-gray-800 font-prompt">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="mx-2 text-white font-semibold text-2xl">
            <Link href={"/"}>Heng</Link>
          </div>
          <ul className="flex">
            <li>
              <Link
                href={"/pdfposition"}
                className="btn btn-outline mx-2 border-0 text-lg 
                text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                เอกสารใหม่
              </Link>
            </li>
            <li>
              <Link
                href={"/pdfviewer"}
                className="btn btn-outline mx-2 border-0 text-lg 
                text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                พรีวิวเอกสาร
              </Link>
            </li>
            <li>
              <Link
                href={"/signaturepad"}
                className="btn btn-outline mx-2 border-0 text-lg 
                text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                ลายเซ็นต์ใหม่
              </Link>
            </li>
            {status == "authenticated" && (
              <li>
                <Link
                  href={"/passcode"}
                  className="btn btn-outline mx-2 border-0 text-lg 
                  text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  ยืนยันตัวตน
                </Link>
              </li>
            )}
          </ul>
          <ul className="flex">
            {status == "unauthenticated" ? (
              <li>
                <Link
                  href={"/login"}
                  className="btn btn-outline mx-2 border-0 text-lg 
                  text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  เข้าสู่ระบบ
                </Link>
              </li>
            ) : (
              <li>
                <a
                  onClick={() => signOut()}
                  className="btn btn-outline text-lg btn-error"
                >
                  ออกจากระบบ
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
