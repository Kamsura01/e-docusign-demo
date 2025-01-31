"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import DocusignIcon from "@/docusign-icon.svg";
import {
  BsArrowLeftShort,
  BsFolder2Open,
  BsInboxFill,
  BsChevronDown,
} from "react-icons/bs";
import { AiOutlineSignature } from "react-icons/ai";
import { CgPassword } from "react-icons/cg";
import { MdStorage, MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaFileSignature } from "react-icons/fa";
import { RiDashboardFill, RiLogoutBoxLine } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";

const Sidebar = ({ activeMenu }) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(true);

  const sideMenus = [
    {
      id: "folder",
      title: "แฟ้มเอกสาร",
      icon: <BsFolder2Open />,
      link: "/pdfposition",
    },
    { id: "panel", title: "ถาดงาน", icon: <BsInboxFill />, link: "" },
    {
      id: "storage",
      title: "คลังเอกสาร",
      icon: <MdStorage />,
      link: "/pdfviewer",
    },
    {
      id: "signature",
      title: "จัดการลายเซ็น",
      icon: <FaFileSignature />,
      submenu: true,
      submenuItems: [
        {
          id: "createSignature",
          title: "สร้างลายเซ็น",
          icon: <AiOutlineSignature />,
          link: "/signaturepad",
        },
        {
          id: "passcode",
          title: "กำหนดรหัสอนุมัติ",
          icon: <CgPassword />,
          link: "/passcode",
        },
      ],
    },
  ];

  return (
    <div
      className={`bg-primary-blue h-screen p-5 pt-5 relative duration-300 
        ${openSidebar ? "w-72" : "w-20"}`}
    >
      <BsArrowLeftShort
        className={`bg-primary-blue text-white text-3xl rounded-full 
        absolute -right-4 top-6 border-4 border-primary-gray cursor-pointer 
        ${!openSidebar && "rotate-180"}`}
        onClick={() => setOpenSidebar(!openSidebar)}
      />
      <div className="inline-flex">
        <Link href={"/"} className="flex w-auto">
          <Image
            priority
            src={DocusignIcon}
            width={30}
            alt="Heng Docusign"
            className={`cursor-pointer block float-left mx-2 duration-500 ${
              openSidebar && "rotate-[360deg]"
            }`}
          />
          <div className={`block duration-300 ${!openSidebar && "scale-0"}`}>
            <h1
              className="w-full font-almarai text-white font-semibold"
              style={{ lineHeight: 1, fontSize: "28px" }}
            >
              HENG
            </h1>
            <h3
              className="w-full font-anta text-white"
              style={{ lineHeight: 0.6, fontSize: "19px" }}
            >
              docusign
            </h3>
          </div>
        </Link>
      </div>

      <ul className="pt-6">
        {sideMenus.map((menu, index) => (
          <div key={index}>
            <Link href={`${menu.link ? menu.link : "/"}`}>
              <li
                key={index}
                className={`text-white text-lg flex items-center gap-x-4 p-2 cursor-pointer 
                  rounded-md justify-between hover:bg-primary-gray/30 
                  ${menu.spacing ? "mt-8" : "mt-4"}
                  ${menu.id == activeMenu && "bg-primary-gray/30"}`}
                onClick={() => setSubMenuOpen(!subMenuOpen)}
              >
                <span className="text-2xl block float-left">
                  {menu.icon ? menu.icon : <RiDashboardFill />}
                </span>
                <span
                  className={`text-base font-medium flex-1 duration-300 
                    ${!openSidebar && "hidden"}`}
                >
                  {menu.title}
                </span>

                {menu.submenu && openSidebar && (
                  <BsChevronDown className={`${subMenuOpen && "rotate-180"}`} />
                )}
              </li>
            </Link>
            {menu.submenu && subMenuOpen && openSidebar && (
              <ul>
                {menu.submenuItems.map((submenu, index) => (
                  <div key={index}>
                    <Link href={`${submenu.link ? submenu.link : "/"}`}>
                      <li
                        key={index}
                        className="text-white text-lg flex items-center hover:bg-primary-gray/30 
                        rounded-md mt-2 gap-x-4 p-2 ml-5 cursor-pointer"
                      >
                        <span className="text-2xl block float-left">
                          {submenu.icon ? submenu.icon : <RiDashboardFill />}
                        </span>
                        <span
                          className={`text-base font-medium flex-1 duration-300 
                          ${!openSidebar && "hidden"}`}
                        >
                          {submenu.title}
                        </span>
                      </li>
                    </Link>
                  </div>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ul>
      <ul className="mt-6 border-t-2 border-primary-dark-gray/50">
        <li
          className="text-white text-ls flex items-center gap-x-4 p-2 rounded-md 
            cursor-pointer hover:bg-primary-gray/30 mt-4"
          onClick={() => signOut()}
        >
          <span className="text-2xl block float-left">
            <MdOutlineAdminPanelSettings />
          </span>
          <span
            className={`text-base font-medium flex-1 duration-300 
              ${!openSidebar && "hidden"}`}
          >
            ผู้ดูแลระบบ
          </span>
        </li>
        <li
          className="text-white text-ls flex items-center gap-x-4 p-2 rounded-md 
            cursor-pointer hover:bg-primary-gray/30 mt-4"
          onClick={() => signOut()}
        >
          <span className="text-2xl block float-left">
            <RiLogoutBoxLine />
          </span>
          <span
            className={`text-base font-medium flex-1 duration-300 
              ${!openSidebar && "hidden"}`}
          >
            ออกจากระบบ
          </span>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
