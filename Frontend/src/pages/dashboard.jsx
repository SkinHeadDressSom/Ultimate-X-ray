import React from "react";
import Navbar from "../components/navbar";
import HeadFolderShape from "../components/folderShape";
const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="bg-lightest-blue w-screen h-screen ">
        <div className="py-5 px-10">
          <HeadFolderShape />
        </div>
        
      </div>
    </>
  );
};

export default Dashboard;
