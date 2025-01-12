import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FindPatient from "./pages/search";
import './App.css';

function App() {
  const router = createBrowserRouter([
    {
      path: "/find-patient",
      element: (
        <>
          <FindPatient />
        </>
      ),
    },

  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;