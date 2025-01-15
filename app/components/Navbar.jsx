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
              <>
                <li>
                  <Link
                    href={"/passcode"}
                    className="btn btn-outline mx-2 border-0 text-lg 
                  text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    ยืนยันตัวตน
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/message"}
                    className="btn btn-outline mx-2 border-0 text-lg 
                  text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    ส่งข้อความ
                  </Link>
                </li>
              </>
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
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Profile"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content border border-gray-300 
                    bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow-xl"
                  >
                    <li>
                      <Link href={"/profile"} className="text-base">
                        ข้อมูลส่วนตัว
                      </Link>
                    </li>
                    {status == "authenticated" && session.user.ROLE && (
                      <li>
                        <Link href={"/admin"} className="text-base">
                          ผู้ดูแลระบบ
                        </Link>
                      </li>
                    )}
                    <li>
                      <a className="text-base" onClick={() => signOut()}>
                        ออกจากระบบ
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
