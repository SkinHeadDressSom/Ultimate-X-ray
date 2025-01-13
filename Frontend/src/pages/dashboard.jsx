import React from "react";
import Navbar from "../components/navbar";
import FolderShape from "../components/folderShape";
const Dashboard = () => {
  return (
    <>
      <Navbar />
      <main className="bg-lightest-blue w-screen h-screen ">
        <div className="py-5 px-10">
          <FolderShape />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
