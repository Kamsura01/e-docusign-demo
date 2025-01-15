"use client";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AdminPage = () => {
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
          <h1 className="text-3xl my-3">ผู้ดูแลระบบ</h1>
          <p>
            {session.user.USER_PREFIX +
              session.user.USER_NAME +
              " " +
              session.user.USER_SURNAME +
              " (" +
              session.user.HR_ID +
              ")"}
          </p>
          <hr className="my-3"></hr>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </>
    )
  );
};
export default AdminPage;
