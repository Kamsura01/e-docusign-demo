"use client";
import Navbar from "@/components/Navbar";
import SignatureCanvas from "@/components/SignatureCanvas";

const SignaturePadPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto font-prompt">
        <h1 className="text-3xl my-3">ลายเซ็นต์ใหม่</h1>
        <hr className="my-3"></hr>
        <SignatureCanvas />
      </div>
    </>
  );
};
export default SignaturePadPage;
