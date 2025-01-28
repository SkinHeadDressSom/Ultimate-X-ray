import React from "react";
import Navbar from "../components/navbar";
import FolderShape from "../components/folderShape";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const patient = location.state?.patient;
  
  return (
    <>
      <Navbar />
      <main className="bg-lightest-blue w-screen h-screen py-5 px-10">
        <FolderShape patient={patient} />
      </main>
    </>
  );
};

export default Dashboard;
