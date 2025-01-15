"use client";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SendEmail from "@/components/SendEmail";
import SendMessage from "@/components/SendMessage";
import ProfileName from "@/components/ProfileName";

const MessagePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status == "unauthenticated") {
      router.replace("/");
    }
  }, [router, status]);

  return (
    status == "authenticated" &&
    session.user && (
      <>
        <Navbar />
        <div className="container mx-auto mt-3 font-prompt">
          <h1 className="text-3xl my-3">ส่งข้อความ</h1>
          <ProfileName />
          <hr className="my-3"></hr>
          <div className="flex w-full">
            <div className="mr-2">
              <SendEmail />
            </div>
            <div>
              <SendMessage />
            </div>
          </div>
        </div>
      </>
    )
  );
};
export default MessagePage;
