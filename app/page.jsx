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
      <Navbar />
      <div className="container mx-auto font-prompt">
        <h1 className="text-3xl my-3">หน้าหลัก</h1>
        <h1 className="text-3xl my-3">Test AI Review</h1>
        <hr className="my-3"></hr>
      </div>
    </main>
  );
};
export default HomePage;
