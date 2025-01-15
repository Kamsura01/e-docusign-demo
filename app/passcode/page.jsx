"use client";
import Navbar from "@/components/Navbar";
import Passcode from "@/components/Passcode";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProfileName from "@/components/ProfileName";

const PasscodePage = () => {
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
      <div className="container mx-auto font-prompt">
        <h1 className="text-3xl my-3">ยืนยันตัวตน</h1>
        <ProfileName />
        <hr className="my-3"></hr>
        <Passcode userPasscode={session.user.PASSCODE} />
      </div>
    </>)
  );
};
export default PasscodePage;
