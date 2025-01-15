"use client"
import Navbar from "./components/Navbar";

const HomePage = () => {
  return (
    <main>
      <Navbar />
      <div className="container mx-auto font-prompt">
        <h1 className="text-3xl my-3">หน้าหลัก</h1>
        <hr className="my-3"></hr>
      </div>
    </main>
  );
};
export default HomePage;
