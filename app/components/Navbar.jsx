"use client";
import React from "react";
import { useSession } from "next-auth/react";
import ProfileName from "./ProfileName";

const Navbar = ({pageTitle}) => {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-primary-gray">
      <div className="mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          <h1 className="text-3xl mx-4 font-semibold">{pageTitle && pageTitle}</h1>
          {status == "authenticated" && session.user && (
            <div className="flex">
              <button className="btn btn-ghost btn-circle mr-2">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 
                    00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 
                    1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="badge badge-xs badge-success indicator-item"></span>
                </div>
              </button>
              <div
                role="button"
                className="btn btn-ghost btn-circle avatar mr-2"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div>
              <ProfileName />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
