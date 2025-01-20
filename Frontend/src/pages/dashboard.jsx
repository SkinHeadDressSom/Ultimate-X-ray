import React from "react";
import Navbar from "../components/navbar";
import FolderShape from "../components/folderShape";
const Dashboard = () => {
  return (
    <>
      <Navbar />
      <main className="bg-lightest-blue w-screen h-screen py-5 px-10">
        <FolderShape />
      </main>
    </>
  );
};

export default Dashboard;
