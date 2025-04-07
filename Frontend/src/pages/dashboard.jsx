import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPatient } from "../redux/patient";
import Navbar from "../components/Navbar/navbar";
import FolderShape from "../components/Card/folderShape";

const Dashboard = () => {
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.patient?.data || null);

  const handlePatientDataFetched = (data) => {
    dispatch(setPatient(data));
  };

  return (
    <>
      <Navbar onPatientDataFetched={handlePatientDataFetched} />
      <main className="bg-lightest-blue w-screen h-full min-h-screen">
        {patient ? (
          <FolderShape patient={patient} />
        ) : (
          <p className="text-center text-gray-600">No patient selected</p>
        )}
      </main>
    </>
  );
};

export default Dashboard;
