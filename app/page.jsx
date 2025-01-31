"use client";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status == "unauthenticated") {
      router.replace("/login");
    }
  }, [router, status]);

  return (
    <main>
      <div className="flex font-prompt">
        <Sidebar activeMenu={"folder"} />
        <div className="w-full">
          <Navbar pageTitle={"แฟ้มเอกสาร"} />
          <div className="px-10 py-4">บทความ</div>
        </div>
      </div>
    </main>
  );
};
export default HomePage;
