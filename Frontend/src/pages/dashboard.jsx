import React, { useState } from "react";
import Navbar from "../components/Navbar/navbar";
import FolderShape from "../components/Card/folderShape";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const [patient, setPatient] = useState(location.state?.patient);

  const handlePatientDataFetched = (data) => {
    setPatient(data);
  };

  return (
    <>
      <Navbar onPatientDataFetched={handlePatientDataFetched} />
      <main className="bg-lightest-blue w-screen h-screen py-5 px-10">
        <FolderShape patient={patient} />
      </main>
    </>
  );
};

export default Dashboard;
